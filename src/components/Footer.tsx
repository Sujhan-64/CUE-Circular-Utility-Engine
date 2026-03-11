import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast("Thanks for subscribing!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-lg">CUE</span>
            </div>
            <p className="text-sm text-primary-foreground/70 font-serif leading-relaxed">
              Circular Utility Engine — making sustainable shopping effortless. We rescue near-expiry products and give them a second chance, saving you money and reducing waste.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Shop</h4>
            <div className="space-y-2">
              <Link to="/products" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">All Products</Link>
              <Link to="/circular-deals" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Circular Deals</Link>
              <Link to="/products?category=Fresh+Produce" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Fresh Produce</Link>
              <Link to="/products?category=Pantry+Staples" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Pantry Staples</Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Company</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">About Us</Link>
              <Link to="/" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Sustainability</Link>
              <Link to="/" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link to="/" className="block text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/70">Get notified about new Circular Deals and sustainability updates.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-primary-foreground/10 rounded-lg text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary-foreground/20"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-foreground text-primary rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-sm text-primary-foreground/50">© 2026 Circular Utility Engine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
