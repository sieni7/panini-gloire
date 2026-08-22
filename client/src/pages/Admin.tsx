import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { BookOpen, Check, Copy, Download, Expand, ImagePlus, LayoutDashboard, Save, Settings2, Trash2, UploadCloud, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// Style reminder: editorial control room in cacao, burgundy, toasted orange and maize.
type Product = { id: string; name: string; description: string; price: number; category: string; available: boolean; sortOrder: number; image: string; badge?: string };
type Category = { id: string; name: string; sortOrder: number };

type Site = {
  brandName: string; locationLabel: string; address: string; phone: string; activeHero: string; heroEyebrow: string;
  heroTitle: string; heroDescription: string; serviceNote: string; openingHours: string;
  deliveryNote: string; whatsappTemplate: string;
};

const initialCategories: Category[] = [
  { id: "panini", name: "Panini", sortOrder: 1 },
  { id: "chawarma", name: "Chawarma", sortOrder: 2 },
];
const initialProducts: Product[] = [
  { id: "simple", name: "Panini Simple", description: "Pain toasté, sauce maison", price: 500, category: "Panini", available: true, sortOrder: 1, image: "/assets/panini-gloire-panini-simple.webp" },
  { id: "viande", name: "Panini Viande", description: "Viande assaisonnée, sauce maison", price: 1000, category: "Panini", available: true, sortOrder: 2, image: "/assets/panini-gloire-panini-simple.webp", badge: "HOT!" },
  { id: "jambon", name: "Panini Jambon", description: "Jambon, salade et sauce maison", price: 1500, category: "Panini", available: true, sortOrder: 3, image: "/assets/panini-gloire-panini-simple.webp" },
  { id: "jambon-fromage", name: "Panini Jambon Fromage", description: "Jambon, fromage fondant et sauce maison", price: 2000, category: "Panini", available: true, sortOrder: 4, image: "/assets/panini-gloire-panini-simple.webp" },
  { id: "chawarma", name: "Chawarma Poulet", description: "Poulet mariné, salade et sauce blanche", price: 1500, category: "Chawarma", available: true, sortOrder: 5, image: "/assets/panini-gloire-chawarma.webp" },
];
const initialSite: Site = {
  brandName: "Panini de la Gloire", locationLabel: "ADJAMÉ BINGERVILLE • EN FACE DE BONPRIX", address: "Adjamé Bingerville • En face de BonPrix", phone: "+2250574971022", activeHero: "1", heroEyebrow: "FAIT MINUTE, LIVRÉ AVEC LE SOURIRE", heroTitle: "La pause qui mérite une ovation.", heroDescription: "Choisissez votre recette, composez votre panier et confirmez votre commande directement sur WhatsApp.", serviceNote: "Paiement à la livraison", openingHours: "Tous les jours · 10h00 — 22h00", deliveryNote: "Livraison selon zone et disponibilité", whatsappTemplate: "Nouvelle commande — Panini de la Gloire",
};
const publicSiteUrl = "https://panini-gloire.netlify.app";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinDigits, setPinDigits] = useState(["", "", "", ""]);
  const pinInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [authError, setAuthError] = useState("");
  const [publishState, setPublishState] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [categoryName, setCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [site, setSite] = useState<Site>(initialSite);
  const [active, setActive] = useState<"products" | "site" | "categories" | "documentation">("products");
  const [saved, setSaved] = useState(false);
  const [copyNotice, setCopyNotice] = useState("");
  const [formError, setFormError] = useState("");
  const [qrExpanded, setQrExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState(products[0].id);
  const selected = useMemo(() => products.find((item) => item.id === selectedId) ?? products[0], [products, selectedId]);

  useEffect(() => {
    void Promise.all([
      fetch("/data/products.json").then((response) => response.ok ? response.json() : Promise.reject(response.status)),
      fetch("/data/site.json").then((response) => response.ok ? response.json() : Promise.reject(response.status)),
      fetch("/data/categories.json").then((response) => response.ok ? response.json() : Promise.reject(response.status)),
    ]).then(([nextProducts, nextSite, nextCategories]) => {
      if (Array.isArray(nextProducts) && nextProducts.length) { setProducts(nextProducts); setSelectedId(nextProducts[0].id); }
      if (nextSite && typeof nextSite === "object") setSite({ ...initialSite, ...nextSite });
      if (Array.isArray(nextCategories) && nextCategories.length) setCategories(nextCategories);
    }).catch(() => undefined);
  }, []);

  const updateProduct = (patch: Partial<Product>) => setProducts((items) => items.map((item) => item.id === selected.id ? { ...item, ...patch } : item));
  const addProduct = () => {
    const category = categories[0]?.name || "Panini";
    const id = `produit-${Date.now()}`;
    setProducts((items) => [...items, { id, name: "Nouveau produit", description: "Description à compléter", price: 500, category, available: true, sortOrder: items.length + 1, image: "/assets/panini-gloire-panini-simple.webp" }]);
    setSelectedId(id); setActive("products"); setFormError("");
  };
  const deleteProduct = () => {
    if (products.length <= 1) { setFormError("Gardez au moins un produit dans le catalogue."); return; }
    if (!window.confirm(`Supprimer le produit « ${selected.name} » ?`)) return;
    const remaining = products.filter((item) => item.id !== selected.id);
    setProducts(remaining); setSelectedId(remaining[0].id); setFormError("");
  };
  const addCategory = () => {
    const name = categoryName.trim();
    if (!name) { setCategoryError("Le nom de la catégorie est obligatoire."); return; }
    if (categories.some((item) => item.name.toLowerCase() === name.toLowerCase())) { setCategoryError("Cette catégorie existe déjà."); return; }
    setCategories((items) => [...items, { id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`, name, sortOrder: items.length + 1 }]);
    setCategoryName(""); setCategoryError("");
  };
  const renameCategory = (id: string, name: string) => {
    const value = name.trim();
    if (!value || categories.some((item) => item.id !== id && item.name.toLowerCase() === value.toLowerCase())) return;
    const previous = categories.find((item) => item.id === id)?.name;
    setCategories((items) => items.map((item) => item.id === id ? { ...item, name: value } : item));
    if (previous) setProducts((items) => items.map((item) => item.category === previous ? { ...item, category: value } : item));
  };
  const deleteCategory = (id: string) => {
    const target = categories.find((item) => item.id === id);
    if (!target) return;
    if (products.some((item) => item.category === target.name)) { setCategoryError("Cette catégorie contient encore un produit. Changez sa catégorie avant de la supprimer."); return; }
    if (categories.length <= 1) { setCategoryError("Gardez au moins une catégorie."); return; }
    if (window.confirm(`Supprimer la catégorie « ${target.name} » ?`)) setCategories((items) => items.filter((item) => item.id !== id));
  };
  const handleImage = (file?: File) => { if (!file) return; const reader = new FileReader(); reader.onload = () => updateProduct({ image: String(reader.result) }); reader.readAsDataURL(file); };
  const validateProduct = (product: Product) => {
    if (!product.name.trim()) return "Le nom du produit est obligatoire.";
    if (!Number.isFinite(product.price) || product.price <= 0) return "Le prix doit être supérieur à 0 F.";
    if (!categories.some((item) => item.name === product.category)) return "Choisissez une catégorie existante.";
    return "";
  };
  const saveDraft = () => {
    const error = products.map(validateProduct).find(Boolean) || "";
    if (error) { setFormError(error); return; }
    setFormError(""); localStorage.setItem("panini-gloire-editor-draft", JSON.stringify({ products, categories, site })); setSaved(true); window.setTimeout(() => setSaved(false), 2200);
  };
  const updatePinDigit = (index: number, value: string) => { const digit = value.replace(/\D/g, "").slice(-1); setPinDigits((current) => { const next = [...current]; next[index] = digit; setPin(next.join("")); return next; }); if (digit && index < 3) pinInputRefs.current[index + 1]?.focus(); };
  const handlePinPaste = (event: React.ClipboardEvent<HTMLInputElement>) => { event.preventDefault(); const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4).split(""); const next = ["", "", "", ""]; digits.forEach((digit, index) => { next[index] = digit; }); setPinDigits(next); setPin(next.join("")); pinInputRefs.current[Math.min(digits.length, 3)]?.focus(); };
  const handlePinKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => { if (event.key === "Backspace" && !pinDigits[index] && index > 0) pinInputRefs.current[index - 1]?.focus(); if (event.key === "ArrowLeft" && index > 0) pinInputRefs.current[index - 1]?.focus(); if (event.key === "ArrowRight" && index < 3) pinInputRefs.current[index + 1]?.focus(); };
  const login = async () => { setAuthError(""); if (pin.length !== 4) { setAuthError("Entrez les 4 chiffres du code PIN."); return; } const response = await fetch("/api/admin-auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin }) }); if (response.ok) { setAuthenticated(true); setPin(""); setPinDigits(["", "", "", ""]); } else setAuthError("PIN incorrect ou service indisponible."); };
  const publish = async () => { setPublishState("Publication en cours…"); try { const response = await fetch("/api/publish-content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ products, categories, site, message: "chore: update editorial content" }) }); if (response.ok) { setPublishState("Publication préparée. Le site sera mis à jour après reconstruction."); return; } if (response.status === 401) { setPublishState("Votre session a expiré. Reconnectez-vous au dashboard puis réessayez."); return; } if (response.status === 400) { setPublishState("Le brouillon est incomplet. Vérifiez les produits, les catégories et les informations du site."); return; } setPublishState("La publication est momentanément indisponible. Réessayez plus tard ou signalez-moi le problème."); } catch { setPublishState("Impossible de joindre le service de publication. Vérifiez votre connexion puis réessayez."); } };
  const downloadQr = () => {
    const svg = document.getElementById("panini-public-qr"); if (!svg) return;
    const svgUrl = URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml;charset=utf-8" }));
    const image = new Image();
    image.onload = () => { const canvas = document.createElement("canvas"); canvas.width = 800; canvas.height = 800; const context = canvas.getContext("2d"); if (!context) return; context.fillStyle = "#fffdf6"; context.fillRect(0, 0, 800, 800); context.drawImage(image, 24, 24, 752, 752); canvas.toBlob((png) => { if (!png) return; const url = URL.createObjectURL(png); const link = document.createElement("a"); link.href = url; link.download = "panini-de-la-gloire-qr.png"; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 500); }, "image/png"); URL.revokeObjectURL(svgUrl); };
    image.src = svgUrl;
  };
  const copyPublicLink = async () => { try { if (navigator.clipboard) await navigator.clipboard.writeText(publicSiteUrl); else { const input = document.createElement("textarea"); input.value = publicSiteUrl; input.style.position = "fixed"; input.style.opacity = "0"; document.body.appendChild(input); input.select(); document.execCommand("copy"); input.remove(); } setCopyNotice("Lien copié"); } catch { setCopyNotice("Copie impossible"); } window.setTimeout(() => setCopyNotice(""), 2200); };

  if (!authenticated) return <main className="admin-page admin-login-page"><section className="admin-login-card"><p className="eyebrow dark">PANINI DE LA GLOIRE</p><h1>CONFIGURATION</h1><p>Le PIN est vérifié côté serveur et n’est jamais intégré au bundle public.</p><label>ENTREZ VOTRE CODE PIN<div className="pin-inputs" role="group" aria-label="Code PIN à 4 chiffres">{pinDigits.map((digit, index) => <input key={index} ref={(element) => { pinInputRefs.current[index] = element; }} className="pin-input" autoFocus={index === 0} type="password" inputMode="numeric" maxLength={1} value={digit} aria-label={`Chiffre ${index + 1} sur 4`} onChange={(event) => updatePinDigit(index, event.target.value)} onPaste={handlePinPaste} onKeyDown={(event) => { handlePinKeyDown(index, event); if (event.key === "Enter") void login(); }} />)}</div></label><button className="primary-button" onClick={() => void login()}>Accéder au dashboard</button>{authError && <p className="auth-error">{authError}</p>}<Link href="/" className="back-link">Retour à l’application</Link></section></main>;

  return (
    <main className="admin-page">
      <header className="admin-topbar"><div><p className="eyebrow dark">ESPACE PRIVÉ</p><h1>CONFIGURATION</h1></div><Link href="/" className="back-link">Voir l’application</Link></header>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-brand"><span className="admin-brand-dot" /><strong>Panini de la Gloire</strong></div>
          <button className={active === "products" ? "admin-nav active" : "admin-nav"} onClick={() => setActive("products")}><LayoutDashboard size={18} /> Produits</button>
          <button className={active === "categories" ? "admin-nav active" : "admin-nav"} onClick={() => { setActive("categories"); setCategoryError(""); }}><LayoutDashboard size={18} /> Catégories</button>
          <button className={active === "site" ? "admin-nav active" : "admin-nav"} onClick={() => setActive("site")}><Settings2 size={18} /> Informations de l’application</button><button className={active === "documentation" ? "admin-nav active" : "admin-nav"} onClick={() => setActive("documentation")}><BookOpen size={18} /> Documentation</button>
          <div className="admin-sidebar-note"><strong>Publication GitHub</strong><p>Chaque validation prépare un commit versionné avant reconstruction Netlify.</p></div>
        </aside>
        <section className="admin-content">
          <div className="share-card"><div className="share-card-copy"><p className="eyebrow dark">OUTILS DE PARTAGE</p><h2>Votre lien de commande</h2><p>{publicSiteUrl}</p><div className="share-card-actions"><button className="share-button" type="button" onClick={() => void copyPublicLink()}><Copy size={17} /> {copyNotice || "Copier le lien"}</button><button className="share-button secondary" type="button" onClick={() => setQrExpanded(true)}><Expand size={17} /> Agrandir</button><button className="share-button secondary" type="button" onClick={downloadQr}><Download size={17} /> Télécharger</button></div></div><div className="qr-panel"><QRCodeSVG id="panini-public-qr" value={publicSiteUrl} size={176} bgColor="#fffdf6" fgColor="#541426" level="H" /><span>Scannez pour commander</span></div></div>
          {qrExpanded && <div className="qr-modal-backdrop" role="presentation" onClick={() => setQrExpanded(false)}><div className="qr-modal" role="dialog" aria-modal="true" aria-label="QR code de commande" onClick={(event) => event.stopPropagation()}><button className="icon-button" type="button" onClick={() => setQrExpanded(false)} aria-label="Fermer"><X size={20} /></button><QRCodeSVG value={publicSiteUrl} size={300} bgColor="#fffdf6" fgColor="#541426" level="H" /><strong>Scannez pour commander</strong><small>{publicSiteUrl}</small></div></div>}

          {active === "categories" && <div className="category-manager"><div className="admin-heading"><div><p className="eyebrow dark">ORGANISATION</p><h2>Les catégories</h2></div></div><div className="category-add-row"><input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Nouvelle catégorie" aria-label="Nom de la nouvelle catégorie" /><button className="primary-button" type="button" onClick={addCategory}>Ajouter</button></div>{categoryError && <p className="form-error" role="alert">{categoryError}</p>}<div className="category-list">{[...categories].sort((a, b) => a.sortOrder - b.sortOrder).map((item) => <div className="category-row" key={item.id}><input value={item.name} onChange={(event) => renameCategory(item.id, event.target.value)} aria-label={`Nom de la catégorie ${item.name}`} /><button className="delete-button" type="button" onClick={() => deleteCategory(item.id)} aria-label={`Supprimer la catégorie ${item.name}`}><Trash2 size={17} /></button></div>)}</div><p className="admin-help">Retirez d’abord les produits d’une catégorie avant de la supprimer.</p></div>}

          {active === "products" && <><div className="admin-heading"><div><p className="eyebrow dark">CATALOGUE</p><h2>Les recettes du jour</h2></div><div className="admin-heading-actions"><button className="secondary-button" type="button" onClick={addProduct}>Nouveau produit</button><button className="primary-button" onClick={saveDraft}>{saved ? <><Check size={17} /> Brouillon enregistré</> : <><Save size={17} /> Enregistrer le brouillon</>}</button></div></div><div className="admin-workspace"><div className="admin-list">{products.map((item) => <button className={selectedId === item.id ? "admin-product-row active" : "admin-product-row"} key={item.id} onClick={() => setSelectedId(item.id)}><span className="admin-thumb" style={{ backgroundImage: `url(${item.image})` }} /><span><strong>{item.name}</strong><small>{item.price} F · {item.available ? "Disponible" : "Rupture"}</small></span><span className={item.available ? "status-dot" : "status-dot off"} /></button>)}</div><div className="admin-form-card"><div className="admin-form-heading"><div><p className="eyebrow dark">FICHE PRODUIT</p><h3>{selected.name}</h3></div><button className="delete-button" type="button" onClick={deleteProduct} aria-label="Supprimer le produit"><Trash2 size={17} /></button></div>{formError && <p className="form-error" role="alert">{formError}</p>}<div className="product-preview"><img src={selected.image} alt={`Aperçu de ${selected.name}`} /><div><strong>Photo actuelle</strong><span>Elle se met à jour dès que vous choisissez une nouvelle image.</span></div></div><label>Nom du produit<input required value={selected.name} onChange={(event) => { setFormError(""); updateProduct({ name: event.target.value }); }} /></label><label>Description<textarea value={selected.description} onChange={(event) => updateProduct({ description: event.target.value })} rows={3} /></label><div className="admin-form-grid"><label>Prix (FCFA)<input required type="number" min={50} step={50} value={selected.price} onChange={(event) => { setFormError(""); updateProduct({ price: Number(event.target.value) }); }} /></label><label>Catégorie<select required value={selected.category} onChange={(event) => updateProduct({ category: event.target.value })}>{categories.map((item) => <option key={item.id}>{item.name}</option>)}</select></label></div><label className="admin-check"><input type="checkbox" checked={selected.available} onChange={(event) => updateProduct({ available: event.target.checked })} /> Produit disponible sur la carte</label><div className="upload-zone"><ImagePlus size={24} /><strong>Changer la photo</strong><span>JPG, PNG ou WebP · aperçu immédiat</span><label className="upload-button"><UploadCloud size={16} /> Choisir une image<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleImage(event.target.files?.[0])} /></label></div></div></div></>}

          {active === "site" && <><div className="admin-heading"><div><p className="eyebrow dark">IDENTITÉ ET SERVICE</p><h2>Les informations visibles</h2></div><button className="primary-button" onClick={saveDraft}><Save size={17} /> Enregistrer le brouillon</button></div><div className="site-form-card"><fieldset className="hero-picker"><legend>Hero affiché sur le site</legend><p className="admin-help">Choisissez un seul hero, puis enregistrez le brouillon.</p><div className="hero-picker-grid">{[{ id: "1", label: "Chaud & gourmand", detail: "Photo, accueil et proximité" }, { id: "2", label: "Street food moderne", detail: "Poster, énergie et commande" }, { id: "3", label: "Carte postale d’Abidjan", detail: "Quartier, adresse et repères" }].map((hero) => <label className={site.activeHero === hero.id ? "hero-choice active" : "hero-choice"} key={hero.id}><input type="radio" name="activeHero" value={hero.id} checked={site.activeHero === hero.id} onChange={(event) => setSite({ ...site, activeHero: event.target.value })} /><span><strong>Hero {hero.id} · {hero.label}</strong><small>{hero.detail}</small></span></label>)}</div></fieldset>{Object.entries(site).filter(([key]) => key !== "activeHero").map(([key, value]) => <label key={key}>{key === "brandName" ? "Nom de l’enseigne" : key === "locationLabel" ? "Libellé de localisation" : key === "address" ? "Adresse" : key === "phone" ? "WhatsApp" : key === "openingHours" ? "Horaires" : key === "heroEyebrow" ? "Sur-accroche de secours" : key === "heroTitle" ? "Accroche principale de secours" : key === "heroDescription" ? "Description de secours" : key === "serviceNote" ? "Note de service" : key === "deliveryNote" ? "Note livraison" : "Modèle WhatsApp"}{key === "heroDescription" ? <textarea rows={4} value={String(value)} onChange={(event) => setSite({ ...site, [key]: event.target.value })} /> : <input value={String(value)} onChange={(event) => setSite({ ...site, [key]: event.target.value })} />}</label>)}</div></>}

          {active === "documentation" && <div className="documentation-page"><div className="admin-heading"><div><p className="eyebrow dark">AIDE RAPIDE</p><h2>Documentation</h2></div></div><div className="documentation-intro"><strong>Les gestes essentiels de Marina</strong><p>Une aide simple pour garder la carte à jour et répondre aux clients.</p></div><div className="documentation-grid"><article className="documentation-card"><p className="eyebrow dark">LA CARTE</p><h3>Gérer les produits</h3><p>Dans <strong>Produits</strong>, modifiez le nom, la description, le prix, la catégorie ou la disponibilité. En cas de rupture, décochez la disponibilité : la photo reste visible, mais le bouton d’ajout devient grisé.</p><p>Pour changer une photo, choisissez une image dans la fiche du produit. La miniature se met à jour tout de suite, puis vous pouvez enregistrer le brouillon.</p></article><article className="documentation-card"><p className="eyebrow dark">LE SERVICE</p><h3>Mettre à jour l’accueil</h3><p>Dans <strong>Catégories</strong>, ajoutez, renommez ou supprimez une catégorie sans produit associé. Dans <strong>Informations de l’application</strong>, choisissez un hero et modifiez les informations utiles.</p><p>Après une publication, ouvrez la carte comme un client pour vérifier la photo, le prix, le bouton d’ajout et WhatsApp.</p></article></div><div className="documentation-faq"><p className="eyebrow dark">RÉPONSES CLIENTS</p><h3>FAQ</h3><details open><summary>Comment commander ?</summary><p>Ouvrez le lien, choisissez vos produits, vérifiez le total, indiquez vos coordonnées et envoyez la demande sur WhatsApp.</p></details><details><summary>Faut-il créer un compte ?</summary><p>Non. Le client indique simplement son nom et son numéro pour être recontacté.</p></details><details><summary>Le paiement se fait-il dans l’application ?</summary><p>Non. Il n’y a pas de paiement en ligne. Les modalités sont confirmées directement avec Marina, sur place ou à la livraison.</p></details><details><summary>Que faire si un produit est indisponible ?</summary><p>Répondez que le produit est momentanément indisponible et proposez une autre recette disponible.</p></details><details><summary>La commande part-elle automatiquement ?</summary><p>Non. Le client doit ouvrir WhatsApp, vérifier le message et appuyer sur Envoyer.</p></details></div></div>}

          <div className="publish-strip"><div><strong>Prêt à publier ?</strong><span>{publishState || "Le prochain envoi créera une proposition de commit GitHub."}</span></div><button className="publish-button" onClick={() => void publish()}><UploadCloud size={18} /> Préparer la publication</button></div>
        </section>
      </div>
    </main>
  );
}
