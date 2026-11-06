export type Platform = "windows" | "mac";

export type App = {
  slug: string;
  name: string;
  kind: string;
  tagline: string;
  description: string;
  icon: string;
  releasesRepo: string;
  platforms: Platform[];
  requirements: Record<Platform, string>;
  specs: { label: string; value: string }[];
  features: { title: string; body: string }[];
  notes: string[];
};

export const PLATFORM_NAMES: Record<Platform, string> = { windows: "Windows", mac: "macOS" };

export const apps: App[] = [
  {
    slug: "clipshelf",
    name: "ClipShelf",
    kind: "Desktop utility",
    tagline: "Clipboard history in your tray, synced through your own Google Drive.",
    description:
      "ClipShelf keeps everything you copy one click away. Open it from the tray or menu bar, click an item, and it is back on your clipboard, ready to paste.",
    icon: "/apps/clipshelf/icon.png",
    releasesRepo: "rtobo-apps/clipshelf-releases",
    platforms: ["windows", "mac"],
    requirements: {
      windows: "Windows 10 or 11, 64-bit",
      mac: "macOS 11 or later, Apple silicon or Intel",
    },
    specs: [
      { label: "Price", value: "Free" },
      { label: "Sync", value: "Optional, through your own Google Drive" },
      { label: "Encryption", value: "XChaCha20-Poly1305, key from your passphrase" },
      { label: "Built with", value: "Rust, Tauri and React" },
    ],
    features: [
      {
        title: "Lives in the tray",
        body: "Click the tray or menu bar icon, or press Ctrl+Shift+Alt+V (Cmd+Shift+Option+V on a Mac), and your recent clipboards appear right there.",
      },
      {
        title: "Text, images and files",
        body: "Keeps plain and formatted text, screenshots and copied files. Links, colors and files get their own previews.",
      },
      {
        title: "Search and favorites",
        body: "Type to search as soon as it opens, star the snippets you reuse, and press Ctrl+1 to 9 to copy one of the latest items.",
      },
      {
        title: "Private sync",
        body: "Optional sync between your computers through a hidden folder in your own Google Drive, encrypted with a passphrase only you know.",
      },
      {
        title: "Skips passwords",
        body: "Content that password managers mark as sensitive is never recorded, and you can pause capture at any time.",
      },
      {
        title: "Native and light",
        body: "A small native app for Windows and macOS. No sign-up, no ads and no tracking.",
      },
    ],
    notes: [
      "The macOS version is not notarized yet. After moving it to Applications, right-click it and choose Open the first time.",
      "Windows 11 places new tray icons in the hidden icons area. Drag the ClipShelf icon onto the taskbar to keep it one click away.",
    ],
  },
];

export const findApp = (slug: string) => apps.find((app) => app.slug === slug);

export const indexNumber = (app: App) => String(apps.indexOf(app) + 1).padStart(2, "0");
