import { Link } from "react-router";

const FOOTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/work", label: "Our Work" },
  { to: "/projects", label: "Projects" },
  { to: "/reports", label: "Reports" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="dark-section relative z-10 mt-20 rounded-t-[2.5rem]">
      <div className="container-x flex flex-col gap-12 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <img
                src="/images/logo.jpeg"
                alt=""
                className="h-14 w-14 rounded-full object-cover ring-1 ring-white/15"
              />
              <p className="font-display text-5xl font-bold tracking-tight">
                Trans<span className="text-moss">+</span>
              </p>
            </div>
            <p className="mt-6 text-base leading-relaxed text-white/80">
              Trans+ is led by members of the community we serve.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Founded by and for queer and transgender sex workers along the Kenya-Uganda border.
            </p>
          </div>

          {[FOOTER_LINKS.slice(0, 4), FOOTER_LINKS.slice(4)].map((group, i) => (
            <nav key={i} aria-label={`Footer links ${i + 1}`} className="flex flex-col gap-4 text-sm">
              {group.map((link) => (
                <Link key={link.to} to={link.to} className="link-underline w-fit text-white/70 hover:text-white">
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Trans+. All rights reserved.</p>
          <p>Built with privacy in mind — no tracking, no data collection.</p>
        </div>
      </div>
    </footer>
  );
}
