/*
 * Hard Thoughts — Data Constants
 * Design: Velvet Dusk Luxe Dark Lounge
 * All story sources, genres, themes, and search configuration
 * v2.0 — 30+ sources with categories
 */

export interface StorySource {
  id: string;
  name: string;
  url: string;
  searchUrl: string;
  description: string;
  hasRatings: boolean;
  icon: string;
  category: SourceCategory;
}

export type SourceCategory = "major" | "niche" | "interactive" | "audio" | "reddit" | "furry" | "transformation";

export const SOURCE_CATEGORY_LABELS: Record<SourceCategory, { name: string; icon: string; description: string }> = {
  major: { name: "Major Archives", icon: "📚", description: "The largest and most popular story archives" },
  niche: { name: "Niche & Specialized", icon: "🔮", description: "Focused on specific genres or communities" },
  interactive: { name: "Interactive Fiction", icon: "🎮", description: "Choose-your-own-adventure and branching stories" },
  audio: { name: "Audio Erotica", icon: "🎧", description: "Stories you can listen to" },
  reddit: { name: "Reddit Communities", icon: "💬", description: "Active story-sharing subreddits" },
  furry: { name: "Furry & Fantasy", icon: "🦊", description: "Anthropomorphic and fantasy creature fiction" },
  transformation: { name: "Transformation", icon: "🦋", description: "Body transformation, TG, and related fiction" },
};

export interface Genre {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: string;
}

export interface StoryResult {
  id: string;
  title: string;
  author: string;
  source: StorySource;
  url: string;
  description: string;
  genres: string[];
  tags: string[];
  rating: number;
  qualityScore: number;
  wordCount?: string;
  chapters?: number;
  datePublished?: string;
  isComplete?: boolean;
}

export const STORY_SOURCES: StorySource[] = [
  // ─── Major Archives ───
  {
    id: "literotica", name: "Literotica", url: "https://www.literotica.com",
    searchUrl: "https://search.literotica.com/searches/?query=",
    description: "One of the largest free erotic story archives with 800k+ stories across 30+ categories",
    hasRatings: true, icon: "📖", category: "major",
  },
  {
    id: "ao3", name: "Archive of Our Own", url: "https://archiveofourown.org",
    searchUrl: "https://archiveofourown.org/works/search?work_search[query]=",
    description: "Massive fanfiction & original works archive with extensive tagging and filtering",
    hasRatings: true, icon: "📚", category: "major",
  },
  {
    id: "storiesonline", name: "StoriesOnline", url: "https://storiesonline.net",
    searchUrl: "https://storiesonline.net/s/search?query=",
    description: "Large collection of adult fiction with detailed scoring and categorization",
    hasRatings: true, icon: "📝", category: "major",
  },
  {
    id: "lushstories", name: "Lush Stories", url: "https://www.lushstories.com",
    searchUrl: "https://www.lushstories.com/search/stories?q=",
    description: "Editor-reviewed quality erotic fiction with active community",
    hasRatings: true, icon: "🌹", category: "major",
  },
  {
    id: "sexstories", name: "SexStories.com", url: "https://sexstories.com",
    searchUrl: "https://sexstories.com/search.php?query=",
    description: "Free adult stories with categories and user ratings",
    hasRatings: true, icon: "🔥", category: "major",
  },
  {
    id: "bellesa", name: "Bellesa", url: "https://www.bellesa.co/stories",
    searchUrl: "https://www.bellesa.co/stories/search?q=",
    description: "Women-focused erotic stories with curated quality content",
    hasRatings: true, icon: "💎", category: "major",
  },
  {
    id: "juicysexstories", name: "Juicy Sex Stories", url: "https://www.juicysexstories.com",
    searchUrl: "https://www.juicysexstories.com/?s=",
    description: "Free erotic stories with categories and community ratings",
    hasRatings: true, icon: "🍑", category: "major",
  },
  {
    id: "booksie", name: "Booksie", url: "https://www.booksie.com",
    searchUrl: "https://www.booksie.com/search?q=",
    description: "Free writing platform with a dedicated adult fiction section",
    hasRatings: true, icon: "📕", category: "major",
  },
  {
    id: "smashwords", name: "Smashwords", url: "https://www.smashwords.com",
    searchUrl: "https://www.smashwords.com/books/search?query=",
    description: "Self-published erotica marketplace with free and paid titles",
    hasRatings: true, icon: "💰", category: "major",
  },
  {
    id: "xnxxstories", name: "XNXX Stories", url: "https://www.xnxx.com/stories",
    searchUrl: "https://www.xnxx.com/search/stories/",
    description: "Stories section of XNXX with user-submitted fiction",
    hasRatings: true, icon: "🔞", category: "major",
  },

  // ─── Niche & Specialized ───
  {
    id: "nifty", name: "Nifty Archive", url: "https://www.nifty.org",
    searchUrl: "https://search.nifty.org/?q=",
    description: "LGBTQ+ focused story archive with decades of content",
    hasRatings: false, icon: "🌈", category: "niche",
  },
  {
    id: "hentaifoundry", name: "Hentai Foundry", url: "https://www.hentai-foundry.com",
    searchUrl: "https://www.hentai-foundry.com/stories?search=",
    description: "Stories section alongside artwork, anime/manga inspired themes",
    hasRatings: true, icon: "🎨", category: "niche",
  },
  {
    id: "mcstories", name: "MC Stories", url: "https://mcstories.com",
    searchUrl: "https://mcstories.com/FindResults.html?search=",
    description: "Specialized archive for mind control themed fiction",
    hasRatings: false, icon: "🧠", category: "niche",
  },
  {
    id: "asstr", name: "ASSTR / Kristen Archives", url: "https://www.asstr.org",
    searchUrl: "https://www.google.com/search?q=site:asstr.org+",
    description: "Alt.Sex.Stories Text Repository — historical archive with Kristen Archives",
    hasRatings: false, icon: "📜", category: "niche",
  },
  {
    id: "bdsmlibrary", name: "BDSM Library", url: "https://www.bdsmlibrary.com",
    searchUrl: "https://www.bdsmlibrary.com/search.php?q=",
    description: "Dedicated BDSM fiction archive with extensive categorization",
    hasRatings: true, icon: "⛓️", category: "niche",
  },
  {
    id: "adultfanfiction", name: "Adult FanFiction", url: "https://www.adult-fanfiction.org",
    searchUrl: "https://www.google.com/search?q=site:adult-fanfiction.org+",
    description: "Adult-only fanfiction archive covering all fandoms",
    hasRatings: true, icon: "⭐", category: "niche",
  },
  {
    id: "overflowingbra", name: "Overflowing Bra", url: "https://www.overflowingbra.com",
    searchUrl: "https://www.google.com/search?q=site:overflowingbra.com+",
    description: "Breast expansion and body transformation fiction archive",
    hasRatings: false, icon: "🎀", category: "niche",
  },
  {
    id: "indiansexstories", name: "Indian Sex Stories", url: "https://www.indiansexstories2.net",
    searchUrl: "https://www.indiansexstories2.net/?s=",
    description: "Regional niche — Indian-themed erotic fiction",
    hasRatings: true, icon: "🪷", category: "niche",
  },
  {
    id: "wattpad", name: "Wattpad (Mature)", url: "https://www.wattpad.com",
    searchUrl: "https://www.wattpad.com/search/",
    description: "Massive writing platform with mature/erotic content section",
    hasRatings: true, icon: "📱", category: "niche",
  },
  {
    id: "deviantart", name: "DeviantArt Literature", url: "https://www.deviantart.com",
    searchUrl: "https://www.deviantart.com/search?q=",
    description: "Art community with a mature literature section",
    hasRatings: true, icon: "🎭", category: "niche",
  },

  // ─── Interactive Fiction ───
  {
    id: "chyoa", name: "CHYOA", url: "https://chyoa.com",
    searchUrl: "https://chyoa.com/search?q=",
    description: "Choose Your Own Adventure style interactive adult stories",
    hasRatings: true, icon: "🎲", category: "interactive",
  },
  {
    id: "writingcom", name: "Writing.com", url: "https://www.writing.com",
    searchUrl: "https://www.writing.com/main/list_items/item_type/interactive-stories/search_for/",
    description: "Interactive stories platform with massive adult section and branching paths",
    hasRatings: true, icon: "✍️", category: "interactive",
  },
  {
    id: "tfgs", name: "TF Games Site", url: "https://tfgames.site",
    searchUrl: "https://tfgames.site/?module=search&search=",
    description: "Transformation-themed interactive fiction and games",
    hasRatings: true, icon: "🎮", category: "interactive",
  },

  // ─── Audio Erotica ───
  {
    id: "quinn", name: "Quinn", url: "https://www.tryquinn.com",
    searchUrl: "https://www.tryquinn.com/search?q=",
    description: "Premium audio erotica platform — the 'Spotify for audio porn'",
    hasRatings: true, icon: "🎵", category: "audio",
  },
  {
    id: "gonewildaudio", name: "GoneWildAudio", url: "https://www.reddit.com/r/gonewildaudio",
    searchUrl: "https://www.reddit.com/r/gonewildaudio/search/?q=",
    description: "Reddit's largest user-created audio erotica community",
    hasRatings: true, icon: "🎙️", category: "audio",
  },

  // ─── Reddit Communities ───
  {
    id: "r_eroticliterature", name: "r/eroticliterature", url: "https://www.reddit.com/r/eroticliterature",
    searchUrl: "https://www.reddit.com/r/eroticliterature/search/?q=",
    description: "220k+ members — quality erotic literature community",
    hasRatings: true, icon: "💬", category: "reddit",
  },
  {
    id: "r_sexstories", name: "r/sexstories", url: "https://www.reddit.com/r/sexstories",
    searchUrl: "https://www.reddit.com/r/sexstories/search/?q=",
    description: "360k+ members — one of Reddit's largest story communities",
    hasRatings: true, icon: "💬", category: "reddit",
  },
  {
    id: "r_erotica", name: "r/erotica", url: "https://www.reddit.com/r/erotica",
    searchUrl: "https://www.reddit.com/r/erotica/search/?q=",
    description: "160k+ members — broad erotic fiction community",
    hasRatings: true, icon: "💬", category: "reddit",
  },
  {
    id: "r_gonewildstories", name: "r/gonewildstories", url: "https://www.reddit.com/r/gonewildstories",
    searchUrl: "https://www.reddit.com/r/gonewildstories/search/?q=",
    description: "First-person erotic experiences and stories",
    hasRatings: true, icon: "💬", category: "reddit",
  },
  {
    id: "r_bdsmerotica", name: "r/bdsmerotica", url: "https://www.reddit.com/r/bdsmerotica",
    searchUrl: "https://www.reddit.com/r/bdsmerotica/search/?q=",
    description: "80k+ members — BDSM-focused fiction community",
    hasRatings: true, icon: "💬", category: "reddit",
  },
  {
    id: "r_sluttyconfessions", name: "r/SluttyConfessions", url: "https://www.reddit.com/r/SluttyConfessions",
    searchUrl: "https://www.reddit.com/r/SluttyConfessions/search/?q=",
    description: "892k+ members — confessional-style erotic stories",
    hasRatings: true, icon: "💬", category: "reddit",
  },

  // ─── Furry & Fantasy ───
  {
    id: "sofurry", name: "SoFurry", url: "https://www.sofurry.com",
    searchUrl: "https://www.sofurry.com/browse/all?search=",
    description: "Furry creative community with extensive story archives",
    hasRatings: true, icon: "🦊", category: "furry",
  },
  {
    id: "furaffinity", name: "FurAffinity", url: "https://www.furaffinity.net",
    searchUrl: "https://www.furaffinity.net/search/?q=",
    description: "Largest furry art/stories community with mature content",
    hasRatings: true, icon: "🐾", category: "furry",
  },
  {
    id: "aryion", name: "Eka's Portal (Aryion)", url: "https://aryion.com",
    searchUrl: "https://aryion.com/g4/search.php?q=",
    description: "Vore and transformation niche fiction and art community",
    hasRatings: true, icon: "🌀", category: "furry",
  },

  // ─── Transformation ───
  {
    id: "fictionmania", name: "Fiction Mania", url: "https://fictionmania.tv",
    searchUrl: "https://fictionmania.tv/SearchResults.html?q=",
    description: "Transgender fiction archive with extensive categorization",
    hasRatings: true, icon: "🦋", category: "transformation",
  },
  {
    id: "changingmirror", name: "The Changing Mirror", url: "https://thechangingmirror.com",
    searchUrl: "https://www.google.com/search?q=site:thechangingmirror.com+",
    description: "Age regression, age progression, and identity transformation fiction",
    hasRatings: false, icon: "🪞", category: "transformation",
  },
];

export const GENRE_CATEGORIES = [
  "Sexual Orientation",
  "Relationship Dynamic",
  "Setting & Genre",
  "Kink & Fetish",
  "Tone & Style",
  "Story Type",
] as const;

export const GENRES: Genre[] = [
  // Sexual Orientation
  { id: "straight", name: "Straight / Heterosexual", icon: "♂♀", description: "Male-female encounters", category: "Sexual Orientation" },
  { id: "gay", name: "Gay Male", icon: "♂♂", description: "Male-male encounters", category: "Sexual Orientation" },
  { id: "lesbian", name: "Lesbian", icon: "♀♀", description: "Female-female encounters", category: "Sexual Orientation" },
  { id: "bisexual", name: "Bisexual", icon: "⚤", description: "Bisexual themes and encounters", category: "Sexual Orientation" },
  { id: "transgender", name: "Transgender", icon: "⚧", description: "Trans characters and themes", category: "Sexual Orientation" },
  { id: "nonbinary", name: "Non-Binary / Genderfluid", icon: "⚥", description: "Non-binary and genderfluid characters", category: "Sexual Orientation" },
  { id: "furry", name: "Furry / Anthro", icon: "🦊", description: "Anthropomorphic characters", category: "Sexual Orientation" },

  // Relationship Dynamic
  { id: "romance", name: "Romance", icon: "💕", description: "Love, emotion, and connection", category: "Relationship Dynamic" },
  { id: "bdsm", name: "BDSM / D/s", icon: "⛓", description: "Bondage, dominance, submission", category: "Relationship Dynamic" },
  { id: "group", name: "Group / Orgy", icon: "👥", description: "Three or more participants", category: "Relationship Dynamic" },
  { id: "swinging", name: "Swinging / Hotwife", icon: "🔄", description: "Partner sharing and swinging", category: "Relationship Dynamic" },
  { id: "cheating", name: "Cheating / Affairs", icon: "🤫", description: "Infidelity and secret encounters", category: "Relationship Dynamic" },
  { id: "firsttime", name: "First Time", icon: "✨", description: "First sexual experiences", category: "Relationship Dynamic" },
  { id: "mature", name: "Mature / Age Gap", icon: "🍷", description: "May-December relationships", category: "Relationship Dynamic" },
  { id: "interracial", name: "Interracial", icon: "🌍", description: "Interracial relationships", category: "Relationship Dynamic" },
  { id: "taboo", name: "Taboo", icon: "🚫", description: "Forbidden relationships", category: "Relationship Dynamic" },
  { id: "reluctance", name: "Reluctance / NonConsent", icon: "⚠️", description: "Reluctance and power fantasy themes", category: "Relationship Dynamic" },
  { id: "harem", name: "Harem / Reverse Harem", icon: "👑", description: "One person with multiple partners", category: "Relationship Dynamic" },

  // Setting & Genre
  { id: "scifi", name: "Sci-Fi", icon: "🚀", description: "Futuristic and space settings", category: "Setting & Genre" },
  { id: "fantasy", name: "Fantasy", icon: "🐉", description: "Magic, mythical creatures, other worlds", category: "Setting & Genre" },
  { id: "horror", name: "Erotic Horror", icon: "🦇", description: "Dark, scary, supernatural erotica", category: "Setting & Genre" },
  { id: "historical", name: "Historical", icon: "🏛", description: "Period settings and historical fiction", category: "Setting & Genre" },
  { id: "contemporary", name: "Contemporary / Realistic", icon: "🏙", description: "Modern day realistic settings", category: "Setting & Genre" },
  { id: "paranormal", name: "Paranormal / Supernatural", icon: "👻", description: "Vampires, werewolves, ghosts", category: "Setting & Genre" },
  { id: "fanfiction", name: "Fan Fiction", icon: "⭐", description: "Based on existing media properties", category: "Setting & Genre" },
  { id: "celebrity", name: "Celebrity", icon: "🎬", description: "Stories featuring celebrities", category: "Setting & Genre" },
  { id: "nonhuman", name: "NonHuman / Monster", icon: "👾", description: "Aliens, monsters, androids", category: "Setting & Genre" },
  { id: "postapoc", name: "Post-Apocalyptic", icon: "☢️", description: "Survival and post-apocalyptic settings", category: "Setting & Genre" },
  { id: "college", name: "College / Campus", icon: "🎓", description: "University and campus life settings", category: "Setting & Genre" },
  { id: "office", name: "Office / Workplace", icon: "💼", description: "Professional and workplace settings", category: "Setting & Genre" },

  // Kink & Fetish
  { id: "anal", name: "Anal", icon: "🍑", description: "Anal play and encounters", category: "Kink & Fetish" },
  { id: "oral", name: "Oral", icon: "👄", description: "Oral sex focused", category: "Kink & Fetish" },
  { id: "fetish", name: "Fetish", icon: "👠", description: "Various fetishes and kinks", category: "Kink & Fetish" },
  { id: "exhibitionism", name: "Exhibitionism / Voyeur", icon: "👁", description: "Watching and being watched", category: "Kink & Fetish" },
  { id: "mindcontrol", name: "Mind Control", icon: "🧠", description: "Hypnosis and mental domination", category: "Kink & Fetish" },
  { id: "toys", name: "Toys / Masturbation", icon: "🎀", description: "Sex toys and solo play", category: "Kink & Fetish" },
  { id: "crossdressing", name: "Crossdressing", icon: "👗", description: "Gender expression through clothing", category: "Kink & Fetish" },
  { id: "breeding", name: "Breeding / Impregnation", icon: "🥚", description: "Pregnancy and breeding kink", category: "Kink & Fetish" },
  { id: "bodymod", name: "Body Modification", icon: "💉", description: "Body transformation and modification", category: "Kink & Fetish" },
  { id: "chastity", name: "Chastity", icon: "🔒", description: "Chastity and denial play", category: "Kink & Fetish" },
  { id: "sissy", name: "Sissy / Feminization", icon: "🎀", description: "Feminization and sissy themes", category: "Kink & Fetish" },

  // Tone & Style
  { id: "humor", name: "Humor / Satire", icon: "😏", description: "Funny and satirical erotica", category: "Tone & Style" },
  { id: "dark", name: "Dark / Edgy", icon: "🖤", description: "Dark themes and intense content", category: "Tone & Style" },
  { id: "sweet", name: "Sweet / Tender", icon: "🌸", description: "Gentle, loving, emotional", category: "Tone & Style" },
  { id: "hardcore", name: "Hardcore / Explicit", icon: "🔥", description: "Very explicit and intense", category: "Tone & Style" },
  { id: "literary", name: "Literary / Artistic", icon: "🖋", description: "High quality prose and storytelling", category: "Tone & Style" },
  { id: "slowburn", name: "Slow Burn", icon: "🕯️", description: "Gradual buildup of tension and desire", category: "Tone & Style" },

  // Story Type
  { id: "novel", name: "Novel / Long Form", icon: "📕", description: "Full-length novels and novellas", category: "Story Type" },
  { id: "shortstory", name: "Short Story", icon: "📄", description: "Quick reads and one-shots", category: "Story Type" },
  { id: "series", name: "Series / Multi-Part", icon: "📚", description: "Multi-chapter ongoing stories", category: "Story Type" },
  { id: "interactive", name: "Interactive / CYOA", icon: "🎮", description: "Choose your own adventure", category: "Story Type" },
  { id: "audio", name: "Audio Erotica", icon: "🎧", description: "Stories with audio narration", category: "Story Type" },
  { id: "illustrated", name: "Illustrated", icon: "🎨", description: "Stories with accompanying artwork", category: "Story Type" },
  { id: "poetry", name: "Erotic Poetry", icon: "🪶", description: "Poetic and verse-form erotica", category: "Story Type" },
];

export const SORT_OPTIONS = [
  { id: "relevance", name: "Most Relevant" },
  { id: "quality", name: "Highest Quality" },
  { id: "rating", name: "Best Rated" },
  { id: "newest", name: "Newest First" },
  { id: "longest", name: "Longest First" },
  { id: "shortest", name: "Shortest First" },
] as const;

export const RATING_LABELS = [
  { min: 4.5, label: "Exceptional", color: "text-rose-gold" },
  { min: 4.0, label: "Excellent", color: "text-rose-gold-dim" },
  { min: 3.5, label: "Very Good", color: "text-blush" },
  { min: 3.0, label: "Good", color: "text-muted-foreground" },
  { min: 0, label: "Average", color: "text-muted-foreground" },
] as const;

// Build search URLs for each source
export function buildSearchUrl(source: StorySource, query: string, genres: string[]): string {
  const encodedQuery = encodeURIComponent(query);

  switch (source.id) {
    case "literotica": {
      const genreMap: Record<string, string> = {
        romance: "romance", bdsm: "bdsm", gay: "gay-male", lesbian: "lesbian-sex",
        firsttime: "first-time", group: "group-sex", scifi: "sci-fi-fantasy",
        fantasy: "sci-fi-fantasy", horror: "erotic-horror", exhibitionism: "exhibitionist-voyeur",
        fetish: "fetish", anal: "anal", mature: "mature", mindcontrol: "mind-control",
        nonhuman: "nonhuman", taboo: "taboo-incest", cheating: "loving-wives",
        crossdressing: "crossdressing", transgender: "transgender", interracial: "interracial-love",
        toys: "toys-masturbation", humor: "humor-satire", novel: "novels-novellas",
        celebrity: "fan-fiction-celebrities", reluctance: "nonconsent-reluctance",
      };
      const litGenre = genres.find(g => genreMap[g]);
      if (litGenre && genreMap[litGenre]) {
        return `https://search.literotica.com/searches/?query=${encodedQuery}&category=${genreMap[litGenre]}`;
      }
      return `https://search.literotica.com/searches/?query=${encodedQuery}`;
    }
    case "ao3": {
      let url = `https://archiveofourown.org/works/search?work_search[query]=${encodedQuery}`;
      if (genres.includes("gay")) url += "&work_search[relationship_type_ids][]=116";
      if (genres.includes("lesbian")) url += "&work_search[relationship_type_ids][]=116";
      if (genres.includes("straight")) url += "&work_search[relationship_type_ids][]=117";
      url += "&work_search[rating_ids][]=13";
      return url;
    }
    default:
      return `${source.searchUrl}${encodedQuery}`;
  }
}

// Generate Google search URL for cross-site search
export function buildGoogleSearchUrl(query: string, sources: StorySource[], genres: string[]): string {
  const siteQueries = sources.map(s => {
    try { return `site:${new URL(s.url).hostname}`; } catch { return ""; }
  }).filter(Boolean).join(" OR ");
  const genreTerms = genres.map(g => {
    const genre = GENRES.find(gg => gg.id === g);
    return genre ? genre.name : g;
  }).join(" ");

  const fullQuery = `${query} ${genreTerms} (${siteQueries})`;
  return `https://www.google.com/search?q=${encodeURIComponent(fullQuery)}`;
}
