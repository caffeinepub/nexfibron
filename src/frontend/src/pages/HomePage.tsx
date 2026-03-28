import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigate } from "../App";
import type { Product } from "../backend.d";
import OrderModal from "../components/OrderModal";

const heroSlides = [
  {
    src: "/assets/generated/hero-cf-texture.dim_1920x1080.jpg",
    label: "CARBON FIBER",
    tagline: "Precision-Woven Performance",
  },
  {
    src: "/assets/generated/hero-manufacturing.dim_1920x1080.jpg",
    label: "MANUFACTURING",
    tagline: "State-of-the-Art Production",
  },
  {
    src: "/assets/generated/hero-cf-sheets.dim_1920x1080.jpg",
    label: "COMPOSITE SHEETS",
    tagline: "Strength Beyond Steel",
  },
  {
    src: "/assets/generated/hero-engineering-lab.dim_1920x1080.jpg",
    label: "ENGINEERING",
    tagline: "Tested to Perfection",
  },
  {
    src: "/assets/generated/hero-autoclave.dim_1920x1080.jpg",
    label: "CUSTOM PARTS",
    tagline: "Built to Your Specifications",
  },
];

const industrySlides = [
  {
    name: "AVIATION",
    tagline: "Engineering for the Skies",
    img: "/assets/generated/sector-aviation.dim_1920x1080.jpg",
  },
  {
    name: "MARINE",
    tagline: "Built for the Depths",
    img: "/assets/generated/sector-marine.dim_1920x1080.jpg",
  },
  {
    name: "DRONES",
    tagline: "Precision in Flight",
    img: "/assets/generated/sector-drones.dim_1920x1080.jpg",
  },
  {
    name: "WIND MILLS",
    tagline: "Powering the Future",
    img: "/assets/generated/sector-windmill.dim_1920x1080.jpg",
  },
  {
    name: "AUTOMOBILES",
    tagline: "Performance Redefined",
    img: "/assets/generated/sector-automobile.dim_1920x1080.jpg",
  },
  {
    name: "EVs",
    tagline: "The Electric Revolution",
    img: "/assets/generated/sector-ev.dim_1920x1080.jpg",
  },
  {
    name: "ROBOTS",
    tagline: "Strength Through Precision",
    img: "/assets/generated/sector-robots.dim_1920x1080.jpg",
  },
  {
    name: "DEFENCE",
    tagline: "Engineered for Protection",
    img: "/assets/generated/sector-defence.dim_1920x1080.jpg",
  },
];

const staticProducts: Product[] = [
  {
    id: 1n,
    name: "Carbon Fiber Fabrics",
    description:
      "High-performance woven carbon fiber fabrics available in plain weave, 2x2 twill, satin, and unidirectional in 3K, 6K, and 12K tow options. Ideal for aerospace, automotive, and structural applications.",
    category: "fabric",
  },
  {
    id: 2n,
    name: "Carbon Fiber Sheets",
    description:
      "Pre-fabricated carbon fiber composite panels in standard and custom sizes. Exceptional strength-to-weight ratio for structural and protective applications.",
    category: "sheet",
  },
  {
    id: 3n,
    name: "Custom CF Parts",
    description:
      "Bespoke carbon fiber components engineered to your exact specifications. From prototypes to production runs — precision-crafted parts every time.",
    category: "custom",
  },
];

const productImages: Record<string, string> = {
  fabric: "/assets/generated/product-fabric.dim_800x600.jpg",
  sheet: "/assets/generated/product-sheet.dim_800x600.jpg",
  custom: "/assets/generated/product-custom.dim_800x600.jpg",
};

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Companies Served" },
  { value: "100%", label: "Quality Guaranteed" },
];

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [industryIdx, setIndustryIdx] = useState(0);
  const [industryFading, setIndustryFading] = useState(false);
  const heroTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const industryTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToHero = useCallback(
    (idx: number) => {
      if (fading) return;
      setFading(true);
      setTimeout(() => {
        setHeroIdx((idx + heroSlides.length) % heroSlides.length);
        setFading(false);
      }, 400);
    },
    [fading],
  );

  const goToIndustry = useCallback(
    (idx: number) => {
      if (industryFading) return;
      setIndustryFading(true);
      setTimeout(() => {
        setIndustryIdx((idx + industrySlides.length) % industrySlides.length);
        setIndustryFading(false);
      }, 500);
    },
    [industryFading],
  );

  const resetHeroTimer = useCallback(() => {
    if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    heroTimerRef.current = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
  }, []);

  const resetIndustryTimer = useCallback(
    (currentIdx: number) => {
      if (industryTimerRef.current) clearInterval(industryTimerRef.current);
      industryTimerRef.current = setInterval(() => {
        goToIndustry(currentIdx + 1);
      }, 4000);
    },
    [goToIndustry],
  );

  useEffect(() => {
    heroTimerRef.current = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => {
      if (heroTimerRef.current) clearInterval(heroTimerRef.current);
    };
  }, []);

  useEffect(() => {
    industryTimerRef.current = setInterval(() => {
      setIndustryIdx((prev) => (prev + 1) % industrySlides.length);
    }, 4000);
    return () => {
      if (industryTimerRef.current) clearInterval(industryTimerRef.current);
    };
  }, []);

  const currentIndustry = industrySlides[industryIdx];

  return (
    <div className="bg-black">
      {/* HERO SLIDESHOW */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{
            backgroundImage: `url(${heroSlides[heroIdx].src})`,
            opacity: fading ? 0 : 1,
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-7xl">
          {/* Company name — large, bold brand display */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-white uppercase mb-3 leading-none"
            style={{ textShadow: "0 2px 40px rgba(0,0,0,0.8)" }}
          >
            NexFibron
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">
            {heroSlides[heroIdx].tagline}
          </p>
          <p
            className="text-3xl md:text-5xl font-black uppercase leading-none mb-2 text-gray-200"
            style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}
          >
            PREMIUM CARBON FIBER
          </p>
          <h2 className="text-xl md:text-2xl font-light uppercase tracking-widest text-gray-400 mb-8">
            FOR THE FUTURE
          </h2>
          <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
            High-performance fabrics, sheets and custom parts engineered for
            excellence across every industry.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              data-ocid="hero.primary_button"
              onClick={() => navigate("/products")}
              className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition"
            >
              Explore Products
            </button>
            <button
              type="button"
              data-ocid="hero.secondary_button"
              onClick={() => navigate("/contact")}
              className="px-8 py-3 border border-white/40 text-white font-semibold uppercase tracking-widest text-sm hover:border-white hover:bg-white/5 transition"
            >
              Contact Us
            </button>
          </div>
        </div>

        <button
          type="button"
          data-ocid="hero.pagination_prev"
          onClick={() => {
            const n = (heroIdx - 1 + heroSlides.length) % heroSlides.length;
            goToHero(n);
            resetHeroTimer();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition p-2"
        >
          <ChevronLeft size={36} />
        </button>
        <button
          type="button"
          data-ocid="hero.pagination_next"
          onClick={() => {
            const n = (heroIdx + 1) % heroSlides.length;
            goToHero(n);
            resetHeroTimer();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition p-2"
        >
          <ChevronRight size={36} />
        </button>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((hs, i) => (
            <button
              type="button"
              key={hs.label}
              onClick={() => {
                goToHero(i);
                resetHeroTimer();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === heroIdx
                  ? "bg-white w-8"
                  : "bg-white/30 w-2 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-10 right-8 z-20">
          <span className="text-xs tracking-[0.3em] uppercase text-gray-400">
            {heroSlides[heroIdx].label}
          </span>
        </div>
      </section>

      {/* STATS */}
      <section className="relative bg-[#080808] border-y border-white/5 py-14">
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black to-transparent" />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black text-white mb-1">
                {s.value}
              </div>
              <div className="text-xs tracking-widest uppercase text-gray-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* WHO WE SERVE — FULL-SCREEN INDUSTRY SLIDESHOW */}
      <section className="relative min-h-screen overflow-hidden flex flex-col">
        {industrySlides.map((slide, i) => (
          <div
            key={slide.name}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
            style={{
              backgroundImage: `url(${slide.img})`,
              opacity: i === industryIdx ? (industryFading ? 0 : 1) : 0,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        <div className="relative z-10 text-center pt-20 pb-6">
          <p className="text-xs tracking-[0.4em] uppercase text-gray-400 mb-2">
            Industries
          </p>
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/60">
            WHO WE SERVE
          </h2>
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div
            className="transition-opacity duration-500"
            style={{ opacity: industryFading ? 0 : 1 }}
          >
            <h3
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none mb-6"
              style={{ textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
            >
              {currentIndustry.name}
            </h3>
            <p className="text-lg md:text-2xl font-light tracking-[0.2em] uppercase text-gray-300">
              {currentIndustry.tagline}
            </p>
          </div>
        </div>

        <button
          type="button"
          data-ocid="industries.pagination_prev"
          onClick={() => {
            const n =
              (industryIdx - 1 + industrySlides.length) % industrySlides.length;
            goToIndustry(n);
            resetIndustryTimer(n);
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition p-3 border border-white/20 hover:border-white/60 rounded-full"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          type="button"
          data-ocid="industries.pagination_next"
          onClick={() => {
            const n = (industryIdx + 1) % industrySlides.length;
            goToIndustry(n);
            resetIndustryTimer(n);
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition p-3 border border-white/20 hover:border-white/60 rounded-full"
        >
          <ChevronRight size={28} />
        </button>

        <div className="relative z-10 flex justify-center gap-2 pb-16 pt-8">
          {industrySlides.map((slide, i) => (
            <button
              type="button"
              key={slide.name}
              data-ocid="industries.toggle"
              onClick={() => {
                goToIndustry(i);
                resetIndustryTimer(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === industryIdx
                  ? "bg-white w-10"
                  : "bg-white/30 w-2.5 hover:bg-white/60"
              }`}
              title={slide.name}
            />
          ))}
        </div>

        <div className="absolute bottom-6 right-8 z-20 text-xs tracking-widest uppercase text-gray-400">
          {String(industryIdx + 1).padStart(2, "0")} /{" "}
          {String(industrySlides.length).padStart(2, "0")}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="relative py-24 bg-[#060606]">
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
              What We Offer
            </p>
            <h2 className="text-4xl font-black uppercase tracking-tight">
              OUR PRODUCTS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staticProducts.map((p) => (
              <div
                key={String(p.id)}
                className="group bg-[#0f0f0f] border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={productImages[p.category] || productImages.custom}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-3">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {p.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOrderProduct(p)}
                    className="w-full py-2.5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition rounded"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="text-xs tracking-widest uppercase text-gray-400 hover:text-white border-b border-gray-600 hover:border-white pb-1 transition"
            >
              View All Products
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-black text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Get in Touch
          </p>
          <h2 className="text-4xl font-black uppercase mb-6">
            READY TO START
            <br />
            YOUR PROJECT?
          </h2>
          <p className="text-gray-400 mb-10">
            Tell us your specifications and we'll engineer the perfect carbon
            fiber solution for you.
          </p>
          <button
            type="button"
            data-ocid="cta.primary_button"
            onClick={() => navigate("/contact")}
            className="inline-block px-10 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition"
          >
            Get a Quote
          </button>
        </div>
      </section>

      {orderProduct && (
        <OrderModal
          product={orderProduct}
          onClose={() => setOrderProduct(null)}
        />
      )}
    </div>
  );
}
