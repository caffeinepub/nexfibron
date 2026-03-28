import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Page } from "../App";

const links: { to: Page; label: string }[] = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT" },
  { to: "/products", label: "PRODUCTS" },
  { to: "/blogs", label: "BLOGS" },
  { to: "/contact", label: "CONTACT" },
];

interface Props {
  currentPage: Page;
  onNavigate: (p: Page) => void;
}

export default function Navbar({ currentPage, onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (to: Page) => {
    onNavigate(to);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => handleNav("/")}
          className="flex items-center gap-3"
        >
          <div className="border border-white/40 rounded p-1">
            <img
              src="/assets/uploads/image-019d3363-3d84-72ac-800d-b44dd106ab6a-1.png"
              alt="NexFibron Logo"
              className="h-8 w-auto"
            />
          </div>
          <span className="text-white font-bold text-lg tracking-wider">
            NexFibron
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => {
            const active = currentPage === to;
            return (
              <button
                type="button"
                key={to}
                data-ocid="nav.link"
                onClick={() => handleNav(to)}
                className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                  active
                    ? "text-white border-b-2 border-white pb-0.5"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <button
              type="button"
              key={to}
              data-ocid="nav.link"
              onClick={() => handleNav(to)}
              className="text-sm font-semibold tracking-widest uppercase text-gray-300 hover:text-white text-left"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
