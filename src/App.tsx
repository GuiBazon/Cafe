import { useCallback, useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Category, type Product } from "./data/products";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Ticker from "./components/Ticker";
import Catalog, { type SortKey } from "./components/Catalog";
import ProductModal from "./components/ProductModal";
import CartDrawer, { type CartLine } from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import MethodsBand from "./components/MethodsBand";
import Footer from "./components/Footer";
import Toast, { type ToastData } from "./components/Toast";

interface CartItem {
  id: string;
  qty: number;
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "todos">("todos");
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  // trava o scroll do body quando há sobreposições abertas
  useEffect(() => {
    const locked = cartOpen || checkoutOpen || activeId !== null;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, checkoutOpen, activeId]);

  // auto-dismiss do toast
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = useCallback((msg: string) => setToast({ id: Date.now(), msg }), []);

  const productOf = useCallback(
    (id: string): Product | undefined => PRODUCTS.find((p) => p.id === id),
    []
  );

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === id);
        if (existing) {
          return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(10, i.qty + qty) } : i));
        }
        return [...prev, { id, qty }];
      });
      const p = productOf(id);
      if (p) showToast(`${qty > 1 ? `${qty}× ` : ""}“${p.name}” foi para a sacola.`);
    },
    [productOf, showToast]
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(10, qty) } : i))
    );
  }, []);

  const removeFromCart = useCallback((id: string) => setCart((prev) => prev.filter((i) => i.id !== id)), []);

  const cartLines: CartLine[] = useMemo(
    () =>
      cart
        .map((item) => ({ product: productOf(item.id), qty: item.qty }))
        .filter((l): l is CartLine => Boolean(l.product)),
    [cart, productOf]
  );

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartQtyOf = useCallback(
    (id: string) => cart.find((i) => i.id === id)?.qty ?? 0,
    [cart]
  );

  const activeProduct = activeId ? productOf(activeId) ?? null : null;

  const jumpToCategory = useCallback((c: Category | "todos") => {
    setCategory(c);
    setQuery("");
  }, []);

  const openCheckout = useCallback(() => {
    if (cartLines.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  }, [cartLines.length]);

  return (
    <div className="min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />

      <Header cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero onOpenProduct={setActiveId} />
        <Ticker />
        <Catalog
          query={query}
          onQuery={setQuery}
          category={category}
          onCategory={setCategory}
          sort={sort}
          onSort={setSort}
          onAdd={addToCart}
          onOpen={setActiveId}
          cartQtyOf={cartQtyOf}
        />
        <MethodsBand />
      </main>

      <Footer onCategory={jumpToCategory} />

      {/* sobreposições */}
      {activeProduct && (
        <ProductModal
          key={activeProduct.id}
          product={activeProduct}
          onClose={() => setActiveId(null)}
          onAdd={(id, qty) => {
            addToCart(id, qty);
            setActiveId(null);
          }}
        />
      )}

      <CartDrawer
        open={cartOpen}
        lines={cartLines}
        onClose={() => setCartOpen(false)}
        onSetQty={setQty}
        onRemove={removeFromCart}
        onCheckout={openCheckout}
      />

      {checkoutOpen && (
        <CheckoutModal
          lines={cartLines}
          onClose={() => setCheckoutOpen(false)}
          onComplete={() => setCart([])}
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
