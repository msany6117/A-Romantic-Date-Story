export interface MemoryItem {
  id: string;
  image: string;
  title: string;
  date: string;
  description: string;
  rotation?: number; // degree for polaroid tilt
}

export interface LocationOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  isCustom?: boolean;
}

export interface SiteConfig {
  myName: string;
  herName: string;
  heroTagline: string;
  introMessage: {
    line1: string;
    line2: string;
    buttonText: string;
  };
  personalIntro: {
    greeting: string;
    message: string;
    subMessage: string;
    buttonText: string;
  };
  proposalQuestion: string;
  noButtonMessages: string[];
  maxNoClicksBeforeSurrender: number;
  reactionScene: {
    badge: string;
    title: string;
    subtitle: string;
    cardParagraphs: string[];
    buttonText: string;
  };
  memorySection: {
    title: string;
    subtitle: string;
    items: MemoryItem[];
  };
  planning: {
    title: string;
    subtitle: string;
    timePrompt: string;
    availableTimes: string[];
  };
  locations: {
    prompt: string;
    subtitle: string;
    options: LocationOption[];
  };
  loveLetter: {
    title: string;
    greeting: string;
    paragraphs: string[];
    closing: string;
  };
  finalSurprise: {
    intro1: string;
    intro2: string;
    question: string;
    yesButtonText: string;
    altButtonText: string;
    finalTitle: string;
    finalMessage: string;
    finalSubtext: string;
  };
  agreement: {
    title: string;
    subtitle: string;
    terms: string[];
    confirmText: string;
  };
  audioPath: string;
}

export interface DatePlan {
  date: string; // ISO date or "YYYY-MM-DD"
  formattedDate: string;
  time: string;
  locationId: string;
  customLocation?: string;
}
