import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/work", label: "Our Work" },
  { to: "/projects", label: "Projects" },
  { to: "/reports", label: "Reports" },
  { to: "/support", label: "Support" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[60]">
      <div className="container-x pt-4">
        <div className="frost flex items-center justify-between gap-4 rounded-full px-4 py-2.5 shadow-[0_10px_40px_-18px_rgba(14,18,15,0.3)] sm:px-6">
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            <img
              src="/images/logo.jpeg"
              alt=""
              className="h-9 w-9 rounded-full object-cover ring-1 ring-ink/10 transition-transform duration-300 group-hover:scale-105"
            />
            Trans <span className="text-pine">+</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? "bg-ink/[0.06] text-ink" : "text-ink/60 hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="hidden rounded-full bg-ink px-5 py-2.5 font-display text-sm font-medium text-white transition-colors hover:bg-pine sm:inline-flex"
            >
              Contact / Get Involved
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06] lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="container-x mt-2 lg:hidden"
          >
            <div className="flex flex-col gap-1 rounded-3xl border border-ink/[0.06] bg-paper p-3 shadow-xl">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive ? "bg-ink/[0.06] text-ink" : "text-ink/60 hover:text-ink"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-2xl bg-ink px-4 py-3 text-center font-display text-sm font-medium text-white"
              >
                Contact / Get Involved
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
