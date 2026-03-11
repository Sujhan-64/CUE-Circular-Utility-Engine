import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Check } from "lucide-react";
import { toast } from "sonner";

const steps = ["Shipping", "Delivery", "Payment", "Review"];

const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const { items, subtotal, discount, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingForm, setShippingForm] = useState({ name: "", email: "", street: "", city: "", state: "", zip: "" });
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handlePlaceOrder = () => {
    toast("Order placed successfully!");
    clearCart();
    navigate("/orders");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-foreground text-background" : "bg-secondary text-muted-foreground"
            }`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-card-foreground">Shipping Address</h2>
            {(["name", "email", "street", "city", "state", "zip"] as const).map((field) => (
              <div key={field}>
                <label className="block text-sm text-muted-foreground mb-1 capitalize">{field === "zip" ? "ZIP Code" : field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  value={shippingForm[field]}
                  onChange={(e) => setShippingForm({ ...shippingForm, [field]: e.target.value })}
                  className="w-full px-3 py-2 bg-secondary rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-card-foreground">Delivery Options</h2>
            {[
              { id: "standard", label: "Standard Delivery", desc: "5-7 business days", price: "Free" },
              { id: "express", label: "Express Delivery", desc: "2-3 business days", price: "$9.99" },
              { id: "overnight", label: "Overnight Delivery", desc: "Next business day", price: "$19.99" },
            ].map((opt) => (
              <label key={opt.id} className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                deliveryOption === opt.id ? "border-foreground bg-secondary" : "border-border hover:bg-secondary/50"
              }`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="delivery" checked={deliveryOption === opt.id} onChange={() => setDeliveryOption(opt.id)} className="accent-primary" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-card-foreground">{opt.price}</span>
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-card-foreground">Payment Method</h2>
            {[
              { id: "card", label: "Credit / Debit Card" },
              { id: "upi", label: "UPI" },
              { id: "netbanking", label: "Net Banking" },
              { id: "cod", label: "Cash on Delivery" },
            ].map((opt) => (
              <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                paymentMethod === opt.id ? "border-foreground bg-secondary" : "border-border hover:bg-secondary/50"
              }`}>
                <input type="radio" name="payment" checked={paymentMethod === opt.id} onChange={() => setPaymentMethod(opt.id)} className="accent-primary" />
                <span className="text-sm font-medium text-card-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-card-foreground">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {discount > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="text-circular">-${discount.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-border"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors">
              Back
            </button>
          ) : <div />}
          {step < 3 ? (
            <button onClick={() => setStep(step + 1)} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Continue
            </button>
          ) : (
            <button onClick={handlePlaceOrder} className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
