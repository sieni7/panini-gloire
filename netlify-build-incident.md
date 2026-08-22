# Diagnostic du build Netlify

Source : `pasted_content_18.txt`, journal Netlify fourni par l’utilisateur.

Le build Vite et le regroupement des fonctions réussissent. L’échec intervient ensuite pendant la vérification des secrets. La configuration exclut correctement le cache interne, mais Netlify détecte encore une information sensible dans un document versionné. Le déploiement est donc arrêté. La correction consiste à ne jamais inscrire un code d’accès ou une valeur secrète dans un document public ; le guide doit seulement indiquer que l’accès est communiqué séparément.
