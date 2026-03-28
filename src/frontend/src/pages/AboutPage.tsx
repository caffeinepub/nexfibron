const values = [
  {
    icon: "⬡",
    title: "Quality First",
    desc: "Every fiber, every layer, every part undergoes rigorous quality control. We accept nothing less than perfection.",
  },
  {
    icon: "◈",
    title: "Innovation",
    desc: "Continuously pushing the boundaries of carbon fiber technology to deliver cutting-edge solutions.",
  },
  {
    icon: "◇",
    title: "Precision",
    desc: "Micron-level precision in every product we manufacture. Tight tolerances, exact specifications.",
  },
  {
    icon: "◉",
    title: "Reliability",
    desc: "Trusted by engineers and manufacturers worldwide for consistent, dependable delivery.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url(/assets/generated/hero-aviation.dim_1920x1080.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase leading-tight mb-6">
            About NexFibron
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Founded on a mission to bring aerospace-grade carbon fiber to every
            industry, NexFibron delivers materials that perform at the highest
            level.
          </p>
        </div>
      </section>

      <section className="relative py-24 bg-[#080808]">
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase mb-6">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              NexFibron was established with a clear vision: to make premium
              carbon fiber materials accessible, consistent, and customizable
              for industries that demand the best.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              We work with engineers, designers, and manufacturers to produce
              carbon fiber fabrics, sheets, and custom-formed parts that exceed
              expectations in strength, weight, and finish.
            </p>
            <p className="text-gray-400 leading-relaxed">
              From single-prototype runs to large-scale production, NexFibron's
              commitment to quality and precision remains constant.
            </p>
          </div>
          <div>
            <div className="h-64 rounded overflow-hidden">
              <img
                src="/assets/generated/product-fabric.dim_800x600.jpg"
                alt="Carbon fiber"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
              What Drives Us
            </p>
            <h2 className="text-4xl font-black uppercase">OUR VALUES</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-[#0d0d0d] border border-white/10 rounded-lg p-8 hover:border-white/30 transition"
              >
                <div className="text-3xl mb-4 text-gray-400">{v.icon}</div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-[#080808]">
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">
            Why NexFibron
          </p>
          <h2 className="text-4xl font-black uppercase mb-10">
            THE NEXFIBRON DIFFERENCE
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              [
                "Certified Materials",
                "All our carbon fiber products meet or exceed international quality standards.",
              ],
              [
                "Custom Engineering",
                "From simple sheets to complex multi-layer assemblies, we handle it all.",
              ],
              [
                "Fast Turnaround",
                "Streamlined production means shorter lead times without sacrificing quality.",
              ],
            ].map(([title, desc]) => (
              <div key={title} className="border-l-2 border-white/20 pl-6">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">
                  {title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>
    </div>
  );
}
