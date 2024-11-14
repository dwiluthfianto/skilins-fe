import {
  Bookmark,
  LayoutGrid,
  LucideIcon,
  Proportions,
  SquareUser,
  Shapes,
  BookMarked,
  Medal,
  Bird,
  Newspaper,
  SquareLibrary,
  AudioLines,
  Clapperboard,
  Hash,
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
          href: "/staff/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "",
          label: "Competitions",
          icon: Medal,
          active: false,
          submenus: [
            {
              href: "/staff/competitions/new",
              label: "New",
              active: pathname.includes("/new"),
            },
            {
              href: "/staff/competitions/list",
              label: "List",
              active: pathname.includes("/list"),
            },
            {
              href: "/staff/competitions/judges",
              label: "Judges",
              active: pathname.includes("/judges"),
            },
          ],
        },
        {
          href: "/staff/students",
          label: "Students",
          active: pathname.includes("/students"),
          icon: SquareUser,
          submenus: [],
        },
        {
          href: "/staff/majors",
          label: "Majors",
          active: pathname.includes("/majors"),
          icon: Shapes,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Student Works",
      menus: [
        {
          href: "/staff/student-works/stories",
          label: "Stories",
          active: pathname === "/student-works/stories",
          icon: SquareLibrary,
          submenus: [],
        },
        {
          href: "/staff/student-works/audio-podcasts",
          label: "Audio Podcasts",
          active: pathname === "/student-works/audio-podcasts",
          icon: AudioLines,
          submenus: [],
        },
        {
          href: "/staff/student-works/video-podcasts",
          label: "Video Podcasts",
          active: pathname === "/student-works/video-podcasts",
          icon: Clapperboard,
          submenus: [],
        },
        {
          href: "/staff/student-works/prakerin",
          label: "PKL Reports",
          active: pathname.includes("/student-works/prakerin"),
          icon: Proportions,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Content",
      menus: [
        {
          href: "/staff/blogs",
          label: "Blogs",
          active: pathname.includes("/staff/blogs"),
          icon: Newspaper,
          submenus: [],
        },
        {
          href: "/staff/ebooks",
          label: "e-Books",
          active: pathname.includes("/staff/ebooks"),
          icon: BookMarked,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Groups",
      menus: [
        {
          href: "/staff/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/staff/genres",
          label: "Genres",
          active: pathname.includes("/genres"),
          icon: Bird,
          submenus: [],
        },
        {
          href: "/staff/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Hash,
          submenus: [],
        },
      ],
    },
  ];
}
