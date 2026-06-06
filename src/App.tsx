/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { 
  Home, BookOpen, Heart, Search, Settings, 
  Sparkles, X, ChevronRight, Moon, Sun, 
  Globe, AlertCircle, Copy, Check, Bell, BellRing, CheckCheck, Trash2
} from "lucide-react";
import { Language, FavoriteVerse, AppNotification } from "./types";
import { I18N_DICTS, VERSES_OF_THE_DAY, BIBLE_BOOKS } from "./bibleData";
import { HomeView, BibleView, FavoritesView, SearchView, SettingsView } from "./components/PagesViews";

export default function App() {
  // Navigation Routing Tab State
  const [activeTab, setActiveTab] = useState<"home" | "bible" | "favorites" | "search" | "settings">("home");
  
  // Specific navigation state inside the bible tab
  const [bibleTargetBookId, setBibleTargetBookId] = useState<string | undefined>(undefined);
  const [bibleTargetChapter, setBibleTargetChapter] = useState<number | undefined>(undefined);

  // Multilingual preference select
  const [language, setLanguage] = useState<Language>(Language.FR);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // App settings state
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [focusMode, setFocusMode] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(6); // default 6 seconds

   // Notification State prefers
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationHour, setNotificationHour] = useState("08:00");
  const [inAppNotification, setInAppNotification] = useState<{ title: string; body: string } | null>(null);
  const [notificationsHistory, setNotificationsHistory] = useState<AppNotification[]>([]);
  const [showNotifInbox, setShowNotifInbox] = useState(false);

  // Local storage state tables
  const [favoritesList, setFavoritesList] = useState<FavoriteVerse[]>([]);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [versesRead, setVersesRead] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState(0);

  // Gemini AI modal states
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiModalContent, setAiModalContent] = useState("");
  const [aiModalVerse, setAiModalVerse] = useState("");
  const [aiModalLoading, setAiModalLoading] = useState(false);
  const [aiModalError, setAiModalError] = useState("");
  const [explanationCopied, setExplanationCopied] = useState(false);

  // Translate helper
  const t = (key: string): string => {
    return I18N_DICTS[language]?.[key] || key;
  };

  // 1. Initial State Loaders (Offline Persistence)
  useEffect(() => {
    // Visits counter tracker
    try {
      const visits = localStorage.getItem("vitech_bible_visits");
      const nextVisits = visits ? parseInt(visits, 10) + 1 : 1;
      localStorage.setItem("vitech_bible_visits", nextVisits.toString());
    } catch (e) {
      console.warn("Storage warning:", e);
    }

    // Load favorites
    try {
      const storedFavs = localStorage.getItem("vitech_bible_favs");
      if (storedFavs) {
        setFavoritesList(JSON.parse(storedFavs));
      }
    } catch (e) {
      console.error("Failed to load favorites:", e);
    }

    // Load likes
    try {
      const storedLikes = localStorage.getItem("vitech_bible_likes");
      if (storedLikes) {
        const parsedLikes = JSON.parse(storedLikes);
        setLikes(parsedLikes);
        setLikesCount(Object.keys(parsedLikes).length);
      }
    } catch (e) {
      console.error("Failed to load likes:", e);
    }

    // Load read histories
    try {
      const storedRead = localStorage.getItem("vitech_bible_read");
      if (storedRead) {
        setVersesRead(JSON.parse(storedRead));
      }
    } catch (e) {
      console.error("Failed to load read history:", e);
    }

    // Load language preferences
    try {
      const storedLang = localStorage.getItem("vitech_bible_lang");
      if (storedLang && Object.values(Language).includes(storedLang as Language)) {
        setLanguage(storedLang as Language);
      }
    } catch (e) {}

    // Load theme setting
    try {
      const storedTheme = localStorage.getItem("vitech_bible_theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      }
    } catch (e) {}

    // Load notification preferences
    try {
      const storedNotif = localStorage.getItem("vitech_bible_notif_enabled");
      if (storedNotif !== null) {
        setNotificationsEnabled(storedNotif === "true");
      }
      const storedHour = localStorage.getItem("vitech_bible_notif_hour");
      if (storedHour) {
        setNotificationHour(storedHour);
      }
    } catch (e) {}

    // Load or seed notifications history
    try {
      const storedHistory = localStorage.getItem("vitech_bible_notifications_history");
      if (storedHistory) {
        setNotificationsHistory(JSON.parse(storedHistory));
      } else {
        // Seed default starter notifications
        const currentLang = localStorage.getItem("vitech_bible_lang") || "fr";
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const defaultNotifs: AppNotification[] = [
          {
            id: "welcome-1",
            title: currentLang === "fr" ? "Bienvenue sur BiblePro Max 📖" : "Welcome to BiblePro Max 📖",
            body: currentLang === "fr" 
              ? "Que la paix et la grâce de Dieu vous accompagnent ! Votre compagnon spirituel intelligent est prêt." 
              : "May God's peace and grace be with you! Your intelligent spiritual companion is ready.",
            timestamp: formattedTime,
            read: false
          },
          {
            id: "welcome-2",
            title: currentLang === "fr" ? "Conseils de Lecture Quotidienne 🌟" : "Daily Reading Guideline 🌟",
            body: currentLang === "fr"
              ? "Essayez d'explorer l'onglet 'Recherche' pour trouver des versets par thématique comme l'Amour, la Paix ou la Force brute."
              : "Try exploring the 'Search' tab to find verses by topics such as Love, Peace, or Strength.",
            timestamp: formattedTime,
            read: false
          },
          {
            id: "welcome-3",
            title: currentLang === "fr" ? "Intelligence Artificielle Active ⚡" : "Active AI Guidance ⚡",
            body: currentLang === "fr"
              ? "Vous pouvez désormais cliquer sur l'icône scintillante (Sparkles) de n'importe quel verset pour demander une explication approfondie à l'IA Gemini !"
              : "You can now click on the sparkly (Sparkles) button on any verse to request an in-depth context explanation from Gemini AI!",
            timestamp: formattedTime,
            read: false
          }
        ];
        setNotificationsHistory(defaultNotifs);
        localStorage.setItem("vitech_bible_notifications_history", JSON.stringify(defaultNotifs));
      }
    } catch (e) {
      console.error("Failed to load notifications history:", e);
    }
  }, []);

  // 2. DOM Classes update on Theme Select
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("vitech_bible_theme", theme);
    } catch (e) {}
  }, [theme]);

  // Translate change callback
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem("vitech_bible_lang", lang);
    } catch (e) {}
  };

  // Trigger system notification & fallback visual banner
  const handleShowNotification = (title: string, body: string) => {
    // 1. Play high-fidelity synthesized Web Audio chime
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.type = "sine";
        // Ethereal Christian gold chime (D5 to A5 exponential rise)
        oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880.00, audioCtx.currentTime + 0.12);
        
        gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.75);
      }
    } catch (e) {
      console.warn("Web Audio chime could not run:", e);
    }

    // 2. Add to active notification history
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newNotif: AppNotification = {
      id: "notif-" + Date.now() + Math.floor(Math.random() * 100),
      title,
      body,
      timestamp: formattedTime,
      read: false
    };

    setNotificationsHistory((prev) => {
      const next = [newNotif, ...prev];
      try {
        localStorage.setItem("vitech_bible_notifications_history", JSON.stringify(next));
      } catch (e) {}
      return next;
    });

    // 3. Custom in-app alert banner with state
    setInAppNotification({ title, body });
    // Keep it readable for 8 seconds
    setTimeout(() => {
      setInAppNotification(prev => prev && prev.title === title && prev.body === body ? null : prev);
    }, 8000);

    // 4. Native browser push notification (safely wrapped in try-catch in any environment)
    if ("Notification" in window) {
      try {
        if (Notification.permission === "granted") {
          new Notification(title, { body, icon: "/favicon.ico" });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              try {
                new Notification(title, { body, icon: "/favicon.ico" });
              } catch (err) {}
            }
          }).catch(() => {});
        }
      } catch (err) {
        console.warn("Native Notification blocked or not supported in this frame environment.");
      }
    }
  };

  // Toggle Notifications prefer
  const handleToggleNotifications = (choice: boolean) => {
    setNotificationsEnabled(choice);
    try {
      localStorage.setItem("vitech_bible_notif_enabled", choice.toString());
    } catch (e) {}
  };

  // Change Notification preferred hour
  const handleNotificationHourChange = (hour: string) => {
    setNotificationHour(hour);
    try {
      localStorage.setItem("vitech_bible_notif_hour", hour);
    } catch (e) {}
  };

  // Simulate on-load blessing alert reminder if enabled and not already shown inside session
  useEffect(() => {
    if (notificationsEnabled) {
      const todayStr = new Date().toDateString();
      const hasShownToday = sessionStorage.getItem("vitech_bible_notif_shown");
      if (hasShownToday !== todayStr) {
        const timer = setTimeout(() => {
          // Choose current verse of the day
          const day = new Date().getDate();
          const verseIndex = day % VERSES_OF_THE_DAY.length;
          const verse = VERSES_OF_THE_DAY[verseIndex];
          const text = verse.translations[language];
          const bookName = BIBLE_BOOKS.find(b => b.id === verse.bookId)?.names[language] || verse.bookId;
          const citation = `${bookName} ${verse.chapter}:${verse.verse}`;
          
          handleShowNotification(
            t("verseOfTheDay") + " 🌟",
            `"${text}" — ${citation}`
          );
          sessionStorage.setItem("vitech_bible_notif_shown", todayStr);
        }, 3500); // trigger nicely after 3.5 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [notificationsEnabled, language]);

  const handleThemeToggle = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Toggle Favorite Action
  const handleToggleFavorite = (
    bookId: string,
    bookName: string,
    chNum: number,
    vNum: number,
    text: string
  ) => {
    const favId = `${bookId}_${chNum}_${vNum}_${language}`;
    const exists = favoritesList.some((fav) => fav.id === favId);

    let nextFavs: FavoriteVerse[] = [];
    if (exists) {
      nextFavs = favoritesList.filter((fav) => fav.id !== favId);
    } else {
      const newFav: FavoriteVerse = {
        id: favId,
        bookId,
        bookName,
        chapterNumber: chNum,
        verseNumber: vNum,
        text,
        language,
        createdAt: new Date().toISOString(),
      };
      nextFavs = [newFav, ...favoritesList];
    }

    setFavoritesList(nextFavs);
    try {
      localStorage.setItem("vitech_bible_favs", JSON.stringify(nextFavs));
    } catch (e) {}
  };

  // Turn off or on manual favorites
  const handleRemoveFavoriteById = (favId: string) => {
    const nextFavs = favoritesList.filter((fav) => fav.id !== favId);
    setFavoritesList(nextFavs);
    try {
      localStorage.setItem("vitech_bible_favs", JSON.stringify(nextFavs));
    } catch (e) {}
  };

  // Toggle Like Tracker
  const handleToggleLike = (verseId: string) => {
    const nextLikes = { ...likes };
    if (nextLikes[verseId]) {
      delete nextLikes[verseId];
    } else {
      nextLikes[verseId] = true;
    }

    setLikes(nextLikes);
    setLikesCount(Object.keys(nextLikes).length);
    try {
      localStorage.setItem("vitech_bible_likes", JSON.stringify(nextLikes));
    } catch (e) {}
  };

  // Save Verse read list
  const handleRecordVerseRead = (verseId: string) => {
    if (versesRead[verseId]) return; // already counted
    const nextRead = { ...versesRead, [verseId]: true };
    setVersesRead(nextRead);
    try {
      localStorage.setItem("vitech_bible_read", JSON.stringify(nextRead));
    } catch (e) {}
  };

  // Navigate to Bible with target
  const handleNavigateToBible = (bookId?: string, chapter?: number) => {
    setBibleTargetBookId(bookId);
    setBibleTargetChapter(chapter);
    setActiveTab("bible");
  };

  // 3. FULL-STACK GENI AI EXPLAINING ENGINE (Gemini Server API)
  const handleExplainVerse = async (text: string, citation: string) => {
    setAiModalVerse(citation);
    setAiModalContent("");
    setAiModalError("");
    setAiModalLoading(true);
    setShowAiModal(true);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          verseText: text,
          bookName: citation.split(" ")[0] || "Bible",
          chapter: parseInt(citation.split(" ")[1]?.split(":")[0] || "1", 10),
          verseNumber: parseInt(citation.split(":")[1] || "1", 10),
          language: language,
        }),
      });

      const data = await response.json();
      if (data.explanation) {
        setAiModalContent(data.explanation);
      } else {
        throw new Error(data.error || "An unexplained state occurred.");
      }
    } catch (err: any) {
      console.error("AI client error:", err);
      setAiModalError("Impossible de se connecter au service d'explication. Veuillez réessayer.");
    } finally {
      setAiModalLoading(false);
    }
  };

  const copyExplanationToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${aiModalVerse}" — ${aiModalContent}\n\n📖 Expliqué avec l'IA ${t("appTitle")}`);
      setExplanationCopied(true);
      setTimeout(() => setExplanationCopied(false), 2000);
    } catch (e) {}
  };

  const versesReadTotal = Object.keys(versesRead).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans">
      
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-20 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          
          {/* Logo & Brand title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center logo-v-box font-sans shadow-md shadow-amber-500/15">
              <span className="text-[#0A0B10] font-extrabold text-lg">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-white text-base md:text-lg flex items-center gap-1">
                <span>Bible</span><span className="text-amber-500">Pro</span>
              </span>
            </div>
          </div>

          {/* Desktop Tab Selector */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === "home"
                  ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-50"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>{t("home")}</span>
            </button>

            <button
              onClick={() => setActiveTab("bible")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === "bible"
                  ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-50"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>{t("bible")}</span>
            </button>

            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === "favorites"
                  ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-50"
              }`}
            >
              <Heart className="h-4 w-4" />
              <span>{t("favorites")}</span>
              {favoritesList.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-mono font-bold">
                  {favoritesList.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("search")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === "search"
                  ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-50"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>{t("search")}</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${
                activeTab === "settings"
                  ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-amber-50"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>{t("settings")}</span>
            </button>
          </nav>

          {/* Quick theme & language togglers for accessibility */}
          <div className="flex items-center gap-2">
            {/* Interactive Notification Inbox Bell & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifInbox(!showNotifInbox);
                  setShowLangDropdown(false);
                  // Mark all as read when opening to satisfy the user and clear the badge count!
                  if (!showNotifInbox) {
                    setNotificationsHistory(prev => {
                      const updated = prev.map(n => ({ ...n, read: true }));
                      try {
                        localStorage.setItem("vitech_bible_notifications_history", JSON.stringify(updated));
                      } catch (e) {}
                      return updated;
                    });
                  }
                }}
                className="p-2.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 rounded-xl transition-all cursor-pointer relative"
                title="Notifications"
              >
                {notificationsHistory.filter(n => !n.read).length > 0 ? (
                  <BellRing className="h-4.5 w-4.5 text-amber-500 animate-bounce" />
                ) : (
                  <Bell className="h-4.5 w-4.5 text-slate-550 dark:text-slate-400" />
                )}
                
                {/* Notification Badge with numbers */}
                {notificationsHistory.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white font-mono scale-90 select-none animate-pulse">
                    {notificationsHistory.filter(n => !n.read).length}
                  </span>
                )}
              </button>

              {showNotifInbox && (
                <div className="absolute right-[-80px] sm:right-0 mt-2 z-50 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-2xl p-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-50 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4.5 w-4.5 text-indigo-500" />
                      <span className="font-extrabold text-sm text-slate-850 dark:text-white">
                        Notifications
                      </span>
                    </div>
                    {notificationsHistory.length > 0 && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setNotificationsHistory([]);
                            try {
                              localStorage.setItem("vitech_bible_notifications_history", "[]");
                            } catch (e) {}
                          }}
                          className="text-[10px] sm:text-xs font-bold text-rose-500 hover:text-rose-600 hover:underline flex items-center gap-1 cursor-pointer transition-all px-1.5 py-0.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          title="Tout supprimer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>{language === "fr" ? "Tout effacer" : "Clear all"}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* List Container scroll */}
                  <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-1">
                    {notificationsHistory.length === 0 ? (
                      <div className="py-8 flex flex-col items-center justify-center gap-2 text-center">
                        <div className="p-3 bg-indigo-50 dark:bg-slate-850 text-indigo-500 dark:text-indigo-400 rounded-full">
                          <Bell className="h-6 w-6 stroke-1" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1">
                          {language === "fr" ? "Aucune notification" : "No notifications yet"}
                        </span>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[200px] leading-relaxed mx-auto">
                          {language === "fr" 
                            ? "Vos versets du jour, partages et rappels spirituels s'afficheront ici."
                            : "Your daily scriptures, shares, and spiritual reminders will appear here."}
                        </p>
                      </div>
                    ) : (
                      notificationsHistory.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-2xl border text-left flex gap-2.5 transition-all relative group hover:shadow-xs ${
                            notif.read 
                              ? "bg-slate-50/50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800/50 text-slate-700 dark:text-slate-350"
                              : "bg-indigo-50/30 dark:bg-indigo-900/10 border-indigo-100/40 dark:border-indigo-500/20 text-slate-850 dark:text-white"
                          }`}
                        >
                          {/* Left dot/status */}
                          <div className="flex flex-col items-center pt-1">
                            {!notif.read ? (
                              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse mt-1.5 shrink-0" />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-2 shrink-0" />
                            )}
                          </div>

                          {/* Content block */}
                          <div className="flex-1 min-w-0 pr-4">
                            <h5 className="text-xs font-bold leading-tight font-sans tracking-tight">
                              {notif.title}
                            </h5>
                            <p className="text-[11px] font-semibold text-slate-550 dark:text-slate-455 mt-1 leading-normal font-sans text-ellipsis overflow-hidden">
                              {notif.body}
                            </p>
                            <span className="text-[9px] font-bold font-mono text-slate-400 dark:text-slate-500 mt-1.5 block">
                              {notif.timestamp}
                            </span>
                          </div>

                          {/* Individual delete button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNotificationsHistory(prev => {
                                const next = prev.filter(n => n.id !== notif.id);
                                try {
                                  localStorage.setItem("vitech_bible_notifications_history", JSON.stringify(next));
                                } catch (err) {}
                                return next;
                              });
                            }}
                            className="absolute right-2.5 top-2.5 p-1 rounded-lg text-slate-405 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all cursor-pointer"
                            title="Supprimer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                }}
                className="p-2.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-605 dark:text-slate-350 rounded-xl transition-all flex items-center gap-1.5 font-bold text-xs uppercase cursor-pointer"
                title={t("language")}
              >
                <Globe className="h-4 w-4 text-amber-500" />
                <span className="hidden sm:inline">{language}</span>
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 z-40 w-40 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-1">
                    {t("language")}
                  </span>
                  {[
                    { code: Language.FR, label: "Français" },
                    { code: Language.EN, label: "English" },
                    { code: Language.ES, label: "Español" },
                    { code: Language.SW, label: "Kiswahili" },
                    { code: Language.RW, label: "Kinyarwanda" }
                  ].map((langObj) => (
                    <button
                      key={langObj.code}
                      onClick={() => {
                        handleLanguageChange(langObj.code);
                        setShowLangDropdown(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 text-xs font-bold rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        language === langObj.code
                          ? "bg-amber-500 text-[#0a0b10]"
                          : "text-slate-705 dark:text-slate-205 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span>{langObj.label}</span>
                      {language === langObj.code && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0a0b10]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleThemeToggle}
              className="p-2.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 rounded-xl transition-all cursor-pointer"
              title="Basculez Thème"
            >
              {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Page Layout with standard limits margins */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-6 pb-20 md:py-8">
        <div className={animationsEnabled ? "transition-all duration-300" : ""}>
          {activeTab === "home" && (
            <HomeView
              language={language}
              t={t}
              animationsEnabled={animationsEnabled}
              theme={theme}
              onNavigateToBible={handleNavigateToBible}
              favoritesCount={favoritesList.length}
              likesCount={likesCount}
              versesReadCount={versesReadTotal}
              onExplainVerse={handleExplainVerse}
              notificationsEnabled={notificationsEnabled}
              onToggleNotifications={handleToggleNotifications}
              notificationHour={notificationHour}
              onNotificationHourChange={handleNotificationHourChange}
              onShowNotification={handleShowNotification}
            />
          )}

          {activeTab === "bible" && (
            <BibleView
              language={language}
              t={t}
              animationsEnabled={animationsEnabled}
              theme={theme}
              initialBookId={bibleTargetBookId}
              initialChapter={bibleTargetChapter}
              favorites={favoritesList.reduce((acc, current) => {
                acc[current.id] = true;
                return acc;
              }, {} as Record<string, boolean>)}
              likes={likes}
              onToggleFavorite={handleToggleFavorite}
              onToggleLike={handleToggleLike}
              onExplainVerse={handleExplainVerse}
              onRecordVerseRead={handleRecordVerseRead}
              focusMode={focusMode}
              autoScroll={autoScroll}
              autoScrollSpeed={autoScrollSpeed}
            />
          )}

          {activeTab === "favorites" && (
            <FavoritesView
              language={language}
              t={t}
              animationsEnabled={animationsEnabled}
              theme={theme}
              favoritesList={favoritesList}
              likes={likes}
              onRemoveFavorite={handleRemoveFavoriteById}
              onToggleLike={handleToggleLike}
              onExplainVerse={handleExplainVerse}
            />
          )}

          {activeTab === "search" && (
            <SearchView
              language={language}
              t={t}
              animationsEnabled={animationsEnabled}
              theme={theme}
              likes={likes}
              favorites={favoritesList.reduce((acc, current) => {
                acc[current.id] = true;
                return acc;
              }, {} as Record<string, boolean>)}
              onToggleFavorite={handleToggleFavorite}
              onToggleLike={handleToggleLike}
              onExplainVerse={handleExplainVerse}
            />
          )}

          {activeTab === "settings" && (
            <SettingsView
              language={language}
              t={t}
              theme={theme}
              onLanguageChange={handleLanguageChange}
              onThemeToggle={handleThemeToggle}
              animationsEnabled={animationsEnabled}
              onToggleAnimations={() => setAnimationsEnabled(!animationsEnabled)}
              focusMode={focusMode}
              onToggleFocusMode={() => setFocusMode(!focusMode)}
              autoScroll={autoScroll}
              onToggleAutoScroll={() => setAutoScroll(!autoScroll)}
              autoScrollSpeed={autoScrollSpeed}
              onAutoScrollSpeedChange={setAutoScrollSpeed}
              notificationsEnabled={notificationsEnabled}
              onToggleNotifications={handleToggleNotifications}
              notificationHour={notificationHour}
              onNotificationHourChange={handleNotificationHourChange}
              onShowNotification={handleShowNotification}
            />
          )}
        </div>
      </main>

      {/* 3. GEMINI AI EXPLAINING MODAL POPUP */}
      {showAiModal && (
        <div id="gemini-explanation-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-indigo-50/20 dark:bg-slate-850/25">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-500 animate-spin-pulse" />
                <span className="font-extrabold text-slate-800 dark:text-white text-sm md:text-base">
                  {t("explainTitle")}
                </span>
                <span className="ml-1 px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/50 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 rounded-full">
                  Gemini AI
                </span>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 rounded-xl transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body Scroll space */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
              <div className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-lg w-max font-mono">
                {aiModalVerse}
              </div>

              {aiModalLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                    <Sparkles className="absolute h-5 w-5 text-indigo-500" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 animate-pulse">
                    {t("explaining")}
                  </span>
                </div>
              ) : aiModalError ? (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl flex items-start gap-2.5 text-rose-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span className="text-xs font-semibold leading-relaxed">
                    {aiModalError}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("aiExplanation")}</h4>
                  <div className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-line font-serif pl-3 border-l-2 border-indigo-400/50 italic bg-slate-50/50 dark:bg-slate-950/30 p-4 rounded-xl">
                    {aiModalContent}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Action Footer */}
            {!aiModalLoading && !aiModalError && (
              <div className="p-5 border-t border-slate-50 dark:border-slate-800/80 flex justify-end gap-2.5">
                <button
                  onClick={copyExplanationToClipboard}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-705 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  {explanationCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{explanationCopied ? t("copied") : t("copy")}</span>
                </button>
                <button
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 bg-indigo-500 text-white font-bold text-xs rounded-xl hover:bg-indigo-600 transition-colors"
                >
                  {t("close")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* In-App Floating Toast Notification fallback */}
      {inAppNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-auto px-4">
          <div className="p-4 bg-slate-900 border border-amber-500/50 text-white rounded-2xl shadow-[0_10px_30px_rgba(245,158,11,0.25)] flex items-start gap-3 backdrop-blur-md">
            <div className="p-2 bg-amber-500/20 text-amber-500 rounded-lg shrink-0">
               <Bell className="h-5 w-5 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-amber-500">{inAppNotification.title}</h4>
              <p className="text-xs font-semibold text-slate-200 mt-1 leading-relaxed">{inAppNotification.body}</p>
            </div>
            <button 
              onClick={() => setInAppNotification(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. Global Footer Section (COMPULSORY ON ALL SCREENS) */}
      <footer id="vitech-compulsory-footer" className="w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80 transition-colors pt-6 pb-24 md:py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-medium text-slate-450 dark:text-slate-500 tracking-wide text-center md:text-left">
            {t("footerText")}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
              Vitech Africa
            </span>
          </div>
        </div>
      </footer>

      {/* 5. Mobile Tab Selector overlay bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-5 p-2 gap-1 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded-xl transition-all ${
              activeTab === "home" ? "text-indigo-500 bg-indigo-50/50 dark:bg-slate-800" : "text-slate-400"
            }`}
          >
            <Home className="h-4.5 w-4.5" />
            <span className="text-[9px] font-extrabold tracking-tight truncate">{t("home")}</span>
          </button>

          <button
            onClick={() => setActiveTab("bible")}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded-xl transition-all ${
              activeTab === "bible" ? "text-indigo-500 bg-indigo-50/50 dark:bg-slate-800" : "text-slate-400"
            }`}
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span className="text-[9px] font-extrabold tracking-tight truncate">{t("bible")}</span>
          </button>

          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded-xl relative transition-all ${
              activeTab === "favorites" ? "text-indigo-500 bg-indigo-50/50 dark:bg-slate-800" : "text-slate-400"
            }`}
          >
            <Heart className="h-4.5 w-4.5" />
            {favoritesList.length > 0 && (
              <span className="absolute top-1 right-2 px-1 rounded-full text-[8px] bg-rose-500 text-white font-bold">
                {favoritesList.length}
              </span>
            )}
            <span className="text-[9px] font-extrabold tracking-tight truncate">{t("favorites")}</span>
          </button>

          <button
            onClick={() => setActiveTab("search")}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded-xl transition-all ${
              activeTab === "search" ? "text-indigo-500 bg-indigo-50/50 dark:bg-slate-800" : "text-slate-400"
            }`}
          >
            <Search className="h-4.5 w-4.5" />
            <span className="text-[9px] font-extrabold tracking-tight truncate">{t("search")}</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded-xl transition-all ${
              activeTab === "settings" ? "text-indigo-500 bg-indigo-50/50 dark:bg-slate-800" : "text-slate-400"
            }`}
          >
            <Settings className="h-4.5 w-4.5" />
            <span className="text-[9px] font-extrabold tracking-tight truncate">{t("settings")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
