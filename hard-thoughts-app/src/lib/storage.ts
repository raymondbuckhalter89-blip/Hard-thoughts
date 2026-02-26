export type SavedStory = {
  id: string;
  title: string;
  author?: string;
  sourceName?: string;
  url?: string;
  description?: string;
  savedAt: string;
};

const KEY = 'hard_thoughts_reading_list_v1';

export function loadReadingList(): SavedStory[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveReadingList(list: SavedStory[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addToReadingList(item: Omit<SavedStory, 'savedAt'>) {
  const list = loadReadingList();
  if (list.some(s => s.id === item.id)) return;
  list.unshift({ ...item, savedAt: new Date().toISOString() });
  saveReadingList(list);
}

export function removeFromReadingList(id: string) {
  const list = loadReadingList().filter(s => s.id !== id);
  saveReadingList(list);
}
