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
  widePreview?: boolean;
};

export const PLATFORM_NAMES: Record<Platform, string> = { windows: "Windows", mac: "macOS" };

export const apps: App[] = [
  {
    slug: "rt-clip",
    name: "rt-clip",
    kind: "Desktop utility",
    tagline: "Clipboard history in your tray, synced through your own Google Drive.",
    description:
      "rt-clip keeps everything you copy one click away. Open it from the tray or menu bar, click an item, and it is back on your clipboard, ready to paste.",
    icon: "/apps/rt-clip/icon.png",
    releasesRepo: "rt-labs-dev/rt-clip-releases",
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
      "Windows 11 places new tray icons in the hidden icons area. Drag the rt-clip icon onto the taskbar to keep it one click away.",
    ],
  },
  {
    slug: "rt-wow-sync",
    name: "rt-wow-sync",
    kind: "Game utility",
    tagline: "Your World of Warcraft addon settings, keybindings and macros, the same on every PC.",
    description:
      "rt-wow-sync snapshots the settings of each game flavor and keeps them in sync between your PCs, through a folder you already sync or your own Google Drive. Launch the game from it and you always start with the latest settings.",
    icon: "/apps/rt-wow-sync/icon.png",
    releasesRepo: "rt-labs-dev/rt-wow-sync-releases",
    platforms: ["windows", "mac"],
    requirements: {
      windows: "Windows 10 or 11, 64-bit",
      mac: "macOS 11 or later, Apple silicon or Intel",
    },
    specs: [
      { label: "Price", value: "Free" },
      { label: "Syncs", value: "Each flavor's settings, and optionally its addons" },
      { label: "Sync location", value: "A folder you choose, or your own Google Drive" },
      { label: "Drive access", value: "Only files the app created itself" },
      { label: "Built with", value: "Go, Wails and React" },
    ],
    features: [
      {
        title: "Settings, and addons if you want",
        body: "Syncs addon SavedVariables, per-character settings, keybindings and macros. Turn on addon sync to bring the addons themselves along, or keep using your addon manager.",
      },
      {
        title: "Launch with the latest",
        body: "Launch the game from rt-wow-sync and it pulls newer settings first, so you never start a session with yesterday's layout.",
      },
      {
        title: "Knows what changed",
        body: "Each flavor shows whether it is in sync, has local changes, is behind the cloud, or changed on both sides.",
      },
      {
        title: "Safe by default",
        body: "Never syncs while the game is running, and backs up your current files before anything replaces them.",
      },
      {
        title: "Pull-only PCs",
        body: "Mark a laptop or second PC as pull-only. It always takes the latest settings and never overwrites your main PC.",
      },
      {
        title: "Copy macros",
        body: "Copy macros between characters and between game flavors, without retyping them.",
      },
    ],
    notes: [
      "The macOS version is not notarized yet. After moving it to Applications, right-click it and choose Open the first time.",
      "Set every PC to the same sync location. Signing in to Google does not switch an existing folder setup.",
      "rt-wow-sync is not affiliated with or endorsed by Blizzard Entertainment. World of Warcraft is a trademark of Blizzard Entertainment, Inc.",
    ],
    widePreview: true,
  },
];

export const findApp = (slug: string) => apps.find((app) => app.slug === slug);

export const indexNumber = (app: App) => String(apps.indexOf(app) + 1).padStart(2, "0");
