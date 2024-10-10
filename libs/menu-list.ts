import {
  Tag,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Proportions,
  SquareUser,
  Shapes,
  Layers,
  FileHeart,
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
          href: "/admin/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },

        {
          href: "/admin/students",
          label: "Students",
          active: pathname.includes("/students"),
          icon: SquareUser,
          submenus: [],
        },
        {
          href: "/admin/majors",
          label: "Majors",
          active: pathname.includes("/majors"),
          icon: Shapes,
          submenus: [],
        },
        {
          href: "/admin/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/admin/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Content",
      menus: [
        {
          href: "",
          label: "Blogs",
          active: pathname.includes("/admin/blogs"),
          icon: SquarePen,
          submenus: [],
        },
        {
          href: "/admin/e-books",
          label: "e-Books",
          active: pathname.includes("/admin/e-books"),
          icon: FileHeart,
          submenus: [],
        },
        {
          href: "",
          label: "Student Works",
          active: pathname.includes("/admin/student-works"),
          icon: Layers,
          submenus: [
            {
              href: "/admin/student-works/novels",
              label: "Novels",
              active: pathname === "/student-works/novels",
            },
            {
              href: "/admin/student-works/audio-podcasts",
              label: "Audio Podcasts",
              active: pathname === "/student-works/audio-podcasts",
            },
            {
              href: "/admin/student-works/video-podcasts",
              label: "Video Podcasts",
              active: pathname === "/student-works/video-podcasts",
            },
          ],
        },
        {
          href: "/admin/pkl-reports",
          label: "PKL Reports",
          active: pathname.includes("/pkl-reports"),
          icon: Proportions,
          submenus: [],
        },
      ],
    },
  ];
}
