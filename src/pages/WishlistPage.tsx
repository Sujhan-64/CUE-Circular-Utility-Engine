import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2 } from "lucide-react";

const WishlistPage = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Save products you love for later.</p>
        <Link to="/products" className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Wishlist ({items.length})</h1>
      <div className="space-y-4">
        {items.map((product) => (
          <div key={product.id} className="bg-card rounded-lg border border-border p-4 flex items-center gap-4">
            <Link to={`/product/${product.id}`} className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/product/${product.id}`}><h3 className="font-medium text-card-foreground hover:underline">{product.name}</h3></Link>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <p className="text-sm font-semibold text-card-foreground mt-1">${product.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { addToCart(product); removeFromWishlist(product.id); }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <ShoppingCart size={14} /> Move to Cart
              </button>
              <button onClick={() => removeFromWishlist(product.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
