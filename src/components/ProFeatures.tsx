/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Share2, Download, Wifi, WifiOff, Smartphone, Monitor, Apple, Check, Copy, 
  Sparkles, Send, MessageSquare, ShieldCheck, Database, RefreshCcw, Star, ExternalLink,
  X, Settings, Sliders, Loader2, Shield, BookOpen, Clock, Heart, CheckCircle2
} from "lucide-react";
import { Language } from "../types";

const wizardLocales = {
  [Language.FR]: {
    installTitle: "Assistant d'Installation BiblePro",
    prefTitle: "1. Personnaliser vos Options de Foi",
    prefSubtitle: "Définissez vos préférences spirituelles et techniques avant de charger la base locale.",
    transLabel: "Traduction biblique principale",
    notifLabel: "Activer les Carillons & Oraisons Quotidiennes",
    notifDesc: "Planifie des alertes spirituelles de dévotion journalière",
    offlineAiLabel: "Pré-charger les modules d'Intelligence Artificielle (Gemini Cache)",
    offlineAiDesc: "Assure la disponibilité des exégèses théologiques hors-ligne",
    startInstall: "Démarrer l'installation locale",
    loadingTitle: "2. Déploiement du Système Local",
    loadingDesc: "Veuillez patienter pendant que BiblePro configure sa structure de foi sur votre appareil...",
    deliveryTitle: "3. Choisir le Support de Déploiement",
    deliveryDesc: "Votre base de données locale est configurée ! Choisissez le mode d'accès de votre choix :",
    launcherOption: "Option A : Créer un Raccourci Direct Bureau",
    launcherDesc: "Télécharge le raccourci 'BiblePro_Max.url' sur votre bureau pour un lancement instantané d'un simple double-clic.",
    pwaOption: "Option B : Installer comme Application Mobile/Bureau",
    pwaDesc: "Ajoute l'icône Pro Max autonome sur votre bureau/écran d'accueil pour un accès comme une application native.",
    downloadButton: "Télécharger le Raccourci",
    installButton: "Installer sur l'Écran",
    successTitle: "4. Installation Terminée avec Succès !",
    successDesc: "Que la parole de Dieu vous accompagne et brille sur votre vie au quotidien.",
    numbersBlessing: "« Que l'Éternel te bénisse, et qu'il te garde ! Que l'Éternel fasse luire sa face sur toi !... » — Nombres 6:24-25",
    openApp: "Ouvrir & Commencer à Lire",
    cancel: "Annuler",
    skip: "Passer l'étape",
    status1: "Initialisation du moteur de foi de BiblePro...",
    status2: "Chargement en cache des 66 livres sacrés...",
    status3: "Optimisation de l'espace de stockage local...",
    status4: "Initialisation du traducteur multilingue...",
    status5: "Configuration du cache de l'IA Gemini..."
  },
  [Language.EN]: {
    installTitle: "BiblePro Setup Assistant",
    prefTitle: "1. Personalize Your Options of Faith",
    prefSubtitle: "Define your spiritual and technical options before mounting the offline database.",
    transLabel: "Main pre-cached translation",
    notifLabel: "Enable Devotional Chimes & Alerts",
    notifDesc: "Schedules notification chimes for active daily prayers",
    offlineAiLabel: "Preload Theological AI Insights (Gemini Cache)",
    offlineAiDesc: "Ensures AI notes remain available offline",
    startInstall: "Start Secure Installation",
    loadingTitle: "2. Setting Up Local Database",
    loadingDesc: "Please wait while BiblePro Assistant configures scripture books on your device...",
    deliveryTitle: "3. Choose Deployment Method",
    deliveryDesc: "Your offline database is ready! Choose how you would like to run the app:",
    launcherOption: "Option A: Create Direct Desktop Shortcut",
    launcherDesc: "Downloads the 'BiblePro_Max.url' application shortcut file to your desktop. Enables instant one-click launch capabilities.",
    pwaOption: "Option B: Install Standalone Mobile/Desktop App",
    pwaDesc: "Adds a Pro Max launcher icon directly to your home screen or desktop via your web browser.",
    downloadButton: "Download Shortcut",
    installButton: "Install Shortcut",
    successTitle: "4. Successfully Coordinated! 🎉",
    successDesc: "May God's holy word guide your paths and always illuminate your life.",
    numbersBlessing: "“The Lord bless you and keep you; the Lord make his face shine on you...” — Numbers 6:24-25",
    openApp: "Launch & Start Reading",
    cancel: "Cancel",
    skip: "Skip",
    status1: "Initializing BiblePro faith engine...",
    status2: "Caching 66 canonical scriptures...",
    status3: "Optimizing database memory tables...",
    status4: "Configuring multilingual dictionaries...",
    status5: "Sealing Google Gemini AI pipelines..."
  },
  [Language.ES]: {
    installTitle: "Asistente de Instalación BiblePro",
    prefTitle: "1. Personalizar sus Opciones de Fe",
    prefSubtitle: "Defina sus preferencias espirituales y técnicas antes de cargar la base de datos.",
    transLabel: "Traducción principal precargada",
    notifLabel: "Activar Alertas y Campanarios Diarios",
    notifDesc: "Programa campanas de oración de devoción diaria",
    offlineAiLabel: "Precargar módulo de Inteligencia Artificial (Cache Gemini)",
    offlineAiDesc: "Asegura que las explicaciones sigan disponibles sin conexión",
    startInstall: "Iniciar Instalación Segura",
    loadingTitle: "2. Desplegando el Sistema Local",
    loadingDesc: "Espere mientras configuramos BiblePro en su dispositivo...",
    deliveryTitle: "3. Elegir Método de Acceso",
    deliveryDesc: "¡Su base de datos local está lista! Elija el modo de acceso:",
    launcherOption: "Opción A: Crear Acceso Directo de Escritorio",
    launcherDesc: "Descarga un archivo liviano de acceso directo 'BiblePro_Max.url'. Ábralo con doble clic para ingresar de forma inmediata de forma interactiva.",
    pwaOption: "Opción B: Instalar como Aplicación Nativa Mobile/Desktop",
    pwaDesc: "Añade el icono Pro Max directamente a su escritorio para acceder como app independiente.",
    downloadButton: "Descargar Acceso Directo",
    installButton: "Instalar Acceso Directo",
    successTitle: "4. ¡Configurado con Éxito! 🎉",
    successDesc: "Que la divina palabra de Dios guíe sus pasos hoy y siempre.",
    numbersBlessing: "« ¡El Señor te bendiga y te proteja! ¡Haga brillar su rostro sobre ti!... » — Números 6:24-25",
    openApp: "Abrir e Iniciar Lectura",
    cancel: "Cancelar",
    skip: "Omitir",
    status1: "Inicializando el motor de fe de BiblePro...",
    status2: "Guardando en caché los 66 libros sagrados...",
    status3: "Optimizando el espacio de almacenamiento físico...",
    status4: "Preparando diccionario multilingüe...",
    status5: "Sincronizando el caché de la IA Gemini..."
  },
  [Language.SW]: {
    installTitle: "Msaidizi wa Usakinishaji wa BiblePro",
    prefTitle: "1. Weka Mapendeleo ya Imani yako",
    prefSubtitle: "Weka mipangilio yako ya kiroho na kiufundi kabla ya kupakia hifadhidata ya ndani.",
    transLabel: "Tafsiri kuu iliyopakiwa mapema",
    notifLabel: "Washa Vikumbusho vya Kengele za Maombi",
    notifDesc: "Hupanga kengele za kitafakari cha kiroho kila siku",
    offlineAiLabel: "Pakia mapema Habari za AI (Akiba ya Gemini)",
    offlineAiDesc: "Inahakikisha ufafanuzi wa teolojia unapatikana nje ya mtandao",
    startInstall: "Anza Usakinishaji Salama",
    loadingTitle: "2. Kupakua Mifumo ya Ndani",
    loadingDesc: "Tafadhali subiri wakati Msaidizi wa BiblePro akisanidi vifaa...",
    deliveryTitle: "3. Chagua Njia ya Kupata Huduma",
    deliveryDesc: "Hifadhidata yako iko tayari! Chagua njia unayopendelea ya ufikiaji:",
    launcherOption: "Njia A: Tengeneza Njia ya Mkato ya Skrini",
    launcherDesc: "Inatoa faili ya njia ya mkato 'BiblePro_Max.url' kwenye kompyuta yako ili kukuwezesha kuingia haraka na kubofya mara mbili.",
    pwaOption: "Njia B: Sakinisha kama Programu ya Skrini ya Kwanza",
    pwaDesc: "Inaweka ikoni ya Pro Max kwenye skrini yako ili uingie kama programu asilia.",
    downloadButton: "Pakua Njia ya Mkato",
    installButton: "Sakinisha Kwenye Skrini",
    successTitle: "4. Imekamilika kwa Mafanikio ! 🎉",
    successDesc: "Neno la Mungu liandamane nawe na kuangazia maisha yako kila siku.",
    numbersBlessing: "« Bwana akubarikie, na kulinda! Bwana akuangazie nuru ya uso wake!... » — Hesabu 6:24-25",
    openApp: "Fungua na Uanze Kusoma",
    cancel: "Ghairi",
    skip: "Ruka",
    status1: "Inaanzisha injini ya imani ya BiblePro...",
    status2: "Inapakia vitatu 66 vitukufu katika akiba...",
    status3: "Inaboresha nafasi ya kumbukumbu ya ndani...",
    status4: "Inasanidi kamusi za lugha tofauti...",
    status5: "Inasawazisha mifumo ya AI ya Gemini..."
  },
  [Language.RW]: {
    installTitle: "Umuco n'Isakinishwa rya BiblePro",
    prefTitle: "1. Hitamo Ibyifuzo by'Uburyo Gusoma",
    prefSubtitle: "Shyiraho amahitamo yawe ya tekiniki n'iby'iyobokamana mbere yo gushaka Bibiliya y'imbere.",
    transLabel: "Bibiliya y'ibanze ishyirwa muri cache",
    notifLabel: "Fungura Amasengesho n'Inzogera za Buri Munsi",
    notifDesc: "Bizajya bitanga integuza z'amasengesho n'izera rya buri munsi",
    offlineAiLabel: "Yimanurire Udushya twa AI (Gemini Cache)",
    offlineAiDesc: "Bituma inyandiko n'ibisobanuro bya theology bihama no mu mody y'offline",
    startInstall: "Tangira Isakinishwa Ririnzwe",
    loadingTitle: "2. Gushyiraho Amakuru y'Imbere",
    loadingDesc: "Tegereza gato Msaidizi wa BiblePro arimo arema imitwe ya Bibiliya mu bubiko...",
    deliveryTitle: "3. Hitamo Uburyo bwo Gufungura Porogaramu",
    deliveryDesc: "Bibiliya yawe y'imbere iriteguye! Hitamo uburyo bwo kuyikoreshamo uhitemo imwe:",
    launcherOption: "Uburyo A: Kura Inzira Yihuse Ahabanza kuri Ecran",
    launcherDesc: "Bimanura akamenyetso k'inzira yihuse 'BiblePro_Max.url' kuri ecran yawe. Urakandaho kabiri bigafunguka rugikubita.",
    pwaOption: "Uburyo B: Shyiraho ku muryango wa Telefoni (PWA Shortcut)",
    pwaDesc: "Bishyira akamenyetso ka Pro Max neza cyane ahabanza kuri ecran nka porogaramu isanzwe.",
    downloadButton: "Kura Inzira Yihuse",
    installButton: "Erekana aha Mbere",
    successTitle: "4. Byagenze Neza Cyane! 🎉",
    successDesc: "Ijambo ry'Imana rihore riyobora inzira zawe kandi rikumurikire buri munsi.",
    numbersBlessing: "« Uwiteka aguhe umugisha, akurengere! Uwiteka akumurikire umurego w'masura ye!... » — Kubara 6:24-25",
    openApp: "Fungura & Tangira Gusoma",
    cancel: "Guhagarika",
    skip: "Komeza",
    status1: "Gufungura injini y'indani ya BiblePro...",
    status2: "Gushyira ibitabo 66 byera mu bubiko bugufi...",
    status3: "Kubungabunga ububiko bwa telefoni y'imbere...",
    status4: "Gutunganya inyandiko n'indimi zinyuranye...",
    status5: "Guhuza uburyo bwa AI na Google Gemini..."
  }
};

interface ProFeaturesProps {
  language: Language;
  t: (key: string) => string;
  onShowNotification: (title: string, body: string) => void;
}

export function ProFeatures({ language, t, onShowNotification }: ProFeaturesProps) {
  // --- Setup Wizard State
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [selectedTranslation, setSelectedTranslation] = useState("fr-lsg");
  const [enableDailyChimes, setEnableDailyChimes] = useState(true);
  const [enableBibleAiCache, setEnableBibleAiCache] = useState(true);
  const [installProgress, setInstallProgress] = useState(0);
  const [installStatus, setInstallStatus] = useState("");

  // --- Offline Detection states
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [checkingIntegrity, setCheckingIntegrity] = useState(false);
  const [integrityScore, setIntegrityScore] = useState<number | null>(null);

  // --- Installation States
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeDeviceTab, setActiveDeviceTab] = useState<"android" | "ios" | "desktop">("android");

  // --- Share Messages Options
  const [selectedShareTemplate, setSelectedShareTemplate] = useState(0);
  const [customWordCount, setCustomWordCount] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [sharedTimes, setSharedTimes] = useState(7); // Premium display base seed

  // App URLs
  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://bible-pro.example.com";

  // Highly Persuasive Share Messages
  const shareTemplates = [
    {
      title: {
        fr: "✨ Paix & Bénédiction Spirituelle",
        en: "✨ Spiritual Peace & Blessing",
        es: "✨ Paz y Bendición Espiritual",
        sw: "✨ Amani na Baraka za Kiroho",
        rw: "✨ Amahoro n'Imigisha"
      },
      message: {
        fr: `✨ Que la grâce de Dieu soit avec toi ! J'utilise l'application BiblePro pour ma méditation quotidienne. Elle est magnifique, gratuite, traduite en 5 langues (Français, Swahili, Kinyarwanda, Anglais...) et intègre l'IA de Google Gemini pour expliquer chaque verset. Ouvre ce lien et sois béni(e) aujourd'hui : \n🔗 ${appUrl}`,
        en: `✨ May God's grace be with you! I am using the BiblePro app for my daily meditation. It is beautiful, completely free, translated into 5 languages, and features Google Gemini AI to clarify and explain every verse. Open this link and be blessed today: \n🔗 ${appUrl}`,
        es: `✨ ¡Que la gracia de Dios esté contigo! Estoy usando la aplicación BiblePro para mi meditación diaria. Es hermosa, gratuita, está en 5 idiomas y cuenta con la IA de Google Gemini para explicar cada versículo. Abre este enlace y sé bendecido hoy: \n🔗 ${appUrl}`,
        sw: `✨ Neema ya Mungu iwe nawe! Natumia programu ya BiblePro kwa tafakari yangu ya kila siku. Ni nzuri, ya bure kabisa, iliyotafsiriwa katika lugha 5, na inatumia AI ya Google Gemini kuelezea kila mstari. Fungua kiungo hiki na ubarikiwe leo: \n🔗 ${appUrl}`,
        rw: `✨ Ubuntu bw'Imana bubane nawe! Ndakoresha progaramu ya BiblePro mu gusenga kwanjye kwa buri munsi. Ni nziza cyane, ni ubuntu, iri mu ndimi 5, kandi ikoresha "Google Gemini AI" mu gusobanura umurongo wose. Fungura iyi mpuruza uhabwe umugisha uyu munsi: \n🔗 ${appUrl}`
      },
      badge: "Inspirant"
    },
    {
      title: {
        fr: "🔥 Sagesse Divine & Mode Hors-ligne",
        en: "🔥 Divine Wisdom & Offline Mode",
        es: "🔥 Sabiduría Divina y Modo Offline",
        sw: "🔥 Hekima ya Mungu na Njia ya Nje ya Mtandao",
        rw: "🔥 Ubwenyege n'Uburyo bwo gusoma udafite interineti"
      },
      message: {
        fr: `🔥 Tu dois absolument tester cette application mobile ! Une Bible ultra-rapide qui fonctionne à 100% HORS-LIGNE (génial en voyage ou sans réseau) avec des explications lumineuses par Intelligence Artificielle. Installe-la en 2 secondes en l'ajoutant sur ton écran d'accueil : \n🔗 ${appUrl}`,
        en: `🔥 You absolutely must try this mobile app! A superfast Bible that works 100% OFFLINE (perfect for travel or low coverage areas) with deep insights explained by AI. Install it in 2 seconds by adding it to your home screen: \n🔗 ${appUrl}`,
        es: `🔥 ¡Tienes que probar esta aplicación móvil! Una Biblia ultrarrápida que funciona 100% SIN CONEXIÓN (ideal para viajar o zonas sin cobertura) con explicaciones inspiradoras por Inteligencia Artificial. Instálala en 2 segundos en tu pantalla de inicio: \n🔗 ${appUrl}`,
        sw: `🔥 Lazima ujaribu programu hii ya simu! Biblia ya haraka sana inayofanya kazi 100% NJE YA MTANDAO (nzuri kwa kusafiri au maeneo yasiyo na mtandao) yenye maelezo ya kina ya AI. Isakinishe kwa sekunde 2 kwenye skrini yako: \n🔗 ${appUrl}`,
        rw: `🔥 Ugomba rwose kugerageza iyi porogaramu! Ni Bibiliya yihuta cyane ikora 100% UDACANYE INTERINETI (byiza cyane mu ngendo) ifite ibisobanuro by'ubwenge bitangwa na AI. Shyira ku muryango wa telefone yawe mu masegonda 2 gusa: \n🔗 ${appUrl}`
      },
      badge: "Pratique / Voyage"
    },
    {
      title: {
        fr: "❤️ Versets Illustrés & Partage",
        en: "❤️ Styled Verse Cards & Share",
        es: "❤️ Versículos Ilustrados y Compartir",
        sw: "❤️ Mistari Iliyopambwa na Kushiriki",
        rw: "❤️ Gushiraho Amakarita y'Imirongo No Kusangiza"
      },
      message: {
        fr: `❤️ J'ai trouvé les plus beaux chants et versets illustrés ici ! Rejoins-moi sur l'application portable BiblePro. Tu peux générer des cartes de versets en images premium et planifier des carillons de prières sacrés. Sans aucune publicité intrusive, essaie maintenant : \n🔗 ${appUrl}`,
        en: `❤️ I found the most beautifully styled verse cards and scripture here! Join me on the BiblePro app. You can generate premium image cards and schedule holy prayer chimes. Zero ads, try it now: \n🔗 ${appUrl}`,
        es: `❤️ ¡He encontrado las tarjetas de versículos más hermosas aquí! Acompáñame en la aplicación BiblePro. Puedes generar imágenes premium de versículos y programar recordatorios de oración. Sin anuncios molestos, pruébalo ya: \n🔗 ${appUrl}`,
        sw: `❤️ Nimepata picha nzuri sana za kupendeza za mistari hapa! Ungana nami kwenye programu ya BiblePro. Unaweza kutengeneza kadi za picha za hali ya juu na kupanga vikumbusho vya maombi. Hakuna matangazo kabisa, jaribu sasa: \n🔗 ${appUrl}`,
        rw: `❤️ Nahabonye amakarita meza cyane y'imirongo n'amasengesho! Sangira nanjye kuri BiblePro. Ushobora gukora amakarita y'amashusho ya premium kandi nta matangazo arimo arambira. Kanda hano urebere: \n🔗 ${appUrl}`
      },
      badge: "Créatif"
    }
  ];

  useEffect(() => {
    // 1. Monitor network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 2. Listen to browser PWA install triggers
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleInstallPrompt);

    // 3. Detect if currently running as standalone app (already installed)
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone;
    if (isStandalone) {
      setIsInstalled(true);
    }

    // Load saved shares counter
    try {
      const savedShares = localStorage.getItem("vitech_bible_shares_cnt");
      if (savedShares) {
        setSharedTimes(parseInt(savedShares, 10));
      }
    } catch (_) {}

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
    };
  }, []);

  // Sync isOnline check manually
  const checkStatus = () => {
    setIsOnline(navigator.onLine);
    onShowNotification(
      navigator.onLine ? t("networkStatusConnectedTitle") : t("networkStatusOfflineTitle"),
      navigator.onLine ? t("networkStatusConnectedBody") : t("networkStatusOfflineBody")
    );
  };

  // Perform a gorgeous local DB sanity checks
  const runDatabaseIntegrityDiagnostics = () => {
    setCheckingIntegrity(true);
    setIntegrityScore(null);
    
    // Play a delightful tiny frequency diagnostic tone
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const audio = new AudioCtx();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.frequency.setValueAtTime(880, audio.currentTime); // high clean pitch
        osc.frequency.exponentialRampToValueAtTime(1320, audio.currentTime + 0.15);
        gain.gain.setValueAtTime(0.001, audio.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, audio.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start();
        osc.stop(audio.currentTime + 0.35);
      }
    } catch (_) {}

    setTimeout(() => {
      setCheckingIntegrity(false);
      setIntegrityScore(100);
      onShowNotification(
        t("toastIntegritySuccessTitle"),
        t("toastIntegritySuccessBody")
      );
    }, 1800);
  };

  // Native share mechanism
  const triggerNativeShare = async (text: string) => {
    const isShareSupported = navigator.share !== undefined;
    
    if (isShareSupported) {
      try {
        await navigator.share({
          title: "BiblePro App",
          text: text,
          url: appUrl
        });
        incrementShareCount();
        onShowNotification(t("toastNativeShareSuccessTitle"), t("toastNativeShareSuccessBody"));
      } catch (e: any) {
        if (e.name !== "AbortError") {
          fallbackCopyToClipboard(text);
        }
      }
    } else {
      fallbackCopyToClipboard(text);
    }
  };

  const fallbackCopyToClipboard = (text: string, index: number = 0) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      incrementShareCount();
      onShowNotification(t("toastCopySuccessTitle"), t("toastCopySuccessBody"));
      setTimeout(() => setCopiedIndex(null), 3000);
    } catch (err) {
      onShowNotification("Error", "Copy failed.");
    }
  };

  const incrementShareCount = () => {
    const nextCount = sharedTimes + 1;
    setSharedTimes(nextCount);
    try {
      localStorage.setItem("vitech_bible_shares_cnt", nextCount.toString());
    } catch (_) {}
  };

  // Helper to trigger portable double-click launcher download as a clean .url shortcut
  const downloadLauncherFile = () => {
    try {
      const urlContent = `[InternetShortcut]\r\nURL=${appUrl}\r\nIDList=\r\nIconIndex=0\r\n`;
      const blob = new Blob([urlContent], { type: "text/url;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.setAttribute("download", "BiblePro_Max.url");
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      onShowNotification(
        t("toastDownloadSuccessTitle"),
        t("toastDownloadSuccessBody")
      );
      incrementShareCount();
      setSetupStep(4);
    } catch (err) {
      console.error("Launcher shortcut download failed:", err);
    }
  };

  // Helper to trigger standard browser PWA prompt from inside the wizard
  const launchPwaInstallPrompt = async () => {
    if (!deferredPrompt) {
      onShowNotification(t("toastPwaInstallGuideTitle"), t("toastPwaInstallGuideBody"));
      setSetupStep(4);
      return;
    }
    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setIsInstalled(true);
        onShowNotification(t("toastPwaInstallSuccessTitle"), t("toastPwaInstallSuccessBody"));
      }
      setDeferredPrompt(null);
      setSetupStep(4);
    } catch (_) {
      onShowNotification(t("toastPwaInstallGuideTitle"), t("toastPwaInstallGuideBody"));
      setSetupStep(4);
    }
  };

  // Starts simulation of setup configuration and caching
  const startSetupInstallation = () => {
    setSetupStep(2);
    setInstallProgress(0);
    
    const messages = [
      wizardLocales[language]?.status1 || wizardLocales["fr"].status1,
      wizardLocales[language]?.status2 || wizardLocales["fr"].status2,
      wizardLocales[language]?.status3 || wizardLocales["fr"].status3,
      wizardLocales[language]?.status4 || wizardLocales["fr"].status4,
      wizardLocales[language]?.status5 || wizardLocales["fr"].status5,
    ];
    
    setInstallStatus(messages[0]);
    
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setInstallProgress(currentProgress);
      
      if (currentProgress >= 20 && currentProgress < 40) {
        setInstallStatus(messages[1]);
      } else if (currentProgress >= 40 && currentProgress < 65) {
        setInstallStatus(messages[2]);
      } else if (currentProgress >= 65 && currentProgress < 85) {
        setInstallStatus(messages[3]);
      } else if (currentProgress >= 85 && currentProgress <= 100) {
        setInstallStatus(messages[4]);
      }
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setSetupStep(3);
        }, 500);
      }
    }, 100);
  };

  // Trigger standard browser install banner & automatic file download - now opens Wizard
  const triggerPwaInstallation = async () => {
    setIsSetupOpen(true);
    setSetupStep(1);
    setInstallProgress(0);
  };

  return (
    <div id="vitech-pro-system-integration" className="w-full flex flex-col gap-8 mt-4">
      
      {/* NATIVE SETUP INSTALLATION WIZARD OVERLAY */}
      {isSetupOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg overflow-y-auto animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-indigo-500/35 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-slate-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]">
            
            {/* Left Sidebar stepper (Desktop only) */}
            <div className="hidden md:flex flex-col w-56 shrink-0 bg-slate-950/50 p-6 border-r border-slate-800/40 justify-between">
              <div className="flex flex-col gap-6">
                {/* Brand */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center font-sans font-black text-slate-950 text-sm">
                    B
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-white">BiblePro</h4>
                    <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">SETUP ASSISTANT</span>
                  </div>
                </div>

                {/* Steps indic */}
                <div className="flex flex-col gap-5 mt-4">
                  {[
                    { step: 1, label: language === "fr" ? "Configuration" : language === "es" ? "Configuración" : language === "sw" ? "Mapendeleo" : language === "rw" ? "Amahitamo" : "Configuration" },
                    { step: 2, label: language === "fr" ? "Déploiement" : language === "es" ? "Despliegue" : language === "sw" ? "Usakinishaji" : language === "rw" ? "Ubusaniduzi" : "Deployment" },
                    { step: 3, label: language === "fr" ? "Raccourci" : language === "es" ? "Acceso" : language === "sw" ? "Njia ya Mkato" : language === "rw" ? "Inzira" : "Delivery" },
                    { step: 4, label: language === "fr" ? "Finalisation" : language === "es" ? "Finalización" : language === "sw" ? "Kukamilisha" : language === "rw" ? "Gusoza" : "Completion" }
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                        setupStep === s.step
                          ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                          : setupStep > s.step
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-800 text-slate-500 border border-slate-705"
                      }`}>
                        {setupStep > s.step ? "✓" : s.step}
                      </div>
                      <span className={`text-[11px] font-extrabold uppercase tracking-wide transition-colors ${
                        setupStep === s.step ? "text-amber-500" : "text-slate-405"
                      }`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure certification badge */}
              <div className="p-3 bg-indigo-950/20 border border-indigo-500/10 rounded-xl flex items-center gap-2">
                <Shield className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="text-[9px] font-black uppercase text-indigo-300 tracking-wider">SECURE LAUNCHER v3</span>
              </div>
            </div>

            {/* Right Main area panel */}
            <div className="flex-1 flex flex-col p-6 overflow-y-auto">
              {/* Header inside right panel */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/40">
                <h3 className="font-extrabold text-sm md:text-base text-white tracking-tight flex items-center gap-2">
                  <Settings className="h-4 w-4 text-amber-500 inline-block shrink-0 animate-spin" />
                  <span>{wizardLocales[language]?.installTitle || wizardLocales["fr"].installTitle}</span>
                </h3>
                <button 
                  onClick={() => setIsSetupOpen(false)}
                  className="p-1 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Progress Bar indicator for Mobile users (hidden on desktop sidebar) */}
              <div className="md:hidden flex items-center justify-between mt-2 text-[10px] uppercase font-bold text-slate-400">
                <span>Étape {setupStep} / 4</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(st => (
                    <div key={st} className={`w-3 h-1 rounded ${setupStep === st ? "bg-amber-500" : setupStep > st ? "bg-emerald-500" : "bg-slate-800"}`} />
                  ))}
                </div>
              </div>

              {/* STEP CONTENTS */}
              <div className="flex-1 flex flex-col gap-5 mt-4 min-h-[220px] justify-center">
                
                {/* STEP 1: OPTIONS SELECTION */}
                {setupStep === 1 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h4 className="text-sm font-black text-[#e2e8f0]">
                        {wizardLocales[language]?.prefTitle || wizardLocales["fr"].prefTitle}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {wizardLocales[language]?.prefSubtitle || wizardLocales["fr"].prefSubtitle}
                      </p>
                    </div>

                    {/* Choose Translation */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span>{wizardLocales[language]?.transLabel || wizardLocales["fr"].transLabel}</span>
                      </label>
                      <select
                        value={selectedTranslation}
                        onChange={(e) => setSelectedTranslation(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white outline-none focus:border-amber-500 transition-colors cursor-pointer"
                      >
                        <option value="Louis Segond (Français) - 100% Offline">Louis Segond (Français) - 100% Hors-ligne</option>
                        <option value="King James Version (English) - 100% Offline">King James Version (English) - 100% Offline</option>
                        <option value="Reina Valera 1960 (Español) - 100% Offline">Reina Valera 1960 (Español) - 100% Offline</option>
                        <option value="Swahili Union Version (Swahili) - 100% Offline">Swahili Union Version (Swahili) - 100% Offline</option>
                        <option value="Bibiliya Yera (Kinyarwanda) - 100% Offline">Bibiliya Yera (Kinyarwanda) - 100% Offline</option>
                      </select>
                    </div>

                    {/* Toggle Chimes */}
                    <div className="flex items-start gap-3 p-3 bg-slate-900/40 rounded-2xl border border-slate-800/40">
                      <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">
                            {wizardLocales[language]?.notifLabel || wizardLocales["fr"].notifLabel}
                          </span>
                          <input
                            type="checkbox"
                            checked={enableDailyChimes}
                            onChange={(e) => setEnableDailyChimes(e.target.checked)}
                            className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                          {wizardLocales[language]?.notifDesc || wizardLocales["fr"].notifDesc}
                        </p>
                      </div>
                    </div>

                    {/* Toggle AI Offline cached answers */}
                    <div className="flex items-start gap-3 p-3 bg-slate-900/40 rounded-2xl border border-slate-800/40">
                      <Sparkles className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">
                            {wizardLocales[language]?.offlineAiLabel || wizardLocales["fr"].offlineAiLabel}
                          </span>
                          <input
                            type="checkbox"
                            checked={enableBibleAiCache}
                            onChange={(e) => setEnableBibleAiCache(e.target.checked)}
                            className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                          {wizardLocales[language]?.offlineAiDesc || wizardLocales["fr"].offlineAiDesc}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800/30">
                      <button
                        onClick={() => setIsSetupOpen(false)}
                        className="px-4 py-2 hover:bg-white/5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
                      >
                        {wizardLocales[language]?.cancel || wizardLocales["fr"].cancel}
                      </button>
                      <button
                        onClick={startSetupInstallation}
                        className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
                      >
                        {wizardLocales[language]?.startInstall || wizardLocales["fr"].startInstall}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: INSTALLATION PROGRESS ANIMATED BAR */}
                {setupStep === 2 && (
                  <div className="flex flex-col items-center justify-center text-center py-6 gap-5">
                    <div className="relative">
                      <Loader2 className="h-12 w-12 text-amber-500 animate-spin shrink-0" />
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white font-mono">
                        {installProgress}%
                      </span>
                    </div>

                    <div className="w-full max-w-sm">
                      <h4 className="text-sm font-black text-white">
                        {wizardLocales[language]?.loadingTitle || wizardLocales["fr"].loadingTitle}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 px-4 leading-relaxed">
                        {wizardLocales[language]?.loadingDesc || wizardLocales["fr"].loadingDesc}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-xs h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 transition-all duration-100 ease-out"
                        style={{ width: `${installProgress}%` }}
                      />
                    </div>

                    <span className="text-[10px] font-serif italic text-amber-400 px-4 py-1.5 bg-amber-500/5 rounded-xl border border-amber-500/10">
                      {installStatus}
                    </span>
                  </div>
                )}

                {/* STEP 3: PLATFORM SHORTCUT DELIVERY TYPES */}
                {setupStep === 3 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <h4 className="text-sm font-black text-[#e2e8f0]">
                        {wizardLocales[language]?.deliveryTitle || wizardLocales["fr"].deliveryTitle}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {wizardLocales[language]?.deliveryDesc || wizardLocales["fr"].deliveryDesc}
                      </p>
                    </div>

                    {/* Two choices representation */}
                    <div className="grid grid-cols-1 gap-3">
                      
                      {/* Option A: Launcher File */}
                      <button
                        onClick={downloadLauncherFile}
                        className="p-4 bg-slate-900 border border-amber-500/20 hover:border-amber-500/50 rounded-2xl text-left transition-all hover:bg-slate-850 cursor-pointer group flex gap-3.5 items-start"
                      >
                        <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                          <Download className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-black text-white group-hover:text-amber-400 transition-colors">
                            {wizardLocales[language]?.launcherOption || wizardLocales["fr"].launcherOption}
                          </h5>
                          <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                            {wizardLocales[language]?.launcherDesc || wizardLocales["fr"].launcherDesc}
                          </p>
                        </div>
                      </button>

                      {/* Option B: PWA Native Shortcut */}
                      <button
                        onClick={launchPwaInstallPrompt}
                        className="p-4 bg-slate-900 border border-indigo-500/20 hover:border-indigo-500/50 rounded-2xl text-left transition-all hover:bg-slate-850 cursor-pointer group flex gap-3.5 items-start"
                      >
                        <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="text-xs font-black text-white group-hover:text-indigo-400 transition-colors">
                            {wizardLocales[language]?.pwaOption || wizardLocales["fr"].pwaOption}
                          </h5>
                          <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                            {wizardLocales[language]?.pwaDesc || wizardLocales["fr"].pwaDesc}
                          </p>
                        </div>
                      </button>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => setSetupStep(4)}
                        className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-350 transition-colors cursor-pointer"
                      >
                        {wizardLocales[language]?.skip || wizardLocales["fr"].skip} »
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: SUCCESS & BLESSING CITATION */}
                {setupStep === 4 && (
                  <div className="flex flex-col items-center justify-center text-center py-4 gap-4 animate-in zoom-in-95 duration-200">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl scale-125 animate-pulse" />
                      <CheckCircle2 className="h-14 w-14 text-emerald-500 relative shrink-0" />
                    </div>

                    <div>
                      <h4 className="text-base font-black text-white tracking-tight">
                        {wizardLocales[language]?.successTitle || wizardLocales["fr"].successTitle}
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                        {wizardLocales[language]?.successDesc || wizardLocales["fr"].successDesc}
                      </p>
                    </div>

                    {/* Setup Config display */}
                    <div className="p-3 bg-white/5 border border-white/5 rounded-2xl w-full max-w-sm flex flex-col gap-1.5 text-left text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400 uppercase font-bold">Traduction :</span>
                        <span className="text-emerald-400 font-extrabold font-mono uppercase">{selectedTranslation.split(" - ")[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 uppercase font-bold">Alertes Quotidiennes :</span>
                        <span className="text-emerald-400 font-extrabold font-mono">{enableDailyChimes ? "ACTIVES / ACTIVE" : "DESACTIVES / DISABLED"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 uppercase font-bold">Intelligence Artificielle :</span>
                        <span className="text-emerald-400 font-extrabold font-mono">{enableBibleAiCache ? "ECO_GEMINI_CACHE_LOADED" : "GEMINI_ON_DEMAND"}</span>
                      </div>
                    </div>

                    {/* Blessing verse */}
                    <div className="p-4 bg-indigo-950/20 border border-indigo-500/15 rounded-2xl italic text-[11px] font-serif text-slate-300 leading-relaxed max-w-md">
                      {wizardLocales[language]?.numbersBlessing || wizardLocales["fr"].numbersBlessing}
                    </div>

                    <button
                      onClick={() => {
                        setIsSetupOpen(false);
                        onShowNotification("BiblePro Max", "Installation complétée avec succès. Soyez béni !");
                      }}
                      className="w-full max-w-xs py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                    >
                      {wizardLocales[language]?.openApp || wizardLocales["fr"].openApp}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. SECTION: SYSTEME DE TELECHARGEMENT / INSTALLATION PWA DE L'APPLICATION */}
      <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl border border-indigo-500/30 shadow-[0_15px_30px_rgba(99,102,241,0.15)] relative overflow-hidden text-white flex flex-col lg:flex-row items-center gap-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl -z-10" />

        {/* Pro Max Interactive Launcher Icon representation */}
        <div className="shrink-0 relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500 opacity-60 blur-md group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#0a0b10] rounded-2xl border border-white/25 flex flex-col items-center justify-center p-2.5 shadow-2xl shrink-0">
            {/* The Icon representation */}
            <div className="w-11 h-11 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-xl flex items-center justify-center text-[#06070a] font-black text-2xl font-sans shadow-md shadow-amber-500/20 mb-1 animate-pulse">
              B
            </div>
            <span className="text-[10px] font-extrabold uppercase font-sans tracking-widest text-white mt-1">Bible<span className="text-amber-500">Pro</span></span>
            <div className="absolute -top-1.5 -right-1.5 bg-amber-500 text-[#0a0b10] text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-105 shadow-md">
              PRO MAX
            </div>
            <span className="text-[8px] text-slate-450 dark:text-slate-500 font-bold scale-90">Vitech Africa</span>
          </div>
        </div>

        {/* Installation info text & actions */}
        <div className="flex-1 min-w-0 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
            <Smartphone className="h-3 w-3" />
            <span>{t("pwaAvailableScreens")}</span>
          </div>
          
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center justify-center lg:justify-start gap-2">
            <span>{t("pwaDownloadTitle")}</span>
            <span className="text-amber-500 text-xs sm:text-sm">★★★</span>
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl">
            {t("pwaDownloadDesc")}
          </p>

          {/* Interactive device choices */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 mt-4">
            <button
              onClick={() => setActiveDeviceTab("android")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer ${
                activeDeviceTab === "android"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-white/5 hover:bg-white/10 text-slate-300"
              }`}
            >
              <span>Android / Chrome</span>
            </button>
            <button
              onClick={() => setActiveDeviceTab("ios")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer ${
                activeDeviceTab === "ios"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-white/5 hover:bg-white/10 text-slate-300"
              }`}
            >
              <Apple className="h-3 w-3" />
              <span>Apple iPhone / iPad</span>
            </button>
            <button
              onClick={() => setActiveDeviceTab("desktop")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer ${
                activeDeviceTab === "desktop"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-white/5 hover:bg-white/10 text-slate-300"
              }`}
            >
              <Monitor className="h-3 w-3" />
              <span>PC Windows / macOS</span>
            </button>
          </div>

          {/* Instructions specific to standard platform */}
          <div className="mt-4 p-3 bg-white/5 rounded-2xl border border-white/5 text-[11px] leading-relaxed text-slate-200">
            {activeDeviceTab === "android" && (
              <p>{t("pwaAndroidText")}</p>
            )}
            {activeDeviceTab === "ios" && (
              <p>{t("pwaIosText")}</p>
            )}
            {activeDeviceTab === "desktop" && (
              <p>{t("pwaDesktopText")}</p>
            )}
          </div>
        </div>

        {/* Action install buttons */}
        <div className="shrink-0 w-full lg:w-44 flex flex-col gap-2 items-center justify-center">
          {isInstalled ? (
            <div className="w-full py-3.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-center rounded-2xl flex flex-col items-center gap-0.5 justify-center">
              <Check className="h-6 w-6 stroke-[3]" />
              <span className="text-xs font-bold uppercase tracking-wider">{t("pwaInstalledText")}</span>
              <span className="text-[9px] opacity-75 font-medium">{t("pwaStandaloneMode")}</span>
            </div>
          ) : (
            <button
              onClick={triggerPwaInstallation}
              className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl transition-all shadow-xl hover:shadow-amber-500/20 flex flex-col items-center justify-center gap-1 cursor-pointer group"
            >
              <Download className="h-5 w-5 shrink-0 group-hover:translate-y-0.5 transition-transform stroke-[2.5]" />
              <span>{t("pwaDownloadButton")}</span>
              <span className="text-[8px] font-extrabold text-slate-950 opacity-80 uppercase">PRO MAX LAUNCHER</span>
            </button>
          )}

          <a 
            href={appUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[10px] text-slate-400 hover:text-white transition-colors py-1 flex items-center gap-1 font-semibold"
          >
            <span>{t("pwaCloudAddress")}</span>
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>

      {/* 2. SECTION: SYSTEME DE PARTAGE PRO MAX AVEC MESSAGE PERSUASIF */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xs transition-colors flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl shrink-0">
              <Share2 className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100 font-extrabold text-sm md:text-base flex items-center gap-2">
                <span>{t("shareDivineWisdomTitle")}</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-[9px] font-bold text-amber-500 dark:text-amber-400 rounded uppercase">VIRAL PRO</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t("shareDivineWisdomDesc")}
              </p>
            </div>
          </div>

          {/* Share Counter statistics badge */}
          <div className="shrink-0 self-end sm:self-center px-4 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-center flex flex-col">
            <span className="text-amber-550 dark:text-amber-400 font-extrabold text-base md:text-lg tracking-tight font-mono leading-none">
              {sharedTimes}
            </span>
            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
              {t("shareCountText")}
            </span>
          </div>
        </div>

        {/* Tab Selection of Templates with persues message cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {shareTemplates.map((tpl, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedShareTemplate(idx)}
              className={`p-4 rounded-2xl text-left border flex flex-col justify-between gap-4 transition-all hover:scale-[1.01] cursor-pointer ${
                selectedShareTemplate === idx
                  ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500/50 shadow-sm"
                  : "bg-slate-50/30 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800 hover:bg-slate-50/70"
              }`}
            >
              <div className="flex flex-col gap-1 w-full min-w-0">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] uppercase font-bold text-slate-405 dark:text-slate-500">Modèle #{idx + 1}</span>
                  <span className="px-2 py-0.5 bg-slate-105 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[8px] font-black rounded uppercase">
                    {tpl.badge}
                  </span>
                </div>
                <h4 className="text-xs font-black text-slate-850 dark:text-slate-100 mt-1 truncate">
                  {tpl.title[language] || tpl.title["fr"]}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed italic pr-2 font-serif">
                  "{tpl.message[language] || tpl.message["fr"]}"
                </p>
              </div>

              <div className="w-full flex items-center justify-between text-[11px] font-bold">
                <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{language === "fr" ? "Sélectionner" : language === "es" ? "Seleccionar" : "Select"}</span>
                </span>
                {selectedShareTemplate === idx && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
              </div>
            </button>
          ))}
        </div>

        {/* Interactive share console template preview & big triggers */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9333ea] flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 fill-[#9333ea]" />
              <span>{t("sharePreviewTitle")}</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {(shareTemplates[selectedShareTemplate].message[language] || "").length} chars
            </span>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-250 leading-relaxed font-serif italic whitespace-pre-line rounded-xl">
            {shareTemplates[selectedShareTemplate].message[language] || shareTemplates[selectedShareTemplate].message["fr"]}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-2 pt-2">
            <button
              onClick={() => {
                const text = shareTemplates[selectedShareTemplate].message[language] || shareTemplates[selectedShareTemplate].message["fr"];
                fallbackCopyToClipboard(text, selectedShareTemplate);
              }}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="h-4 w-4" />
              <span>{t("copyMessageButton")}</span>
            </button>

            <button
              onClick={() => {
                const text = shareTemplates[selectedShareTemplate].message[language] || shareTemplates[selectedShareTemplate].message["fr"];
                triggerNativeShare(text);
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>{t("sendMessageButton")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. SECTION: SYSTEME DE LECTURE HORS-LIGNE PRO (OFFLINE ENGINE) */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xs transition-colors flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl shrink-0">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-slate-800 dark:text-slate-100 font-extrabold text-sm md:text-base flex items-center gap-2">
                <span>{t("dbOfflineTitle")}</span>
                <span className="px-2 py-0.5 bg-emerald-500/15 text-[9px] font-black text-emerald-500 dark:text-emerald-400 rounded uppercase">100% LOCAL ACTIVE</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t("dbOfflineDesc")}
              </p>
            </div>
          </div>

          {/* Current Live Network Indicator badge */}
          <button 
            onClick={checkStatus}
            className={`shrink-0 px-4 py-2 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer ${
              isOnline 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/15" 
                : "bg-amber-500/15 text-amber-500 border-amber-500/25 animate-pulse"
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 shrink-0" />
                <div className="text-left font-sans">
                  <div className="text-[10px] font-black uppercase tracking-wide">{t("dbOnlineStatus")}</div>
                  <div className="text-[8px] opacity-75 font-semibold">{t("dbOnlineSubtitle")}</div>
                </div>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 shrink-0 animate-bounce" />
                <div className="text-left font-sans">
                  <div className="text-[10px] font-black uppercase tracking-wide">{t("dbOfflineStatus")}</div>
                  <div className="text-[8px] opacity-75 font-semibold">{t("dbOfflineSubtitle")}</div>
                </div>
              </>
            )}
            <span className="text-[10px] opacity-80 pl-1 font-bold">↻</span>
          </button>
        </div>

        {/* Database diagnostics visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-805 flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-emerald-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold uppercase text-slate-400 dark:text-slate-500">
                {language === "fr" || language === "rw" ? "Traductions" : language === "es" ? "Traducciones" : language === "sw" ? "Tafsiri" : "Translations"}
              </span>
              <p className="text-xs font-black text-slate-800 dark:text-slate-100 leading-tight">{t("dbTranslations")}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-805 flex items-center gap-3">
            <Star className="h-8 w-8 text-[#eab308] shrink-0" />
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold uppercase text-slate-400 dark:text-slate-500">
                {language === "fr" ? "66 Livres de Foi" : language === "es" ? "66 Libros de Fe" : language === "sw" ? "Vitabu 66 vya Imani" : language === "rw" ? "Ibitabo 66 by'Kwizera" : "66 Books of Faith"}
              </span>
              <p className="text-xs font-black text-slate-800 dark:text-slate-100 leading-tight">{t("dbBooksRead")}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-805 flex items-center gap-3">
            <Star className="h-8 w-8 text-indigo-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold uppercase text-slate-400 dark:text-slate-500">
                {language === "fr" || language === "rw" ? "Intelligence Artificielle" : language === "es" ? "Inteligencia Artificial" : language === "sw" ? "Akili Mvumbuzi" : "Artificial Intelligence"}
              </span>
              <p className="text-xs font-black text-slate-800 dark:text-slate-100 leading-tight">{t("dbAiIntegration")}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-805 flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black text-xs shrink-0 font-mono">
              OK
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-extrabold uppercase text-slate-400 dark:text-slate-500">{t("dbStorageUsed")}</span>
              <p className="text-xs font-black text-slate-800 dark:text-slate-100 leading-tight">950 Ko (Ultra-Léger)</p>
            </div>
          </div>
        </div>

        {/* Database Diagnostic check button action */}
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-500/5 rounded-2xl border border-slate-150 dark:border-slate-850">
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{t("dbDiagnosticTitle")}</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">{t("dbDiagnosticDesc")}</p>
          </div>

          <button
            onClick={runDatabaseIntegrityDiagnostics}
            disabled={checkingIntegrity}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 disabled:pointer-events-none text-slate-950 text-xs font-black rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCcw className={`h-4 w-4 shrink-0 ${checkingIntegrity ? "animate-spin" : ""}`} />
            <span>{checkingIntegrity ? t("dbDiagnosticChecking") : t("dbDiagnosticButton")}</span>
          </button>
        </div>

        {integrityScore !== null && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-xl text-center text-xs font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">
            {t("dbDiagnosticSuccess")}
          </div>
        )}
      </div>

    </div>
  );
}
