import { categories } from "@/data/products";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minRating: number;
  onMinRatingChange: (r: number) => void;
  showInStockOnly: boolean;
  onInStockChange: (v: boolean) => void;
  showCircularOnly: boolean;
  onCircularOnlyChange: (v: boolean) => void;
}

const FilterSidebar = ({
  selectedCategory, onCategoryChange,
  priceRange, onPriceRangeChange,
  minRating, onMinRatingChange,
  showInStockOnly, onInStockChange,
  showCircularOnly, onCircularOnlyChange,
}: FilterSidebarProps) => {
  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Category */}
      <div className="bg-card rounded-lg border border-border p-5 space-y-3">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Category</h3>
        <button
          onClick={() => onCategoryChange("")}
          className={`block w-full text-left text-sm py-1.5 transition-colors ${!selectedCategory ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`block w-full text-left text-sm py-1.5 transition-colors ${selectedCategory === cat ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price */}
      <div className="bg-card rounded-lg border border-border p-5 space-y-3">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min={0}
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
            className="w-20 px-2 py-1.5 bg-secondary rounded text-sm text-foreground focus:outline-none"
            placeholder="Min"
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            min={0}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            className="w-20 px-2 py-1.5 bg-secondary rounded text-sm text-foreground focus:outline-none"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="bg-card rounded-lg border border-border p-5 space-y-3">
        <h3 className="font-semibold text-sm uppercase tracking-wider text-foreground">Minimum Rating</h3>
        {[4, 3, 2, 1].map((r) => (
          <button
            key={r}
            onClick={() => onMinRatingChange(minRating === r ? 0 : r)}
            className={`block w-full text-left text-sm py-1.5 transition-colors ${minRating === r ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
          >
            {r}+ Stars
          </button>
        ))}
      </div>

      {/* Toggles */}
      <div className="bg-card rounded-lg border border-border p-5 space-y-3">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showInStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-primary"
          />
          <span className="text-sm text-foreground">In Stock Only</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showCircularOnly}
            onChange={(e) => onCircularOnlyChange(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-circular"
          />
          <span className="text-sm text-circular font-medium">Circular Deals Only</span>
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
