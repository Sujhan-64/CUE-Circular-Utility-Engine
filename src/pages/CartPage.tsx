import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Bookmark, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, saveForLater, savedItems, moveToCart, subtotal, discount, shipping, total } = useCart();

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Start shopping to add items to your cart.</p>
        <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-card rounded-lg border border-border p-4 flex gap-4">
              <Link to={`/product/${item.product.id}`} className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-medium text-card-foreground hover:underline">{item.product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">{item.product.seller}</p>
                {item.product.isCircularDeal && (
                  <span className="circular-badge text-[10px] mt-1 inline-block">{item.product.daysLeft}d left</span>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Minus size={14} /></button>
                    <span className="px-3 text-sm font-medium text-foreground">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 text-muted-foreground hover:text-foreground"><Plus size={14} /></button>
                  </div>
                  <span className="font-semibold text-card-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => saveForLater(item.product.id)} className="p-2 text-muted-foreground hover:text-foreground" title="Save for later"><Bookmark size={16} /></button>
                <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive" title="Remove"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          {/* Saved for later */}
          {savedItems.length > 0 && (
            <div className="pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Saved for Later</h2>
              {savedItems.map((item) => (
                <div key={item.product.id} className="bg-secondary rounded-lg p-4 flex items-center gap-4 mb-3">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => moveToCart(item.product.id)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                    Move to Cart
                  </button>
                </div>
              ))}
            </div>
          )}

          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-4">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-24 space-y-4">
          <h2 className="text-lg font-semibold text-card-foreground">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-card-foreground">${subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-circular">-${discount.toFixed(2)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-card-foreground">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold text-base">
              <span className="text-card-foreground">Total</span><span className="text-card-foreground">${total.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout" className="block w-full text-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
            Proceed to Checkout
          </Link>
          {shipping > 0 && (
            <p className="text-xs text-muted-foreground text-center">Free shipping on orders over $35</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
