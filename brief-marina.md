# Guide simple de l’application Panini de la Gloire

Bonjour Marina,

Voici le guide actualisé de l’application, avec des explications simples sur ce qui fonctionne aujourd’hui, ce qui reste à prévoir et la manière de me signaler les difficultés.

## 1. L’adresse du site

Le site est accessible ici : **https://panini-gloire.netlify.app**

L’espace réservé à Marina est accessible ici : **https://panini-gloire.netlify.app/dashboard**

Le code d’accès est communiqué séparément et ne doit jamais être écrit dans un document public.

## 2. Ce que les clients peuvent faire aujourd’hui

Les clients peuvent consulter la carte, rechercher un produit, choisir la catégorie Panini ou Chawarma et voir les prix en francs CFA.

Ils peuvent ajouter des produits dans leur panier, modifier les quantités et voir le total. Sur téléphone, les produits sont maintenant présentés un par un pour faciliter la lecture et le choix.

Ils peuvent ensuite indiquer leur nom et leur numéro de téléphone, puis choisir entre **Sur place** et **Livraison**. Pour le retrait sur place, un lien **Voir sur Google Maps** indique l’emplacement : **Adjamé Bingerville, en face de BonPrix**.

À la fin, l’application prépare un message WhatsApp avec la référence, le nom du client, son téléphone, les produits et le total. Le client vérifie le message, puis appuie lui-même sur le bouton pour ouvrir WhatsApp et l’envoyer.

## 3. Ce que Marina peut gérer dans l’espace privé

L’espace privé s’ouvre depuis l’adresse `/dashboard`. Son en-tête affiche **ESPACE PRIVÉ** et **CONFIGURATION**. Les rubriques sont présentées dans cet ordre : **Produits**, **Catégories**, puis **Informations du site**.

Dans le dashboard, Marina peut modifier les informations du catalogue : le nom d’un produit, sa description, son prix et sa disponibilité. Lorsqu’un produit est indisponible, sa photo reste visible, mais le bouton **Ajouter** devient grisé et ne peut plus être utilisé.

Marina peut aussi remplacer la photo d’un produit et modifier les informations visibles du site : le nom de l’enseigne, la localisation, le numéro WhatsApp, les horaires, le texte d’accueil et les indications de service.

Les changements peuvent d’abord être enregistrés comme brouillon. La publication est ensuite préparée pour mettre à jour les fichiers du site. Après une publication, il faut vérifier le site public pour confirmer que la modification apparaît correctement.

Marina peut également ouvrir la rubrique **Catégories** pour ajouter une nouvelle catégorie, renommer une catégorie existante ou la supprimer. Une catégorie ne peut être supprimée que si aucun produit ne lui est encore associé.

Dans la carte **Votre lien de commande**, les boutons permettent de copier le lien du site, d’agrandir le QR code ou de télécharger son image. Le QR code peut ensuite être imprimé ou partagé pour permettre aux clients d’ouvrir directement la carte.

Pour une modification importante, vérifiez d’abord le brouillon, puis la publication et enfin le site public. Si un changement n’apparaît pas tout de suite, actualisez la page après quelques instants.

Lors du dernier contrôle, l’accès au dashboard public fonctionnait, mais le site Netlify affichait encore les anciens intitulés **ESPACE ÉDITORIAL**, **Le comptoir de Marina** et l’ancien ordre des rubriques. Le dépôt GitHub contient bien la version corrigée. Il faut donc vérifier la liaison entre Netlify, le dépôt `sieni7/panini-gloire` et la branche `main` avant de considérer cette modification comme visible pour les clients.

## 4. Ce que l’application ne fait pas encore

Pour éviter toute confusion, voici les limites actuelles :

| Fonction | Situation actuelle |
|---|---|
| Paiement en ligne par carte ou mobile money | Non disponible. Le site ne prend aucun paiement en ligne. |
| Enregistrement automatique des commandes dans une liste permanente | Non disponible pour le moment. Le client prépare un message WhatsApp à envoyer. |
| Réception automatique d’une commande dans le dashboard | Non disponible pour le moment. Il faut vérifier le message WhatsApp reçu. |
| Suivi de commande | Non disponible. Il n’y a pas encore de boutons « Confirmée », « Prête » ou « Livrée ». |
| Statistiques de ventes | Non disponible. Le site ne calcule pas encore le chiffre d’affaires ni les produits les plus vendus. |
| Livraison automatique | Non disponible. Le site ne choisit pas de livreur et ne calcule pas les frais de livraison. |
| Réponse automatique aux clients | Non disponible. Marina répond directement aux clients sur WhatsApp. |
| Ajout automatique de nouvelles photos depuis le téléphone | Le dashboard permet de choisir une photo et de la prévisualiser ; la publication doit ensuite être vérifiée. |

En résumé, l’application sert aujourd’hui à **présenter la carte, composer un panier et préparer une commande WhatsApp**. Elle ne remplace pas encore un système complet de paiement, de caisse ou de suivi des commandes.

## 5. Comment me signaler un problème

Marina peut me faire remonter tout problème rencontré pendant l’utilisation. Ces retours sont importants pour améliorer son expérience et rendre le parcours plus simple pour sa clientèle.

Lorsqu’un problème arrive, il est utile de m’envoyer :

1. l’adresse de la page concernée ;
2. ce que vous étiez en train de faire ;
3. le message affiché, si un message apparaît ;
4. une capture d’écran si possible ;
5. le modèle du téléphone ou de l’ordinateur utilisé.

Il ne faut pas envoyer de mot de passe, de code secret, de numéro complet d’un client ou de capture contenant des informations confidentielles. Même un petit détail comme un bouton qui ne répond pas, une photo qui ne s’affiche pas ou un texte difficile à comprendre est utile à signaler.

## 6. FAQ : cinq préoccupations fréquentes

### 1. La commande est-elle envoyée automatiquement à Marina ?

Non. L’application prépare le message, mais le client doit ouvrir WhatsApp et appuyer sur **Envoyer**. Marina doit donc vérifier les messages WhatsApp reçus comme pour toute autre commande.

### 2. Le client peut-il payer sur le site ?

Non. Il n’y a pas encore de paiement en ligne. Le site affiche le total, mais aucun argent n’est prélevé par l’application. Le paiement se fait selon l’organisation prévue par Marina, sur place ou à la livraison.

### 3. Que faire lorsqu’un produit est en rupture ?

Dans le dashboard, ouvrez le produit et décochez **Produit disponible sur la carte**, puis préparez la publication. La photo restera visible, mais le bouton d’ajout sera grisé et désactivé pour les clients.

### 4. Une modification est-elle visible immédiatement ?

Pas toujours. Il faut enregistrer le changement, préparer sa publication, attendre la mise à jour du site, puis actualiser la page. Si l’ancien texte reste affiché, fermez et rouvrez la page ou essayez une nouvelle fenêtre.

### 5. Que faire si le dashboard refuse le code ou affiche une erreur ?

Vérifiez d’abord que vous utilisez le code qui vous a été communiqué séparément et que vous êtes sur l’adresse `/dashboard`. Si le problème continue, envoyez-moi une capture du message d’erreur sans montrer le code, ainsi que l’heure et l’appareil utilisés.

## 7. Conseils pour une utilisation quotidienne

Avant l’ouverture, vérifiez les prix, les produits disponibles, le numéro WhatsApp et les horaires. Si un produit manque, désactivez-le afin d’éviter les demandes impossibles à satisfaire.

Après chaque changement, regardez le site comme un client : ouvrez la carte, vérifiez la photo, le prix, le bouton d’ajout et le parcours jusqu’à WhatsApp.

Gardez WhatsApp ouvert et vérifiez régulièrement les nouveaux messages. Pour chaque commande, confirmez avec le client le produit, la quantité, le total et le mode de réception.

Enfin, envoyez-moi régulièrement vos remarques, même lorsqu’il ne s’agit pas d’une panne. Vos retours permettront d’améliorer l’utilisation du site pour vous et de rendre la commande plus claire pour vos clients.

## 8. Résumé en une phrase

**Le site présente vos produits et prépare les commandes sur WhatsApp ; Marina garde la confirmation avec le client, tandis que le dashboard lui permet de maintenir les informations du menu à jour.**
