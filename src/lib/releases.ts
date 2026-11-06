import type { Platform } from "../data/apps";

export type Download = { url: string; fileName: string; size: number };

export type Release = {
  version: string;
  publishedAt: string;
  pageUrl: string;
  downloads: Partial<Record<Platform, Download>>;
};

type GitHubAsset = { name: string; browser_download_url: string; size: number };
type GitHubRelease = { tag_name: string; published_at: string; html_url: string; assets: GitHubAsset[] };

const MATCHERS: Record<Platform, RegExp[]> = {
  windows: [/setup\.exe$/i, /\.exe$/i, /\.msi$/i],
  mac: [/universal\.dmg$/i, /\.dmg$/i],
};

const pickAsset = (assets: GitHubAsset[], patterns: RegExp[]) =>
  patterns.map((pattern) => assets.find((asset) => pattern.test(asset.name))).find(Boolean);

const cache = new Map<string, Promise<Release | null>>();

const fetchRelease = async (repo: string): Promise<Release | null> => {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
    if (!response.ok) return null;
    const release = (await response.json()) as GitHubRelease;
    const downloads: Release["downloads"] = {};
    for (const platform of Object.keys(MATCHERS) as Platform[]) {
      const asset = pickAsset(release.assets, MATCHERS[platform]);
      if (asset) downloads[platform] = { url: asset.browser_download_url, fileName: asset.name, size: asset.size };
    }
    return {
      version: release.tag_name.replace(/^v/, ""),
      publishedAt: release.published_at,
      pageUrl: release.html_url,
      downloads,
    };
  } catch {
    return null;
  }
};

export const latestRelease = (repo: string) => {
  if (!cache.has(repo)) cache.set(repo, fetchRelease(repo));
  return cache.get(repo)!;
};

export const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
