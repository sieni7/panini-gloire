# Analyse de faisabilité des nouvelles fonctionnalités

## Conclusion générale

Les fonctionnalités proposées sont réalisables sans casser l’application actuelle, à condition de les ajouter progressivement et de conserver les fichiers JSON comme source principale du menu et des informations de l’enseigne.

Les fonctions de partage et de QR code sont les plus simples : elles peuvent fonctionner directement dans le navigateur, sans modifier les produits ni les commandes. La gestion complète des produits est également possible, mais elle doit respecter une règle importante : le site public utilise des fichiers JSON et une modification ne devient visible qu’après l’enregistrement et la publication du fichier concerné.

Le point le plus sensible concerne les photos. Choisir une photo et l’afficher dans le dashboard est simple. Rendre cette photo définitivement visible pour tous les clients demande un enregistrement sécurisé de l’image et une publication contrôlée. Il ne faut donc pas promettre une mise à jour instantanée sans cette étape.

## 1. Compatibilité avec les fichiers JSON actuels

Le fichier `products.json` contient déjà les informations nécessaires pour chaque produit : identifiant, nom, description, prix, catégorie, disponibilité, ordre d’affichage, image et badge éventuel.

Le fichier `site.json` contient déjà les informations générales : nom de l’enseigne, localisation, adresse, téléphone WhatsApp, texte d’accueil, horaires et informations de service.

| Fonction demandée | Peut utiliser le JSON actuel ? | Modification conseillée |
|---|---:|---|
| Partager le lien du site | Oui | Aucune modification du menu. |
| Afficher un QR code | Oui | Le QR code est créé à partir de l’adresse du site. |
| Modifier un produit existant | Oui | Utiliser les champs déjà présents. |
| Changer le prix ou la description | Oui | Garder le prix en nombre et le texte en texte simple. |
| Cacher un produit en rupture | Oui | Passer `available` à `false`, sans supprimer la photo. |
| Ajouter un badge comme « HOT! » | Oui | Utiliser le champ `badge`. |
| Modifier le nom, l’adresse ou WhatsApp | Oui | Utiliser les champs déjà présents dans `site.json`. |
| Supprimer définitivement un produit | Possible, mais à protéger | Préférer d’abord le cacher pour éviter une suppression accidentelle. |
| Garder une corbeille | Pas encore | Ajouter un champ de mise à l’écart plutôt que supprimer la ligne. |
| Enregistrer les commandes | Non avec le JSON actuel | Demande un espace séparé et permanent pour les commandes. |
| Calculer les statistiques | Non avec le JSON actuel | Impossible de calculer des ventes fiables sans historique de commandes. |

## 2. Faisabilité des fonctions de partage

### Partage côté client

Le bouton de partage peut être placé dans l’en-tête et sur la page de confirmation. Sur un téléphone compatible, il ouvrira le panneau de partage habituel. Sur les autres appareils, l’application pourra copier l’adresse du site et afficher « Lien copié ».

Cette fonction ne touche ni aux produits ni au panier. Elle présente donc un très faible risque pour le reste du site.

### Partage depuis le dashboard

Marina peut disposer d’un encart « Votre lien de commande » avec l’adresse publique et un bouton « Copier le lien ». Cette fonction est indépendante des fichiers produits et peut être ajoutée sans changer la structure du catalogue.

Il faut afficher l’adresse du site client, et non l’adresse du dashboard. Le dashboard doit rester privé.

### QR code

Le QR code peut être créé à partir de l’adresse publique du site. Il peut être affiché en grand, agrandi et téléchargé comme image. Le texte « Scannez pour commander » peut être placé sous le code lors de l’impression.

Le QR code ne stocke aucune donnée client et ne modifie aucun fichier JSON. Il renvoie simplement vers la page d’accueil du site. C’est donc une fonctionnalité très sûre pour l’architecture actuelle.

## 3. Faisabilité de la gestion des produits

### Modifier un produit existant

C’est la fonction la plus compatible avec le fonctionnement actuel. Le dashboard peut afficher une fiche avec le nom, la description, le prix, la catégorie, la disponibilité, le badge et l’image.

Pour éviter les erreurs, le prix doit être contrôlé avant l’enregistrement, le nom doit être obligatoire et la catégorie doit rester limitée à **Panini** ou **Chawarma**. L’identifiant du produit ne doit pas être modifié par erreur, car il sert à retrouver le produit dans le panier.

### Ajouter un produit

C’est réalisable, mais il faut prévoir un nouvel identifiant unique et un ordre d’affichage. Le nouveau produit doit respecter le même format que les autres produits. Si un champ obligatoire manque, il ne faut pas publier la modification.

La nouvelle fiche peut être créée dans le dashboard, puis proposée à la publication. Elle ne doit pas apparaître sur le site public avant que le fichier soit correctement enregistré.

### Cacher un produit en rupture

C’est la solution recommandée pour les ruptures. Il suffit de conserver la fiche, la photo et le prix, puis de mettre la disponibilité sur « non disponible ».

Sur le site client, la photo reste en couleur et le bouton « Ajouter » devient gris et inutilisable. Marina pourra réactiver le produit plus tard sans recréer toute sa fiche.

### Supprimer un produit

La suppression définitive est possible, mais elle présente un risque inutile. Une erreur de clic pourrait faire disparaître une fiche, sa photo et son ordre d’affichage.

La meilleure solution est de proposer d’abord **Cacher le produit**. Une suppression définitive peut rester réservée à une deuxième confirmation, avec une phrase claire indiquant que l’action ne peut pas être annulée.

## 4. Faisabilité de la gestion des photos

Le dashboard peut permettre à Marina de choisir une photo depuis son téléphone et d’en voir un aperçu. Cette étape ne modifie pas encore le site public.

Pour que la photo soit réellement visible par les clients, elle doit être enregistrée dans un emplacement public stable, puis associée au produit dans `products.json`. Il faut également vérifier le format, la taille et le nom du fichier afin d’éviter les images cassées sur Netlify.

La règle à conserver est la suivante : **une photo choisie dans le téléphone n’est pas considérée comme publiée tant que le site public n’a pas été vérifié**.

Les photos doivent être différentes lorsque les recettes sont différentes. Réutiliser la même image pour plusieurs produits peut créer une confusion pour les clients.

## 5. Ce qui n’est pas faisable avec le JSON seul

Le JSON convient très bien pour la carte et les informations de l’enseigne. Il ne convient pas à lui seul pour conserver les commandes, les paiements ou les statistiques.

| Besoin | Pourquoi le JSON du menu ne suffit pas |
|---|---|
| Liste permanente des commandes | Le fichier du menu ne reçoit pas automatiquement les commandes des clients. |
| Statistiques de ventes | Il faut connaître les commandes réellement reçues et leur état. |
| Paiement en ligne | Il faut un service de paiement séparé et sécurisé. |
| Suivi « Nouvelle, Prête, Livrée » | Il faut conserver un état pour chaque commande. |
| Notifications automatiques | Il faut un service capable d’envoyer et de conserver ces notifications. |

Ces fonctions pourront être ajoutées plus tard, mais elles doivent rester séparées du fichier `products.json` afin de ne pas fragiliser le catalogue.

## 6. Règles pour ne pas casser l’application

Chaque ajout doit être fait dans une petite étape indépendante. Le catalogue doit continuer à fonctionner même si le dashboard est temporairement indisponible. C’est pourquoi le site public doit garder un contenu de secours local lorsque les fichiers JSON ne peuvent pas être lus.

Les noms des champs existants ne doivent pas changer. Les nouveaux champs, comme `badge`, doivent rester facultatifs. Un produit sans badge doit continuer à s’afficher normalement.

Les boutons « Ajouter », « Partager », « Copier » et « Télécharger » doivent avoir un état clair lorsqu’ils ne sont pas disponibles. Aucun bouton ne doit sembler fonctionner alors que l’action n’a pas été enregistrée.

Après chaque modification, il faut vérifier quatre choses : le catalogue, le panier, le checkout et le dashboard. Il faut ensuite faire une copie de sécurité, vérifier le site sur téléphone et publier seulement si tout reste correct.

## 7. Ordre de réalisation recommandé

| Étape | Fonction | Niveau de risque | Décision |
|---:|---|---:|---|
| 1 | Partager le lien côté client | Très faible | À faire en premier. |
| 2 | Copier le lien dans le dashboard | Très faible | À faire avec l’étape 1. |
| 3 | Afficher et télécharger le QR code | Faible | À faire ensuite. |
| 4 | Modifier prix, nom, description et disponibilité | Faible à moyen | À faire avec contrôle des champs. |
| 5 | Prévisualiser une nouvelle photo | Moyen | À faire avant la publication réelle. |
| 6 | Publier une nouvelle photo | Moyen à élevé | À tester avec une seule photo. |
| 7 | Ajouter un produit | Moyen | À faire après validation des produits existants. |
| 8 | Supprimer définitivement un produit | Élevé | À reporter ou remplacer par « Cacher ». |
| 9 | Commandes, paiements et statistiques | Hors périmètre JSON | À traiter dans un projet séparé. |

## Recommandation finale

Les fonctions de partage, de QR code, de modification des produits existants et de gestion des ruptures sont compatibles avec le projet actuel et peuvent être ajoutées sans refaire le site.

Pour protéger l’application, je recommande de commencer par **Partager le lien**, **Copier le lien dans le dashboard** et **QR code**. Ensuite, il faudra finaliser la fiche produit avec le prix, la description et la disponibilité. La gestion réelle des photos viendra après un test contrôlé.

Il est préférable de ne pas ajouter tout de suite les commandes permanentes, les paiements en ligne ou les statistiques. Ces fonctions dépassent le rôle des fichiers JSON du menu et demandent une organisation séparée.
