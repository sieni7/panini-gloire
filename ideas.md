# Panini de la Gloire — Direction visuelle React

## Référence retenue

La référence visuelle est l’expérience existante de `https://panini-gloire.netlify.app/` et la capture fournie par l’utilisateur. Le nouveau projet React doit conserver son identité reconnaissable tout en repartir sur une base technique propre, plus robuste et plus lisible.

## Design Movement

**Afro-modern convivial** : une identité de restauration rapide locale qui combine l’énergie solaire d’Abidjan, une composition éditoriale audacieuse et des détails tactiles inspirés de l’affichage de quartier.

## Core Principles

1. **Impact immédiat** : le premier écran doit communiquer le lieu, la promesse et l’action principale sans détour.
2. **Chaleur maîtrisée** : le vert de marque porte l’énergie et la fraîcheur ; les tons crème et jaune rappellent le pain toasté et la cuisine minute.
3. **Commande sans friction** : chaque interaction doit réduire l’effort entre le choix d’un produit et la confirmation WhatsApp.
4. **Clarté locale** : les prix en FCFA, la localisation précise et les modalités de réception restent visibles et compréhensibles.

## Color Philosophy

Le **vert gloire** exprime la fraîcheur, la confiance et la vitalité. Le crème ivoire évite l’apparence froide d’une interface purement numérique ; le jaune maïs agit comme accent alimentaire et repère d’action. Le noir cacao donne une assise premium aux zones de panier et aux informations importantes.

## Layout Paradigm

Une composition verticale éditoriale : en-tête compact, hero large à dominante gauche, menu organisé en cartes, puis panier fixé en bas sur mobile. Les sections utilisent des alignements décalés, des masses de couleur et une hiérarchie asymétrique plutôt qu’un simple empilement centré.

## Signature Elements

Le projet reprend un **hero vert en dégradé**, un **panier noir cacao fixé** et des **accents jaunes en pastilles ou onglets**. Les arrondis sont généreux sur les surfaces interactives mais réservés aux zones qui évoquent réellement un emballage ou une assiette.

## Interaction Philosophy

Les actions doivent répondre immédiatement : pression visuelle courte, ajout au panier confirmé, tiroir de panier lisible et formulaire guidé. Les erreurs sont formulées comme des indications utiles, jamais comme des messages techniques.

## Animation

Les interactions utilisent des transitions de 140 à 220 ms, principalement sur transform et opacity. Les cartes apparaissent avec un léger décalage séquentiel ; le panier s’ouvre depuis son point d’ancrage ; les animations non essentielles respectent `prefers-reduced-motion`.

## Typography System

Titres : **Plus Jakarta Sans**, très gras, avec des blocs courts et une interligne serrée. Corps : **DM Sans**, lisible sur mobile. Les prix utilisent un poids fort et une taille suffisamment grande pour être repérés en moins d’une seconde. Le nom du lieu est en capitales espacées comme une signature de façade.

## Brand Essence

**La pause chaude et généreuse d’Abidjan, pensée pour commander vite et partager la bonne adresse.**

Personnalité : **solaire, généreuse, directe**.

## Brand Voice

Les titres sont francs, appétissants et légèrement théâtraux. Les CTA sont verbaux et rassurants ; les microcopies restent courtes, locales et orientées action.

Exemples : **« La pause qui mérite une ovation. »** et **« Votre commande est prête à rejoindre Marina sur WhatsApp. »**

## Wordmark & Logo

Le symbole est une **couronne abstraite formée de trois pointes de pain toasté**, dessinée en aplat vert gloire et jaune maïs, sans texte. Le wordmark utilise le nom en capitales compactes avec une ligature visuelle entre les deux mots ; il ne doit pas être remplacé par un simple texte générique dans le logo.

## Signature Brand Color

**Vert gloire — `#087F45`**. Cette couleur doit rester le repère visuel propriétaire du projet, avec des variations lumineuses réservées aux surfaces et aux états actifs.

## Contraintes fonctionnelles héritées

Le catalogue de référence contient Panini Simple à 500 F, Panini Viande à 1 000 F, Panini Jambon à 1 500 F, Panini Jambon Fromage à 2 000 F et Chawarma Poulet à 1 500 F. La localisation est **« Adjamé Bingerville • En face de BonPrix »** et le parcours de commande se termine par WhatsApp.

## Style Decisions

La marque doit apparaître comme une enseigne propriétaire : symbole couronne en trois pointes de pain toasté et nom compact, sans dépendre d’un simple texte standard. Le motif d’affichage de quartier sera renforcé par des pastilles jaune maïs, des tickets courts et des aplats bordeaux/cacao. Les images produit doivent représenter des paninis et chawarmas chauds, toastés et généreux ; les images génériques de burger/frites ne conviennent pas. Les CTA doivent parler avec une énergie locale et directe, tandis que la composition doit assumer davantage les ruptures éditoriales et les blocs de couleur.

## Vérification visuelle

La première passe desktop et mobile confirme une composition claire : hero bordeaux et jaune, photographie de panini toasté, logo visible, panier fixé et checkout avec état vide compréhensible. Le mobile conserve une bonne lisibilité et une action « Voir le menu » accessible. Le logo généré apparaît avec un fond rose résiduel dans l’aperçu ; ce point devra être corrigé ou remplacé par une version réellement transparente avant la livraison finale.
