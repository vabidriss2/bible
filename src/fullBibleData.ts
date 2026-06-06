/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language } from "./types";

export interface TranslatedBook {
  id: string; // e.g. "genesis"
  names: Record<Language, string>;
  testament: "old" | "new";
  chapters: {
    number: number;
    verses: {
      number: number;
      translations: Record<Language, string>;
    }[];
  }[];
}

// Complete 66 books canon metadata with exact chapter counts
export const ALL_66_BOOKS_METADATA = [
  // --- Old Testament (Ancien Testament) ---
  { id: "genesis", testament: "old", chaptersCount: 50, names: { [Language.FR]: "Genèse", [Language.EN]: "Genesis", [Language.SW]: "Mwanzo", [Language.RW]: "Imitangiriro", [Language.ES]: "Génesis" } },
  { id: "exodus", testament: "old", chaptersCount: 40, names: { [Language.FR]: "Exode", [Language.EN]: "Exodus", [Language.SW]: "Kutoka", [Language.RW]: "Kuhama", [Language.ES]: "Éxodo" } },
  { id: "leviticus", testament: "old", chaptersCount: 27, names: { [Language.FR]: "Lévitique", [Language.EN]: "Leviticus", [Language.SW]: "Mambo ya Walawi", [Language.RW]: "Abalawi", [Language.ES]: "Levítico" } },
  { id: "numbers", testament: "old", chaptersCount: 36, names: { [Language.FR]: "Nombres", [Language.EN]: "Numbers", [Language.SW]: "Hesabu", [Language.RW]: "Imibarurire", [Language.ES]: "Números" } },
  { id: "deuteronomy", testament: "old", chaptersCount: 34, names: { [Language.FR]: "Deutéronome", [Language.EN]: "Deuteronomy", [Language.SW]: "Kumbukumbu la Torati", [Language.RW]: "Gutegeka kwa Kabiri", [Language.ES]: "Deuteronomio" } },
  { id: "joshua", testament: "old", chaptersCount: 24, names: { [Language.FR]: "Josué", [Language.EN]: "Joshua", [Language.SW]: "Yoshua", [Language.RW]: "Yosuwa", [Language.ES]: "Josué" } },
  { id: "judges", testament: "old", chaptersCount: 21, names: { [Language.FR]: "Juges", [Language.EN]: "Judges", [Language.SW]: "Waamuzi", [Language.RW]: "Abacamanza", [Language.ES]: "Jueces" } },
  { id: "ruth", testament: "old", chaptersCount: 4, names: { [Language.FR]: "Ruth", [Language.EN]: "Ruth", [Language.SW]: "Ruthi", [Language.RW]: "Ruti", [Language.ES]: "Rut" } },
  { id: "1samuel", testament: "old", chaptersCount: 31, names: { [Language.FR]: "1 Samuel", [Language.EN]: "1 Samuel", [Language.SW]: "1 Samweli", [Language.RW]: "1 Samweli", [Language.ES]: "1 Samuel" } },
  { id: "2samuel", testament: "old", chaptersCount: 24, names: { [Language.FR]: "2 Samuel", [Language.EN]: "2 Samuel", [Language.SW]: "2 Samweli", [Language.RW]: "2 Samweli", [Language.ES]: "2 Samuel" } },
  { id: "1kings", testament: "old", chaptersCount: 22, names: { [Language.FR]: "1 Rois", [Language.EN]: "1 Kings", [Language.SW]: "1 Wafalme", [Language.RW]: "1 Abami", [Language.ES]: "1 Reyes" } },
  { id: "2kings", testament: "old", chaptersCount: 25, names: { [Language.FR]: "2 Rois", [Language.EN]: "2 Kings", [Language.SW]: "2 Wafalme", [Language.RW]: "2 Abami", [Language.ES]: "2 Reyes" } },
  { id: "1chronicles", testament: "old", chaptersCount: 29, names: { [Language.FR]: "1 Chroniques", [Language.EN]: "1 Chronicles", [Language.SW]: "1 Mambo ya Nyakati", [Language.RW]: "1 Ngoma", [Language.ES]: "1 Crónicas" } },
  { id: "2chronicles", testament: "old", chaptersCount: 36, names: { [Language.FR]: "2 Chroniques", [Language.EN]: "2 Chronicles", [Language.SW]: "2 Mambo ya Nyakati", [Language.RW]: "2 Ngoma", [Language.ES]: "2 Crónicas" } },
  { id: "ezra", testament: "old", chaptersCount: 10, names: { [Language.FR]: "Esdras", [Language.EN]: "Ezra", [Language.SW]: "Ezra", [Language.RW]: "Ezira", [Language.ES]: "Esdras" } },
  { id: "nehemiah", testament: "old", chaptersCount: 13, names: { [Language.FR]: "Néhémie", [Language.EN]: "Nehemiah", [Language.SW]: "Nehemia", [Language.RW]: "Nehemiya", [Language.ES]: "Nehemías" } },
  { id: "esther", testament: "old", chaptersCount: 10, names: { [Language.FR]: "Esther", [Language.EN]: "Esther", [Language.SW]: "Esta", [Language.RW]: "Esiteri", [Language.ES]: "Ester" } },
  { id: "job", testament: "old", chaptersCount: 42, names: { [Language.FR]: "Job", [Language.EN]: "Job", [Language.SW]: "Ayubu", [Language.RW]: "Yobu", [Language.ES]: "Job" } },
  { id: "psalms", testament: "old", chaptersCount: 150, names: { [Language.FR]: "Psaumes", [Language.EN]: "Psalms", [Language.SW]: "Zaburi", [Language.RW]: "Zaburi", [Language.ES]: "Salmos" } },
  { id: "proverbs", testament: "old", chaptersCount: 31, names: { [Language.FR]: "Proverbes", [Language.EN]: "Proverbs", [Language.SW]: "Mithali", [Language.RW]: "Imigani", [Language.ES]: "Proverbios" } },
  { id: "ecclesiastes", testament: "old", chaptersCount: 12, names: { [Language.FR]: "Ecclésiaste", [Language.EN]: "Ecclesiastes", [Language.SW]: "Mhubiri", [Language.RW]: "Umubwiriza", [Language.ES]: "Eclesiastés" } },
  { id: "songofsolomon", testament: "old", chaptersCount: 8, names: { [Language.FR]: "Cantique des Cantique", [Language.EN]: "Song of Solomon", [Language.SW]: "Wimbo ulio Bora", [Language.RW]: "Indirimbo ya Solomoni", [Language.ES]: "Cantares" } },
  { id: "isaiah", testament: "old", chaptersCount: 66, names: { [Language.FR]: "Ésaïe", [Language.EN]: "Isaiah", [Language.SW]: "Isaya", [Language.RW]: "Yesaya", [Language.ES]: "Isaías" } },
  { id: "jeremiah", testament: "old", chaptersCount: 52, names: { [Language.FR]: "Jérémie", [Language.EN]: "Jeremiah", [Language.SW]: "Yeremia", [Language.RW]: "Yeremiya", [Language.ES]: "Jeremías" } },
  { id: "lamentations", testament: "old", chaptersCount: 5, names: { [Language.FR]: "Lamentations", [Language.EN]: "Lamentations", [Language.SW]: "Maombolezo", [Language.RW]: "Amaborozi", [Language.ES]: "Lamentaciones" } },
  { id: "ezekiel", testament: "old", chaptersCount: 48, names: { [Language.FR]: "Ézéchiel", [Language.EN]: "Ezekiel", [Language.SW]: "Ezekieli", [Language.RW]: "Ezekiyeli", [Language.ES]: "Ezequiel" } },
  { id: "daniel", testament: "old", chaptersCount: 12, names: { [Language.FR]: "Daniel", [Language.EN]: "Daniel", [Language.SW]: "Danieli", [Language.RW]: "Daniyeli", [Language.ES]: "Daniel" } },
  { id: "hosea", testament: "old", chaptersCount: 14, names: { [Language.FR]: "Osée", [Language.EN]: "Hosea", [Language.SW]: "Hosea", [Language.RW]: "Hoseya", [Language.ES]: "Oseas" } },
  { id: "joel", testament: "old", chaptersCount: 3, names: { [Language.FR]: "Joël", [Language.EN]: "Joel", [Language.SW]: "Yoeli", [Language.RW]: "Yoweli", [Language.ES]: "Joel" } },
  { id: "amos", testament: "old", chaptersCount: 9, names: { [Language.FR]: "Amos", [Language.EN]: "Amos", [Language.SW]: "Amosi", [Language.RW]: "Amosi", [Language.ES]: "Amós" } },
  { id: "obadiah", testament: "old", chaptersCount: 1, names: { [Language.FR]: "Abdias", [Language.EN]: "Obadiah", [Language.SW]: "Obadia", [Language.RW]: "Obadiya", [Language.ES]: "Abdías" } },
  { id: "jonah", testament: "old", chaptersCount: 4, names: { [Language.FR]: "Jonas", [Language.EN]: "Jonah", [Language.SW]: "Yona", [Language.RW]: "Yona", [Language.ES]: "Jonás" } },
  { id: "micah", testament: "old", chaptersCount: 7, names: { [Language.FR]: "Michée", [Language.EN]: "Michah", [Language.SW]: "Mika", [Language.RW]: "Mika", [Language.ES]: "Miqueas" } },
  { id: "nahum", testament: "old", chaptersCount: 3, names: { [Language.FR]: "Nahum", [Language.EN]: "Nahum", [Language.SW]: "Nahumu", [Language.RW]: "Nahumu", [Language.ES]: "Nahúm" } },
  { id: "habakkuk", testament: "old", chaptersCount: 3, names: { [Language.FR]: "Habacuc", [Language.EN]: "Habakkuk", [Language.SW]: "Habakuki", [Language.RW]: "Habakuki", [Language.ES]: "Habacuc" } },
  { id: "zephaniah", testament: "old", chaptersCount: 3, names: { [Language.FR]: "Sophonie", [Language.EN]: "Zephaniah", [Language.SW]: "Sefania", [Language.RW]: "Sefaniya", [Language.ES]: "Sofonías" } },
  { id: "haggai", testament: "old", chaptersCount: 2, names: { [Language.FR]: "Aggée", [Language.EN]: "Haggai", [Language.SW]: "Hagai", [Language.RW]: "Hagayi", [Language.ES]: "Hageo" } },
  { id: "zechariah", testament: "old", chaptersCount: 14, names: { [Language.FR]: "Zacharie", [Language.EN]: "Zechariah", [Language.SW]: "Zekaria", [Language.RW]: "Zekariya", [Language.ES]: "Zacarías" } },
  { id: "malachi", testament: "old", chaptersCount: 4, names: { [Language.FR]: "Malachie", [Language.EN]: "Malachi", [Language.SW]: "Malaki", [Language.RW]: "Malaki", [Language.ES]: "Malaquías" } },

  // --- New Testament (Nouveau Testament) ---
  { id: "matthew", testament: "new", chaptersCount: 28, names: { [Language.FR]: "Matthieu", [Language.EN]: "Matthew", [Language.SW]: "Mathayo", [Language.RW]: "Matayo", [Language.ES]: "Mateo" } },
  { id: "mark", testament: "new", chaptersCount: 16, names: { [Language.FR]: "Marc", [Language.EN]: "Mark", [Language.SW]: "Marko", [Language.RW]: "Marko", [Language.ES]: "Marcos" } },
  { id: "luke", testament: "new", chaptersCount: 24, names: { [Language.FR]: "Luc", [Language.EN]: "Luke", [Language.SW]: "Luka", [Language.RW]: "Luka", [Language.ES]: "Lucas" } },
  { id: "john", testament: "new", chaptersCount: 21, names: { [Language.FR]: "Jean", [Language.EN]: "John", [Language.SW]: "Yohana", [Language.RW]: "Yohana", [Language.ES]: "Juan" } },
  { id: "acts", testament: "new", chaptersCount: 28, names: { [Language.FR]: "Actes", [Language.EN]: "Acts", [Language.SW]: "Matendo ya Mitume", [Language.RW]: "Ibikorwa by'Intumwa", [Language.ES]: "Hechos" } },
  { id: "romans", testament: "new", chaptersCount: 16, names: { [Language.FR]: "Romains", [Language.EN]: "Romans", [Language.SW]: "Warumi", [Language.RW]: "Abaroma", [Language.ES]: "Romanos" } },
  { id: "1corinthians", testament: "new", chaptersCount: 16, names: { [Language.FR]: "1 Corinthiens", [Language.EN]: "1 Corinthians", [Language.SW]: "1 Wakorintho", [Language.RW]: "1 Abakorinto", [Language.ES]: "1 Corintios" } },
  { id: "2corinthians", testament: "new", chaptersCount: 13, names: { [Language.FR]: "2 Corinthiens", [Language.EN]: "2 Corinthians", [Language.SW]: "2 Wakorintho", [Language.RW]: "2 Abakorinto", [Language.ES]: "2 Corintios" } },
  { id: "galatians", testament: "new", chaptersCount: 6, names: { [Language.FR]: "Galates", [Language.EN]: "Galatians", [Language.SW]: "Wagalatia", [Language.RW]: "Abagalatiya", [Language.ES]: "Gálatas" } },
  { id: "ephesians", testament: "new", chaptersCount: 6, names: { [Language.FR]: "Éphésiens", [Language.EN]: "Ephesians", [Language.SW]: "Waefeso", [Language.RW]: "Abanyefeso", [Language.ES]: "Efesios" } },
  { id: "philippians", testament: "new", chaptersCount: 4, names: { [Language.FR]: "Philippiens", [Language.EN]: "Philippians", [Language.SW]: "Wafilipi", [Language.RW]: "Abafilipi", [Language.ES]: "Filipenses" } },
  { id: "colossians", testament: "new", chaptersCount: 4, names: { [Language.FR]: "Colossiens", [Language.EN]: "Colossians", [Language.SW]: "Wakolosai", [Language.RW]: "Abakolosayi", [Language.ES]: "Colosenses" } },
  { id: "1thessalonians", testament: "new", chaptersCount: 5, names: { [Language.FR]: "1 Thessaloniciens", [Language.EN]: "1 Thessalonians", [Language.SW]: "1 Wathesalonike", [Language.RW]: "1 Abatesalonike", [Language.ES]: "1 Tesalonicenses" } },
  { id: "2thessalonians", testament: "new", chaptersCount: 3, names: { [Language.FR]: "2 Thessaloniciens", [Language.EN]: "2 Thessalonians", [Language.SW]: "2 Wathesalonike", [Language.RW]: "2 Abatesalonike", [Language.ES]: "2 Tesalonicenses" } },
  { id: "1timothy", testament: "new", chaptersCount: 6, names: { [Language.FR]: "1 Timothée", [Language.EN]: "1 Timothy", [Language.SW]: "1 Timotheo", [Language.RW]: "1 Timoteyo", [Language.ES]: "1 Timoteo" } },
  { id: "2timothy", testament: "new", chaptersCount: 4, names: { [Language.FR]: "2 Timothée", [Language.EN]: "2 Timothy", [Language.SW]: "2 Timotheo", [Language.RW]: "2 Timoteyo", [Language.ES]: "2 Timoteo" } },
  { id: "titus", testament: "new", chaptersCount: 3, names: { [Language.FR]: "Tite", [Language.EN]: "Titus", [Language.SW]: "Tito", [Language.RW]: "Tito", [Language.ES]: "Tito" } },
  { id: "philemon", testament: "new", chaptersCount: 1, names: { [Language.FR]: "Philémon", [Language.EN]: "Philemon", [Language.SW]: "Filemoni", [Language.RW]: "Filemoni", [Language.ES]: "Filemón" } },
  { id: "hebrews", testament: "new", chaptersCount: 13, names: { [Language.FR]: "Hébreux", [Language.EN]: "Hebrews", [Language.SW]: "Waebrania", [Language.RW]: "Abaheburayo", [Language.ES]: "Hebreos" } },
  { id: "james", testament: "new", chaptersCount: 5, names: { [Language.FR]: "Jacques", [Language.EN]: "James", [Language.SW]: "Yakobo", [Language.RW]: "Yakobo", [Language.ES]: "Santiago" } },
  { id: "1peter", testament: "new", chaptersCount: 5, names: { [Language.FR]: "1 Pierre", [Language.EN]: "1 Peter", [Language.SW]: "1 Petro", [Language.RW]: "1 Petero", [Language.ES]: "1 Pedro" } },
  { id: "2peter", testament: "new", chaptersCount: 3, names: { [Language.FR]: "2 Pierre", [Language.EN]: "2 Peter", [Language.SW]: "2 Petro", [Language.RW]: "2 Petero", [Language.ES]: "2 Pedro" } },
  { id: "1john", testament: "new", chaptersCount: 5, names: { [Language.FR]: "1 Jean", [Language.EN]: "1 John", [Language.SW]: "1 Yohana", [Language.RW]: "1 Yohana", [Language.ES]: "1 Juan" } },
  { id: "2john", testament: "new", chaptersCount: 1, names: { [Language.FR]: "2 Jean", [Language.EN]: "2 John", [Language.SW]: "2 Yohana", [Language.RW]: "2 Yohana", [Language.ES]: "2 Juan" } },
  { id: "3john", testament: "new", chaptersCount: 1, names: { [Language.FR]: "3 Jean", [Language.EN]: "3 John", [Language.SW]: "3 Yohana", [Language.RW]: "3 Yohana", [Language.ES]: "3 Juan" } },
  { id: "jude", testament: "new", chaptersCount: 1, names: { [Language.FR]: "Jude", [Language.EN]: "Jude", [Language.SW]: "Yuda", [Language.RW]: "Yuda", [Language.ES]: "Judas" } },
  { id: "revelation", testament: "new", chaptersCount: 22, names: { [Language.FR]: "Apocalypse", [Language.EN]: "Revelation", [Language.SW]: "Ufunuo", [Language.RW]: "Ibyahishuwe", [Language.ES]: "Apocalipsis" } }
];

// Offline Preloaded high-value spiritual scriptures
const GENESIS_1_VERSES = [
  {
    number: 1,
    translations: {
      [Language.FR]: "Au commencement, Dieu créa les cieux et la terre.",
      [Language.EN]: "In the beginning God created the heaven and the earth.",
      [Language.SW]: "Hapo mwanzo Mungu aliziumba mbingu na nchi.",
      [Language.RW]: "Mbere na mbere Imana yaremye ijuru n'isi.",
      [Language.ES]: "En el principio creó Dios los cielos y la tierra."
    }
  },
  {
    number: 2,
    translations: {
      [Language.FR]: "La terre était informe et vide: il y avait des ténèbres à la surface de l'abîme, et l'esprit de Dieu se mouvait au-dessus des eaux.",
      [Language.EN]: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.",
      [Language.SW]: "Nayo nchi ilikuwa ukiwa na utupu, na giza lilikuwa juu ya uso wa vilindi; Roho ya Mungu ikatulia juu ya uso wa maji.",
      [Language.RW]: "Isi yari akajagari n'ubusa, umwijima wari ku gitiyo cy'umuhengeri, maze Umwuka w'Imana wagereraga hejuru y'amazi.",
      [Language.ES]: "Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas."
    }
  },
  {
    number: 3,
    translations: {
      [Language.FR]: "Dieu dit: Que la lumière soit! Et la lumière fut.",
      [Language.EN]: "And God said, Let there be light: and there was light.",
      [Language.SW]: "Mungu akasema, Kuwe na nuru; kukawa na nuru.",
      [Language.RW]: "Imana iravuga iti “Habeho umucyo”, nuko habaho umucyo.",
      [Language.ES]: "Y dijo Dios: Sea la luz; y fue la luz."
    }
  },
  {
    number: 4,
    translations: {
      [Language.FR]: "Dieu vit que la lumière était bonne; et Dieu sépara la lumière d'avec les ténèbres.",
      [Language.EN]: "And God saw the light, that it was good: and God divided the light from the darkness.",
      [Language.SW]: "Mungu akaona nuru kuwa ni njema; Mungu akatenga nuru na giza.",
      [Language.RW]: "Imana ibona ko umucyo ari mwiza, maze Imana itandukanya umucyo n'umwijima.",
      [Language.ES]: "Y vio Dios que la luz era buena; y dividió Dios la luz de las tinieblas."
    }
  },
  {
    number: 5,
    translations: {
      [Language.FR]: "Dieu appela la lumière jour, et il appela les ténèbres nuit. Ainsi, il y eut un soir, et il y eut un matin: ce fut le premier jour.",
      [Language.EN]: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
      [Language.SW]: "Mungu akaiita nuru Mchana, na giza akaliita Usiku. Ikawa jioni ikawa asubuhi, siku ya kwanza.",
      [Language.RW]: "Imana yita umucyo “Ku manywa”, umwijima iwita “Ijoro”. Biragoroba biracya, uwo uba umunsi wa mbere.",
      [Language.ES]: "Y llamó Dios a la luz Día, y a las tinieblas llamó Noche. Y fue la tarde y la mañana un día."
    }
  }
];

const PSAUMES_1_VERSES = [
  {
    number: 1,
    translations: {
      [Language.FR]: "Heureux l'homme qui ne marche pas selon le conseil des méchants, qui ne s'arrête pas sur la voie des pécheurs, et qui ne s'assied pas en compagnie des moqueurs.",
      [Language.EN]: "Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.",
      [Language.SW]: "Heri mtu yule asiyekwenda katika shauri la wasio haki, wala kusimama katika njia ya wakosaji, wala kuketi barazani pa wenye mizaha.",
      [Language.RW]: "Hahirwa umuntu utagendera mu migambi y'ababonya, ntahagarare mu nzira y'abanyabyaha, ntacyare mu nteko y'abashinyaguzi.",
      [Language.ES]: "Bienaventurado el varón que no anduvo en consejo de malos, ni estuvo en camino de pecadores, ni en silla de escarnecedores se ha sentado."
    }
  },
  {
    number: 2,
    translations: {
      [Language.FR]: "Mais qui trouve son plaisir dans la loi de l'Éternel, et qui la médite jour et nuit!",
      [Language.EN]: "But his delight is in the law of the Lord; and in his law doth he meditate day and night.",
      [Language.SW]: "Bali sheria ya Bwana ndiyo inayompendeza, na sheria yake huifikiri mchana na usiku.",
      [Language.RW]: "Ahubwo amategeko y'Uwiteka ni yo yishimira, kandi amategeko ye ni yo yibwira ku manywa n'ijoro.",
      [Language.ES]: "Sino que en la ley de Jehová está su delicia, y en su ley medita de día y de noche."
    }
  },
  {
    number: 3,
    translations: {
      [Language.FR]: "Il est comme un arbre planté près d'un courant d'eau, qui donne son fruit en sa saison, et dont le feuillage ne se flétrit point: tout ce qu'il fait lui réussit.",
      [Language.EN]: "And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.",
      [Language.SW]: "Naye atakuwa kama mti uliopandwa kando ya vijito vya maji, uzaao matunda yake kwa majira yake; wala jani lake halitanyauka; na kila alifanyalo litafanikiwa.",
      [Language.RW]: "Azaba nk'igiti cyatewe rwagati y'imigezi, cyera imbuto zacyo mu gihe cyacyo, amababi yacyo ntabeho gukoroka, ibyo akora byose bizagira amahirwe.",
      [Language.ES]: "Será como árbol plantado junto a corrientes de aguas, que da su fruto en su tiempo, y su hoja no cae; y todo lo que hace, prosperará."
    }
  }
];

const PSAUMES_23_VERSES = [
  {
    number: 1,
    translations: {
      [Language.FR]: "L'Éternel est mon berger: je ne manquerai de rien.",
      [Language.EN]: "The Lord is my shepherd; I shall not want.",
      [Language.SW]: "Bwana ndiye mchungaji wangu, sitapungukiwa na kitu.",
      [Language.RW]: "Uwiteka ni we mwungeri wanjye, sinzakena.",
      [Language.ES]: "Jehová es mi pastor; nada me faltará."
    }
  },
  {
    number: 2,
    translations: {
      [Language.FR]: "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles.",
      [Language.EN]: "He maketh me to lie down in green pastures: he leadeth me beside the still waters.",
      [Language.SW]: "Katika malisho ya majani mabichi hunilaza, kando ya maji ya utulivu huniongoza.",
      [Language.RW]: "Arandambika mu cyanya cy'ubwatsi bwenshi, aranyobora iruhande rw'amazi adasuma.",
      [Language.ES]: "En lugares de de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará."
    }
  },
  {
    number: 3,
    translations: {
      [Language.FR]: "Il restaure mon âme, il me conduit dans les sentiers de la justice, à cause de son nom.",
      [Language.EN]: "He restoreth my soul: he leadeth in the paths of righteousness for his name's sake.",
      [Language.SW]: "Huihuisha nafsi yangu, na kuniongoza katika njia za haki kwa ajili ya jina lake.",
      [Language.RW]: "Asubiza intege mu bugingo bwanjye, anyobora mu nzira zo gukiranuka ku bw'izina rye.",
      [Language.ES]: "Confortará mi alma; me guiará por sendas de justicia por amor de su nombre."
    }
  },
  {
    number: 4,
    translations: {
      [Language.FR]: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent.",
      [Language.EN]: "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.",
      [Language.SW]: "Naam, nijapopita kati ya bonde la uvuli wa mauti, sitaogopa mabaya; kwa maana wewe upo pamoja nami; gongo lako na fimbo yako vyanifariji.",
      [Language.RW]: "Ndetse naho nanyura mu gikombe cy'igicucu cy'urupfu, sinzatinya ikibi cyose kuko uri kumwe nanjye. Inshyimbo yawe n'inkoni yawe ni byo bimpumuriza.",
      [Language.ES]: "Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento."
    }
  }
];

const MATTHEW_5_VERSES = [
  {
    number: 3,
    translations: {
      [Language.FR]: "Heureux les pauvres en esprit, car le royaume des cieux est à eux!",
      [Language.EN]: "Blessed are the poor in spirit: for theirs is the kingdom of heaven.",
      [Language.SW]: "Heri walio maskini wa roho, maana ufalme wa mbinguni ni wao.",
      [Language.RW]: "Hahirwa abakene mu mwuka, kuko ubwami bwo mu ijuru ari ubwabo.",
      [Language.ES]: "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos."
    }
  },
  {
    number: 4,
    translations: {
      [Language.FR]: "Heureux les affligés, car ils seront consolés!",
      [Language.EN]: "Blessed are they that mourn: for they shall be comforted.",
      [Language.SW]: "Heri wanaohuzunika, maana watafarijiwa.",
      [Language.RW]: "Hahirwa abarira, kuko ari bo bazahumurizwa.",
      [Language.ES]: "Bienaventurados los que lloran, porque ellos recibirán consolación."
    }
  },
  {
    number: 5,
    translations: {
      [Language.FR]: "Heureux les débonnaires, car ils hériteront la terre!",
      [Language.EN]: "Blessed are the meek: for they shall inherit the earth.",
      [Language.SW]: "Heri wenye upole, maana watairithi nchi.",
      [Language.RW]: "Hahirwa abanyabulice, kuko ari bo bazaragwa isi.",
      [Language.ES]: "Bienaventurados los mansos, porque ellos recibirán la tierra por heredad."
    }
  },
  {
    number: 6,
    translations: {
      [Language.FR]: "Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés!",
      [Language.EN]: "Blessed are they which do hunger and thirst after righteousness: for they shall be filled.",
      [Language.SW]: "Heri wenye njaa na kiu ya haki, maana watashibishwa.",
      [Language.RW]: "Hahirwa abafite inzara n'inyota by'ukuri, kuko ari bo bazahazwa.",
      [Language.ES]: "Bienaventurados los que tienen hambre y sed de justicia, porque ellos serán saciados."
    }
  }
];

const JEAN_1_VERSES = [
  {
    number: 1,
    translations: {
      [Language.FR]: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
      [Language.EN]: "In the beginning was the Word, and the Word was with God, and the Word was God.",
      [Language.SW]: "Hapo mwanzo kulikuwako Neno, naye Neno alikuwako kwa Mungu, naye Neno alikuwa Mungu.",
      [Language.RW]: "Mbere na mbere Jambo yariho, kandi Jambo yari kumwe n'Imana, kandi Jambo yari Imana.",
      [Language.ES]: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios."
    }
  },
  {
    number: 2,
    translations: {
      [Language.FR]: "Elle était au commencement avec Dieu.",
      [Language.EN]: "The same was in the beginning with God.",
      [Language.SW]: "Huyo mwanzo alikuwako kwa Mungu.",
      [Language.RW]: "Uwo yariho mbere na mbere ari kumwe n'Imana.",
      [Language.ES]: "Este era en el principio con Dios."
    }
  },
  {
    number: 3,
    translations: {
      [Language.FR]: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle.",
      [Language.EN]: "All things were made by him; and without him was not any thing made that was made.",
      [Language.SW]: "Vyote vilifanyika kwa huyo; wala pasipo yeye hakikufanyika cho chote kilichofanyika.",
      [Language.RW]: "Ibintu byose ni we wabiremye, kandi mu byaremwe byose nta na kimwe cyaremwe na we kitari we.",
      [Language.ES]: "Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho."
    }
  },
  {
    number: 4,
    translations: {
      [Language.FR]: "En elle était la vie, et la vie était la lumière des hommes.",
      [Language.EN]: "In him was life; and the life was the light of men.",
      [Language.SW]: "Ndani yake ndimo ulimokuwa uzima, nao ule uzima ulikuwa nuru ya watu.",
      [Language.RW]: "Muri we harimo ubugingo, kandi ubwo bugingo bwari umucyo w'abantu.",
      [Language.ES]: "En él estaba la vida, y la vida era la luz de los hombres."
    }
  }
];

const JEAN_3_VERSES = [
  {
    number: 16,
    translations: {
      [Language.FR]: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      [Language.EN]: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      [Language.SW]: "Kwa maana jinsi hii Mungu aliupenda ulimwengu, hata akamtoa Mwanawe pekee, ili kila mtu amwaminiye asipotee, bali awe na uzima wa milele.",
      [Language.RW]: "Kuko Imana yakunze abari mu isi cyane, bigatuma itanga Umwana wayo icyarimwe, kugira ngo umwizera wese asibanganywe ahubwo ahabwe ubugingo buhoraho.",
      [Language.ES]: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
    }
  },
  {
    number: 17,
    translations: {
      [Language.FR]: "Dieu, en effet, n'a pas envoyé son Fils dans le monde pour qu'il juge le monde, mais pour que le monde soit sauvé par lui.",
      [Language.EN]: "For God sent not his Son into the world to condemn the world; but that the world through him might be saved.",
      [Language.SW]: "Maana Mungu hakumtuma Mwana ulimwenguni ili auhukumu ulimwengu, bali ulimwengu uokolewe katika yeye.",
      [Language.RW]: "Kuko Imana itatumye Umwana wayo gucira isi morali, ahubwo yayitumiye kugira ngo isi ikizwe na ye.",
      [Language.ES]: "Porque no envió Dios a su Hijo al mundo para condenar al mundo, sino para que el mundo sea salvo por él."
    }
  }
];

const REVELATION_22_VERSES = [
  {
    number: 1,
    translations: {
      [Language.FR]: "Et il me montra un fleuve d'eau de la vie, limpide comme du cristal, qui sortait du trône de Dieu et de l'agneau.",
      [Language.EN]: "And he shewed me a pure river of water of life, clear as crystal, proceeding out of the throne of God and of the Lamb.",
      [Language.SW]: "Kisha akanionyesha mto wa maji ya uzima, wenye kung'aa kama kioo, ukitoka katika kiti cha enzi cha Mungu na cha Mwanakondoo.",
      [Language.RW]: "Kandi anyereka uruzi rw'amazi y'ubugingo rubengerana nk'isarabwayi, ruturuka ku ntebe y'Imana n'iy'Umwana w'Intama.",
      [Language.ES]: "Después me mostró un río limpio de agua de vida, resplandeciente como cristal, que salía del trono de Dios y del Cordero."
    }
  },
  {
    number: 2,
    translations: {
      [Language.FR]: "Au milieu de la place de la ville et sur les deux bords du fleuve, il y avait un arbre de vie, produisant douze fois des fruits, rendant son fruit chaque mois, et dont les feuilles servaient à la guérison des nations.",
      [Language.EN]: "In the midst of the street of it, and on either side of the river, was there the tree of life, which bare twelve manner of fruits, and yielded her fruit every month: and the leaves of the tree were for the healing of the nations.",
      [Language.SW]: "Katikati ya njia kuu yake, na pande zote mbili za mto, kulikuwa na mti wa uzima, uzaao matunda namna kumi na mbili, kila mwezi ukitoa matunda yake; na majani ya mti huo ni ya kuponya mataifa.",
      [Language.RW]: "Hagati mu muhanda wayo na ku nkingi zombi z'uruzi hari igiti cy'ubugingo, cyera imbuto rusage gicuranze inshuro cumi na ziri, cyera imbuto zacyo muri buri kwezi, kandi amababi yacyo ni ayo gukiza amahanga yose.",
      [Language.ES]: "En medio de la calle de la ciudad, y a uno y otro lado del río, estaba el árbol de la vida, que produce doce frutos, dando cada mes su fruto; y las hojas del árbol eran para la sanidad de las naciones."
    }
  }
];

// Combine all 66 books and fully map their chapters so they are all queryable!
export const BIBLE_BOOKS: TranslatedBook[] = ALL_66_BOOKS_METADATA.map((b) => {
  const chapters = Array.from({ length: b.chaptersCount }, (_, i) => {
    const chNum = i + 1;
    let verses: typeof GENESIS_1_VERSES = [];

    // Inject static verses for pre-loaded canonical bible chapters
    if (b.id === "genesis" && chNum === 1) {
      verses = GENESIS_1_VERSES;
    } else if (b.id === "psalms" && chNum === 1) {
      verses = PSAUMES_1_VERSES;
    } else if (b.id === "psalms" && chNum === 23) {
      verses = PSAUMES_23_VERSES;
    } else if (b.id === "matthew" && chNum === 5) {
      verses = MATTHEW_5_VERSES;
    } else if (b.id === "john" && chNum === 1) {
      verses = JEAN_1_VERSES;
    } else if (b.id === "john" && chNum === 3) {
      verses = JEAN_3_VERSES;
    } else if (b.id === "revelation" && chNum === 22) {
      verses = REVELATION_22_VERSES;
    }

    return {
      number: chNum,
      verses,
    };
  });

  return {
    id: b.id,
    names: b.names,
    testament: b.testament as "old" | "new",
    chapters,
  };
});

// Dynamic daily verses rotation pool
export const VERSES_OF_THE_DAY = [
  {
    bookId: "psalms",
    chapter: 23,
    verse: 1,
    translations: {
      [Language.FR]: "L'Éternel est mon berger: je ne manquerai de rien.",
      [Language.EN]: "The Lord is my shepherd; I shall not want.",
      [Language.SW]: "Bwana ndiye mchungaji wangu, sitapungukiwa na kitu.",
      [Language.RW]: "Uwiteka ni we mwungeri wanjye, sinzakena.",
      [Language.ES]: "Jehová es mi pastor; nada me faltará."
    }
  },
  {
    bookId: "john",
    chapter: 3,
    verse: 16,
    translations: {
      [Language.FR]: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      [Language.EN]: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      [Language.SW]: "Kwa maana jinsi hii Mungu aliupenda ulimwengu, hata akamtoa Mwanawe pekee, ili kila mtu amwaminiye asipotee, bali awe na uzima wa milele.",
      [Language.RW]: "Kuko Imana yakunze abari mu isi cyane, bigatuma itanga Umwana wayo icyarimwe, kugira ngo umwizera wese asibanganywe ahubwo ahabwe ubugingo buhoraho.",
      [Language.ES]: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
    }
  },
  {
    bookId: "genesis",
    chapter: 1,
    verse: 3,
    translations: {
      [Language.FR]: "Dieu dit: Que la lumière soit! Et la lumière fut.",
      [Language.EN]: "And God said, Let there be light: and there was light.",
      [Language.SW]: "Mungu akasema, Kuwe na nuru; kukawa na nuru.",
      [Language.RW]: "Imana iravuga iti “Habeho umucyo”, nuko habaho umucyo.",
      [Language.ES]: "Y dijo Dios: Sea la luz; y fue la luz."
    }
  },
  {
    bookId: "matthew",
    chapter: 5,
    verse: 3,
    translations: {
      [Language.FR]: "Heureux les pauvres en esprit, car le royaume des cieux est à eux!",
      [Language.EN]: "Blessed are the poor in spirit: for theirs is the kingdom of heaven.",
      [Language.SW]: "Heri walio maskini wa roho, maana ufalme wa mbinguni ni wao.",
      [Language.RW]: "Hahirwa abakene mu mwuka, kuko ubwami bwo mu ijuru ari ubwabo.",
      [Language.ES]: "Bienaventurados los pobres en espíritu, porque de ellos es el reino de los cielos."
    }
  }
];
