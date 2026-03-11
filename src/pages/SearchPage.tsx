import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const trendingSearches = ["organic", "kombucha", "sourdough", "olive oil", "granola"];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [input, setInput] = useState(query);

  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: input });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-secondary rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
            autoFocus
          />
        </div>
      </form>

      {!query && (
        <div className="max-w-xl mx-auto">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Trending Searches</h2>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((t) => (
              <button
                key={t}
                onClick={() => { setInput(t); setSearchParams({ q: t }); }}
                className="px-4 py-2 bg-secondary rounded-lg text-sm text-secondary-foreground hover:bg-muted transition-colors capitalize"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            {results.length} result{results.length !== 1 ? "s" : ""} for "<span className="text-foreground font-medium">{query}</span>"
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found. Try a different search term.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
