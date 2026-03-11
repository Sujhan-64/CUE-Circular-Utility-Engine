import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { User, Package, MapPin, CreditCard, Heart, ShoppingCart, Bell, Recycle, LogOut } from "lucide-react";

const AccountPage = () => {
  const { user, isAuthenticated, circularPreference, toggleCircularPreference, addresses, logout } = useUser();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Sign in to view your account</h1>
        <Link to="/login" className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Sign In</Link>
      </div>
    );
  }

  const menuItems = [
    { icon: Package, label: "Order History", link: "/orders" },
    { icon: Heart, label: "Wishlist", link: "/wishlist" },
    { icon: ShoppingCart, label: "Cart", link: "/cart" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-8">Account</h1>

      {/* Profile */}
      <div className="bg-card rounded-lg border border-border p-6 flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
          <User size={24} className="text-secondary-foreground" />
        </div>
        <div>
          <p className="font-semibold text-card-foreground">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {menuItems.map((item) => (
          <Link key={item.label} to={item.link} className="bg-card rounded-lg border border-border p-5 flex items-center gap-3 card-hover">
            <item.icon size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Addresses */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={18} className="text-muted-foreground" />
          <h2 className="font-semibold text-card-foreground">Saved Addresses</h2>
        </div>
        {addresses.map((addr) => (
          <div key={addr.id} className="text-sm text-muted-foreground">
            <span className="font-medium text-card-foreground">{addr.label}</span> — {addr.street}, {addr.city}, {addr.state} {addr.zip}
            {addr.isDefault && <span className="text-xs bg-secondary px-2 py-0.5 rounded ml-2">Default</span>}
          </div>
        ))}
      </div>

      {/* Circular Preference */}
      <div className="bg-card rounded-lg border border-border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Recycle size={20} className="text-circular" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Circular Deal Recommendations</p>
              <p className="text-xs text-muted-foreground">Show near-expiry product recommendations while browsing</p>
            </div>
          </div>
          <button
            onClick={toggleCircularPreference}
            className={`relative w-11 h-6 rounded-full transition-colors ${circularPreference ? "bg-circular" : "bg-border"}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-card rounded-full transition-transform ${circularPreference ? "translate-x-5" : ""}`} />
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => { logout(); navigate("/"); }}
        className="flex items-center gap-2 text-sm text-destructive hover:opacity-80 transition-opacity"
      >
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
};

export default AccountPage;
