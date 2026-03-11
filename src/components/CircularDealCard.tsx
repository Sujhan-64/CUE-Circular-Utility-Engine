import { Link } from "react-router-dom";
import { ShoppingCart, Clock } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface CircularDealCardProps {
  product: Product;
}

const CircularDealCard = ({ product }: CircularDealCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-soft border border-border/50 card-hover min-w-[280px] w-[280px] flex-shrink-0">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
        {product.discountPercent && (
          <span className="circular-badge absolute top-3 left-3 flex items-center gap-1">
            <Clock size={12} />
            {product.daysLeft}d left · {product.discountPercent}% off
          </span>
        )}
      </Link>

      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-card-foreground line-clamp-1 hover:underline">{product.name}</h3>
        </Link>
        <p className="text-xs text-muted-foreground">{product.seller}</p>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-circular">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-9 h-9 rounded-full bg-circular flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} className="text-circular-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircularDealCard;
