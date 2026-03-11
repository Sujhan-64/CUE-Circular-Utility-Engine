import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Leaf, Package, DollarSign } from "lucide-react";

const CircularDealsPage = () => {
  const circularProducts = products.filter((p) => p.isCircularDeal);
  const [expiryFilter, setExpiryFilter] = useState<number | null>(null);

  const filtered = expiryFilter
    ? circularProducts.filter((p) => p.daysLeft !== undefined && p.daysLeft <= expiryFilter)
    : circularProducts;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4">
          <p className="text-sm font-medium uppercase tracking-widest text-circular mb-3">Circular Utility Engine</p>
          <h1 className="text-4xl font-bold text-foreground mb-4">Circular Deals</h1>
          <p className="text-lg text-muted-foreground font-serif max-w-xl">
            These products are approaching their best-by date. They're perfectly good—just running out of time. Give them a home and save.
          </p>
        </div>
      </section>

      {/* Impact Dashboard */}
      <section className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <h2 className="text-lg font-semibold text-foreground mb-6">Impact Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-border p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Leaf size={24} className="text-circular" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8.2 tons</p>
                <p className="text-sm text-muted-foreground">Waste prevented</p>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Package size={24} className="text-circular" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">12,847</p>
                <p className="text-sm text-muted-foreground">Products saved</p>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <DollarSign size={24} className="text-circular" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">$284,320</p>
                <p className="text-sm text-muted-foreground">Money saved by customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Products */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm text-muted-foreground">Expiry window:</span>
          {[null, 1, 3, 5].map((d) => (
            <button
              key={String(d)}
              onClick={() => setExpiryFilter(d)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                expiryFilter === d
                  ? "bg-circular text-circular-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {d === null ? "All" : `≤ ${d} day${d > 1 ? "s" : ""}`}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6">{filtered.length} deals available</p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No deals match this expiry window.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CircularDealsPage;
