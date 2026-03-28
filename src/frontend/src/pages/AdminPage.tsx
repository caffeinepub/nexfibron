import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

type Tab = "orders" | "products" | "blogs" | "contacts";

export default function AdminPage() {
  const { actor } = useActor();
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("orders");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useQuery({
    queryKey: ["isAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      const result = await actor!.isCallerAdmin();
      setIsAdmin(result);
      return result;
    },
    enabled: !!actor,
  });

  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: () => actor!.getAllOrders(),
    enabled: !!actor && !!isAdmin,
  });
  const products = useQuery({
    queryKey: ["adminProducts"],
    queryFn: () => actor!.getAllProducts(),
    enabled: !!actor && !!isAdmin,
  });
  const blogs = useQuery({
    queryKey: ["adminBlogs"],
    queryFn: () => actor!.getAllBlogPosts(),
    enabled: !!actor && !!isAdmin,
  });
  const contacts = useQuery({
    queryKey: ["contacts"],
    queryFn: () => actor!.getAllContactForms(),
    enabled: !!actor && !!isAdmin,
  });

  const updateOrder = useMutation({
    mutationFn: ({ id, status }: { id: bigint; status: string }) =>
      actor!.updateOrderStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["orders"] }),
  });

  const toggleBlog = useMutation({
    mutationFn: (b: {
      id: bigint;
      title: string;
      content: string;
      author: string;
      published: boolean;
    }) =>
      actor!.updateBlogPost(b.id, b.title, b.content, b.author, b.published),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBlogs"] }),
  });

  const deleteProduct = useMutation({
    mutationFn: (id: bigint) => actor!.deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminProducts"] }),
  });

  const deleteBlog = useMutation({
    mutationFn: (id: bigint) => actor!.deleteBlogPost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["adminBlogs"] }),
  });

  if (!identity) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-4">
            Admin Access
          </h2>
          <p className="text-gray-500 mb-8">
            Login with Internet Identity to continue.
          </p>
          <button
            type="button"
            onClick={login}
            disabled={isLoggingIn}
            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition disabled:opacity-50"
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-4 text-red-400">
            Access Denied
          </h2>
          <p className="text-gray-500">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "orders", label: "Orders" },
    { id: "products", label: "Products" },
    { id: "blogs", label: "Blog Posts" },
    { id: "contacts", label: "Contact Forms" },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-3xl font-black uppercase tracking-widest mb-10">
          Admin Panel
        </h1>

        <div className="flex gap-6 border-b border-white/10 mb-10">
          {tabs.map((t) => (
            <button
              type="button"
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-3 text-xs font-bold uppercase tracking-widest transition ${
                tab === t.id
                  ? "text-white border-b-2 border-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              All Orders
            </h2>
            {orders.isLoading && <p className="text-gray-500">Loading...</p>}
            {(orders.data || []).map((order) => (
              <div
                key={String(order.id)}
                className="bg-[#0d0d0d] border border-white/10 rounded-lg p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-gray-500 text-sm">
                      {order.email} · {order.phone}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Product ID: {String(order.productId)} · Qty:{" "}
                      {String(order.quantity)}
                    </p>
                    {order.specifications && (
                      <p className="text-gray-600 text-xs mt-2">
                        {order.specifications}
                      </p>
                    )}
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrder.mutate({
                        id: order.id,
                        status: e.target.value,
                      })
                    }
                    className="bg-black border border-white/20 rounded px-3 py-2 text-sm text-white focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            ))}
            {(orders.data || []).length === 0 && !orders.isLoading && (
              <p className="text-gray-600">No orders yet.</p>
            )}
          </div>
        )}

        {tab === "products" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              Products
            </h2>
            {products.isLoading && <p className="text-gray-500">Loading...</p>}
            {(products.data || []).map((p) => (
              <div
                key={String(p.id)}
                className="bg-[#0d0d0d] border border-white/10 rounded-lg p-6 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-gray-500 text-sm">{p.category}</p>
                  <p className="text-gray-600 text-xs mt-1">
                    {p.description.slice(0, 100)}...
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteProduct.mutate(p.id)}
                  className="text-red-500 hover:text-red-400 text-xs uppercase tracking-widest"
                >
                  Delete
                </button>
              </div>
            ))}
            {(products.data || []).length === 0 && !products.isLoading && (
              <p className="text-gray-600">No products yet.</p>
            )}
          </div>
        )}

        {tab === "blogs" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              Blog Posts
            </h2>
            {blogs.isLoading && <p className="text-gray-500">Loading...</p>}
            {(blogs.data || []).map((b) => (
              <div
                key={String(b.id)}
                className="bg-[#0d0d0d] border border-white/10 rounded-lg p-6 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-semibold">{b.title}</p>
                  <p className="text-gray-500 text-sm">{b.author}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      toggleBlog.mutate({
                        id: b.id,
                        title: b.title,
                        content: b.content,
                        author: b.author,
                        published: !b.published,
                      })
                    }
                    className={`text-xs uppercase tracking-widest px-3 py-1.5 rounded border transition ${
                      b.published
                        ? "border-green-600 text-green-500 hover:bg-green-900/20"
                        : "border-gray-600 text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    {b.published ? "Published" : "Draft"}
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteBlog.mutate(b.id)}
                    className="text-red-500 hover:text-red-400 text-xs uppercase tracking-widest"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {(blogs.data || []).length === 0 && !blogs.isLoading && (
              <p className="text-gray-600">No blog posts yet.</p>
            )}
          </div>
        )}

        {tab === "contacts" && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
              Contact Submissions
            </h2>
            {contacts.isLoading && <p className="text-gray-500">Loading...</p>}
            {(contacts.data || []).map((cf) => (
              <div
                key={cf.email + String(cf.timestamp)}
                className="bg-[#0d0d0d] border border-white/10 rounded-lg p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-semibold">{cf.name}</p>
                    <p className="text-gray-500 text-sm">
                      {cf.email} · {cf.phone}
                    </p>
                  </div>
                  <p className="text-gray-600 text-xs">
                    {new Date(
                      Number(cf.timestamp) / 1_000_000,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-400 text-sm">{cf.message}</p>
              </div>
            ))}
            {(contacts.data || []).length === 0 && !contacts.isLoading && (
              <p className="text-gray-600">No submissions yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
