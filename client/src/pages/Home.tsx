import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Minus, Plus, Search, Share2, ShoppingBag, Sparkles, X } from "lucide-react";

// Style reminder: enseigne solaire d’Abidjan, bordeaux signal, jaune maïs, orange toasté, surfaces ivoire et composition éditoriale décalée.
type Product = { id: string; name: string; description: string; price: number; category: string; image: string; available?: boolean; badge?: string; sortOrder?: number };
type Category = { id: string; name: string; sortOrder?: number };
type Site = { brandName: string; locationLabel: string; address: string; phone: string; heroEyebrow: string; heroTitle: string; heroDescription: string; serviceNote: string; openingHours: string; deliveryNote: string; whatsappTemplate: string };

const fallbackProducts: Product[] = [
  { id: "simple", name: "Panini Simple", description: "Pain toasté, sauce maison", price: 500, category: "Panini", image: "/assets/panini-gloire-panini-simple.webp", available: true, sortOrder: 1 },
  { id: "viande", name: "Panini Viande", description: "Viande assaisonnée, sauce maison", price: 1000, category: "Panini", image: "/assets/panini-gloire-panini-simple.webp", badge: "HOT!", available: true, sortOrder: 2 },
  { id: "jambon", name: "Panini Jambon", description: "Jambon, salade et sauce maison", price: 1500, category: "Panini", image: "/assets/panini-gloire-panini-simple.webp", available: true, sortOrder: 3 },
  { id: "jambon-fromage", name: "Panini Jambon Fromage", description: "Jambon, fromage fondant et sauce maison", price: 2000, category: "Panini", image: "/assets/panini-gloire-panini-simple.webp", available: true, sortOrder: 4 },
  { id: "chawarma", name: "Chawarma Poulet", description: "Poulet mariné, salade et sauce blanche", price: 1500, category: "Chawarma", image: "/assets/panini-gloire-chawarma.webp", available: true, sortOrder: 5 },
];

const fallbackSite: Site = { brandName: "Panini de la Gloire", locationLabel: "ADJAMÉ BINGERVILLE • EN FACE DE BONPRIX", address: "Adjamé Bingerville • En face de BonPrix", phone: "+2250574971022", heroEyebrow: "FAIT MINUTE, LIVRÉ AVEC LE SOURIRE", heroTitle: "La pause qui mérite une ovation.", heroDescription: "Choisissez votre recette, composez votre panier et confirmez votre commande directement sur WhatsApp.", serviceNote: "Paiement à la livraison", openingHours: "Tous les jours · 10h00 — 22h00", deliveryNote: "Livraison selon zone et disponibilité", whatsappTemplate: "Nouvelle commande — Panini de la Gloire" };

type CartItem = Product & { quantity: number };

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
  const [category, setCategory] = useState("Panini");
  const [categories, setCategories] = useState<Category[]>([{ id: "panini", name: "Panini", sortOrder: 1 }, { id: "chawarma", name: "Chawarma", sortOrder: 2 }]);
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [site, setSite] = useState<Site>(fallbackSite);
  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => { localStorage.setItem("panini-gloire-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { void Promise.all([fetch("/data/products.json").then((response) => response.ok ? response.json() : Promise.reject(response.status)), fetch("/data/site.json").then((response) => response.ok ? response.json() : Promise.reject(response.status)), fetch("/data/categories.json").then((response) => response.ok ? response.json() : Promise.reject(response.status))]).then(([nextProducts, nextSite, nextCategories]) => { if (Array.isArray(nextProducts)) setProducts(nextProducts); if (nextSite && typeof nextSite === "object") setSite(nextSite); if (Array.isArray(nextCategories) && nextCategories.length) { setCategories(nextCategories); setCategory(nextCategories[0].name); } }).catch(() => undefined); }, []);

  const visible = products.filter((product) => product.category === category && `${product.name} ${product.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const add = (product: Product) => { if (product.available === false) return; setCart((current) => {
    const existing = current.find((item) => item.id === product.id);
    return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }];
  }); };
  const changeQuantity = (id: string, delta: number) => setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0));
  const shareSite = async () => {
    const shareData = { title: site.brandName, text: "Découvrez la carte de Panini de la Gloire", url: window.location.origin };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareData.url);
      setShareMessage("Lien copié");
    } catch {
      setShareMessage("Partage annulé");
    }
    window.setTimeout(() => setShareMessage(""), 2200);
  };

  return <main className="min-h-screen pb-28">
    <header className="site-header">
      <div className="header-inner"><Link href="/" className="brand-lockup"><span className="brand-mark brand-sg" role="img" aria-label="Logo Panini de la Gloire">PG</span><span className="brand-copy"><strong>{site.brandName.toUpperCase()}</strong><small>{site.locationLabel}</small></span></Link><div className="header-actions"><button type="button" className="share-button" onClick={shareSite} aria-label="Partager le lien du site"><Share2 size={17} /><span>Partager</span></button><Link href="/commande" className="account-link">Commander <ArrowRight size={16} /></Link></div></div>{shareMessage && <p className="share-feedback" role="status">{shareMessage}</p>}
    </header>

    <section className="hero-shell">
      <div className="hero-copy"><p className="eyebrow"><Sparkles size={15} /> {site.heroEyebrow}</p><h1>{site.heroTitle.split(" mérite")[0]}<br /><em>mérite une ovation.</em></h1><p className="hero-intro">{site.heroDescription}</p><a className="primary-button" href="#menu">Voir le menu <ChevronRight size={19} /></a></div>
      <div className="hero-image" role="img" aria-label="Panini fraîchement toasté" />
    </section>

    <section id="menu" className="menu-section"><div className="section-heading"><div><p className="eyebrow dark">NOTRE CARTE</p><h2>Aujourd’hui, on se régale</h2></div><span className="delivery-note">{site.serviceNote}</span></div>
      <div className="catalog-tools"><div className="category-tabs" role="tablist">{[...categories].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((item) => <button key={item.id} className={category === item.name ? "active" : ""} onClick={() => setCategory(item.name)} role="tab" aria-selected={category === item.name}>{item.name}{item.name.toLowerCase() === "panini" ? "s" : ""}</button>)}</div><label className="search-box"><Search size={17} /><span className="sr-only">Rechercher un produit</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher dans la carte" /></label></div>
      <div className="product-grid">{visible.map((product, index) => <article className="product-card" style={{ "--delay": `${index * 70}ms` } as React.CSSProperties} key={product.id}><div className="product-image" style={{ backgroundImage: `url(${product.image})` }} />{product.badge ? <span className="product-badge">{product.badge}</span> : null}{product.available === false ? <span className="stock-badge">RUPTURE</span> : null}{cart.find((item) => item.id === product.id)?.quantity ? <span className="quantity-badge">x{cart.find((item) => item.id === product.id)?.quantity}</span> : null}<div className="product-info"><div><h3>{product.name}</h3><p>{product.description}</p></div><strong>{formatCFA(product.price)}</strong></div><button className={`add-button ${product.available === false ? "is-disabled" : ""}`} disabled={product.available === false} onClick={() => { add(product); setCartOpen(true); }}>{product.available === false ? "Rupture de stock" : <><Plus size={17} /> Ajouter</>}</button></article>)}</div></section>

    {count > 0 && <button type="button" className="cart-bar" onClick={() => setCartOpen(true)} aria-label={`Ouvrir le panier, ${count} article${count > 1 ? "s" : ""}`}><span className="cart-bar-label"><span className="cart-icon"><ShoppingBag size={18} /></span><strong>{count} article{count > 1 ? "s" : ""}</strong><small>dans votre panier</small></span><strong>{formatCFA(total)}</strong></button>}

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-heading"><div><p className="eyebrow dark">VOTRE SÉLECTION</p><h2>On garde ça au chaud ?</h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><X size={20} /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={34} /><p>Votre panier attend son premier coup de cœur.</p></div> : <div className="cart-lines">{cart.map((item) => <div className="cart-line" key={item.id}><div><strong>{item.name}</strong><small>{formatCFA(item.price)} l’unité</small></div><div className="quantity-control"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Retirer un ${item.name}`}><Minus size={14} /></button><span aria-live="polite">{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Ajouter un ${item.name}`}><Plus size={14} /></button></div></div>)}</div>}<div className="drawer-footer"><div><span>Total</span><strong>{formatCFA(total)}</strong></div><Link href={cart.length ? "/commande" : "/"} className={`primary-button full ${!cart.length ? "disabled" : ""}`} onClick={() => cart.length && setCartOpen(false)}>Passer la commande <ArrowRight size={18} /></Link></div></aside></div>}
  </main>;
}
