import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Product } from "../backend.d";
import OrderModal from "../components/OrderModal";
import { useActor } from "../hooks/useActor";

const productImages: Record<string, string> = {
  fabric: "/assets/generated/product-fabric.dim_800x600.jpg",
  sheet: "/assets/generated/product-sheet.dim_800x600.jpg",
  custom: "/assets/generated/product-custom.dim_800x600.jpg",
};

const fallbackProducts: Product[] = [
  {
    id: 1n,
    name: "Carbon Fiber Fabrics",
    description:
      "High-performance woven carbon fiber fabrics available in plain weave, 2x2 twill, satin, and unidirectional in 3K, 6K, and 12K tow options. Ideal for aerospace, automotive, and structural applications. Available in standard and custom widths.",
    category: "fabric",
  },
  {
    id: 2n,
    name: "Carbon Fiber Sheets",
    description:
      "Pre-fabricated carbon fiber composite panels in standard and custom sizes. Multiple thickness options from 0.5mm to 25mm. Exceptional strength-to-weight ratio for structural and protective applications.",
    category: "sheet",
  },
  {
    id: 3n,
    name: "Custom Carbon Fiber Parts",
    description:
      "Bespoke carbon fiber components engineered to your exact specifications. From prototypes to production runs — we design, tool, and manufacture precision-crafted parts for any application.",
    category: "custom",
  },
  {
    id: 4n,
    name: "Plain Weave Carbon Fiber Fabric",
    description:
      "High-stability 1x1 plain weave fabric available in 3K, 6K, and 12K tow. Delivers a uniform, tight texture ideal for cosmetic panels, tooling faces, and flat structural laminates. Available in widths from 300mm to 1500mm.",
    category: "fabric",
  },
  {
    id: 5n,
    name: "Twill Weave Carbon Fiber Fabric",
    description:
      "Classic 2x2 twill weave with the iconic diagonal pattern. Superior drapeability over compound curves makes it the go-to choice for automotive body panels, helmet shells, and sporting equipment. Available in 3K, 6K, and 12K.",
    category: "fabric",
  },
  {
    id: 6n,
    name: "Custom Weave & Pattern CF Parts",
    description:
      "Fully custom carbon fiber parts with your choice of weave pattern (plain, twill, satin, UD) and tow size (3K, 6K, 12K). From single prototypes to batch production — engineered and manufactured to exact specifications.",
    category: "custom",
  },
];

export default function ProductsPage() {
  const { actor } = useActor();
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState("all");

  const { data: backendProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => actor!.getAllProducts(),
    enabled: !!actor,
  });
  const products = backendProducts?.length ? backendProducts : fallbackProducts;

  const displayed =
    filter === "all" ? products : products.filter((p) => p.category === filter);
  const categories = [
    { id: "all", label: "All" },
    { id: "fabric", label: "Fabrics" },
    { id: "sheet", label: "Sheets" },
    { id: "custom", label: "Custom Parts" },
  ];

  return (
    <div className="bg-black text-white">
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Our Catalog
          </p>
          <h1 className="text-5xl font-black uppercase mb-6">Products</h1>
          <p className="text-gray-400 leading-relaxed">
            Premium carbon fiber solutions engineered for peak performance
            across all industries.
          </p>
        </div>
      </section>

      <div className="sticky top-20 z-30 bg-black/90 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex gap-6 py-4 overflow-x-auto">
          {categories.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`text-xs font-semibold tracking-widest uppercase whitespace-nowrap transition ${
                filter === c.id
                  ? "text-white border-b-2 border-white pb-0.5"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayed.map((p) => (
            <div
              key={String(p.id)}
              className="group bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={
                    p.image?.getDirectURL() ||
                    productImages[p.category] ||
                    productImages.custom
                  }
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-black/70 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded border border-white/20">
                    {p.category}
                  </span>
                </div>
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
                  className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition rounded"
                >
                  Place Order
                </button>
              </div>
            </div>
          ))}
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
