import {
  Bookmark,
  LucideIcon,
  Proportions,
  // Shapes,
  AudioLines,
  Clapperboard,
  SquareLibrary,
  BookText,
  // Rss,
  House,
  Medal,
  Bird,
  Newspaper,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Home",
          active: pathname === "/",
          icon: House,
          submenus: [],
        },
        {
          href: "/ebooks",
          label: "e-Books",
          active: pathname === "/ebooks",
          icon: BookText,
          submenus: [],
        },
        {
          href: "/competitions",
          label: "Competitions",
          active: pathname === "/competitions",
          icon: Medal,
          submenus: [],
        },
        {
          href: "/blogs",
          label: "Blogs",
          active: pathname === "/blogs",
          icon: Newspaper,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Groups",
      menus: [
        // {
        //   href: "/majors",
        //   label: "Majors",
        //   active: pathname.includes("/majors"),
        //   icon: Shapes,
        //   submenus: [],
        // },
        {
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/genres",
          label: "Genres",
          active: pathname.includes("/genres"),
          icon: Bird,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Student Work",
      menus: [
        {
          href: "/stories",
          label: "Stories",
          active: pathname === "/stories",
          icon: SquareLibrary,
          submenus: [],
        },
        {
          href: "/audio-podcasts",
          label: "Audio Podcasts",
          active: pathname === "/audio-podcasts",
          icon: AudioLines,
          submenus: [],
        },
        {
          href: "/video-podcasts",
          label: "Video Podcasts",
          active: pathname === "/video-podcasts",
          icon: Clapperboard,
          submenus: [],
        },
        {
          href: "/prakerin",
          label: "Prakerin",
          active: pathname.includes("/prakerin"),
          icon: Proportions,
          submenus: [],
        },
      ],
    },
  ];
}
