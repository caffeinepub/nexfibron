import { X } from "lucide-react";
import { useState } from "react";
import type { Product } from "../backend.d";
import { useActor } from "../hooks/useActor";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function OrderModal({ product, onClose }: Props) {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "1",
    specs: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setStatus("loading");
    try {
      await actor.placeOrder(
        product.id,
        form.name,
        form.email,
        form.phone,
        BigInt(Number.parseInt(form.quantity) || 1),
        form.specs,
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/10 rounded-lg w-full max-w-md relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        <div className="p-6">
          <h2 className="text-lg font-bold uppercase tracking-widest mb-1">
            Place Order
          </h2>
          <p className="text-gray-400 text-sm mb-6">{product.name}</p>

          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">✓</div>
              <p className="text-white font-semibold">
                Order Placed Successfully!
              </p>
              <p className="text-gray-400 text-sm mt-2">
                We'll contact you shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-white text-black text-sm font-semibold uppercase tracking-widest rounded hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                {
                  id: "name",
                  label: "Full Name",
                  type: "text",
                  key: "name" as const,
                },
                {
                  id: "email",
                  label: "Email",
                  type: "email",
                  key: "email" as const,
                },
                {
                  id: "phone",
                  label: "Phone",
                  type: "tel",
                  key: "phone" as const,
                },
                {
                  id: "quantity",
                  label: "Quantity",
                  type: "number",
                  key: "quantity" as const,
                },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block text-xs uppercase tracking-widest text-gray-400 mb-1"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    min={field.type === "number" ? 1 : undefined}
                    value={form[field.key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                    id={field.id}
                    className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-white/50"
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="o-specs"
                  className="block text-xs uppercase tracking-widest text-gray-400 mb-1"
                >
                  Specifications
                </label>
                <textarea
                  id="o-specs"
                  rows={3}
                  value={form.specs}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, specs: e.target.value }))
                  }
                  placeholder="Custom dimensions, finish, quantity details..."
                  className="w-full bg-black border border-white/20 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-white/50 resize-none"
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
                className="w-full py-3 bg-white text-black font-bold uppercase tracking-widest text-sm rounded hover:bg-gray-100 transition disabled:opacity-50"
              >
                {status === "loading" ? "Submitting..." : "Place Order"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
