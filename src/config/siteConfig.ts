import { SiteConfig } from '../types';

export const defaultSiteConfig: SiteConfig = {
  myName: 'Alex',
  herName: 'Emma',
  heroTagline: 'A little journey made just for you',
  
  introMessage: {
    line1: 'Hey... I made something for you.',
    line2: "Please don't judge me before you see it. ❤️",
    buttonText: 'Open My Little Surprise →',
  },

  personalIntro: {
    greeting: 'Hi, {herName}',
    message: 'I wanted to make you something special instead of just sending another text message.',
    subMessage: 'So... I have one tiny question.',
    buttonText: 'Okay, ask me ✨',
  },

  proposalQuestion: 'Will you go on a date with me?',

  noButtonMessages: [
    'No? 😭',
    'Wait, are you sure?',
    'Really, really sure?',
    'Think about it again...',
    'What if there will be dessert? 🍰',
    "Okay... I'll give you one more chance. 🥺",
    "Don't break my tiny heart! 💔",
    "Okay okay... I'll stop bullying you. 😭",
  ],

  maxNoClicksBeforeSurrender: 6,

  reactionScene: {
    badge: 'A Moment of Pure Joy',
    title: 'Wait, seriously?! You actually said YES?! 🥹',
    subtitle: 'I honestly cannot believe it... I genuinely thought you were going to say no!',
    cardParagraphs: [
      'My heart was pounding so fast while waiting for your answer. To be completely honest, I had prepared myself for you to say no! 🙈',
      'Knowing that you said YES just made my entire world brighter. I promise to make our time together unforgettable.',
    ],
    buttonText: 'Let’s plan our date →',
  },

  memorySection: {
    title: 'Before we plan our date...',
    subtitle: 'A few little moments that make me smile whenever I think of you.',
    items: [
      {
        id: '1',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
        title: 'The First Spark',
        date: 'That Unforgettable Evening',
        description: 'That day I realized how lucky I was to have your laughter in my world.',
        rotation: -2,
      },
      {
        id: '2',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800&auto=format&fit=crop',
        title: 'Sunset Coffee & Long Talks',
        date: 'A Quiet Sunday',
        description: 'When hours felt like minutes because talking to you was the only thing that mattered.',
        rotation: 3,
      },
      {
        id: '3',
        image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=800&auto=format&fit=crop',
        title: 'Your Contagious Smile',
        date: 'Always in My Mind',
        description: 'No matter what kind of day it has been, seeing you smile instantly fixes everything.',
        rotation: -1.5,
      },
      {
        id: '4',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
        title: 'Looking Ahead',
        date: 'Every Tomorrow',
        description: 'And this is just the beginning of all the memories we are still going to make.',
        rotation: 2.5,
      },
    ],
  },

  planning: {
    title: 'Okay... serious business now.',
    subtitle: 'When are you free for our adventure?',
    timePrompt: 'What time should I steal you?',
    availableTimes: ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'],
  },

  locations: {
    prompt: 'Where should we go?',
    subtitle: "Pick the mood for our special rendezvous",
    options: [
      {
        id: 'surprise',
        label: 'Surprise me ❤️',
        icon: 'Sparkles',
        description: 'Leave everything to me — you just show up and look gorgeous.',
      },
      {
        id: 'favorite',
        label: 'Your favorite place',
        icon: 'Heart',
        description: 'That cozy spot where you always feel happiest.',
      },
      {
        id: 'cozy_dinner',
        label: 'Candlelit dinner & dessert',
        icon: 'UtensilsCrossed',
        description: 'Delicious food, quiet ambiance, and unlimited dessert.',
      },
      {
        id: 'custom',
        label: 'Custom location',
        icon: 'MapPin',
        description: 'Have a specific secret place in mind? Tell me!',
        isCustom: true,
      },
    ],
  },

  loveLetter: {
    title: 'One More Thing...',
    greeting: 'Dear {herName},',
    paragraphs: [
      "I don't know if a website could ever properly explain how much you mean to me, but I really wanted to try.",
      "You bring so much gentleness, warmth, and pure joy into my days. Even the simplest moments turn into something magical when I'm sharing them with you.",
      "Thank you for being part of my life, for your kindness, and thank you for saying yes to this date.",
      "I can't wait to see your smile in person.",
    ],
    closing: '— {myName} ❤️',
  },

  finalSurprise: {
    intro1: 'Wait...',
    intro2: "I wasn't actually finished.",
    question: 'Will you stay with me for all the adventures still waiting for us?',
    yesButtonText: 'YES ❤️',
    altButtonText: 'Obviously 😌',
    finalTitle: "Then it's settled. ❤️",
    finalMessage: 'One date down. A lifetime of adventures to go.',
    finalSubtext: "Counting every single second until I see you. I love you! ✨",
  },

  agreement: {
    title: 'Official Relationship Agreement™',
    subtitle: 'Strictly binding, legally adorable, and non-negotiable',
    terms: [
      'Unlimited hugs anytime, anywhere, for any reason (or no reason at all)',
      'Random spontaneous food and boba dates whenever cravings strike',
      'Sharing fries is 100% mandatory (even after saying "I\'m not hungry")',
      'Annoying each other with affectionate silliness forever',
      'Taking too many candid photos together and laughing at the blurry ones',
      'Supporting each other\'s biggest dreams through every high and low',
      'No cancellation allowed without paying a penalty of at least 3 warm hugs',
    ],
    confirmText: 'I Agree & Sign with a Kiss 💋',
  },

  audioPath: '/audio/music.mp3',
};
