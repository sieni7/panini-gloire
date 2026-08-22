# Test public du parcours client

- URL testée : https://panini-gloire.netlify.app/?e2e=9ca1077
- Le titre public est « Panini de la Gloire — Adjamé Bingerville ».
- Le catalogue visible contient Panini Simple (500 F), Panini Viande (1 000 F), Panini Jambon (1 500 F) et Panini Jambon Fromage (2 000 F).
- Le bouton panier indique 0 article et 0 F au chargement propre.
- Le défilement automatisé n’a pas déplacé la position, mais le contenu catalogue est présent dans le HTML extrait.
- Aucun envoi WhatsApp n’a été effectué.

- La section menu est accessible via l’ancre #menu et affiche les quatre cartes Panini.
- La tentative de clic automatique a échoué car la page a été mise à jour entre le snapshot et le clic ; aucun ajout ni commande n’a été effectué.

- Après navigation vers #menu, le bouton Ajouter du Panini Simple a fonctionné.
- Le tiroir panier affiche 1 article, Panini Simple, et un total de 500 F.
- Aucun crash m.reduce ne s’est produit pendant cette interaction.
- Aucun envoi WhatsApp ni soumission de commande n’a été effectué.

- Le checkout production conserve correctement 1 × Panini Simple pour 500 F.
- Le nom de test et le téléphone ivoirien sont acceptés.
- Après validation, la navigation va vers /confirmation mais la production affiche 404 : la route Confirmation n’est pas reliée dans App.tsx ou le fichier de page manque.
- Aucun message WhatsApp n’a été envoyé.
