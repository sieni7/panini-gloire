# Plan d’actions prudent pour Panini de la Gloire

## Objectif

Ajouter les fonctions de partage, de QR code et de gestion du menu sans casser l’affichage actuel, le panier, le checkout ou le dashboard Marina.

Le site garde son fonctionnement actuel : `products.json` contient les produits, `site.json` contient les informations de l’enseigne, et la publication rend les changements visibles sur le site public. Une modification n’est pas considérée comme terminée tant que le site public n’a pas été vérifié.

## Correction importante du plan initial

Le plan initial prévoit parfois que Marina modifie directement les fichiers JSON depuis son navigateur. Ce n’est pas la bonne description du fonctionnement actuel. Marina utilise le dashboard ; le dashboard prépare la modification et la publication. Le navigateur ne doit pas écrire directement dans les fichiers du site.

De même, une nouvelle photo choisie sur le téléphone peut être prévisualisée immédiatement, mais elle ne devient pas automatiquement publique sans une étape d’enregistrement et de publication. Il faut donc séparer clairement **aperçu** et **publication**.

Enfin, une modification du menu n’est pas forcément visible au même instant. Il faut enregistrer, publier, attendre la mise à jour du site, puis actualiser la page publique.

## Règles à appliquer à chaque étape

| Règle | Application concrète |
|---|---|
| Travailler d’abord localement | La fonction est ajoutée et testée sans toucher au site public. |
| Garder une copie des JSON | Copier `products.json` et `site.json` hors du projet avant une évolution importante. |
| Ne pas changer les champs existants | Conserver `id`, `name`, `description`, `price`, `category`, `available`, `sortOrder`, `image` et `badge`. |
| Faire une seule évolution à la fois | Ne pas mélanger partage, QR code et ajout de produits dans le même changement. |
| Vérifier les écrans principaux | Tester accueil, catalogue, panier, checkout, confirmation et dashboard. |
| Tester mobile et ordinateur | Vérifier au minimum un téléphone et un ordinateur avant publication. |
| Synchroniser seulement après validation | Build local, test, récupération de la dernière version, commit, push et contrôle du site public. |
| Ne jamais mettre de code secret dans les documents | Le code du dashboard reste uniquement dans les variables protégées de Netlify. |

## Étape 0 — Préparation

**But :** partir d’une copie propre.

1. Récupérer la dernière version de la branche `main`.
2. Vérifier que la copie locale n’a pas de modification oubliée.
3. Sauvegarder `products.json` et `site.json` hors du projet.
4. Ouvrir le site local et vérifier que la carte, le panier et le checkout fonctionnent.
5. Lancer le contrôle du projet et le build local.
6. Ne publier que si ces vérifications réussissent.

Cette étape ne demande aucun nouveau champ dans les JSON.

## Étape 1 — Partager le lien côté client

**But :** permettre au client de partager la page de commande.

Le bouton sera placé dans l’en-tête, à côté des actions déjà présentes. Un second bouton pourra être placé sur la page de confirmation.

Sur un téléphone compatible, le bouton proposera le partage habituel. Sur un autre appareil, il copiera l’adresse du site et affichera un message simple : **Lien copié**.

Cette fonction ne modifie ni `products.json`, ni `site.json`, ni le panier. C’est la première évolution recommandée, car elle présente peu de risques.

**Tests obligatoires :** bouton visible sur téléphone, copie correcte sur ordinateur, aucun changement dans le panier, retour possible vers la carte.

## Étape 2 — Copier le lien depuis le dashboard

**But :** permettre à Marina de copier rapidement l’adresse publique.

Ajouter une carte **Votre lien de commande** dans le dashboard. Elle doit afficher l’adresse du site client, jamais l’adresse privée du dashboard.

Le bouton **Copier le lien** doit afficher une confirmation courte. Cette fonction ne nécessite aucune modification du JSON.

**Tests obligatoires :** accès avec le code communiqué séparément, adresse correcte, copie réussie, fonctionnement même si le QR code n’est pas encore installé.

## Étape 3 — Afficher et télécharger le QR code

**But :** permettre à Marina de montrer ou d’imprimer un QR code qui ouvre la carte.

Le QR code sera créé à partir de l’adresse publique du site. Il ne contiendra aucune donnée client et ne modifiera pas les produits. Il devra être lisible à une taille minimale de 200 pixels, affichable en grand et téléchargeable comme image.

Le texte **Scannez pour commander** peut être affiché sous le QR code sans être enregistré dans `products.json`. Si Marina veut changer ce texte, il pourra plus tard être ajouté à `site.json` comme champ facultatif.

**Tests obligatoires :** lecture avec un autre téléphone, ouverture de la bonne page, téléchargement d’une image, impression lisible.

## Étape 4 — Modifier un produit existant

**But :** permettre à Marina de modifier le nom, le prix, la description et la disponibilité.

Le dashboard doit afficher un formulaire simple. Le champ `id` ne doit jamais être modifiable. Le nom et le prix sont obligatoires. Le prix doit rester un nombre positif et la catégorie doit rester **Panini** ou **Chawarma**.

La disponibilité doit utiliser le champ `available`. Lorsque ce champ passe à `false`, le site conserve la photo en couleur et désactive le bouton **Ajouter**.

La modification doit être préparée avant publication. Le dashboard doit afficher clairement si le changement est encore un brouillon ou s’il a été publié.

**Tests obligatoires :** modifier un prix de test, vérifier le panier, vérifier le format du JSON, publier, puis vérifier le prix sur le site public.

## Étape 5 — Prévisualiser une photo

**But :** permettre à Marina de vérifier une photo avant de l’enregistrer.

Le dashboard peut lire une photo choisie depuis le téléphone et afficher un aperçu temporaire. Tant que Marina n’a pas confirmé l’enregistrement, le JSON et le site public ne doivent pas changer.

La photo doit être contrôlée avant publication : format courant, taille raisonnable, image réellement lisible et cadrage correct sur téléphone.

**Tests obligatoires :** choisir une photo, vérifier l’aperçu, annuler, confirmer que l’ancien visuel reste public.

## Étape 6 — Publier une photo

**But :** rendre une nouvelle photo visible aux clients de manière fiable.

Cette fonction est plus sensible que le simple aperçu. La photo doit être enregistrée dans un emplacement public stable, puis son chemin doit être associé au produit dans `products.json`. Il ne faut pas utiliser un chemin temporaire qui fonctionne seulement sur l’ordinateur de Marina.

Le dashboard doit refuser les fichiers trop lourds et afficher un message clair. Une seule photo doit être testée en premier avant de généraliser la fonction.

**Tests obligatoires :** aperçu, confirmation, publication, ouverture de l’image sur le site public, actualisation sur téléphone et ordinateur.

## Étape 7 — Ajouter un produit

**But :** permettre à Marina de créer une nouvelle recette.

Le formulaire demande le nom, le prix, la catégorie et, si possible, une description et une photo. L’identifiant est créé automatiquement. L’ordre d’affichage est placé à la fin, sauf si une règle différente est décidée plus tard.

Le produit doit être enregistré avec les mêmes champs que les produits existants. Un produit incomplet ne doit pas être publié.

**Tests obligatoires :** créer un produit temporaire, vérifier son affichage, l’ajouter au panier, puis le retirer ou le cacher avant toute publication réelle.

## Étape 8 — Cacher et réactiver un produit

**But :** gérer les ruptures sans supprimer une fiche.

Le dashboard doit proposer un interrupteur simple. Lorsque Marina désactive le produit, celui-ci reste conservé dans le menu de gestion. Sur le site public, sa photo reste visible et son bouton **Ajouter** est grisé et désactivé.

Cette fonction est préférable à la suppression définitive, car elle permet de réactiver rapidement une recette lorsque les ingrédients sont de nouveau disponibles.

## Étape 9 — Ne pas ajouter la suppression définitive pour l’instant

La suppression définitive doit rester absente de la première version. Pour retirer un produit de la vente, Marina utilise **Cacher le produit**. Si un produit doit vraiment disparaître, la demande peut être traitée séparément après sauvegarde.

Cela évite une disparition accidentelle du produit, de sa photo et de son ordre d’affichage.

## Ce qui reste hors du périmètre JSON

Les commandes permanentes, les paiements en ligne, les statistiques, les notifications automatiques et le suivi **Nouvelle → Confirmée → Prête → Livrée** ne doivent pas être ajoutés dans `products.json` ou `site.json`.

Ces fonctions demandent un espace séparé pour conserver les commandes et leurs informations. Les ajouter directement au fichier du menu risquerait de mélanger le catalogue avec les données des clients.

## Ordre de réalisation conseillé

| Ordre | Fonction | Risque | Décision |
|---:|---|---:|---|
| 1 | Partager le lien côté client | Très faible | Première fonction. |
| 2 | Copier le lien dans le dashboard | Très faible | À faire juste après. |
| 3 | QR code affichable et téléchargeable | Faible | À faire avant les changements de menu. |
| 4 | Modifier un produit existant | Faible à moyen | Tester sur un produit existant. |
| 5 | Prévisualiser une photo | Moyen | Séparer l’aperçu de la publication. |
| 6 | Publier une photo | Moyen à élevé | Tester avec une seule image. |
| 7 | Ajouter un produit | Moyen | Après validation du formulaire existant. |
| 8 | Cacher/réactiver un produit | Moyen | Utiliser `available`. |
| 9 | Supprimer définitivement | Élevé | Ne pas inclure pour l’instant. |

## Rituel de validation pour chaque livraison

Avant chaque synchronisation, il faut vérifier que le site local s’ouvre, que le catalogue fonctionne, que le panier accepte et retire un produit, que le checkout affiche correctement les choix et que le dashboard n’est pas bloqué.

Ensuite, il faut lancer le contrôle du projet et le build local. Si tout réussit, la dernière version distante doit être récupérée avant le commit. Après le push, il faut attendre la publication Netlify et vérifier le site public sur ordinateur et téléphone.

**Aucune fonction ne doit être considérée comme livrée si elle n’a pas été vérifiée sur le site public.**

## Recommandation finale

Commencer par les trois fonctions de partage : partage client, copie du lien dans le dashboard et QR code. Elles sont compatibles avec le JSON actuel et ne modifient pas le panier.

Continuer ensuite par la modification d’un produit existant et la gestion des ruptures. Reporter la publication réelle des photos et l’ajout de nouveaux produits jusqu’à ce que le fonctionnement des changements soit confirmé sur le site public.

Ne pas ajouter pour l’instant les paiements en ligne, l’historique des commandes ou les statistiques dans les fichiers JSON du catalogue.
