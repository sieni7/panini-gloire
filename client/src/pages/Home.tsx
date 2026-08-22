import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Minus, Plus, ShoppingBag, Sparkles, X } from "lucide-react";

// Style reminder: enseigne solaire d’Abidjan, bordeaux signal, jaune maïs, orange toasté, surfaces ivoire et composition éditoriale décalée.
const products = [
  { id: "simple", name: "Panini Simple", description: "Pain toasté, sauce maison", price: 500, category: "Panini", image: "/manus-storage/panini-gloire-panini-simple_8b9ca958.jpg" },
  { id: "viande", name: "Panini Viande", description: "Viande assaisonnée, sauce maison", price: 1000, category: "Panini", image: "/manus-storage/panini-gloire-panini-simple_8b9ca958.jpg" },
  { id: "jambon", name: "Panini Jambon", description: "Jambon, salade et sauce maison", price: 1500, category: "Panini", image: "/manus-storage/panini-gloire-panini-simple_8b9ca958.jpg" },
  { id: "jambon-fromage", name: "Panini Jambon Fromage", description: "Jambon, fromage fondant et sauce maison", price: 2000, category: "Panini", image: "/manus-storage/panini-gloire-panini-simple_8b9ca958.jpg" },
  { id: "chawarma", name: "Chawarma Poulet", description: "Poulet mariné, salade et sauce blanche", price: 1500, category: "Chawarma", image: "/manus-storage/panini-gloire-chawarma_885df6c0.jpg" },
];

type CartItem = (typeof products)[number] & { quantity: number };

const readCart = (): CartItem[] => {
  try {
    const stored = JSON.parse(localStorage.getItem("panini-gloire-cart") || "[]");
    const candidate = Array.isArray(stored) ? stored : stored?.items;
    return Array.isArray(candidate) ? candidate.filter((item) => item && typeof item.id === "string" && typeof item.quantity === "number" && item.quantity > 0) : [];
  } catch {
    return [];
  }
};

const formatCFA = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} F`;

export default function Home() {
  const [category, setCategory] = useState<"Panini" | "Chawarma">("Panini");
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => localStorage.setItem("panini-gloire-cart", JSON.stringify(cart)), [cart]);

  const visible = products.filter((product) => product.category === category);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const add = (product: (typeof products)[number]) => setCart((current) => {
    const existing = current.find((item) => item.id === product.id);
    return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
  });
  const changeQuantity = (id: string, delta: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));

  return <main className="min-h-screen pb-28">
    <header className="site-header">
      <div className="header-inner"><Link href="/" className="brand-lockup"><span className="brand-mark brand-sg" role="img" aria-label="Logo Panini de la Gloire">PG</span><span className="brand-copy"><strong>PANINI DE LA GLOIRE</strong><small>ADJAMÉ BINGERVILLE • EN FACE DE BONPRIX</small></span></Link><Link href="/commande" className="account-link">Commander <ArrowRight size={16} /></Link></div>
    </header>

    <section className="hero-shell">
      <div className="hero-copy"><p className="eyebrow"><Sparkles size={15} /> FAIT MINUTE, LIVRÉ AVEC LE SOURIRE</p><h1>La pause qui<br /><em>mérite une ovation.</em></h1><p className="hero-intro">Choisissez votre recette, composez votre panier et confirmez votre commande directement sur WhatsApp.</p><a className="primary-button" href="#menu">Voir le menu <ChevronRight size={19} /></a></div>
      <div className="hero-image" role="img" aria-label="Panini fraîchement toasté" />
    </section>

    <section id="menu" className="menu-section"><div className="section-heading"><div><p className="eyebrow dark">NOTRE CARTE</p><h2>Aujourd’hui, on se régale</h2></div><span className="delivery-note">Paiement à la livraison</span></div>
      <div className="category-tabs" role="tablist">{(["Panini", "Chawarma"] as const).map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{item}{item === "Panini" ? "s" : ""}</button>)}</div>
      <div className="product-grid">{visible.map((product, index) => <article className="product-card" style={{ "--delay": `${index * 70}ms` } as React.CSSProperties} key={product.id}><div className="product-image" style={{ backgroundImage: `url(${product.image})` }} /><div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><strong>{formatCFA(product.price)}</strong></div><button className="add-button" onClick={() => { add(product); setCartOpen(true); }}><Plus size={17} /> Ajouter</button></article>)}</div></section>

    {count > 0 && <button type="button" className="cart-bar" onClick={() => setCartOpen(true)} aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}><span className="cart-bar-label"><span className="cart-icon"><ShoppingBag size={18} /></span><strong>{count} article{count > 1 ? "s" : ""}</strong><small>dans votre panier</small></span><strong>{formatCFA(total)}</strong></button>}

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow dark">VOTRE SÉLECTION</p><h2>On garde ça au chaud ?</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><X size={20} /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><p>Votre panier attend son premier coup de cœur.</p></div> : <div className="cart-lines">{cart.map((item) => <div className="cart-line" key={item.id}><div><strong>{item.name}</strong><small>{formatCFA(item.price)} l’unité</small></div><div className="quantity-control"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Retirer un ${item.name}`}><Minus size={14} /></button><span aria-live="polite">{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Ajouter un ${item.name}`}><Plus size={14} /></button></div></div>)}</div>}<div className="drawer-footer"><div><span>Total</span><strong>{formatCFA(total)}</strong></div><Link href={cart.length ? "/commande" : "/"} className={`primary-button full ${!cart.length ? "disabled" : ""}`} onClick={() => cart.length && setCartOpen(false)}>Passer la commande <ArrowRight size={18} /></Link></div></aside></div>}
  </main>;
}
