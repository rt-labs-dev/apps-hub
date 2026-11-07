export type Asset = { url: string; fileName: string; size: number };

export type Release = {
  version: string;
  publishedAt: string;
  pageUrl: string;
  assets: Asset[];
};

type GitHubAsset = { name: string; browser_download_url: string; size: number };
type GitHubRelease = { tag_name: string; published_at: string; html_url: string; assets: GitHubAsset[] };

const cache = new Map<string, Promise<Release | null>>();

const fetchRelease = async (repo: string): Promise<Release | null> => {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers });
    if (!response.ok) return null;
    const release = (await response.json()) as GitHubRelease;
    return {
      version: release.tag_name.replace(/^v/, ""),
      publishedAt: release.published_at,
      pageUrl: release.html_url,
      assets: release.assets.map((asset) => ({ url: asset.browser_download_url, fileName: asset.name, size: asset.size })),
    };
  } catch {
    return null;
  }
};

export const latestRelease = (repo: string) => {
  if (!cache.has(repo)) cache.set(repo, fetchRelease(repo));
  return cache.get(repo)!;
};

// findAsset returns the first file matching the patterns, trying them in order.
export const findAsset = (release: Release | null, patterns: RegExp[]) =>
  patterns.map((pattern) => release?.assets.find((asset) => pattern.test(asset.fileName))).find(Boolean);

export const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
