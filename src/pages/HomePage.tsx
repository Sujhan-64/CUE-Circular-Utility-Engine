import { Link } from "react-router-dom";
import { ArrowRight, Leaf, TrendingDown, Recycle } from "lucide-react";
import { products, customerTestimonials, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import CircularDealCard from "@/components/CircularDealCard";
import ReviewCard from "@/components/ReviewCard";

const HomePage = () => {
  const circularDeals = products.filter((p) => p.isCircularDeal);
  const trending = products.filter((p) => p.isTrending);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-card">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-2xl space-y-6" style={{ animation: "fadeInUp 0.6s ease-out" }}>
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Circular Utility Engine</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
              Shop smarter.<br />Waste nothing.
            </h1>
            <p className="text-lg text-muted-foreground font-serif leading-relaxed max-w-lg">
              Great products at better prices. Our Circular Deals rescue near-expiry items, saving you money while reducing food waste.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                Shop All Products <ArrowRight size={16} />
              </Link>
              <Link
                to="/circular-deals"
                className="inline-flex items-center gap-2 px-6 py-3 bg-circular text-circular-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
              >
                View Circular Deals <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-secondary border-y border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-foreground">12,847</p>
              <p className="text-sm text-muted-foreground mt-1">Products saved from waste</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">$284,320</p>
              <p className="text-sm text-muted-foreground mt-1">Saved by our customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">8.2 tons</p>
              <p className="text-sm text-muted-foreground mt-1">Food waste prevented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="bg-card rounded-lg border border-border p-6 text-center card-hover"
            >
              <p className="font-medium text-card-foreground text-sm">{cat}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Circular Deals - horizontal scroll */}
      <section className="bg-card py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Circular Deals</h2>
              <p className="text-sm text-muted-foreground mt-1">Save food, save money. These products need a home before their time runs out.</p>
            </div>
            <Link to="/circular-deals" className="text-sm text-circular font-medium hover:opacity-80 transition-opacity flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {circularDeals.map((p) => (
              <CircularDealCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-card py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customerTestimonials.map((t, i) => (
            <ReviewCard key={i} userName={t.name} rating={t.rating} comment={t.text} date="2026-03-01" />
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">The Circular Utility Engine</h2>
            <p className="text-lg text-primary-foreground/70 font-serif leading-relaxed">
              Every year, billions of perfectly good products are discarded simply because they're approaching their best-by date. CUE intercepts these products, offers them at reduced prices, and ensures nothing goes to waste.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto">
                  <Leaf size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Reduce Waste</h3>
                <p className="text-sm text-primary-foreground/60 font-serif">Every product you buy through Circular Deals is one less item in a landfill.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto">
                  <TrendingDown size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Save Money</h3>
                <p className="text-sm text-primary-foreground/60 font-serif">Get premium products at up to 50% off—same quality, lower price.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto">
                  <Recycle size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold">Close the Loop</h3>
                <p className="text-sm text-primary-foreground/60 font-serif">Join a community of conscious consumers building a circular economy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="bg-circular text-circular-foreground py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-bold">New Circular Deals Every Day</h2>
          <p className="text-circular-foreground/80 max-w-md mx-auto">
            Fresh near-expiry deals are added daily. Don't miss out on incredible savings.
          </p>
          <Link
            to="/circular-deals"
            className="inline-flex items-center gap-2 px-6 py-3 bg-circular-foreground text-circular rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Explore Deals <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
