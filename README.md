# Panini de la Gloire

Application web de commande pour **Panini de la Gloire**, à Abidjan. Le site présente une carte de produits, permet de composer un panier et prépare une commande à envoyer sur WhatsApp.

## Fonctionnalités

- Catalogue de produits chargé depuis des fichiers JSON.
- Recherche et filtrage par catégories.
- Panier conservé dans le navigateur avec `localStorage`.
- Calcul du total en francs CFA.
- Parcours de commande avec choix **Sur place** ou **Livraison**.
- Lien Google Maps pour le retrait sur place.
- Préparation d’un message WhatsApp contenant les informations de commande.
- Affichage des produits en une seule colonne sur téléphone.
- Badge « HOT! » et état de rupture de stock.
- Espace privé de configuration pour Marina.
- Gestion des produits, des catégories et des informations du site.
- Génération, agrandissement, téléchargement et partage d’un QR code.
- Publication des fichiers JSON via GitHub, puis reconstruction du site par Netlify.

## Technologies

- React 19
- Vite
- TypeScript
- Tailwind CSS 4 et CSS personnalisé
- Wouter pour la navigation
- Lucide React pour les icônes
- Netlify Functions pour l’authentification privée et la publication
- GitHub comme source de publication des données éditoriales
- Fichiers JSON comme source de données du catalogue

## Organisation principale

```text
client/
  public/
    data/
      products.json       Catalogue des produits
      categories.json     Catégories du catalogue
      site.json            Informations visibles du site
  src/
    components/           Composants réutilisables
    pages/
      Home.tsx            Catalogue public et panier
      Admin.tsx           Espace privé de configuration
    index.css             Identité visuelle et responsive

netlify/
  functions/
    admin-auth.ts         Connexion de l’espace privé
    publish-content.ts    Publication des fichiers éditoriaux

brief-marina.md           Guide sans jargon destiné à Marina
validation-dashboard.md   Compte rendu des contrôles
netlify-build-incident.md Diagnostic des anciens échecs Netlify
todo.md                   Suivi des étapes du projet
```

## Développement local

Installer les dépendances puis lancer le serveur de développement :

```bash
pnpm install
pnpm run dev
```

Le projet utilise généralement le port `3000`. Si ce port est occupé, Vite choisit automatiquement le port suivant et affiche l’adresse locale dans le terminal.

Vérifier le typage et construire la version de production :

```bash
pnpm run check
pnpm run build
```

Le build produit les fichiers du site dans `dist/public` et regroupe également la fonction serveur prévue par le projet.

## Données éditoriales

Les produits, catégories et informations publiques sont stockés dans des fichiers JSON. Toute modification doit conserver les noms de champs existants afin de ne pas casser le catalogue ou le panier.

Pour un produit, vérifier notamment :

- `id`
- `name`
- `description`
- `price`
- `category`
- `image`
- `available`
- `badge`

Quand `available` vaut `false`, la photo reste visible sur le site public, mais le bouton d’ajout est désactivé et affiche la rupture de stock.

## Publication

Le flux recommandé est toujours :

1. Modifier et tester localement.
2. Lancer `pnpm run check`.
3. Lancer `pnpm run build`.
4. Vérifier le rendu dans le navigateur.
5. Mettre à jour `brief-marina.md` lorsque la modification est visible ou concerne son utilisation.
6. Créer un commit local descriptif.
7. Pousser le commit sur GitHub, branche `main`.
8. Vérifier le déploiement Netlify et le site public.

Ne jamais inscrire de code d’accès, de jeton GitHub ou de secret dans le code, les fichiers JSON ou la documentation publique. Les variables sensibles doivent rester dans la configuration Netlify.

## Identité visuelle

L’interface utilise une identité chaleureuse et locale : jaune maïs, orangé toasté, rouge/bordeaux et marron cacao. Aucun vert ne doit être ajouté aux éléments d’interface. Les titres sont forts, les actions principales sont visibles et l’affichage mobile privilégie une lecture simple, avec une carte produit par ligne.

## Limites actuelles

L’application ne prend pas encore de paiement en ligne, n’enregistre pas automatiquement les commandes dans une caisse, ne propose pas de suivi d’état de commande et ne choisit pas de livreur. La commande est préparée dans WhatsApp ; le client doit vérifier le message et l’envoyer lui-même.

## Documentation associée

Le guide opérationnel destiné à Marina se trouve dans [`brief-marina.md`](./brief-marina.md). Il doit être mis à jour après chaque évolution visible du site ou de l’espace privé.

Les décisions UI/UX et le suivi détaillé du projet sont conservés dans les fichiers Markdown présents à la racine du dépôt.
