import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function ContactPage() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setStatus("loading");
    try {
      await actor.submitContactForm(
        form.name,
        form.email,
        form.phone,
        form.message,
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-black text-white">
      <section className="relative pt-40 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-black" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">
            Get in Touch
          </p>
          <h1 className="text-5xl font-black uppercase mb-6">Contact Us</h1>
          <p className="text-gray-400 leading-relaxed">
            Ready to discuss your carbon fiber requirements? Our team is here to
            help.
          </p>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-16">
          <div className="md:col-span-2 space-y-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Email
              </h3>
              <p className="text-gray-300">nexfibron@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Phone
              </h3>
              <p className="text-gray-300">+91 8374903400</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                Hours
              </h3>
              <p className="text-gray-300">Mon–Sat: 9:00 – 21:00 IST</p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-gray-500 text-sm leading-relaxed">
                For bulk orders, custom projects, or technical inquiries, our
                engineering team responds within 24 business hours.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            {status === "success" ? (
              <div className="bg-[#0d0d0d] border border-white/20 rounded-lg p-12 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold uppercase tracking-widest mb-3">
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  Thank you for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition rounded"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="c-name"
                      className="block text-xs uppercase tracking-widest text-gray-400 mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      className="w-full bg-[#0d0d0d] border border-white/20 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="c-phone"
                      className="block text-xs uppercase tracking-widest text-gray-400 mb-2"
                    >
                      Phone
                    </label>
                    <input
                      id="c-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="w-full bg-[#0d0d0d] border border-white/20 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="c-email"
                    className="block text-xs uppercase tracking-widest text-gray-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full bg-[#0d0d0d] border border-white/20 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-msg"
                    className="block text-xs uppercase tracking-widest text-gray-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="c-msg"
                    rows={6}
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Describe your project, specifications, or inquiry..."
                    className="w-full bg-[#0d0d0d] border border-white/20 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-white/50 resize-none"
                  />
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition disabled:opacity-50 rounded"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
