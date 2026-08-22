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
