import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Heart, Share2, ShoppingCart, Minus, Plus, Clock, Package, Truck } from "lucide-react";
import { products, reviews } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground mt-4 inline-block">
          ← Back to products
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const circularRecs = products.filter((p) => p.isCircularDeal && p.id !== product.id).slice(0, 4);
  const images = [product.image, product.image, product.image]; // Mock gallery

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Main */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
            <img src={images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === i ? "border-foreground" : "border-border"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          </div>

          <RatingStars rating={product.rating} showValue reviewCount={product.reviewCount} />

          {/* Price + Days left */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {product.isCircularDeal && product.daysLeft !== undefined && (
              <span className="circular-badge flex items-center gap-1.5 text-sm">
                <Clock size={14} />
                {product.daysLeft} {product.daysLeft === 1 ? "day" : "days"} left
              </span>
            )}
          </div>

          <p className="text-muted-foreground font-serif leading-relaxed">{product.longDescription}</p>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <Package size={16} className="text-muted-foreground" />
            <span className={`text-sm ${product.inStock ? "text-foreground" : "text-destructive"}`}>
              {product.inStock ? `${product.stockCount} in stock` : "Out of stock"}
            </span>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sold by <span className="text-foreground">{product.seller}</span></span>
          </div>

          {/* Ingredients */}
          {product.ingredients && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Ingredients</h3>
              <p className="text-sm text-muted-foreground font-serif">{product.ingredients}</p>
            </div>
          )}

          {/* Quantity + Actions */}
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Qty</span>
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-muted-foreground hover:text-foreground"><Minus size={16} /></button>
                <span className="px-4 text-sm font-medium text-foreground">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-muted-foreground hover:text-foreground"><Plus size={16} /></button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
              <button
                onClick={() => { addToCart(product, quantity); }}
                className="flex-1 px-6 py-3 border border-border rounded-lg font-medium text-sm text-foreground hover:bg-secondary transition-colors"
              >
                Buy Now
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Heart size={16} className={wishlisted ? "fill-circular text-circular" : ""} />
                {wishlisted ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => { navigator.clipboard.writeText(window.location.href); toast("Link copied!"); }}
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">Reviews</h2>
        {productReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productReviews.map((r) => (
              <ReviewCard key={r.id} userName={r.userName} rating={r.rating} comment={r.comment} date={r.date} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet.</p>
        )}
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Circular recs */}
      {circularRecs.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-2">Circular Deals You Might Like</h2>
          <p className="text-sm text-muted-foreground mb-6">Save more by rescuing these near-expiry products.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {circularRecs.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
