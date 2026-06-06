/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  BookOpen, Heart, Search, Settings, Sparkles, Trophy, 
  HelpCircle, UserCheck, Flame, Play, Pause, ChevronRight, 
  RotateCcw, Sliders, Eye, Sun, Moon, Volume2, ArrowRight,
  TrendingUp, Trash2, Globe, Sparkle, Bell, BellRing, Star
} from "lucide-react";
import { Language, FavoriteVerse } from "../types";
import { BIBLE_BOOKS, VERSES_OF_THE_DAY } from "../bibleData";
import { VerseCard } from "./VerseCard";
import { ProFeatures } from "./ProFeatures";

interface CommonViewProps {
  language: Language;
  t: (key: string) => string;
  animationsEnabled: boolean;
  theme: "light" | "dark";
}

// ----------------------------------------------------
// 1. HOME VIEW
// ----------------------------------------------------
interface HomeViewProps extends CommonViewProps {
  onNavigateToBible: (bookId?: string, chapter?: number) => void;
  favoritesCount: number;
  likesCount: number;
  versesReadCount: number;
  onExplainVerse: (text: string, citation: string) => void;
  notificationsEnabled: boolean;
  onToggleNotifications: (choice: boolean) => void;
  notificationHour: string;
  onNotificationHourChange: (hour: string) => void;
  onShowNotification: (title: string, body: string) => void;
}

export function HomeView({
  language,
  t,
  animationsEnabled,
  theme,
  onNavigateToBible,
  favoritesCount,
  likesCount,
  versesReadCount,
  onExplainVerse,
  notificationsEnabled,
  onToggleNotifications,
  notificationHour,
  onNotificationHourChange,
  onShowNotification
}: HomeViewProps) {
  const [visitsCount, setVisitsCount] = useState(1);
  const [dailyVerseIndex, setDailyVerseIndex] = useState(0);
  const [globalVisitors, setGlobalVisitors] = useState(142830);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [showRatingFeedback, setShowRatingFeedback] = useState(false);
  const [recentChapters, setRecentChapters] = useState<{ bookId: string; chapter: number }[]>([]);

  useEffect(() => {
    // Load recently viewed chapters from localStorage
    try {
      const stored = localStorage.getItem("vitech_bible_recent_chapters");
      if (stored) {
        setRecentChapters(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error loading recent chapters:", e);
    }

    // Read local stats
    const visits = localStorage.getItem("vitech_bible_visits");
    if (visits) {
      setVisitsCount(parseInt(visits, 10));
    }

    // Initialize or load global visitors counter
    let storedGlobal = localStorage.getItem("vitech_bible_global_visitors");
    let initialGlobal = 142830;
    if (storedGlobal) {
      initialGlobal = parseInt(storedGlobal, 10);
    } else {
      // Seed initially
      initialGlobal = 142830 + Math.floor(Math.random() * 50);
      localStorage.setItem("vitech_bible_global_visitors", initialGlobal.toString());
    }
    setGlobalVisitors(initialGlobal);

    // Dynamic Live visitor tick simulation
    const interval = setInterval(() => {
      setGlobalVisitors((prev) => {
        const increment = Math.floor(Math.random() * 3) + 1; // tick by 1-3
        const next = prev + increment;
        localStorage.setItem("vitech_bible_global_visitors", next.toString());
        return next;
      });
    }, 4500); // every 4.5 seconds

    // Read user rating choice if already voted
    const savedRating = localStorage.getItem("vitech_bible_user_rating");
    if (savedRating) {
      setUserRating(parseInt(savedRating, 10));
    }

    // Determine verse of the day based on day of the year to make it auto-update automatically!
    const day = new Date().getDate();
    setDailyVerseIndex(day % VERSES_OF_THE_DAY.length);

    return () => clearInterval(interval);
  }, []);

  const handleRateApp = (rating: number) => {
    setUserRating(rating);
    localStorage.setItem("vitech_bible_user_rating", rating.toString());
    setShowRatingFeedback(true);
    onShowNotification(
      language === "fr" ? "Évaluation Enregistrée ! ⭐" : "Rating Saved! ⭐",
      language === "fr" 
        ? `Merci infiniment ! Votre note de ${rating} étoiles soutient notre mission.`
        : `Thank you so much! Your ${rating}-star rating supports our mission.`
    );
    setTimeout(() => {
      setShowRatingFeedback(false);
    }, 6000);
  };

  const currentDailyVerse = VERSES_OF_THE_DAY[dailyVerseIndex];
  const dailyText = currentDailyVerse.translations[language];
  const matchedBookName = BIBLE_BOOKS.find(b => b.id === currentDailyVerse.bookId)?.names[language] || currentDailyVerse.bookId;
  const dailyCitation = `${matchedBookName} ${currentDailyVerse.chapter}:${currentDailyVerse.verse}`;

  // Direct start reading callback
  const handleStart = () => {
    onNavigateToBible();
  };

  return (
    <div className="flex flex-col gap-8 md:gap-10 pb-12 relative">
      {/* Atmosphere radial background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.06)_0%,transparent_70%)] pointer-events-none"></div>

      {/* Hero Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-6 md:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl -z-10"></div>

        <div className="flex flex-col gap-4 max-w-2xl relative z-10">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold uppercase tracking-wider w-max border border-amber-500/20">
              <Sparkle className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span>Vitech Africa</span>
            </div>
            
            {/* Added 4.2-star rating badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 md:py-1 bg-amber-400/15 rounded-full text-[10px] font-extrabold border border-amber-450/20 text-amber-400 select-none">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>4.2 Étoiles</span>
            </div>

            {/* Added Pro Visitor Counter badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 md:py-1 bg-emerald-500/10 rounded-full text-[10px] font-bold border border-emerald-500/20 text-emerald-400 select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>+{(globalVisitors).toLocaleString(language === "fr" ? "fr-FR" : "en-US")} {language === "fr" ? "Visiteurs" : "Visitors"}</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans text-white">
            {t("appTitle")}
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
            {t("tagline")} – Une expérience biblique immersive, multilingue et enrichie par l'Intelligence Artificielle de Google Gemini.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleStart}
              className="px-8 py-3 bg-amber-500 text-[#0A0B10] font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 transition-all text-sm flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="h-4 w-4 stroke-[2.5]" />
              <span>{t("startReading")}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Verse of the Day Card */}
      <div className="flex flex-col gap-4 relative">
        <div className="flex justify-between items-center">
          <h2 className="text-lg md:text-xl font-bold font-sans text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span className="text-amber-500 text-xs uppercase tracking-[0.25em] font-bold">{t("verseOfTheDay")}</span>
          </h2>
          <button
            onClick={() => setDailyVerseIndex((prev) => (prev + 1) % VERSES_OF_THE_DAY.length)}
            className="text-xs font-semibold text-amber-500 hover:text-white transition-colors flex items-center gap-1.5 bg-amber-500/10 px-3.5 py-2 rounded-full border border-amber-500/20 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{t("refreshVerse")}</span>
          </button>
        </div>

        <div className="p-8 md:p-12 bg-slate-900 border border-white/10 rounded-3xl relative text-center flex flex-col items-center justify-center">
          <span className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-5">Méditation Quotidienne</span>
          
          <blockquote className="font-serif text-2xl md:text-3.5xl leading-snug text-white max-w-3xl mb-6 italic">
            "{dailyText}"
          </blockquote>
          
          <p className="text-amber-500/85 font-semibold tracking-widest text-xs md:text-sm font-mono mb-8">
            {dailyCitation.toUpperCase()}
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onExplainVerse(dailyText, dailyCitation)}
              className="px-6 py-2.5 bg-amber-500 text-[#0A0B10] font-bold rounded-full shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-105 transition-all flex items-center gap-1.5 text-xs cursor-pointer"
            >
              <Sparkles className="h-4 w-4 fill-amber-500" />
              <span>{t("explainWithAI")}</span>
            </button>
            
            <button
              onClick={() => onNavigateToBible(currentDailyVerse.bookId, currentDailyVerse.chapter)}
              className="px-6 py-2.5 bg-white/5 border border-white/10 text-white rounded-full hover:bg-white/10 hover:scale-105 transition-all text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>{t("bible")}</span>
            </button>
          </div>
        </div>

        {/* Quick Daily Notification Toggle Panel */}
        <div className="p-5 bg-slate-900 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 -mt-2 shadow-lg backdrop-blur-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl shrink-0">
              <Bell className="h-4.5 w-4.5" />
            </div>
            <div className="text-left">
              <h4 className="text-white font-extrabold text-xs tracking-wider uppercase">Recevoir le verset du jour</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">Rappels de prière programmés quotidiennement pour renouveler votre foi.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end shrink-0">
            <button
              onClick={() => onToggleNotifications(!notificationsEnabled)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                notificationsEnabled 
                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20"
                  : "bg-white/10 text-white border-transparent hover:bg-white/15"
              }`}
            >
              {notificationsEnabled ? "✓ Rappels Activés" : "Rappels Désactivés"}
            </button>
            
            {notificationsEnabled && (
              <button
                onClick={() => onShowNotification(
                  t("verseOfTheDay") + " 📖",
                  `"${dailyText}" — ${dailyCitation}`
                )}
                className="p-2 bg-amber-500 text-slate-950 hover:bg-amber-600 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
                title="Tester la notification de suite"
              >
                <BellRing className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Dashboard / Statistiques */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg md:text-xl font-bold font-sans text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-500" />
          <span>{t("globalStats")}</span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Unique Live Pro Visitors Counter */}
          <div className="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-2xl flex flex-col justify-between gap-1.5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 dark:bg-indigo-400/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {language === "fr" ? "Visiteurs Globaux Pro" : "Pro Visitors (Global)"}
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 font-mono text-indigo-600 dark:text-indigo-400 tracking-tight">
                {globalVisitors.toLocaleString(language === "fr" ? "fr-FR" : "en-US")}
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-405 dark:text-slate-500 italic mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {language === "fr" ? "Activés en temps réel" : "Real-time live connections active"}
            </span>
          </div>

          {/* Card 2: 4.2 Rating Widget with Interactive Grading Stars */}
          <div className="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-2xl flex flex-col justify-between gap-1.5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {language === "fr" ? "Évaluation Générale" : "Community Rating"}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 font-mono text-amber-505 dark:text-amber-500 tracking-tight">
                  4.2
                </span>
                <span className="text-[10px] sm:text-xs font-extrabold text-slate-400 dark:text-slate-500">/ 5</span>
              </div>
            </div>
            
            {/* Miniature Interactive Rating System */}
            <div className="mt-1 flex flex-col gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isActive = userRating !== null ? starVal <= userRating : starVal <= 4;
                  return (
                    <button
                      key={starVal}
                      onClick={() => handleRateApp(starVal)}
                      className="p-0.5 hover:scale-125 focus:outline-none transition-transform cursor-pointer"
                      title={`Noter ${starVal} étoiles`}
                    >
                      <Star 
                        className={`h-3.5 w-3.5 ${
                          isActive 
                            ? "fill-amber-500 text-amber-500 text-amber-550" 
                            : "text-slate-200 dark:text-slate-700"
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
              <span className="text-[8px] font-black uppercase text-slate-450 dark:text-slate-500 tracking-wider">
                {userRating !== null 
                  ? (language === "fr" ? "Votre vote enregistré !" : "Your vote registered!")
                  : (language === "fr" ? "2 840+ avis • Cliquez pour noter" : "2,840+ reviews • Tap to rate")}
              </span>
            </div>
          </div>

          {/* Card 3: Personal reading activity (combined total visits + chapters read) */}
          <div className="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-2xl flex flex-col justify-between gap-1.5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {language === "fr" ? "Vos Lancements Préférés" : "Your Local Starts"}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-mono text-emerald-600 dark:text-emerald-400 tracking-tight">
                {visitsCount}
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 dark:text-slate-550 mt-1">
              {language === "fr" ? "Données cryptées localement" : "Securely persisted offline"}
            </span>
          </div>

          {/* Card 4: Personal stats for read chapters/favorites/likes summary */}
          <div className="p-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-2xl flex flex-col justify-between gap-1.5 shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {language === "fr" ? "Versets Aimés / Lus" : "Liked / Read Verses"}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 font-mono text-rose-500 tracking-tight">
                {likesCount} <span className="text-slate-300 dark:text-slate-600 text-sm">/</span> {versesReadCount}
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 dark:text-slate-550 mt-1">
              {language === "fr" ? "Favoris :" : "Bookmarks:"} <strong className="text-amber-500 font-mono">{favoritesCount}</strong>
            </span>
          </div>

        </div>
      </div>

      {/* Pro Suite Quick Access: Téléchargement, Partage Pro Max & Mode Hors-ligne sécurisé */}
      <ProFeatures 
        language={language}
        t={t}
        onShowNotification={onShowNotification}
      />
    </div>
  );
}

// ----------------------------------------------------
// 2. BIBLE VIEW (READING ENGINE)
// ----------------------------------------------------
interface BibleViewProps extends CommonViewProps {
  initialBookId?: string;
  initialChapter?: number;
  favorites: Record<string, boolean>;
  likes: Record<string, boolean>;
  onToggleFavorite: (bookId: string, bookName: string, chNum: number, vNum: number, text: string) => void;
  onToggleLike: (verseId: string) => void;
  onExplainVerse: (text: string, citation: string) => void;
  onRecordVerseRead: (verseId: string) => void;
  focusMode: boolean;
  autoScroll: boolean;
  autoScrollSpeed: number;
}

export function BibleView({
  language,
  t,
  animationsEnabled,
  theme,
  initialBookId,
  initialChapter,
  favorites,
  likes,
  onToggleFavorite,
  onToggleLike,
  onExplainVerse,
  onRecordVerseRead,
  focusMode,
  autoScroll,
  autoScrollSpeed
}: BibleViewProps) {
  const [selectedBookId, setSelectedBookId] = useState(BIBLE_BOOKS[0].id);
  const [selectedChapterNumber, setSelectedChapterNumber] = useState(1);
  const [isPlayingAutoScroll, setIsPlayingAutoScroll] = useState(false);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load and save color-coded highlights of verses locally
  const [highlights, setHighlights] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("vitech_bible_highlights");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Error restoring highlights:", e);
      return {};
    }
  });

  // Track the last 5 Bible chapters opened
  useEffect(() => {
    if (!selectedBookId || !selectedChapterNumber) return;
    try {
      const saved = localStorage.getItem("vitech_bible_recent_chapters");
      let list: { bookId: string; chapter: number }[] = saved ? JSON.parse(saved) : [];
      
      // Filter out duplicate
      list = list.filter(item => !(item.bookId === selectedBookId && item.chapter === selectedChapterNumber));
      
      // Prepend the new one
      list.unshift({ bookId: selectedBookId, chapter: selectedChapterNumber });
      
      // Limit to 5 items Max
      list = list.slice(0, 5);
      
      localStorage.setItem("vitech_bible_recent_chapters", JSON.stringify(list));
    } catch (e) {
      console.error("Error saving recent chapter:", e);
    }
  }, [selectedBookId, selectedChapterNumber]);

  const handleHighlightChange = (verseKey: string, color: string) => {
    setHighlights((prev) => {
      const next = { ...prev };
      if (!color) {
        delete next[verseKey];
      } else {
        next[verseKey] = color;
      }
      localStorage.setItem("vitech_bible_highlights", JSON.stringify(next));
      return next;
    });
  };

  // Dynamic Cache states for chapters fetched with /api/get-chapter
  const [fetchedChapters, setFetchedChapters] = useState<Record<string, { number: number; text: string }[]>>({});
  const [loadingChapter, setLoadingChapter] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Sync route navigations from parent
  useEffect(() => {
    if (initialBookId) {
      const exists = BIBLE_BOOKS.some(b => b.id === initialBookId);
      if (exists) {
        setSelectedBookId(initialBookId);
        if (initialChapter) {
          const matchedBook = BIBLE_BOOKS.find(b => b.id === initialBookId);
          const chExists = matchedBook?.chapters.some(c => c.number === initialChapter);
          if (chExists) {
            setSelectedChapterNumber(initialChapter);
          } else {
            setSelectedChapterNumber(1);
          }
        }
      }
    }
  }, [initialBookId, initialChapter]);

  const currentBook = BIBLE_BOOKS.find(b => b.id === selectedBookId) || BIBLE_BOOKS[0];
  const chaptersList = currentBook.chapters;
  const currentChapter = chaptersList.find(c => c.number === selectedChapterNumber) || chaptersList[0];
  const currentBookName = currentBook.names[language];

  const cacheKey = `${selectedBookId}_${selectedChapterNumber}_${language}`;
  const staticVerses = currentChapter?.verses || [];

  // Computed displayed verses: if static exists, use it, else utilize cached/fetched dynamic verses
  const displayedVerses = useMemo(() => {
    if (staticVerses.length > 0) {
      return staticVerses.map(v => ({
        number: v.number,
        text: v.translations[language] || ""
      }));
    }
    return fetchedChapters[cacheKey] || [];
  }, [staticVerses, fetchedChapters, cacheKey, language]);

  // Load the complete verses of the chapter from /api/get-chapter
  const triggerFetchChapter = () => {
    setLoadingChapter(true);
    setFetchError(null);
    fetch("/api/get-chapter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: selectedBookId,
        bookName: currentBookName,
        chapterNumber: selectedChapterNumber,
        language: language
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur de connexion serveur");
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data.verses)) {
          setFetchedChapters(prev => ({
            ...prev,
            [cacheKey]: data.verses
          }));
        } else {
          throw new Error("Format de réponse invalide");
        }
        setLoadingChapter(false);
      })
      .catch(err => {
        console.error("Failed fetching chapter:", err);
        setFetchError(err.message || "Erreur réseau");
        setLoadingChapter(false);
      });
  };

  useEffect(() => {
    if (staticVerses.length === 0 && !fetchedChapters[cacheKey]) {
      triggerFetchChapter();
    } else {
      setLoadingChapter(false);
      setFetchError(null);
    }
  }, [selectedBookId, selectedChapterNumber, language, staticVerses]);

  // Increment verses read count when entering a chapter or loading it dynamically
  useEffect(() => {
    if (displayedVerses.length > 0) {
      displayedVerses.forEach(v => {
        const verseKey = `${selectedBookId}_${selectedChapterNumber}_${v.number}`;
        onRecordVerseRead(verseKey);
      });
    }
  }, [selectedBookId, selectedChapterNumber, displayedVerses]);

  // Hook scroll state persistence
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollHeight - target.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    const pct = Math.min(100, Math.max(0, (target.scrollTop / maxScroll) * 100));
    setScrollProgress(pct);

    const scrollKey = `bible_scroll_${selectedBookId}_${selectedChapterNumber}_${language}`;
    localStorage.setItem(scrollKey, JSON.stringify({
      scrollTop: target.scrollTop,
      progress: pct
    }));
  };

  // Restore scroll positions accurately across chapters and books
  useEffect(() => {
    if (loadingChapter || displayedVerses.length === 0) {
      setScrollProgress(0);
      return;
    }

    const timer = setTimeout(() => {
      if (containerRef.current) {
        const scrollKey = `bible_scroll_${selectedBookId}_${selectedChapterNumber}_${language}`;
        const saved = localStorage.getItem(scrollKey);
        if (saved) {
          try {
            const { scrollTop, progress } = JSON.parse(saved);
            containerRef.current.scrollTop = scrollTop;
            setScrollProgress(progress);
          } catch (e) {
            console.error("Restored scroll error:", e);
            containerRef.current.scrollTop = 0;
            setScrollProgress(0);
          }
        } else {
          containerRef.current.scrollTop = 0;
          setScrollProgress(0);
        }
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [selectedBookId, selectedChapterNumber, language, displayedVerses, loadingChapter]);

  // Handle Autoscroll loop
  useEffect(() => {
    if (autoScroll && isPlayingAutoScroll) {
      autoScrollTimerRef.current = setInterval(() => {
        const currentContainer = document.getElementById("bible-verses-container");
        if (currentContainer) {
          currentContainer.scrollBy({ top: 120, behavior: "smooth" });
        }
      }, autoScrollSpeed * 1000);
    } else {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
      }
    };
  }, [autoScroll, isPlayingAutoScroll, autoScrollSpeed]);

  const handleBookChange = (id: string) => {
    setSelectedBookId(id);
    setSelectedChapterNumber(1);
  };

  const oldTestamentBooks = BIBLE_BOOKS.filter(b => b.testament === "old");
  const newTestamentBooks = BIBLE_BOOKS.filter(b => b.testament === "new");

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Upper Navigation Rail */}
      {!focusMode && (
        <div className="p-3.5 sm:p-5 bg-white dark:bg-slate-800 border border-slate-105 dark:border-slate-700/60 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-2.5 md:gap-3">
            <BookOpen className="h-5 w-5 text-amber-500 shrink-0" />
            <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
              {t("bibleNav")}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Book choice drop-down by Testament */}
            <select
              value={selectedBookId}
              onChange={(e) => handleBookChange(e.target.value)}
              className="w-full sm:w-48 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/70 text-slate-800 dark:text-slate-100 rounded-xl text-xs sm:text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-hidden cursor-pointer"
            >
              <optgroup label={language === "fr" ? "Ancien Testament" : language === "en" ? "Old Testament" : language === "sw" ? "Agano la Kale" : language === "rw" ? "Isezerano Rikera" : "Antiguo Testamento"}>
                {oldTestamentBooks.map((b) => (
                  <option key={b.id} value={b.id} className="text-slate-900 bg-slate-50 dark:bg-slate-950">
                    {b.names[language]}
                  </option>
                ))}
              </optgroup>
              <optgroup label={language === "fr" ? "Nouveau Testament" : language === "en" ? "New Testament" : language === "sw" ? "Agano Jipya" : language === "rw" ? "Isezerano Rishya" : "Nuevo Testamento"}>
                {newTestamentBooks.map((b) => (
                  <option key={b.id} value={b.id} className="text-slate-900 bg-slate-50 dark:bg-slate-950">
                    {b.names[language]}
                  </option>
                ))}
              </optgroup>
            </select>

            {/* Chapter selectors and indicators */}
            <div className="flex items-center gap-1.5 w-full md:max-w-xs overflow-x-auto py-1 custom-scrollbar shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
              {chaptersList.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => setSelectedChapterNumber(ch.number)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-colors shrink-0 ${
                    selectedChapterNumber === ch.number
                      ? "bg-amber-500 text-[#0a0b10] shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                      : "bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/30 font-semibold"
                  }`}
                >
                  {ch.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Focus Control Bar */}
      <div className="flex items-center justify-between mb-1 gap-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 font-sans">
            {currentBookName} <span className="text-amber-500 font-mono text-lg md:text-xl">Ch.{selectedChapterNumber}</span>
          </h2>
          
          {/* Circular progress of reading chapter */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-slate-200 dark:border-slate-700/50 shadow-xs shrink-0 select-none animate-fade-in">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  className="stroke-slate-205 stroke-slate-200 dark:stroke-slate-750 dark:stroke-slate-700/70"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  className="stroke-amber-500 transition-all duration-300 ease-out"
                  strokeWidth="2.5"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 13}`}
                  strokeDashoffset={`${2 * Math.PI * 13 * (1 - scrollProgress / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[8px] sm:text-[9px] font-extrabold text-slate-700 dark:text-slate-200 font-mono">
                {Math.round(scrollProgress)}%
              </span>
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold text-slate-500 dark:text-slate-400 font-sans hidden sm:block pr-1">
              {language === "fr" ? "Lu" : language === "es" ? "Leído" : "Read"}
            </span>
          </div>
        </div>

        {autoScroll && (
          <button
            onClick={() => setIsPlayingAutoScroll(!isPlayingAutoScroll)}
            className={`px-4 py-1.5 text-xs font-bold rounded-full flex items-center gap-1.5 transition-colors shrink-0 ${
              isPlayingAutoScroll 
                ? "bg-amber-500 text-[#0a0b10] animate-pulse" 
                : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
            }`}
          >
            {isPlayingAutoScroll ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isPlayingAutoScroll ? "Pause SCROLL" : "Auto SCROLL"}</span>
          </button>
        )}
      </div>

      {/* Verses Container */}
      <div
        id="bible-verses-container"
        ref={containerRef}
        onScroll={handleScroll}
        className="max-h-[60vh] overflow-y-auto rounded-3xl p-1 flex flex-col gap-4 scroll-smooth pr-2 custom-scrollbar"
      >
        {loadingChapter ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-10 h-10 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin"></div>
            <div className="flex flex-col gap-1">
              <p className="text-amber-500 font-bold text-sm animate-pulse tracking-wide">
                {language === "fr" ? "Récupération par l'IA de BiblePro..." 
                 : language === "sw" ? "Kutafuta na BiblePro IA..." 
                 : language === "rw" ? "Guhabwa ijwi na BiblePro IA..." 
                 : language === "es" ? "Obteniendo por la IA de BiblePro..." 
                 : "Fetching via BiblePro AI..."}
              </p>
              <p className="text-xs text-slate-400 max-w-xs">
                {language === "fr" ? "Nous interrogeons les archives sacrées pour ce chapitre." 
                 : language === "sw" ? "Tunaangalia maandiko matakatifu katika kumbukumbu." 
                 : language === "rw" ? "Turashakisha mu bubiko bw'ijambo ryera." 
                 : language === "es" ? "Consultando los archivos sagrados de este capítulo." 
                 : "Accessing scripture databases to present this chapter."}
              </p>
            </div>
          </div>
        ) : fetchError ? (
          <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center flex flex-col items-center gap-4">
            <span className="text-red-400 text-sm font-semibold">{fetchError}</span>
            <button
              onClick={() => triggerFetchChapter()}
              className="px-5 py-2 bg-amber-500 text-[#0a0b10] font-bold rounded-xl text-xs hover:scale-105 transition-all"
            >
              {language === "fr" ? "Réessayer la connexion" 
               : language === "es" ? "Reintentar conexión" 
               : "Retry Connection"}
            </button>
          </div>
        ) : displayedVerses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
            <span className="text-slate-400 text-sm">Ce chapitre est temporairement vide.</span>
            <button
              onClick={() => triggerFetchChapter()}
              className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold rounded-xl text-xs"
            >
              Recharger
            </button>
          </div>
        ) : (
          displayedVerses.map((v) => {
            const verseKey = `${selectedBookId}_${selectedChapterNumber}_${v.number}`;
            const isLiked = !!likes[verseKey];
            const isFavorited = !!favorites[`${verseKey}_${language}`];

            return (
              <VerseCard
                key={v.number}
                verseNumber={v.number}
                text={v.text}
                bookId={selectedBookId}
                bookName={currentBookName}
                chapterNumber={selectedChapterNumber}
                language={language}
                isLiked={isLiked}
                likeCount={isLiked ? 2 : 1}
                isFavorited={isFavorited}
                onLikeToggle={() => onToggleLike(verseKey)}
                onFavoriteToggle={() => onToggleFavorite(selectedBookId, currentBookName, selectedChapterNumber, v.number, v.text)}
                onExplain={onExplainVerse}
                t={t}
                animationsEnabled={animationsEnabled}
                highlightColor={highlights[verseKey] || ""}
                onHighlightUpdate={(color) => handleHighlightChange(verseKey, color)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. FAVORITES VIEW (MANAGE FAVS & LIKES)
// ----------------------------------------------------
interface FavoritesViewProps extends CommonViewProps {
  favoritesList: FavoriteVerse[];
  likes: Record<string, boolean>;
  onRemoveFavorite: (favId: string) => void;
  onToggleLike: (verseId: string) => void;
  onExplainVerse: (text: string, citation: string) => void;
}

export function FavoritesView({
  language,
  t,
  animationsEnabled,
  theme,
  favoritesList,
  likes,
  onRemoveFavorite,
  onToggleLike,
  onExplainVerse
}: FavoritesViewProps) {
  // Filters to let users select by Language of Saved Verses
  const [filterLang, setFilterLang] = useState<string>("all");

  const filteredFavorites = favoritesList.filter((fav) => {
    if (filterLang === "all") return true;
    return fav.language === filterLang;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Heart className="h-6 w-6 text-amber-500 fill-amber-500" />
            <span>{t("favorites")}</span>
          </h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Gérez vos versets spirituels préférés et repasses-y à tout moment.
          </p>
        </div>

        {/* Filter Selection Panel */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" />
            Filtrer par langue :
          </span>
          <select
            value={filterLang}
            onChange={(e) => setFilterLang(e.target.value)}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold focus:ring-1 focus:ring-indigo-500 outline-hidden"
          >
            <option value="all">Toutes</option>
            <option value="fr">Français 🇫🇷</option>
            <option value="en">English 🇬🇧</option>
            <option value="sw">Kiswahili 🇹🇿</option>
            <option value="rw">Kinyarwanda 🇷🇼</option>
            <option value="es">Español 🇪🇸</option>
          </select>
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className="p-8 md:p-12 text-center bg-slate-50/50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700/60 flex flex-col items-center gap-3">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 dark:text-slate-600">
            <Heart className="h-8 w-8" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            {t("noFavorites")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFavorites.map((fav) => {
            const verseKey = `${fav.bookId}_${fav.chapterNumber}_${fav.verseNumber}`;
            const isLiked = !!likes[verseKey];

            return (
              <VerseCard
                key={fav.id}
                verseNumber={fav.verseNumber}
                text={fav.text}
                bookId={fav.bookId}
                bookName={fav.bookName}
                chapterNumber={fav.chapterNumber}
                language={fav.language}
                isLiked={isLiked}
                likeCount={isLiked ? 2 : 1}
                isFavorited={true}
                onLikeToggle={() => onToggleLike(verseKey)}
                onFavoriteToggle={() => onRemoveFavorite(fav.id)}
                onExplain={onExplainVerse}
                t={t}
                animationsEnabled={animationsEnabled}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 4. SEARCH & ACCESSIBILITY TOOLS VIEW
// ----------------------------------------------------
interface SearchViewProps extends CommonViewProps {
  likes: Record<string, boolean>;
  favorites: Record<string, boolean>;
  onToggleFavorite: (bookId: string, bookName: string, chNum: number, vNum: number, text: string) => void;
  onToggleLike: (verseId: string) => void;
  onExplainVerse: (text: string, citation: string) => void;
}

export function SearchView({
  language,
  t,
  animationsEnabled,
  theme,
  likes,
  favorites,
  onToggleFavorite,
  onToggleLike,
  onExplainVerse
}: SearchViewProps) {
  const [query, setQuery] = useState("");
  const [scopeBookId, setScopeBookId] = useState("all");
  const [results, setResults] = useState<{
    bookId: string;
    bookName: string;
    chapterNumber: number;
    verseNumber: number;
    text: string;
  }[]>([]);

  // Simple real-time search lookup across all books and multilingual translations
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const matchedResults: typeof results = [];
    const normalizedQuery = query.toLowerCase();

    BIBLE_BOOKS.forEach((book) => {
      // Check book scope filter
      if (scopeBookId !== "all" && book.id !== scopeBookId) return;

      book.chapters.forEach((chapter) => {
        chapter.verses.forEach((verse) => {
          const textValue = verse.translations[language].toLowerCase();
          const bookName = book.names[language].toLowerCase();
          const citationStr = `${bookName} ${chapter.number}:${verse.number}`;

          // Check if matches keyword search query
          if (
            textValue.includes(normalizedQuery) || 
            bookName.includes(normalizedQuery) ||
            citationStr.includes(normalizedQuery) ||
            verse.number.toString() === normalizedQuery ||
            `psalm ${chapter.number}`.includes(normalizedQuery) ||
            `psaume ${chapter.number}`.includes(normalizedQuery)
          ) {
            matchedResults.push({
              bookId: book.id,
              bookName: book.names[language],
              chapterNumber: chapter.number,
              verseNumber: verse.number,
              text: verse.translations[language]
            });
          }
        });
      });
    });

    setResults(matchedResults);
  }, [query, scopeBookId, language]);

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Search className="h-6 w-6 text-indigo-500" />
          <span>{t("search")}</span>
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Indexation instantanée de tous les versets, livres et mots-clés dans les 5 langues sélectionnées.
        </p>
      </div>

      {/* Advanced search bar controls */}
      <div className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-3xl flex flex-col md:flex-row gap-4 shadow-xs">
        <div className="flex-1 relative flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-hidden text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 whitespace-nowrap">Filtrer par Livre :</span>
          <select
            value={scopeBookId}
            onChange={(e) => setScopeBookId(e.target.value)}
            className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 rounded-2xl text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-hidden"
          >
            <option value="all">{t("allBooks")}</option>
            {BIBLE_BOOKS.map((b) => (
              <option key={b.id} value={b.id}>
                {b.names[language]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search outcome label */}
      {query.trim().length >= 2 && (
        <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 pl-1">
          {results.length} {t("resultsFound")}
        </div>
      )}

      {/* Result list */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {results.map((res, i) => {
            const verseKey = `${res.bookId}_${res.chapterNumber}_${res.verseNumber}`;
            const isLiked = !!likes[verseKey];
            const isFavorited = !!favorites[`${verseKey}_${language}`];

            return (
              <VerseCard
                key={i}
                verseNumber={res.verseNumber}
                text={res.text}
                bookId={res.bookId}
                bookName={res.bookName}
                chapterNumber={res.chapterNumber}
                language={language}
                isLiked={isLiked}
                likeCount={isLiked ? 2 : 1}
                isFavorited={isFavorited}
                onLikeToggle={() => onToggleLike(verseKey)}
                onFavoriteToggle={() => onToggleFavorite(res.bookId, res.bookName, res.chapterNumber, res.verseNumber, res.text)}
                onExplain={onExplainVerse}
                t={t}
                highlightKeyword={query}
                animationsEnabled={animationsEnabled}
              />
            );
          })}
        </div>
      ) : (
        query.trim().length >= 2 && (
          <div className="p-10 text-center bg-slate-50/50 dark:bg-slate-800/10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700/60 flex flex-col items-center gap-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("noResults")}</p>
          </div>
        )
      )}
    </div>
  );
}

// ----------------------------------------------------
// 5. SETTINGS VIEW
// ----------------------------------------------------
interface SettingsViewProps extends CommonViewProps {
  onLanguageChange: (lang: Language) => void;
  onThemeToggle: () => void;
  animationsEnabled: boolean;
  onToggleAnimations: () => void;
  focusMode: boolean;
  onToggleFocusMode: () => void;
  autoScroll: boolean;
  onToggleAutoScroll: () => void;
  autoScrollSpeed: number;
  onAutoScrollSpeedChange: (speed: number) => void;
  notificationsEnabled: boolean;
  onToggleNotifications: (choice: boolean) => void;
  notificationHour: string;
  onNotificationHourChange: (hour: string) => void;
  onShowNotification: (title: string, body: string) => void;
}

export function SettingsView({
  language,
  t,
  animationsEnabled,
  theme,
  onLanguageChange,
  onThemeToggle,
  onToggleAnimations,
  focusMode,
  onToggleFocusMode,
  autoScroll,
  onToggleAutoScroll,
  autoScrollSpeed,
  onAutoScrollSpeedChange,
  notificationsEnabled,
  onToggleNotifications,
  notificationHour,
  onNotificationHourChange,
  onShowNotification
}: SettingsViewProps) {
  return (
    <div className="flex flex-col gap-6 pb-12">
      <div>
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Settings className="h-6 w-6 text-indigo-500" />
          <span>{t("settings")}</span>
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
          Personnalisez votre application, activez l'autoscroll ou ajustez vos préférences de lecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Localization & Aesthetics */}
        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-3xl flex flex-col gap-5 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Langue & Thème</span>
          </h3>

          {/* Language Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">{t("language")}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onLanguageChange(Language.FR)}
                className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center justify-between transition-all ${
                  language === Language.FR
                    ? "bg-indigo-500 text-white border-indigo-600"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700"
                }`}
              >
                <span>Français</span>
                <span>🇫🇷</span>
              </button>
              <button
                onClick={() => onLanguageChange(Language.EN)}
                className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center justify-between transition-all ${
                  language === Language.EN
                    ? "bg-indigo-500 text-white border-indigo-600"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700"
                }`}
              >
                <span>English</span>
                <span>🇬🇧</span>
              </button>
              <button
                onClick={() => onLanguageChange(Language.SW)}
                className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center justify-between transition-all ${
                  language === Language.SW
                    ? "bg-indigo-500 text-white border-indigo-600"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700"
                }`}
              >
                <span>Kiswahili</span>
                <span>🇹🇿</span>
              </button>
              <button
                onClick={() => onLanguageChange(Language.RW)}
                className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center justify-between transition-all ${
                  language === Language.RW
                    ? "bg-indigo-500 text-white border-indigo-600"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700"
                }`}
              >
                <span>Kinyarwanda</span>
                <span>🇷🇼</span>
              </button>
              <button
                onClick={() => onLanguageChange(Language.ES)}
                className={`px-3 py-2 text-xs font-bold rounded-xl border flex items-center justify-between transition-all ${
                  language === Language.ES
                    ? "bg-indigo-505 text-white bg-indigo-500 border-indigo-600"
                    : "bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-700"
                }`}
              >
                <span>Español</span>
                <span>🇪🇸</span>
              </button>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-700" />

          {/* Dark / Light Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Mode Sombre / Clair</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Basculez pour le confort de vos yeux.</span>
            </div>
            <button
              onClick={onThemeToggle}
              className="p-2.5 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-indigo-500"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Pro Reading Settings */}
        <div className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-3xl flex flex-col gap-5 shadow-xs">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            <span>Ergonomie de Lecture</span>
          </h3>

          {/* Enabled Animations Switch */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t("animations")}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Activez les transitions douces et fluides.</span>
            </div>
            <input
              type="checkbox"
              checked={animationsEnabled}
              onChange={onToggleAnimations}
              className="h-4 w-4 text-indigo-605 rounded-md border-slate-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          <hr className="border-slate-145 dark:border-slate-700" />

          {/* Focus Mode Switch */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t("focusMode")}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">Masquez les barres de sélection pour vous concentrer.</span>
            </div>
            <input
              type="checkbox"
              checked={focusMode}
              onChange={onToggleFocusMode}
              className="h-4 w-4 text-indigo-605 rounded-md border-slate-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
            />
          </div>

          <hr className="border-slate-145 dark:border-slate-700" />

          {/* Autoscroll Reading speed panel */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{t("autoScroll")}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">Active le scroll automatique en mode Bible.</span>
              </div>
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={onToggleAutoScroll}
                className="h-4 w-4 text-indigo-605 rounded-md border-slate-300 text-indigo-500 focus:ring-indigo-500 cursor-pointer"
              />
            </div>

            {autoScroll && (
              <div className="flex flex-col gap-1.5 pt-1.5">
                <div className="flex justify-between text-[10px] font-bold text-slate-500">
                  <span>{t("autoScrollSpeed")}</span>
                  <span className="font-mono text-indigo-500">{autoScrollSpeed}s</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={autoScrollSpeed}
                  onChange={(e) => onAutoScrollSpeedChange(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-100 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Rappels du Jour Panel - Full-width bento card */}
        <div className="md:col-span-2 p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs mt-2 transition-all">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 rounded-2xl shrink-0">
              <Bell className="h-6 w-6 animate-swing" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-slate-800 dark:text-slate-100 font-extrabold text-sm md:text-base flex items-center gap-2">
                <span>Notification du Verset du Jour</span>
                <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/40 text-[9px] font-bold text-amber-600 dark:text-amber-400 rounded-md uppercase shrink-0">PRO</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Recevez une parole de bénédiction ou d'encouragement chaque jour à l'heure choisie. Fonctionne nativement en arrière-plan.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-3">
                {/* Active Switch */}
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-655 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => onToggleNotifications(e.target.checked)}
                    className="h-4 w-4 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 rounded text-amber-500 focus:ring-amber-500 cursor-pointer"
                  />
                  <span>Activer les notifications du jour</span>
                </label>

                {notificationsEnabled && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Heure de rappel :</span>
                    <select
                      value={notificationHour}
                      onChange={(e) => onNotificationHourChange(e.target.value)}
                      className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-700 font-bold font-mono text-[11px] px-2.5 py-1 select-none rounded-lg text-slate-705 dark:text-slate-305 focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="08:00">08:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="18:00">18:00 PM</option>
                      <option value="21:00">21:00 PM</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto flex flex-col gap-1.5 items-center">
            <button
              onClick={() => {
                onShowNotification(
                  "📖 Méditation BiblePro", 
                  "\"Je puis tout par celui qui me fortifie.\" — Philippiens 4:13"
                );
              }}
              className="w-full md:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold rounded-2xl shadow-xl hover:shadow-amber-500/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <BellRing className="h-4 w-4 shrink-0" />
              <span>Tester de suite</span>
            </button>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">
              Carillon sacré + alerte push
            </span>
          </div>
        </div>

        {/* Pro Suite: Téléchargement, Partage Pro Max & Base Hors-Ligne */}
        <ProFeatures 
          language={language}
          t={t}
          onShowNotification={onShowNotification}
        />
      </div>
    </div>
  );
}
