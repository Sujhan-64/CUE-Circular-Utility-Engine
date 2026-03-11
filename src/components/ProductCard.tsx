import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import RatingStars from "./RatingStars";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-soft card-hover border border-border/50">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.isCircularDeal && product.daysLeft !== undefined && (
          <span className="circular-badge absolute top-3 left-3">
            {product.daysLeft} {product.daysLeft === 1 ? "day" : "days"} left
          </span>
        )}
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center transition-colors hover:bg-card"
        aria-label="Toggle wishlist"
      >
        <Heart size={16} className={wishlisted ? "fill-circular text-circular" : "text-muted-foreground"} />
      </button>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-card-foreground leading-snug line-clamp-1 hover:underline">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>

        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-card-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
