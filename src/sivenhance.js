// ==UserScript==
// @name         Hackaton AN
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Enhance AN Site
// @author       One Minute Age Team
// @match        https://www.siv.archives-nationales.culture.gouv.fr/siv/*
// @grant        none
// @run-at       document-end
// @require      https://rawcdn.githack.com/neooblaster/HTML/aa9263b08705a9676416f2ba64b474daa3a62945/release/v1.4.0/HTML.min.js
// @require      https://rawcdn.githack.com/neooblaster/HTML/aa9263b08705a9676416f2ba64b474daa3a62945/release/v1.4.0/HTML.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/d3/5.7.0/d3.min.js
// @require      http://file.neoblaster.fr/han.form.repro.js
// @require      http://img.neoblaster.fr/han.form.index6.js
// @require      https://rawcdn.githack.com/UneMinuteAgo/lib/cdb7b1225a8420d8d9388dcff596a207f0d585e9/src/dialogBox.js
// @resource     https://rawcdn.githack.com/UneMinuteAgo/lib/cdb7b1225a8420d8d9388dcff596a207f0d585e9/src/dialogBox.css
// @require      https://unpkg.com/leaflet@1.3.4/dist/leaflet.js
// ==/UserScript==

var chartClients = {
    "FOURCHYandré": [
        {"name": "Flûry-Hérard, Paul Luce Hippolyte", "actes": 55},
        {"name": "Foiret, Faustin Eugène Célestin", "actes": 37},
        {"name": "Faivre, Louis François Victor", "actes": 35},
        {"name": "Porte, Ambroise de la", "actes": 35},
        {"name": "Bénard, Paul Émile Charles", "actes": 23},
        {"name": "Pays, Louis Gustave", "actes": 17},
        {"name": "Montzey, Marie Catherine Antonie de", "actes": 15},
        {"name": "Mahot de la Quérantonnais, Gustave Frédéric", "actes": 12},
        {"name": "Villaume, Joseph Jean-Baptiste", "actes": 11},
        {"name": "Bizard, Jean-Baptiste Théophile", "actes": 10}
    ],
    "DESCHAMBEAXjean-joseph": [
        {"name": "Mottedescombes, Jean Louis", "actes": 5},
        {"name": "Demarandel, François Gabriel", "actes": 3},
        {"name": "Amiot, René", "actes": 2},
        {"name": "Badier, Philippe", "actes": 2},
        {"name": "Binet de la Bretonnière, Charles", "actes": 2},
        {"name": "Boujust, Adrien Florent", "actes": 2},
        {"name": "Candie, Jean-Baptiste", "actes": 2},
        {"name": "Courteille", "actes": 2},
        {"name": "Dandiran, Jean", "actes": 2},
        {"name": "Guignardat, Joseph", "actes": 2}
    ],
    "GIRET DE VALVILLEandré-nicolas": [
        {"name": "Ravel, Antoine", "actes": 59},
        {"name": "Tourton, Louis", "actes": 23},
        {"name": "Choiseul, Étienne-François de", "actes": 18},
        {"name": "Thoynet, François", "actes": 10},
        {"name": "Crozat du Châtelet de Choiseul, Louise Honorine", "actes": 8},
        {"name": "Huguet, Pierre", "actes": 8},
        {"name": "Randon de Pommery, Pierre", "actes": 7},
        {"name": "Bitaut de Vaillé, Antoine François", "actes": 6},
        {"name": "Eichhoff, Wichmann Gustave", "actes": 6},
        {"name": "Crussol d’Uzès, Anne Madeleine Anne Julie Françoise de", "actes": 5}
    ],
    "LE CLERCmarc": [
        {"name": "Gault, Claude", "actes": 6},
        {"name": "Deruy, Martin", "actes": 4},
        {"name": "Gallois, Pierre Elophe", "actes": 3},
        {"name": "Mondon, Jeanne", "actes": 3},
        {"name": "Brisbarre, Antoine", "actes": 2},
        {"name": "Chevillard, Etienne", "actes": 2},
        {"name": "Cordier, Philippe Nicolas", "actes": 2},
        {"name": "Daymé Dusauls, Marie Claude", "actes": 2},
        {"name": "Deruy, Marie Françoise", "actes": 2},
        {"name": "Gallois, Marguerite", "actes": 2}
    ],
    "MILLON-DAILLYaugustin": [
        {"name": "Millet, Jacques Eustache", "actes": 60},
        {"name": "Deville, Nicolas Gabriel", "actes": 30},
        {"name": "Delaleu, Guillaume Claude", "actes": 24},
        {"name": "Challot d’Infreville, Pierre Jean", "actes": 18},
        {"name": "Guenifey, André", "actes": 18},
        {"name": "Savalete, Charles Pierre", "actes": 14},
        {"name": "Boisgelin de Cucé, Jean Raymond de", "actes": 13},
        {"name": "Pontcarré, Adélaïde Jeanne Claude de", "actes": 11},
        {"name": "Maillebois, Yves Marie Desmarets de", "actes": 10},
        {"name": "Hocquet de Saint-Léger, Laurent", "actes": 8}
    ],
    "ROYER_clause ii": [
        {"name": "Bompas, Jacques", "actes": 9},
        {"name": "Vouges, André de", "actes": 7},
        {"name": "Hainque, Nicolas", "actes": 6},
        {"name": "Maillard, Adrien", "actes": 6},
        {"name": "Antraigues, Pierre Georges d’", "actes": 5},
        {"name": "Taillefer de Soligny, Catherine", "actes": 5},
        {"name": "Taillefer de Soligny, Claude", "actes": 5},
        {"name": "Vougé, André de", "actes": 5},
        {"name": "Chemin, Jean", "actes": 4},
        {"name": "David, Adrienne", "actes": 4}
    ]
}

var umapURL = {
    "FOURCHYandré": "https://umap.openstreetmap.fr/fr/map/parisnotaires_etude-lix-_-notaire-andre-fourchy_273603?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false%22%3E%3C/iframe%3E%3Cp#13/48.8648/2.3281",
    "DESCHAMBEAXjean-joseph": "https://umap.openstreetmap.fr/fr/map/parisnotaires_etude-lix-_-notaire-andre-fourchy_273603?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false%22%3E%3C/iframe%3E%3Cp#13/48.8648/2.3281",
    "GIRET DE VALVILLEandré-nicolas": "https://umap.openstreetmap.fr/fr/map/parisnotaires_etude-lix-_-notaire-andre-fourchy_273603?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false%22%3E%3C/iframe%3E%3Cp#13/48.8648/2.3281",
    "LE CLERCmarc": "https://umap.openstreetmap.fr/fr/map/parisnotaires_etude-lix-_-notaire-andre-fourchy_273603?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false%22%3E%3C/iframe%3E%3Cp#13/48.8648/2.3281",
    "MILLON-DAILLYaugustin": "https://umap.openstreetmap.fr/fr/map/parisnotaires_etude-lix-_-notaire-andre-fourchy_273603?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false%22%3E%3C/iframe%3E%3Cp#13/48.8648/2.3281",
    "FOURCHYandré": "https://umap.openstreetmap.fr/fr/map/parisnotaires_etude-lix-_-notaire-andre-fourchy_273603?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false%22%3E%3C/iframe%3E%3Cp#13/48.8648/2.3281",
    "ROYER_clause ii": "https://umap.openstreetmap.fr/fr/map/parisnotaires_etude-lix-_-notaire-andre-fourchy_273603?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=undefined&captionBar=false%22%3E%3C/iframe%3E%3Cp#13/48.8648/2.3281"
}

var cotes = [
    {"etude": "I", "notaire": "ROYER, Claude II", "startYear": 1709, "endYear": 1709, "startMonth": 1, "endMonth": 6, "cote": "MC/ET/I/236", "type": "Minute"},
    {"etude": "I", "notaire": "ROYER, Claude II", "startYear": 1709, "endYear": 1709, "startMonth": 7, "endMonth": 12, "cote": "MC/ET/I/237", "type": "Minute"},
    {"etude": "I", "notaire": "ROYER, Claude II", "startYear": 1710, "endYear": 1709, "startMonth": 1, "endMonth": 4, "cote": "MC/ET/I/238", "type": "Minute"},
    {"etude": "I", "notaire": "ROYER, Claude II", "startYear": 1710, "endYear": 1710, "startMonth": 5, "endMonth": 9, "cote": "MC/ET/I/239", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 2, "endMonth": 2, "cote": "MC/ET/LIX/925", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 3, "endMonth": 3, "cote": "MC/ET/LIX/926", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 4, "endMonth": 4, "cote": "MC/ET/LIX/927", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 5, "endMonth": 5, "cote": "MC/ET/LIX/928", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 6, "endMonth": 6, "cote": "MC/ET/LIX/929", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 7, "endMonth": 8, "cote": "MC/ET/LIX/930", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 9, "endMonth": 10, "cote": "MC/ET/LIX/931", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 11, "endMonth": 11, "cote": "MC/ET/LIX/932", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1898, "endYear": 1898, "startMonth": 12, "endMonth": 12, "cote": "MC/ET/LIX/933", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1899, "endYear": 1899, "startMonth": 1, "endMonth": 2, "cote": "MC/ET/LIX/934", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1899, "endYear": 1899, "startMonth": 3, "endMonth": 3, "cote": "MC/ET/LIX/935", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1899, "endYear": 1899, "startMonth": 4, "endMonth": 4, "cote": "MC/ET/LIX/936", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1899, "endYear": 1899, "startMonth": 5, "endMonth": 5, "cote": "MC/ET/LIX/937", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1899, "endYear": 1899, "startMonth": 6, "endMonth": 6, "cote": "MC/ET/LIX/938", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1899, "endYear": 1899, "startMonth": 7, "endMonth": 8, "cote": "MC/ET/LIX/939", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1899, "endYear": 1899, "startMonth": 9, "endMonth": 10, "cote": "MC/ET/LIX/940", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1899, "endYear": 1899, "startMonth": 11, "endMonth": 12, "cote": "MC/ET/LIX/941", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1900, "endYear": 1900, "startMonth": 1, "endMonth": 2, "cote": "MC/ET/LIX/942", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1900, "endYear": 1900, "startMonth": 3, "endMonth": 4, "cote": "MC/ET/LIX/943", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1900, "endYear": 1900, "startMonth": 5, "endMonth": 6, "cote": "MC/ET/LIX/944", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1900, "endYear": 1900, "startMonth": 7, "endMonth": 8, "cote": "MC/ET/LIX/945", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1900, "endYear": 1900, "startMonth": 9, "endMonth": 10, "cote": "MC/ET/LIX/946", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1900, "endYear": 1900, "startMonth": 11, "endMonth": 12, "cote": "MC/ET/LIX/947", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1901, "endYear": 1901, "startMonth": 1, "endMonth": 2, "cote": "MC/ET/LIX/948", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1901, "endYear": 1901, "startMonth": 3, "endMonth": 3, "cote": "MC/ET/LIX/949", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1901, "endYear": 1901, "startMonth": 4, "endMonth": 5, "cote": "MC/ET/LIX/950", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1901, "endYear": 1901, "startMonth": 6, "endMonth": 6, "cote": "MC/ET/LIX/951", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1901, "endYear": 1901, "startMonth": 7, "endMonth": 8, "cote": "MC/ET/LIX/952", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1901, "endYear": 1901, "startMonth": 9, "endMonth": 10, "cote": "MC/ET/LIX/953", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1901, "endYear": 1901, "startMonth": 11, "endMonth": 12, "cote": "MC/ET/LIX/954", "type": "Minute"},
    {"etude": "LIX", "notaire": "FOURCHY, André", "startYear": 1902, "endYear": 1902, "startMonth": 1, "endMonth": 1, "cote": "MC/ET/LIX/955", "type": "Minute"},
    {"etude": "LXXII", "notaire": "LE CLERC, Marc", "startYear": 1784, "endYear": 1784, "startMonth": 10, "endMonth": 12, "cote": "MC/ET/LXXII/465", "type": "Minute"},
    {"etude": "LXXXIV", "notaire": "GIRET DE VALVILLE, André Nicolas", "startYear": 1785, "endYear": 1785, "startMonth": 1, "endMonth": 4, "cote": "MC/ET/LXXXIV/614", "type": "Minute"},
    {"etude": "LXXXIV", "notaire": "GIRET DE VALVILLE, André Nicolas", "startYear": 1785, "endYear": 1785, "startMonth": 5, "endMonth": 6, "cote": "MC/ET/LXXXIV/615", "type": "Minute"},
    {"etude": "LXXXIV", "notaire": "GIRET DE VALVILLE, André Nicolas", "startYear": 1785, "endYear": 1785, "startMonth": 7, "endMonth": 10, "cote": "MC/ET/LXXXIV/616", "type": "Minute"},
    {"etude": "LXXXIV", "notaire": "GIRET DE VALVILLE, André Nicolas", "startYear": 1785, "endYear": 1785, "startMonth": 1, "endMonth": 7, "cote": "MC/ET/LXXXIV/617", "type": "Constitution"},
    {"etude": "LXXXIV", "notaire": "GIRET DE VALVILLE, André Nicolas", "startYear": 1785, "endYear": 1789, "startMonth": 1, "endMonth": 7, "cote": "MC/ET/LXXXIV/618", "type": "Expedition"},
    {"etude": "LXVII", "notaire": "DESCHAMBEAUX, Jean Joseph", "startYear": 1756, "endYear": 1775, "startMonth": 1, "endMonth": 6, "cote": "Lacune", "type": "Lacune"},
    {"etude": "LXVII", "notaire": "DESCHAMBEAUX, Jean Joseph", "startYear": 1775, "endYear": 1775, "startMonth": 6, "endMonth": 8, "cote": "MC/ET/LXVII/717", "type": "Minute"}
];

var reproPopupContent = "<div>\n" +
    "    <div class=\"entry\" id=\"setActe\">\n" +
    "        <label for=\"typeActe\">Type d'Acte</label>\n" +
    "        <input list=\"typeActe\">\n" +
    "    </div>\n" +
    "    <div class=\"entry\" id=\"setDate\">\n" +
    "        <label for=\"date\">Date</label>\n" +
    "        <input id=\"date\" type=\"date\" name=\"date\" value=\"1700-01-01\">\n" +
    "    </div>\n" +
    "    <div class=\"entry setPerson\">\n" +
    "        <label>Personne</label>\n" +
    "        <input type=\"text\" name=\"nom\" placeholder=\"Nom\">\n" +
    "        <input type=\"text\" name=\"prenom\" placeholder=\"Prénom\">\n" +
    "    </div>\n" +
    "    <datalist id=\"typeActe\"><option value=\"accord\">accord</option>\n" +
    "        <option>accord</option>\n" +
    "        <option>acte d'état civil</option>\n" +
    "        <option>acte de vente</option>\n" +
    "        <option>arrêt</option>\n" +
    "        <option>avis</option>\n" +
    "        <option>bail</option>\n" +
    "        <option>bilan</option>\n" +
    "        <option>cautionnement</option>\n" +
    "        <option>certificat</option>\n" +
    "        <option>cession</option>\n" +
    "        <option>comparution</option>\n" +
    "        <option>compte</option>\n" +
    "        <option>compte de gestion</option>\n" +
    "        <option>compte de tutelle</option>\n" +
    "        <option>compte financier</option>\n" +
    "        <option>constitution de rente</option>\n" +
    "        <option>contrat</option>\n" +
    "        <option>contrat d'apprentissage</option>\n" +
    "        <option>contrat de mariage</option>\n" +
    "        <option>convention</option>\n" +
    "        <option>décharge</option>\n" +
    "        <option>déclaration</option>\n" +
    "        <option>déclaration féodale</option>\n" +
    "        <option>déclaration fiscale</option>\n" +
    "        <option>délibération</option>\n" +
    "        <option>délivrance de legs</option>\n" +
    "        <option>dépôt d'argent</option>\n" +
    "        <option>dépôt de pièces</option>\n" +
    "        <option>donation</option>\n" +
    "        <option>dossier d'homologation</option>\n" +
    "        <option>indemnité</option>\n" +
    "        <option>inventaire</option>\n" +
    "        <option>inventaire après décès</option>\n" +
    "        <option>liquidation</option>\n" +
    "        <option>mainlevée</option>\n" +
    "        <option>nomination</option>\n" +
    "        <option>notoriété</option>\n" +
    "        <option>obligation</option>\n" +
    "        <option>ordonnance</option>\n" +
    "        <option>partage</option>\n" +
    "        <option>pièce comptable</option>\n" +
    "        <option>procès-verbal</option>\n" +
    "        <option>procès-verbal de séance</option>\n" +
    "        <option>procuration</option>\n" +
    "        <option>quittance</option>\n" +
    "        <option>ratification</option>\n" +
    "        <option>reconnaissance</option>\n" +
    "        <option>remboursement d'office</option>\n" +
    "        <option>renonciation</option>\n" +
    "        <option>statuts d'association</option>\n" +
    "        <option>testament</option>\n" +
    "        <option>titre nouvel</option>\n" +
    "        <option>traité</option>\n" +
    "        <option>traité d'office</option>\n" +
    "        <option>transport de droits</option>\n" +
    "    </datalist>\n" +
    "</div>\n";


var indexConsultData = "<table>\n" +
    "    <tr>\n" +
    "        <th>Type d'Acte</th>\n" +
    "        <th>Date</th>\n" +
    "        <th>Nom</th>\n" +
    "        <th>Prenom</th>\n" +
    "        <th>Occupation</th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Transaction</td>\n" +
    "        <td>29 juin 1775</td>\n" +
    "        <td>Fronmentin  </td>\n" +
    "        <td>Jacques </td>\n" +
    "        <td>Boulanger</td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Procuration </td>\n" +
    "        <td>30 juin 1775</td>\n" +
    "        <td>Jolly</td>\n" +
    "        <td>Jean Baptiste Etienne</td>\n" +
    "        <td>Avocat</td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Bail</td>\n" +
    "        <td>30 juin 1775</td>\n" +
    "        <td>Duschene</td>\n" +
    "        <td>Pierre</td>\n" +
    "        <td>Conseiller</td>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "        <td>Mariage</td>\n" +
    "        <td>30 juin 1775</td>\n" +
    "        <td>Badier</td>\n" +
    "        <td>Philippes</td>\n" +
    "        <td>N/A</td>\n" +
    "    </tr>\n" +
    "</table>";

var cbbutton = "<div class=\"chatbox\" id=\"scroll_back\">\n" +
    "        <a id=\"back_to_top\" href=\"#\" class=\"button button_left button_js\">askAN</a>\n" +
    "        \n" +
    "    </div>";



function SIVEnhance(){
    var self = this;

    var tmp = indexForm6;

    self._bridged = false;
    //self._data = data;

    self.d3 = d3;
    self.dialogBox = dialogBox;
    self.html = HTML;
    self._selectors = {
        viewer: "#conteneurVisionneuse"
    };
    self._HTMLElement = {
        bridge: null,
        viewer: null,
        sectionsGroups: {
            stats: null
        }
    };
    self._enhances = {
        producteur: {
            pathname: "/siv/rechercheconsultation/consultation/producteur/consultationProducteur.action"
        },
        repertoire: {
            pathname: "/siv/rechercheconsultation/consultation/ir/consultationIR.action"
        },
        viewer: {
            pathname: "/siv/rechercheconsultation/consultation/multimedia/Galerie.action"
        },
        formRepro: {
            pathname: "/siv/accueil/monEspace.action"
        }
    }

    self.build = function(){
        return {
            bridge: function(){
                if (!self._bridged){
                    self._HTMLElement.bridge = new HTML().compose({
                        name: 'script', attributes: {id: 'SIVEnhance'}, properties: {
                            textContent: 'var SIVENHANCE = 5;'
                        }
                    });

                    document.head.appendChild(self._HTMLElement.bridge);
                    self._bridged = true;
                }
            },

            statsButton: function(){
                var host = document.querySelector('.tab-wrap');

                host.appendChild(new HTML().compose({
                    name: "input", attributes:{
                        type: "radio", name: "tabs", id: "tab3"
                    }
                }));

                host.appendChild(
                    new HTML().compose({
                        classList: ['tab-label-content'],
                        attributes: {
                            id: "tab3-content"
                        },
                        children: [
                            {name: 'label', attributes: {for: "tab3"}, properties: {textContent: "Statistiques & Carte", onclick: function(){
                                self.producteur();
                                document.querySelectorAll(".sections_group").forEach(function(el){
                                    el.style.display = "none";
                                });
                                self._HTMLElement.sectionsGroups.stats.style.display = "block";
                            }}}
                        ]
                    })
                );

                return true;

            },

            sectionGroup: function(id){
                var contentHost = document.querySelector('.content_wrapper.clearfix');

                self._HTMLElement.sectionsGroups.stats = new HTML().compose({
                    classList: ["sections_group"],
                    attributes: {id: id, style: "display: none;"},
                    children: [
                        {classList: ['entry-content'], children: [
                            {name: "section", classList: ['section', 'mcb-section'], children: [
                                {classList: ['section_wrapper', 'clearfix'], children: [
                                    {classList: ['item_group', 'clearfix'], children:[
                                        {classList: ['column', 'one', 'column_column'], children: [
                                            {classList: "scrollto-section", children:[
                                                {name: 'fieldset', classList: ['irAssocies_fieldset']}
                                            ]}
                                        ]}
                                    ]}
                                ]}
                            ]}
                        ]}
                    ]
                });

                contentHost.appendChild(self._HTMLElement.sectionsGroups.stats);
                self._HTMLElement.sectionsGroups.stats.style.display = "none";
            }
        };
    };

    self.enhance = function(){
        // https://www.siv.archives-nationales.culture.gouv.fr/siv/rechercheconsultation/consultation/producteur/consultationProducteur.action?formCallerNP=PRODUCTEUR&formCallerIR=&notProdId=FRAN_NP_011680
        var pathname = document.location.pathname;
        var search = document.location.search;

        // Enhance : Producteurs (Notaires)
        if (pathname === self._enhances.producteur.pathname) {
            self.build().statsButton();
            self.build().sectionGroup("statistiques");
            document.querySelector("#tab1-content").addEventListener('click', function(){
                self._HTMLElement.sectionsGroups.stats.style.display = "none";
            });
            document.querySelector("#tab2-content").addEventListener('click', function(){
                self._HTMLElement.sectionsGroups.stats.style.display = "none";
            });

            // Enrichissement de main_content
            document.querySelector("#main_content .section.mcb-section .column_column").appendChild(new HTML().compose({
                attributes:{id: "dataExt"}, classList: ['scrollto-section'], children: [
                    {classList: ['description-section', 'description-section-content-structure', 'nohighlight'], children: [
                        {name: "h2", properties: {textContent: "Données Externes"}}
                    ]}
                ]
            }));

            // Enrichissement de main_content // content
            document.querySelector("#main_content .section.mcb-section .column_column").appendChild(new HTML().compose({
                attributes:{id: "dataExt"}, classList: ['scrollto-section'], children: [
                    {classList: ['description-section', 'description-section-content-structure', 'nohighlight'], children: [
                        {classList: ['card', 'inventaire-summary'], children: [
                            {name: "ul", children: [
                                {name: "li", children: [{name: "a", attributes: {href: "https://www.google.com/search?tbm=bks&q=%22andre+fourchy%22+notaire"}, properties:{textContent: "Google Book"}}]},
                                {name: "li", children: [{name: "a", attributes: {href: "https://gallica.bnf.fr/services/engine/search/sru?operation=searchRetrieve&version=1.2&query=%28gallica%20adj%20%22andre%20fourchy%22%20and%20gallica%20all%20%22notaire%22%29&lang=fr&suggest=0"}, properties:{textContent: "Gallica"}}]},
                                {name: "li", children: [{name: "a", attributes: {href: "http://www.famillesparisiennes.org/patro/fou.html"}, properties:{textContent: "Familles Parisiennes"}}]}
                            ]}
                        ]}
                    ]}
                ]
            }));

            // Menu
            document.querySelector('.nav.nav-tabs.nav-stacked.sidenav.affix').appendChild(new HTML().compose({
                name: "li", children: [{
                    name: "a", attributes:{href: "#dataExt", "data-toggle": "scrollto"}, properties: {textContent: "Données Externes"}
                }]
            }));

            // description-section description-section-content-structure
        }

        // Enhance : Repertoites
        if (pathname === self._enhances.repertoire.pathname) {
            self.repertoire();
            //self.viewer();
        }

        // Enhance : Viewer
        if (pathname === self._enhances.viewer.pathname) {
            self.viewer();
        }

        // Enhance : Form
        if (pathname === self._enhances.formRepro.pathname){
            var cotePattern = /date=/i;
            if (cotePattern.test(document.location.search)){
                document.querySelector('.column_column').innerHTML = hanFormRepro;

                var datePattern = /date=([0-9]{4}-[0-9]{2}-[0-9]{2})&?/

                var qdate = document.location.search.split(datePattern)[1];
                var drop = null;
                var year = null;
                var month = null;
                var day = null;

                [year, month, day] = qdate.split('-');

                var cotesPossible = [];
                var cote = "Selectionnez le type de document";

                cotes.map(function(el){
                    // année
                    if (year >= el.startYear && year <= el.endYear){
                        // mois
                        if (month >= el.startMonth && month <= el.endMonth){
                            cotesPossible.push(el);
                        }
                    }
                });

                if (cotesPossible.length > 1){
                    var ref = document.querySelector('label[for="contentDescription"]');

                    var id = 0;

                    cotesPossible.map(function(el){
                        id++;

                        var radio = new HTML().compose({
                            children: [
                                {name: "label", attributes: {for: id}, classList: ['selTypeRadio'], properties: {textContent: el.type}},
                                {name: "input", attributes: {type: "radio", name: "selCote", id:id}, properties: {
                                    onchange: function(){
                                        document.querySelector('.sivh2.left').innerHTML = '<label>Document à reproduire :</label> ' + el.cote;
                                    }
                                }}
                            ]
                        });

                        ref.parentNode.insertBefore(radio, ref);
                    });
                } else {
                    cote = cotesPossible[0].cote;
                }

                // Traitement des arguments et actuin adaptée.
                document.querySelector('.sivh2.left').innerHTML = '<label>Document à reproduire :</label> ' + cote;

                // Traitement de Type, Nom, Prenom
                var sdate = null;
                var drop = null;
                var type = null;
                var nom = null;
                var prenom = null;

                [drop, sdate, drop, type, drop, nom, drop, prenom] = location.search.split(/=(.*?)&/u);

                console.log(location.search, type, nom, prenom);
                document.querySelector('textarea[name="contentDescription"]').value = type + " - " + sdate + " - " + nom + ", " + prenom;

            } else {
                var bot = new HTML().composeTemplate(cbbutton);
                bot.addEventListener('click', function(){
                    document.body.appendChild(new HTML().compose({name: "img", attributes: {src: "http://img.neoblaster.fr/askAN.png", style: "position: fixed; bottom: 0; right: 20px; width: 300px; z-index: 10000;"}}));
                });
                document.body.appendChild(bot);
            }
        }
    };

    self.producteur = function(){
        // FLush
        self._HTMLElement.sectionsGroups.stats.querySelector('.irAssocies_fieldset').innerHTML = "";

        // Récupérer le producteur
        var producteur = document.querySelector("#notice_title h1").textContent;



        var pattern = /^([a-z -]+),\s([a-z é-]+)(\((.*))?/i;
        var drop = null;
        var nom = null;
        var prenom = null;

        [drop, nom, prenom] = producteur.split(pattern);

        console.log(nom, prenom);

        nom = nom.toUpperCase().trim();
        prenom = prenom.toLowerCase().trim();

        var key = nom + prenom;

        if (chartClients[key]){
            // Row 1
            self._HTMLElement.sectionsGroups.stats.querySelector('.irAssocies_fieldset').appendChild(new HTML().compose({
                classList: ['statRow'], children: [
                    {classList: ['chartBlock'], children:[{name: 'img', attributes:{src: "http://img.neoblaster.fr/charts/FOURCHY_andr%C3%A9_types_v1.png"}}]},
                    {classList: ['chartBlock'], children:[{name: 'img', attributes:{src: "http://img.neoblaster.fr/charts/FOURCHY_andr%C3%A9_occupations_v1.png"}}]}
                ]
            }));
            // Row 2
            self._HTMLElement.sectionsGroups.stats.querySelector('.irAssocies_fieldset').appendChild(new HTML().compose({
                classList: ['statRow'], children: [
                    {classList: ['chartBlock'], children:[{name: 'img', attributes:{src: "http://img.neoblaster.fr/charts/FOURCHY_andr%C3%A9_actes_v1.png"}}]},
                    {classList: ['chartBlock'], attributes:{style: "background: white;"}, children:[
                        {name: "h1", properties: {textContent: "Les dix personnes les plus mentionnées dans les actes"}},
                        {
                            name: 'table',
                            functions: [
                                {
                                    function: function(){
                                        this.appendChild(new HTML().compose({
                                            name: "tr", children: [
                                                {name: "th", properties: {textContent: "Nom, Prénom"}},
                                                {name: "th", properties: {textContent: "Occurences"}}
                                            ]
                                        }));

                                        chartClients['FOURCHYandré'].map(function(el){
                                            this.appendChild(new HTML().compose({
                                                name: "tr", children: [
                                                    {name: "td", properties: {textContent: el.name}},
                                                    {name: "td", properties: {textContent: el.actes}}
                                                ]
                                            }))
                                        }.bind(this));
                                    }
                                }
                            ]
                        }
                    ]}
                ]
            }));
            // Row 3
            self._HTMLElement.sectionsGroups.stats.querySelector('.irAssocies_fieldset').appendChild(new HTML().compose({
                classList: ['statRow'], children: [
                    {
                        classList: ['chartBlock'],
                        children:[
                            {classList: ['description-section', 'description-section-content-structure', 'nohighlight'], children: [
                                {name: "h2", attributes:{style: "margin-top: 1rem;"}, classList:["description-section-title"], properties: {textContent: "Localisation de l'étude et des personnes citées dans les actes"}}
                            ]},
                            {name: 'iframe', attributes:{width: "100%", height: "600px;", frameBorder: "0", allowfullscreen: "", src: umapURL[key]}
                            }]}
                ]
            }));
        } else {
            self._HTMLElement.sectionsGroups.stats.querySelector('.irAssocies_fieldset').innerHTML = "Aucune donnée statistique disponible";
            console.log(key);
        }
    };

    self.repertoire = function(){
        // Enhance car archive_numerised to tag uid to viewer
        document.querySelectorAll('.card.archive_numerised').forEach(function(card){
            var udid = card.id;

            card.querySelector('.images a:first-child').addEventListener('click', function(){
                self._HTMLElement.viewer.setAttribute('data-udid', udid);
            });
        });
    };

    self.viewer = function(){
        var tdTitre = self._HTMLElement.viewer.querySelector('.tdTitre');

        // Reproduction // reproPopupContent // self._enhances.formRepro.pathname + "?date=xxx"
        tdTitre.appendChild(new HTML().compose({
            name: "a", attributes: {id: "lienReproduction", href: "#", target: "formRepro"}, classList: ['viewerLink', 'lienDownloadWhite'], children: [{
                name: "img", attributes: {src: ""}
            }], properties: {textContent: "Reproduction", onclick: function(e){
                e.preventDefault();
                //dialogBox('dbNamed').title('Attention !').contents('Voulez-vous vraiment continuez ?').addTrigger('confirm', 'Continuer').addTrigger('cancel', 'Annuler', this.close).open();

                var db = document.querySelector('dialogbox');

                if (db){
                    db.parentNode.removeChild(db);
                }

                var dbi = new dialogBox('reproduction');
                var content = new HTML().composeTemplate(reproPopupContent);

                dbi.title('Demande de reprographie');
                dbi.contents(content);
                dbi.addTrigger('submit', 'Soumettre', function(content){if(confirm('voulez-vous soumettre la demande ?')){
                    var date = content.querySelector('input[type="date"]').value;
                    var type = content.querySelector('input[list="typeActe"]').value;
                    var prenom = content.querySelector('input[name="prenom"]').value;
                    var nom = content.querySelector('input[name="nom"]').value;

                    document.location.href = self._enhances.formRepro.pathname + "?date=" + date + "&type=" + type + "&nom=" + nom + "&prenom=" + prenom + "&";
                }}.bind(dbi, content));
                dbi.addTrigger('cancel', 'Fermer', function(){if(confirm('voulez-vous fermer la fenêtre ? Cette action est irreversible')){this.close();}}.bind(dbi));
                dbi.open();
                db = document.querySelector('dialogbox');
                db.style.top = "38px";
                db.style.width = "650px";
                db.style.left = "calc(100% - 652px)";
                db.style.margin = "0";
            }}
        }));
        // Indexation
        tdTitre.appendChild(new HTML().compose({
            name: "a", attributes: {id: "lienIndexation"}, classList: ['viewerLink', 'lienDownloadWhite'], children: [{
                name: "img", attributes: {src: ""}
            }], properties: {textContent: "Indexation", onclick: function(){
                //dialogBox('dbNamed').title('Attention !').contents('Voulez-vous vraiment continuez ?').addTrigger('confirm', 'Continuer').addTrigger('cancel', 'Annuler', this.close).open();

                var db = document.querySelector('dialogbox');

                if (db){
                    db.parentNode.removeChild(db);
                }

                var dbi = new dialogBox('indexation');
                var content = new HTML().composeTemplate(tmp);
                var button = content.querySelector('#addPerson input');
                button.addEventListener('click', function(ct){
                    var entry = ct.querySelector('.setPerson');
                    content.insertBefore(entry.cloneNode(true), entry);
                }.bind(button, content));

                dbi.title('Indexation des noms');
                dbi.contents(content);
                dbi.addTrigger('submit', 'Soumettre', function(){if(confirm('voulez-vous soumettre la demande ?')){
                    this.close();
                }}.bind(dbi));
                dbi.addTrigger('cancel', 'Annuler', function(){if(confirm('voulez-vous fermer la fenêtre ? Cette action est irreversible')){this.close();}}.bind(dbi));
                dbi.open();
                db = document.querySelector('dialogbox');
                db.style.top = "38px";
                db.style.width = "650px";
                db.style.left = "calc(100% - 652px)";
                db.style.margin = "0";
            }}
        }));
        // Consultation
        tdTitre.appendChild(new HTML().compose({
            name: "a", attributes: {id: "lienConsultation"}, classList: ['viewerLink', 'lienDownloadWhite'], children: [{
                name: "img", attributes: {src: ""}
            }], properties: {textContent: "Consultation", onclick: function(e){
                e.preventDefault();
                //dialogBox('dbNamed').title('Attention !').contents('Voulez-vous vraiment continuez ?').addTrigger('confirm', 'Continuer').addTrigger('cancel', 'Annuler', this.close).open();

                var db = document.querySelector('dialogbox');

                if (db){
                    db.parentNode.removeChild(db);
                }

                var dbi = new dialogBox('consultation');
                var content = new HTML().composeTemplate(indexConsultData);

                dbi.title('Données indéxées');
                dbi.contents(content);
                dbi.addTrigger('cancel', 'Fermer', function(){this.close();}.bind(dbi));
                dbi.open();
                db = document.querySelector('dialogbox');
                db.style.top = "38px";
                db.style.width = "650px";
                db.style.left = "calc(100% - 652px)";
                db.style.margin = "0";
            }}
        }));
    };

    self.css = function(){
        var style = document.createElement('style');
        style.setAttribute('id', 'SIVEnhanceCSS')
        document.head.appendChild(style);

        var sheet = document.styleSheets['SIVEnhanceCSS'];
        sheet.addRule('.irAssocies_fieldset .card', 'background-color: #fff; border-radius: 2px; box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12); font-size: 80%; margin: 0.5rem 0 0; overflow: hidden; position: relative; transition: box-shadow 0.25s ease 0s;', 0);
        sheet.addRule('.notice #Subheader .tab-wrap .slide', 'left: 438px;', 0);
        sheet.addRule('.irAssocies_fieldset', 'background: #f2f2f2; border: 1px solid #ccc; margin-top: 13px; padding: 1%;', 0);
        sheet.addRule('.irAssocies_fieldset .statRow', 'display: flex;', 0);
        sheet.addRule('.irAssocies_fieldset .chartBlock', 'flex: 1;', 0);
        sheet.addRule('.viewerLink', 'float: right; padding-right: 20px; color: white !important; text-decoration: none; vertical-align: top;', 0);
        sheet.addRule('#lienReproduction', '', 0);
        sheet.addRule('#lienIndexation', '', 0);
        sheet.addRule('#lienConsultation', '', 0);
        sheet.addRule('dialogbox', 'font-family: Tahoma,Verdana,Segoe,sans-serif; font-style: normal;', 0);
        sheet.addRule('dialogbox dboxheader', 'font-size: 1rem; font-family: Tahoma,Verdana,Segoe,sans-serif; font-style: normal;', 0);
        sheet.addRule('dialogbox label', 'display: inline-block; width: 130px; margin: 0; text-align: right; padding-right: .2rem;', 0);
        sheet.addRule('dialogbox label:after', 'content: " : ";', 0);
        sheet.addRule('dialogbox .entry', 'display: block; font-size: 1rem; height: 32px; line-height: 32px; margin: .2rem;', 0);
        sheet.addRule('dialogbox .entry#addPerson', 'display: block; font-size: 1rem; height: 30px; line-height: 30px; text-align: center;', 0);
        sheet.addRule('dialogbox input[type="text"]', 'display: inline; padding: 2px; outline: 0; width: 150px; border-width: 1px; border-style: solid; margin: 0; text-align: center;', 0);
        sheet.addRule('dialogbox input[type="date"]', 'display: inline; padding: 2px; outline: 0; width: 150px; border-width: 1px; border-style: solid; margin: 0; text-align: center;', 0);
        sheet.addRule('dialogbox input[list]', 'display: inline; padding: 2px; outline: 0; width: 150px; border-width: 1px; border-style: solid; text-align: center;', 0);
        sheet.addRule('dialogbox .entry#setComment', 'padding-top: .5rem;', 0);
        sheet.addRule('dialogbox .entry textarea', 'margin-top: .2rem; width: 100%;', 0);
        sheet.addRule('.description-section-title', 'background: #f2f2f2; border-bottom: none; color: #676767; font-weight: normal; margin-left: 5px;', 0);
        sheet.addRule('.selTypeRadio', 'display: inline-block; width: 130px; text-right; ', 0);
        sheet.addRule('.selTypeRadio:after', 'content: " : "', 0);
        sheet.addRule('#scroll_back.chatbox', 'position: fixed; bottom: 15px; right: 85px; z-index: 9001;', 0);
        sheet.addRule('#scroll_back.chatbox a.button', 'background: #436f8d; color: white; width: 90px;', 0);



        self.init = function(){
            self._HTMLElement.viewer = document.querySelector(self._selectors.viewer);

            self.css();
            self.build().bridge();
            self.enhance();

            SIVENHANCE = self;
        };
        return this;
    }

    self.init = function(){
        self._HTMLElement.viewer = document.querySelector(self._selectors.viewer);

        self.css();
        self.build().bridge();
        self.enhance();

        SIVENHANCE = self;
    };
    return this;

}


document.head.appendChild(new HTML().compose({
    name: "link", attributes: {href: "https://rawcdn.githack.com/UneMinuteAgo/lib/cdb7b1225a8420d8d9388dcff596a207f0d585e9/src/dialogBox.css", type: "text/css", rel: "stylesheet"}
}))
document.head.appendChild(new HTML().compose({
    name: "link", attributes: {href: "https://unpkg.com/leaflet@1.3.4/dist/leaflet.css", type: "text/css", rel: "stylesheet"}
}))

new SIVEnhance().init();

