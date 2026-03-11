import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";
import { Package, Truck, Check, X } from "lucide-react";

const statusIcons = {
  Processing: Package,
  Shipped: Truck,
  Delivered: Check,
  Cancelled: X,
};

const statusColors: Record<string, string> = {
  Processing: "text-muted-foreground",
  Shipped: "text-circular",
  Delivered: "text-foreground",
  Cancelled: "text-destructive",
};

const OrderHistoryPage = () => {
  const { orders, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Sign in to view orders</h1>
        <Link to="/login" className="inline-flex px-6 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-medium">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-8">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => {
          const Icon = statusIcons[order.status];
          return (
            <div key={order.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-card-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
                </div>
                <div className={`flex items-center gap-1.5 text-sm font-medium ${statusColors[order.status]}`}>
                  <Icon size={16} />
                  {order.status}
                </div>
              </div>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="text-sm text-card-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm text-card-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <span className="text-sm font-semibold text-card-foreground">Total: ${order.total.toFixed(2)}</span>
                <button className="px-4 py-2 border border-border rounded-lg text-sm text-foreground hover:bg-secondary transition-colors">
                  Reorder
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
