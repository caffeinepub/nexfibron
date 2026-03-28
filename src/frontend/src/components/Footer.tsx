import type { Page } from "../App";

interface Props {
  onNavigate: (p: Page) => void;
}

export default function Footer({ onNavigate }: Props) {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <span className="text-2xl font-black tracking-[0.15em] text-white uppercase">
              NexFibron
            </span>
            <p className="mt-4 text-gray-500 text-sm leading-relaxed">
              Precision-engineered carbon fiber solutions for the industries of
              tomorrow.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {(
                [
                  ["/", "Home"],
                  ["/about", "About"],
                  ["/products", "Products"],
                  ["/blogs", "Blogs"],
                  ["/contact", "Contact"],
                ] as [Page, string][]
              ).map(([to, label]) => (
                <li key={to}>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(to);
                      window.scrollTo({ top: 0 });
                    }}
                    className="text-gray-500 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              {[
                "Plain Weave Fabrics",
                "Twill Weave Fabrics",
                "Satin Weave Fabrics",
                "Custom Weave Parts",
              ].map((p) => (
                <li key={p}>
                  <span className="text-gray-500 text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li>nexfibron@gmail.com</li>
              <li>+91 8374903400</li>
              <li>Mon–Sat: 9:00am–9:00pm IST</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs tracking-wide">
            © {new Date().getFullYear()} NexFibron. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-400 text-xs transition-colors"
          >
            Built with ❤ using caffeine.ai
          </a>
          <button
            type="button"
            onClick={() => {
              onNavigate("/admin");
              window.scrollTo({ top: 0 });
            }}
            className="text-gray-700 hover:text-gray-400 text-xs transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
}
