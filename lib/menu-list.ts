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
              href: "/admin/student-works/e-books",
              label: "e-Books",
              active: pathname === "/student-works/e-books",
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
      ],
    },
    {
      groupLabel: "PKL Reports",
      menus: [
        {
          href: "/admin/pkl-reports",
          label: "Reports",
          active: pathname.includes("/reports"),
          icon: Proportions,
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
      ],
    },
    {
      groupLabel: "Blogs",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/admin/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/admin/posts",
              label: "All Posts",
              active: pathname === "/posts",
            },
            {
              href: "/admin/posts/new",
              label: "New Post",
              active: pathname === "/posts/new",
            },
          ],
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
  ];
}
