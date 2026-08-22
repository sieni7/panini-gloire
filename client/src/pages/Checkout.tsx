import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, MapPin, MessageCircle } from "lucide-react";

// Style reminder: burgundy shell, maize actions, toasted orange guidance, calm ivory form surfaces.
const formatCFA = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} F`;

type CartLine = { name: string; price: number; quantity: number };

const readCart = (): CartLine[] => {
  try {
    const stored = JSON.parse(localStorage.getItem("panini-gloire-cart") || "[]");
    const candidate = Array.isArray(stored) ? stored : stored?.items;
    return Array.isArray(candidate) ? candidate.filter((item) => item && typeof item.name === "string" && typeof item.price === "number" && typeof item.quantity === "number" && item.quantity > 0) : [];
  } catch {
    return [];
  }
};

export default function Checkout() {
  const [, navigate] = useLocation();
  const [cart] = useState<CartLine[]>(readCart);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<"sur_place" | "livraison">("sur_place");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) return setError("Indiquez votre nom pour que Marina vous reconnaisse.");
    if (!/^\+225\s?(?:\d{2}\s?){5}$/.test(phone.trim())) return setError("Le téléphone doit suivre le format +225 XX XX XX XX XX.");
    if (type === "livraison" && address.trim().length < 5) return setError("Ajoutez l’adresse de livraison.");
    const orderId = `TEST-${Date.now().toString().slice(-6)}`;
    const message = encodeURIComponent(["*Nouvelle commande — Panini de la Gloire*", `Référence : ${orderId}`, `Client : ${name.trim()}`, `Téléphone : ${phone.trim()}`, `Réception : ${type === "livraison" ? "Livraison" : "Sur place"}`, type === "livraison" ? `Adresse : ${address.trim()}` : "", "", ...cart.map((item) => `• ${item.quantity} × ${item.name} — ${formatCFA(item.price * item.quantity)}`), `*Total : ${formatCFA(total)}*`].filter(Boolean).join("\n"));
    localStorage.setItem("panini-gloire-last-order", JSON.stringify({ orderId, total, message, name, phone, type, address }));
    navigate("/confirmation");
  };

  if (!cart.length) return <main className="empty-page"><p className="eyebrow dark">VOTRE PANIER EST VIDE</p><h1>On vous attend au menu.</h1><Link href="/" className="primary-button">Retourner à la carte <ArrowRight size={18} /></Link></main>;

  return <main className="checkout-page"><Link href="/" className="back-link"><ArrowLeft size={17} /> Retour au menu</Link><div className="checkout-layout"><section><p className="eyebrow dark">DERNIÈRE LIGNE DROITE</p><h1>On prépare votre pause.</h1><p className="checkout-intro">Laissez vos coordonnées, Marina reçoit le récapitulatif sur WhatsApp.</p><form onSubmit={submit} className="checkout-form"><label>Votre nom<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex. Aïcha Kouamé" autoComplete="name" /></label><label>Téléphone ivoirien<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+225 05 74 97 10 22" inputMode="tel" autoComplete="tel" /></label><fieldset><legend>Comment vous recevez votre commande ?</legend><label className="choice"><input type="radio" checked={type === "sur_place"} onChange={() => setType("sur_place")} /> <span><strong>Sur place</strong><small>Adjamé Bingerville</small></span></label><label className="choice"><input type="radio" checked={type === "livraison"} onChange={() => setType("livraison")} /> <span><strong>Livraison</strong><small>On vous appelle pour préciser</small></span></label></fieldset>{type === "livraison" && <label>Adresse<input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Quartier, rue, repère" autoComplete="street-address" /></label>}{error && <p className="form-error" role="alert">{error}</p>}{type === "livraison" && <p className="delivery-fee-note" role="note">Les frais de livraison sont à régler directement au livreur.</p>}<button className="primary-button submit-button" type="submit"><MessageCircle size={18} /> Préparer WhatsApp <ArrowRight size={18} /></button></form></section><aside className="order-summary"><p className="eyebrow dark">RÉCAPITULATIF</p><h2>Votre sélection</h2>{cart.map((item) => <div className="summary-line" key={item.name}><span>{item.quantity} × {item.name}</span><strong>{formatCFA(item.price * item.quantity)}</strong></div>)}<div className="summary-total"><span>Total</span><strong>{formatCFA(total)}</strong></div><p className="location-note"><MapPin size={17} /> Adjamé Bingerville<br />En face de BonPrix</p></aside></div></main>;
}
