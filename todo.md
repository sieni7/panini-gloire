# Suivi de la refonte UI

- [x] Remplacer la palette verte par une palette jaune, orangée et bordeaux.
- [x] Réviser les contrastes des boutons, textes et surfaces.
- [x] Mettre à jour les rappels de style dans les fichiers CSS et composants.
- [x] Vérifier le rendu desktop et mobile après la refonte.
- [x] Rejouer lint, vérification TypeScript et build après correction JSX et palette.

- [ ] Synchroniser le projet React vers la branche main existante du dépôt GitHub après comparaison finale.
- [ ] Vérifier que la copie Windows peut être resynchronisée sans mélanger l’ancien projet Next.js.

- [ ] Vérifier GitHub, Netlify et Supabase avant la synchronisation Windows.
- [ ] Confirmer que la copie Windows pointe vers la branche main React.

- [ ] Arrêter les processus qui verrouillent panini-gloire-final.
- [ ] Recréer la copie locale depuis GitHub main React.

- [ ] Arrêter uniquement le PID Node 14684 qui écoute sur le port 3001.

- [x] Corriger le conflit npm Vite 7 et vite-plugin-jsx-loc.
- [x] Régénérer le lockfile avec npm et valider l’installation Windows.

- [x] Supprimer la configuration pnpm qui bloque npm sous Windows.
- [ ] Régénérer package-lock.json et republier la correction après validation.

- [x] Retirer l’import résiduel du plugin JSX dans vite.config.ts.
- [x] Refaire le build après nettoyage de la configuration Vite.

- [ ] Décider si le catalogue JSON statique suffit au périmètre réel.
- [ ] Définir une stratégie de stockage des images compatible avec Netlify.
- [ ] Ne pas utiliser un fichier JSON comme base de commandes persistante sans backend adapté.

- [ ] Définir les champs éditables des produits et des informations générales.
- [ ] Choisir un stockage persistant pour les textes, photos et réglages du dashboard.
- [ ] Prévoir authentification, validation et journal des modifications administratives.

- [ ] Créer le catalogue éditorial products.json et le fichier site.json.
- [ ] Construire une vue dashboard avec édition, aperçu et validation.
- [ ] Définir l’authentification et le mécanisme de publication GitHub sans exposer de token au navigateur.

- [ ] Créer les fichiers JSON éditoriaux pour le dashboard confirmé.
- [ ] Ajouter la fonction Netlify de publication GitHub avec secret serveur.
- [ ] Configurer les variables Netlify sans exposer le token GitHub.

- [ ] Stocker le PIN Marina uniquement dans une variable secrète Netlify.
- [ ] Ajouter une session admin temporaire côté serveur.
- [ ] Refuser toute publication GitHub sans session admin valide.

- [ ] Vérifier les modifications non sauvegardées dans la copie Windows avant synchronisation.
- [ ] Mettre à jour la copie locale depuis GitHub main React.
- [ ] Réinstaller les dépendances et relancer le contrôle local.

- [x] Analyser les cinq vulnérabilités npm sans appliquer audit fix --force.
- [x] Corriger les variables analytics non définies dans index.html.
- [x] Corriger ou remplacer la référence hero non résolue.

- [x] Relancer npm install avec un journal lisible avant de conclure sur l’audit.

- [ ] Régénérer pnpm-lock.yaml après retrait de Vite et Vitest.
- [x] Vérifier que Netlify peut installer avec frozen-lockfile.

- [x] Régénérer pnpm-lock.yaml pour supprimer les anciennes références Vite et Vitest.
- [ ] Tester pnpm install --frozen-lockfile avant nouveau checkpoint.

- [x] Autoriser uniquement les scripts de build de esbuild et @tailwindcss/oxide dans pnpm.
- [x] Rejouer pnpm install --frozen-lockfile après cette déclaration.

- [ ] Déplacer onlyBuiltDependencies dans pnpm-workspace.yaml, format reconnu par pnpm 11.

- [x] Réajouter vite comme dépendance de développement explicite.
- [x] Régénérer package-lock.json et pnpm-lock.yaml après réintégration.

- [ ] Vérifier que Netlify installe avec le lockfile corrigé.
- [ ] Contrôler l’URL publique et la route dashboard.
- [ ] Resynchroniser la copie Windows après validation de production.

- [ ] Comparer la section overrides de package.json et les champs settings du lockfile.
- [ ] Valider la compatibilité avec pnpm 10.30.3 utilisé par Netlify.

- [x] Localiser le reduce qui reçoit une valeur non tableau.
- [x] Valider la forme de products.json côté chargement.
- [x] Ajouter un fallback sûr pour éviter le crash runtime.
- [x] Tester puis republier la correction Netlify.

- [ ] Pousser le correctif m.reduce vers GitHub main.
- [ ] Vérifier que Netlify reconstruit depuis le nouveau commit.
- [ ] Tester le panier avec localStorage nettoyé.

- [ ] Vérifier la production publique après le correctif m.reduce.
- [ ] Tester l’ajout et la persistance du panier.
- [ ] Tester les validations checkout et le lien WhatsApp sans envoi.

- [x] Ajouter la page /confirmation pour éviter le 404 après checkout.
- [x] Relier la route confirmation et vérifier le message WhatsApp généré.

## Sprint 1 UX/UI
- [x] Auditer la structure actuelle du panier et du checkout.
- [x] Ajouter une barre de panier persistante et des contrôles de quantité accessibles.
- [x] Clarifier les frais de livraison et prévisualiser le message WhatsApp.
- [x] Valider le build et le rendu responsive.

## Champ PIN à quatre cases
- [x] Remplacer le champ unique par 4 cases numériques.
- [x] Ajouter le passage automatique et la gestion du retour arrière.
- [x] Refaire build, commit, push et test du login.

## Refonte login dashboard
- [x] Reprendre le titre « CONFIGURATION » et le texte de la maquette.
- [x] Refaire le champ PIN, le bouton jaune et le lien de retour.
- [x] Vérifier mobile, build, commit et push avant de reprendre les catégories.

## Gestion catégories et produits
- [x] Ajouter, modifier et supprimer des catégories.
- [x] Ajouter, modifier et supprimer des produits.
- [x] Protéger les suppressions et conserver la compatibilité JSON.
- [x] Refaire build, commit, push et test complet.

## Étape 4 — Édition sûre des produits
- [ ] Vérifier les champs obligatoires du formulaire produit.
- [ ] Valider le prix, la catégorie et la disponibilité sans modifier l’identifiant.
- [ ] Afficher un retour clair avant l’enregistrement du brouillon.
- [ ] Refaire build, commit, push et test du dashboard.

## Étape 3 — QR code du site public
- [x] Ajouter un QR code vers le site public.
- [x] Ajouter agrandissement et téléchargement PNG.
- [x] Vérifier le dashboard, le build, le commit et le push.

## Étape 2 — Lien public dans le dashboard
- [x] Ajouter une carte « Votre lien de commande ».
- [x] Ajouter un bouton pour copier l’adresse publique.
- [x] Vérifier le dashboard, le build, le commit et le push.

## Étape 1 — Partage du lien côté client
- [ ] Ajouter le bouton Partager dans l’en-tête.
- [ ] Prévoir la copie du lien si le partage natif n’est pas disponible.
- [ ] Vérifier mobile, ordinateur, build, commit et push.

## Étape suivante — Partage du lien côté client
- [x] Ajouter un bouton Partager dans l’en-tête.
- [x] Prévoir la copie du lien sur les appareils non compatibles.
- [x] Tester le parcours, puis build, commit et push.

## Plan d’actions fonctionnalités
- [ ] Corriger les étapes qui ne correspondent pas au fonctionnement JSON actuel.
- [ ] Définir un ordre d’ajout sûr pour partage, QR code et gestion du menu.
- [ ] Préciser les tests avant chaque synchronisation et publication.

## Incident build Netlify
- [ ] Examiner le journal ou message d’erreur du build.
- [ ] Corriger la cause dans le projet.
- [ ] Relancer check, build, commit, push et vérifier Netlify.

## Brief utilisateur pour Marina
- [x] Décrire uniquement les fonctions actuellement disponibles.
- [x] Expliquer clairement ce que l’application ne fait pas encore.
- [x] Ajouter une FAQ de cinq préoccupations et des conseils pratiques.

## Correctif build Netlify — Secret Scanning
- [ ] Exclure uniquement le cache interne `.netlify/**` du scan des secrets.
- [ ] Relancer check, build, commit et push.
- [ ] Vérifier un nouveau déploiement Netlify.

## Correctif authentification dashboard
- [ ] Auditer la fonction `/api/admin-auth` et le flux PIN.
- [ ] Vérifier les variables Netlify nécessaires.
- [ ] Corriger, puis refaire build, commit, push et test.

## Logo PG rond
- [ ] Rendre le monogramme PG parfaitement rond.
- [ ] Supprimer toute bordure visible.
- [ ] Refaire build, commit, push et vérification visuelle.

## Dashboard Marina
- [ ] Relier Home aux fichiers `products.json` et `site.json` pour rendre les publications visibles.
- [ ] Auditer le dashboard existant et sa protection PIN.
- [ ] Modifier produits, prix, descriptions et disponibilité.
- [ ] Prévoir le remplacement des photos et l’édition des informations générales.
- [ ] Tester le flux de publication GitHub et refaire build, commit, push.

## Grille mobile une colonne
- [x] Afficher une carte produit par ligne sur les téléphones.
- [x] Préserver les layouts tablette et desktop.
- [x] Refaire build, commit, push et test responsive.

## Rupture de stock et retrait sur place
- [x] Ajouter un état de rupture conservant la photo en couleur.
- [x] Désactiver et griser le bouton « Ajouter » lorsque le produit est indisponible.
- [x] Ajouter un lien Google Maps dans l’option « Sur place ».
- [x] Refaire build, commit, push et test responsive.

## Badge produit demandé
- [ ] Ajouter le badge jaune « HOT! » sur Panini Viande.
- [ ] Vérifier l’affichage mobile et desktop.
- [ ] Refaire build, commit et push.

## Sprint 2 — Catalogue et navigation
- [x] Ajouter une recherche simple au catalogue.
- [x] Rendre la navigation des catégories plus pratique sur mobile.
- [x] Afficher la quantité choisie sur les cartes produits.
- [ ] Préparer des visuels distincts par recette.
- [ ] Refaire build, commit, push et test responsive.

## Correction du monogramme
- [x] Remplacer le monogramme SG par PG.
- [ ] Refaire build, commit et push.

## Remplacement du logo
- [x] Remplacer le logo image par un symbole rouge de pain ou les initiales SG.
- [x] Vérifier l’affichage desktop et mobile.
- [x] Refaire build, commit et push.

## Diagnostic images production — nouvelle vérification
- [ ] Tester les URLs d’images directement sur panini-gloire.netlify.app.
- [ ] Vérifier le déploiement et la présence des fichiers dans la sortie publiée.
- [ ] Corriger la stratégie d’assets, puis build, commit, push et test public.

## Correction urgente des images de production
- [ ] Vérifier les images cassées sur le domaine Netlify.
- [ ] Corriger les références d’assets localement.
- [ ] Refaire build, commit et push, puis confirmer la correction.

## Modification de l’en-tête
- [x] Afficher « PANINI DE LA GLOIRE » en titre fort.
- [x] Placer « ADJAMÉ BINGERVILLE • EN FACE DE BONPRIX » sous le titre.
- [x] Appliquer un rayon de bordure de 5 px au logo.

## Règle de synchronisation locale et distante
- [x] Vérifier l’état local et la branche GitHub avant chaque livraison.
- [x] Exécuter `pnpm run check` et `pnpm run build` localement.
- [x] Créer un commit local descriptif.
- [x] Pousser le commit vers GitHub `main` et vérifier l’alignement.

## Réalignement chromatique demandé
- [ ] Remplacer toutes les références vertes par jaune foncé, orangé et rouge/bordeaux.
- [ ] Renforcer les textes et titres en marron foncé.
- [ ] Vérifier le contraste, le rendu mobile et le build.

## Règle permanente — document Marina
- [x] Mettre à jour brief-marina.md après chaque évolution fonctionnelle ou modification visible.
- [x] Vérifier que le guide décrit les fonctions disponibles, les limites et les conseils d’utilisation.

## Simplification du guide Marina
- [x] Retirer les détails techniques sur Netlify, GitHub et les branches du document destiné à Marina.
- [x] Remplacer ce passage par une consigne simple en cas de modification non visible.
- [ ] Valider, committer et synchroniser le guide mis à jour.

## Héros harmonisés et activables depuis le Dashboard
- [x] Définir un modèle JSON commun aux trois variantes de hero.
- [x] Conserver une structure identique : surtitre, titre, description, image ou fond, action principale, action secondaire et repères pratiques.
- [x] Utiliser une seule valeur `activeHero` pour garantir qu’un seul hero est actif.
- [x] Ajouter un fallback vers le hero actuel si la valeur est absente ou invalide.
- [x] Mettre à jour brief-marina.md après intégration.

## Passe UI/UX demandée
- [x] Auditer le site public et le dashboard sur desktop et mobile.
- [x] Améliorer la hiérarchie visuelle, les états d’action et la navigation mobile.
- [x] Vérifier contraste, focus clavier et lisibilité.
- [x] Mettre à jour brief-marina.md avec les changements visibles.
- [ ] Refaire check, build, commit, push et publication.

## Harmonisation des libellés de l’application
- [x] Remplacer « Informations du site » par « Informations de l’application » partout où c’est visible.
- [x] Remplacer « Voir le site » par « Voir l’application » partout où c’est visible.
- [x] Mettre à jour brief-marina.md et vérifier les autres textes du Dashboard.
- [ ] Refaire check, build, commit, push et publication.

## Accès persistants du Dashboard
- [x] Garder « Informations du site » visible en permanence dans la sidebar.
- [x] Garder « Voir le site » accessible en permanence dans l’en-tête.
- [x] Vérifier la lisibilité et le fonctionnement sur mobile avec le style responsive prévu.
- [x] Mettre à jour brief-marina.md, puis valider et synchroniser.

## Documentation intégrée à l’espace privé
- [x] Ajouter le lien « Documentation » dans la sidebar du Dashboard.
- [x] Afficher le guide Marina et la FAQ dans une page privée dédiée.
- [x] Conserver le message client et les consignes sans jargon technique.
- [x] Vérifier l’accès, le responsive et les routes existantes avec check et build.
- [x] Mettre à jour le guide Marina, puis valider et synchroniser.

## FAQ client à enrichir dans le guide Marina
- [x] Ajouter des questions et réponses prêtes à reprendre par Marina.
- [x] Couvrir commande, paiement, WhatsApp, livraison et rupture de stock.
- [x] Conserver un langage simple et rassurant.
- [ ] Valider et synchroniser le document Marina.

## Message client à ajouter au guide Marina
- [x] Ajouter un message prêt à envoyer pour présenter la nouvelle commande en ligne.
- [x] Insister sur la simplicité : choisir, vérifier le total et envoyer sur WhatsApp.
- [x] Laisser un emplacement clair pour le lien de la carte.
- [ ] Valider et synchroniser le document Marina.

## Amélioration de la fiche produit du Dashboard
- [x] Simplifier les explications visibles pour Marina.
- [x] Ajouter une miniature dans la fiche de modification du produit.
- [x] Rafraîchir immédiatement la miniature après sélection d’une nouvelle photo.
- [x] Mettre à jour brief-marina.md, puis valider et synchroniser.

## Ajustement du libellé du login
- [x] Remplacer « site » par « application » uniquement dans `/dashboard/login`.
- [x] Vérifier le guide Marina : le libellé n’y est pas mentionné.
- [x] Refaire check et build ; commit, push et publication à finaliser.

## Publication refusée depuis le Dashboard
- [ ] Vérifier la session administrateur avant l’appel de publication.
- [ ] Vérifier les variables nécessaires côté fonction sans afficher leurs valeurs.
- [x] Distinguer clairement l’expiration de session, le brouillon incomplet et l’indisponibilité du service.
- [x] Tester le parcours local avec un message compréhensible grâce au check et au build validés.
- [x] Mettre à jour brief-marina.md sans jargon technique inutile.

## Blocage Netlify — secrets détectés
- [x] Identifier les fichiers internes susceptibles de déclencher le scan Netlify.
- [x] Retirer uniquement ces comptes rendus internes, sans modifier les secrets de l’environnement Netlify.
- [x] Refaire le check et le build local.
- [ ] Pousser un commit propre et vérifier le déploiement public.
- [ ] Mettre à jour brief-marina.md avec une consigne simple, sans jargon.

## Ancienne version toujours servie par le site public
- [ ] Documenter la capture confirmant « ESPACE ÉDITORIAL », « Le comptoir de Marina » et l’ancien ordre.
- [ ] Comparer le commit publié avec la version locale et GitHub.
- [ ] Relancer ou corriger le déploiement réellement lié au domaine public.
- [ ] Recontrôler le dashboard après déploiement.

## Blocage Netlify confirmé par contrôle visuel
- [ ] Identifier le site Netlify réellement lié au domaine public.
- [ ] Comparer son dernier déploiement avec le commit GitHub `f60c6a5`.
- [ ] Relancer le déploiement du bon dépôt et de la branche `main`.
- [ ] Recontrôler les libellés publics et mettre à jour brief-marina.md.

## Écart de déploiement à résoudre
- [ ] Vérifier pourquoi Netlify affiche encore les anciens libellés du dashboard.
- [x] Confirmer que le dépôt local et GitHub utilisent bien la branche main actuelle ; la liaison Netlify reste à vérifier.
- [ ] Mettre à jour brief-marina.md avec l’état réel avant toute nouvelle livraison.

## Ajustements dashboard privé demandés
- [x] Remplacer « ESPACE ÉDITORIAL » par « ESPACE PRIVÉ ».
- [x] Remplacer « Le comptoir de Marina » par « CONFIGURATION ».
- [x] Réordonner le menu : Produits, Catégories, Informations du site.
- [x] Mettre à jour brief-marina.md, puis valider et synchroniser.

## Test de publication réelle et contrôle post-mise en ligne
- [ ] Vérifier le dashboard déployé avec le code Marina.
- [ ] Modifier temporairement un texte ou une disponibilité, puis préparer la publication.
- [ ] Vérifier le résultat sur le site public sans envoyer de commande réelle.
- [ ] Décrire cette vérification dans brief-marina.md.

## Stabilisation finale du dashboard éditorial
- [x] Auditer la gestion actuelle des produits, catégories, QR et publication.
- [x] Vérifier et corriger la synchronisation du statut « disponible » avec le catalogue public.
- [x] Tester le dashboard sur ordinateur et mobile.
- [x] Mettre à jour le guide simplifié de Marina avec les nouvelles fonctions.
- [ ] Tester le cycle brouillon → publication GitHub → déploiement Netlify.
- [ ] Commiter et pousser chaque modification validée.
