import { useState } from "react";
import { ArrowLeft, CheckCircle2, ExternalLink, MessageCircle } from "lucide-react";
import { Link } from "wouter";

// Style reminder: confirmation chaleureuse en bordeaux, jaune maïs et ivoire, avec une action WhatsApp nette.

type LastOrder = {
  orderId: string;
  total: number;
  message: string;
  name: string;
};

const formatCFA = (value: number) => `${new Intl.NumberFormat("fr-FR").format(value)} F`;

const readLastOrder = (): LastOrder | null => {
  try {
    const parsed = JSON.parse(localStorage.getItem("panini-gloire-last-order") || "null");
    return parsed && typeof parsed.orderId === "string" && typeof parsed.total === "number" && typeof parsed.message === "string" ? parsed : null;
  } catch {
    return null;
  }
};

export default function Confirmation() {
  const [order] = useState<LastOrder | null>(readLastOrder);

  if (!order) {
    return <main className="empty-page"><p className="eyebrow dark">AUCUNE COMMANDE À AFFICHER</p><h1>Votre panier vous attend.</h1><Link href="/" className="primary-button"><ArrowLeft size={18} /> Retour au menu</Link></main>;
  }

  const whatsappHref = `https://wa.me/2250574971022?text=${order.message}`;

  return <main className="confirmation-page"><section className="confirmation-card"><div className="confirmation-check"><CheckCircle2 size={34} /></div><p className="eyebrow dark">COMMANDE PRÉPARÉE</p><h1>Merci {order.name.trim() || "à vous"}.</h1><p className="confirmation-lead">Votre récapitulatif est prêt. Il ne reste plus qu’à l’envoyer à Marina sur WhatsApp.</p><div className="confirmation-reference"><span>Référence</span><strong>{order.orderId}</strong></div><div className="confirmation-total"><span>Total</span><strong>{formatCFA(order.total)}</strong></div><details className="whatsapp-preview"><summary>Voir le message qui sera envoyé</summary><pre>{decodeURIComponent(order.message)}</pre></details><a className="primary-button whatsapp-button" href={whatsappHref} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Ouvrir WhatsApp <ExternalLink size={16} /></a><Link href="/" className="back-link">Retourner au menu</Link></section></main>;
}
