# Validation du dashboard — 22 août 2026

Le dashboard local affiche correctement l’écran `CONFIGURATION` avec le libellé `ENTREZ VOTRE CODE PIN` et quatre champs séparés, identifiés comme chiffres 1 à 4 sur 4. Le bouton `Accéder au dashboard` et le lien `Retour au site` sont présents. Le rendu est lisible sur ordinateur et mobile.

La validation complète de la publication dépend de l’environnement Netlify, car le serveur local Vite ne simule pas les fonctions Netlify `/api/admin-auth` et `/api/publish-content`. Le build local et le contrôle TypeScript restent validés.
