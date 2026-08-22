# Diagnostic du build Netlify

Source : `pasted_content_18.txt`, journal Netlify fourni par l’utilisateur.

Le build Vite et le regroupement des fonctions réussissent. L’échec intervient ensuite pendant le Secret Scanning. La configuration `SECRETS_SCAN_OMIT_PATHS = ".netlify/**"` exclut correctement le cache interne, mais Netlify détecte encore la valeur de `ADMIN_PIN` dans `brief-marina.md`, aux lignes 13 et 84. Le déploiement est donc arrêté avec le code de sortie 2. La correction consiste à ne pas inscrire le code secret dans un document versionné ou public ; le guide doit indiquer que le code est fourni séparément.
