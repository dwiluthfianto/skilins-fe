import { Separator } from "@/components/ui/separator";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Dribbble, Instagram } from "lucide-react";

const sections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Communities",
    links: [
      { name: "For Students", href: "#" },
      { name: "Developers", href: "#" },
      { name: "Advertising", href: "#" },
      { name: "Investors", href: "#" },
      { name: "Vendors", href: "#" },
    ],
  },

  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <section className="py-16">
      <div className="container">
        <footer>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className=" hover:text-primary">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="mb-4 font-bold">Legal</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className=" hover:text-primary">
                  <a href="#">Term of Services</a>
                </li>
                <li className=" hover:text-primary">
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
              <h3 className="mb-4 mt-8 font-bold">Social</h3>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <GitHubLogoIcon className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <Instagram className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <LinkedInLogoIcon className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="#">
                    <Dribbble className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-sm text-muted-foreground">
            Build by Dwi Luthfianto © Copyright 2024. All Rights Reserved.
          </p>
        </footer>
      </div>
    </section>
  );
}
