# Intégration à la SIV des Archives Nationales

Ce **User Script** permet de s'intégrer localement, côté client,
pour améliorer et ajouter les fonctionnalités de la **SIV** (Salle des Inventaires Virtuelle).

**Important :** Ce script n'affecte d'aucune manière les fichiers sources du
site de la **SIV**.


## Installation d'un gestionnaire de type "User Script"

Il est possible d'intervenir dans une page sans utilitaire,
cependant la tâche n'est pas aisée.
L'installation d'un utilitaire permet d'automatiser l'exécution 
du script dans un contexte particulier, de charger des ressources
de manière autonome, de déclencher le script sous certaines conditions
(une fois le document chargé (...)) et plus encore.


### Installation de Tampermonkey sous Google Chrome

Le nom de l'utilitaire qui permet d'exécuter le script développé
lors du hackathon 2018 se nomme **Tampermonkey**.
Il faut se rendre sur le Chrome Web Store pour pouvoir l'obtenir.

Utilisez le lien suivant pour vous rendre directement sur le site :
[Chrome Web Store - Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=fr)



### Installation de Greasemonkey sous Mozilla Firefox

--TODO--


## Installation du Script


## Sous Tampermonkey du navigateur Google Chrome

Ouvrez votre navigateur Google Chrome.
A droite de la barre de navigation, cliquez sur l'icone suivante
<img src="lib/img/tampermonkey.png" width="16" style="display: inline;"/>
pour ouvrir l'interface de Tampermonkey, puis sur ``Tableau de bord``.

Cliquez sur le bouton plus (1) pour ajouter un nouveau script.

![Tampermonkey Menu][tmprmenu]

L'éditeur s'ouvre. Copiez-collez le contenu du script livré disponible
à l'emplacement suivant ``src/sivenhance.js`` dans l'éditeur de Tampermonkey,
puis sauvegarder via ``Fichier > Enregistre (CTRL+S)``.

Si vous retournez dans l'onglet ``Userscripts installés``,
vous devrez trouver notre script ``Hackaton AN``

![User Script][tmprinst]

Rendez-vous sur le site de la salles des inventaires virtuelles sur une des adresses
suivante pour vérifier la bonne prise en charge du script :

- [Consultation Producteur - André Fourchy](https://www.siv.archives-nationales.culture.gouv.fr/siv/rechercheconsultation/consultation/producteur/consultationProducteur.action?notProdId=FRAN_NP_012092)
- [Visionneuse](https://www.siv.archives-nationales.culture.gouv.fr/siv/rechercheconsultation/consultation/ir/consultationIR.action?formCaller=MINUTES&irId=FRAN_IR_052908&gotoArchivesNums=true&defaultResultPerPage=15&frontIr=&optionFullText=ET&fullText=&udId=&consIr=&details=false&page=1&auSeinIR=true)

![Tampermonkey Running][tmprrun]






[tmprmenu]:lib/img/tampermenu.png
[tmprinst]:lib/img/tampermonkeyinstalled.png
[tmprrun]:lib/img/tampermonkeyrunning.png

