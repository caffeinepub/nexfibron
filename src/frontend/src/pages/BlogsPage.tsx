import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { BlogPost } from "../backend.d";
import { useActor } from "../hooks/useActor";

const sampleBlogs: BlogPost[] = [
  {
    id: 1n,
    title: "The Future of Carbon Fiber in Aviation",
    content:
      "Carbon fiber composites have revolutionized aviation by enabling aircraft structures that are both lighter and stronger than traditional aluminum. The latest generation of commercial aircraft use up to 50% carbon fiber reinforced polymers (CFRP) by weight.\n\nThe advantages are clear: reduced fuel consumption, greater payload capacity, and improved corrosion resistance. As manufacturing processes advance, the cost of carbon fiber continues to decline, making it accessible for a wider range of aerospace applications.\n\nNexFibron's aerospace-grade fabrics meet the stringent requirements of Tier 1 aviation manufacturers, offering consistent fiber alignment and resin uptake properties essential for structural components.",
    author: "NexFibron Engineering Team",
    date: BigInt(Date.now() * 1_000_000),
    published: true,
  },
  {
    id: 2n,
    title: "Carbon Fiber in Electric Vehicles: Weight Reduction Strategies",
    content:
      "As the EV industry races to maximize range, carbon fiber has emerged as a critical material for structural weight reduction. Every kilogram saved translates directly to additional range or reduced battery cost.\n\nFrom monocoque chassis to battery enclosures and body panels, EV manufacturers are integrating CFRP across every subsystem. NexFibron's ultra-thin carbon fiber sheets provide exceptional stiffness at minimal weight, enabling next-generation EV designs.",
    author: "NexFibron R&D",
    date: BigInt((Date.now() - 7 * 24 * 3600 * 1000) * 1_000_000),
    published: true,
  },
  {
    id: 3n,
    title: "Custom Carbon Fiber Parts: From Concept to Production",
    content:
      "The journey from a design concept to a finished carbon fiber part involves multiple engineering and manufacturing stages. Understanding this process helps clients specify their requirements more precisely.\n\nStarting with 3D modeling and finite element analysis, NexFibron engineers validate the structural performance before any material is cut. Tooling is then CNC machined to tight tolerances, and layup schedules are optimized for the target application.",
    author: "NexFibron Manufacturing",
    date: BigInt((Date.now() - 14 * 24 * 3600 * 1000) * 1_000_000),
    published: true,
  },
  {
    id: 4n,
    title: "Carbon Fiber Weaving Patterns & Strand Elements: A Complete Guide",
    content:
      'Carbon fiber fabric is not a single material — it is a family of engineered textiles defined by the way individual tows (bundles of filaments) are interlaced and by the number of filaments each tow contains. Choosing the right weave pattern and strand count is as important as selecting the resin system or curing method. This guide walks through the most common options and helps you match them to your application.\n\n## Weave Patterns\n\n**Plain Weave (1×1)** is the simplest and tightest interlacing pattern, where each warp tow passes alternately over and under each weft tow. The result is a highly stable, dimensionally consistent fabric with a uniform checkerboard appearance. Because every tow changes direction at every intersection, crimp is maximised and in-plane stiffness is slightly reduced compared with other patterns — but the tight construction minimises resin bleed-through and produces an exceptionally flat, cosmetically appealing surface. Plain weave is the first choice for visual exterior panels, tooling faces, and flat structural laminates where appearance and dimensional stability matter most.\n\n**Twill Weave (2×2, 4×4)** is the pattern most people picture when they think of carbon fiber — the flowing diagonal lines that characterise high-performance automotive and sporting goods. In a 2×2 twill each tow passes over two and under two adjacent tows, offset by one column per row to create the diagonal. This reduces the number of interlacing points relative to plain weave, allowing the fabric to drape smoothly over compound curves and into complex moulds without bridging or wrinkling. The lower crimp also translates into marginally higher in-plane mechanical properties. Twill weave is the dominant choice for automotive body panels, motorcycle fairings, bicycle frames, and helmet shells — anywhere that curved geometry and striking aesthetics are equally important.\n\n**Satin Weave (4-harness, 8-harness)** carries drapeability even further. In an 8-harness satin each tow floats over seven tows before interlacing with one, creating long, nearly straight fibre runs and a very smooth, lustrous surface on one face. The minimal crimp delivers the highest in-plane strength and stiffness of the woven architectures, and the extreme drapeability allows the fabric to conform to deeply contoured aerospace structures — curved fuselage skins, complex nacelle components, and fan blades — with minimal wrinkle risk. Satin weaves require careful handling because the long floats can snag, but in controlled lay-up environments they are indispensable for premium aerospace applications.\n\n**Unidirectional (UD)** fabric places all fibres parallel in a single direction, held together by a light weft scrim or binder rather than a true weave interlace. Because there is virtually no crimp, UD delivers the maximum possible stiffness and tensile strength along the fibre axis — the full mechanical potential of the carbon filament is realised. UD laminates are designed by stacking plies at different orientations (0°, 90°, ±45°) to tailor stiffness and strength in every required direction. Structural spars, primary load-bearing beams, pressure vessels, and wind-turbine blade skins are typical applications.\n\n## Strand (Tow) Elements\n\nThe "K" number refers to the quantity of individual carbon filaments bundled into a single tow. Filament diameter is typically 5–7 µm, so tow size profoundly affects fabric weight, texture, and cost.\n\n**3K** (3,000 filaments per tow) produces the finest, lightest fabric. The narrow tow creates a tight, intricate surface texture that is highly prized for cosmetic parts — visible carbon components on premium vehicles, consumer electronics housings, watch straps, and sporting equipment. The smaller tow size also improves conformability in plain and twill weaves. 3K fabrics typically weigh 100–200 g/m².\n\n**6K** (6,000 filaments per tow) strikes a balance between cosmetic quality and structural efficiency. The slightly coarser weave is still visually attractive while offering greater areal weight per layer — typically 200–400 g/m² — which reduces ply count and labour in structural lay-ups. 6K is the versatile workhorse used across automotive, marine, and industrial applications where both performance and appearance are required.\n\n**12K** (12,000 filaments per tow) is the standard choice for structural and industrial applications where maximum material deposition rate and minimum cost per kilogram matter more than surface fineness. At 400–800 g/m², 12K fabrics build structural thickness quickly. They are widely used in wind-turbine blades, marine hulls, bridge-deck panels, and other large structures. The coarser texture is typically hidden under paint or gelcoat.\n\n**24K and higher** tow counts are used in heavy industrial filament winding and automated fibre placement processes for pressure vessels and large aerospace structures, where throughput is the primary driver.\n\n## Choosing the Right Combination\n\nStart with your geometry: deep complex curves call for twill or satin; flat panels work well in plain weave or UD. Consider the surface finish requirement: if the fabric will be left exposed, 3K or 6K twill gives the best visual result. For primary structure hidden under a surface layer, 12K plain or UD optimises cost and performance. Finally, align your tow count with production volume — 3K for low-volume premium parts, 12K for high-volume structural fabrication.\n\nNexFibron supplies all of these weave architectures — plain, twill, satin, and unidirectional — in 3K, 6K, and 12K tow options, with widths from 300 mm to 1,500 mm. Whether you need a handful of cosmetic panels or tonnes of structural fabric, our engineering team will help you specify the exact combination for your application.',
    author: "NexFibron Engineering Team",
    date: BigInt((Date.now() - 3 * 24 * 3600 * 1000) * 1_000_000),
    published: true,
  },
];

function formatDate(ns: bigint) {
  const ms = Number(ns) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogsPage() {
  const { actor } = useActor();
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const { data: blogs = sampleBlogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => actor!.getPublishedBlogPosts(),
    enabled: !!actor,
  });

  if (selected) {
    return (
      <div className="bg-black text-white min-h-screen">
        <section className="pt-32 pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-xs tracking-widest uppercase text-gray-500 hover:text-white mb-8 flex items-center gap-2"
            >
              ← Back to Blogs
            </button>
            {selected.image && (
              <img
                src={selected.image.getDirectURL()}
                alt={selected.title}
                className="w-full h-72 object-cover rounded-lg mb-8"
              />
            )}
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-3">
              {formatDate(selected.date)} · {selected.author}
            </p>
            <h1 className="text-4xl font-black uppercase leading-tight mb-8">
              {selected.title}
            </h1>
            <div className="text-gray-400 leading-relaxed space-y-4">
              {selected.content.split("\n\n").map((para) => (
                <p key={para.slice(0, 30)}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Insights & Updates
          </p>
          <h1 className="text-5xl font-black uppercase mb-6">Blog</h1>
          <p className="text-gray-400">
            Industry insights, product updates, and technical guides from the
            NexFibron team.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <button
              type="button"
              key={String(blog.id)}
              onClick={() => setSelected(blog)}
              className="group bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden cursor-pointer hover:border-white/30 transition-all duration-300"
            >
              <div className="h-48 overflow-hidden bg-[#111] flex items-center justify-center">
                {blog.image ? (
                  <img
                    src={blog.image.getDirectURL()}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/assets/generated/product-fabric.dim_800x600.jpg"
                    alt="blog"
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition"
                  />
                )}
              </div>
              <div className="p-6">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
                  {formatDate(blog.date)} · {blog.author}
                </p>
                <h3 className="font-bold uppercase tracking-wide text-sm mb-3 group-hover:text-gray-300 transition">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {blog.content.slice(0, 150)}...
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
