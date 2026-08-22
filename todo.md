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
