/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum Language {
  FR = "fr",
  EN = "en",
  SW = "sw",
  RW = "rw",
  ES = "es"
}

export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  number: number;
  verses: Verse[];
}

export interface Book {
  id: string; // e.g. "genesis"
  names: Record<Language, string>;
  chapters: Chapter[];
}

export interface BibleState {
  currentBookId: string;
  currentChapterNumber: number;
  currentVerseNumber: number | null;
  language: Language;
  theme: "light" | "dark";
  animationsEnabled: boolean;
  readingMode: "normal" | "focus" | "autoscroll";
  autoScrollSpeed: number; // in seconds per verse
}

export interface FavoriteVerse {
  id: string; // e.g. "genesis_1_1_fr"
  bookId: string;
  bookName: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
  language: Language;
  createdAt: string;
}

export interface VerseLike {
  id: string; // e.g. "genesis_1_1" (language-independent or dependent)
  likes: number;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

