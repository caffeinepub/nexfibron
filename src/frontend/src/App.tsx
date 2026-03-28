import { useCallback, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import BlogsPage from "./pages/BlogsPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

export type Page =
  | "/"
  | "/about"
  | "/products"
  | "/blogs"
  | "/contact"
  | "/admin";

export function navigate(path: Page) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function getCurrentPath(): Page {
  const p = window.location.pathname as Page;
  const valid: Page[] = [
    "/",
    "/about",
    "/products",
    "/blogs",
    "/contact",
    "/admin",
  ];
  return valid.includes(p) ? p : "/";
}

export default function App() {
  const [page, setPage] = useState<Page>(getCurrentPath);

  const handlePop = useCallback(() => setPage(getCurrentPath()), []);

  useEffect(() => {
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [handlePop]);

  const renderPage = () => {
    switch (page) {
      case "/about":
        return <AboutPage />;
      case "/products":
        return <ProductsPage />;
      case "/blogs":
        return <BlogsPage />;
      case "/contact":
        return <ContactPage />;
      case "/admin":
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar
        currentPage={page}
        onNavigate={(p) => {
          navigate(p);
          setPage(p);
        }}
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer
        onNavigate={(p) => {
          navigate(p);
          setPage(p);
        }}
      />
    </div>
  );
}
