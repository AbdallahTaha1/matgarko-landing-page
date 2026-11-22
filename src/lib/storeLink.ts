// A store link suggested from the store's name, so a merchant who thinks of the store in Arabic does not
// have to invent an English address before anything else. Half the people who opened the form left before
// typing one (server logs, 11-22 Nov 2026). The suggestion is only a start: the merchant can change it.

const letters: Record<string, string> = {
  'ا': 'a', 'أ': 'a', 'إ': 'e', 'آ': 'a', 'ٱ': 'a', 'ب': 'b', 'ت': 't', 'ث': 's', 'ج': 'g', 'ح': 'h', 'خ': 'kh',
  'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'd', 'ط': 't', 'ظ': 'z', 'ع': 'a',
  'غ': 'gh', 'ف': 'f', 'ق': 'k', 'ك': 'k', 'ل': 'l', 'م': 'm', 'ن': 'n', 'ه': 'h', 'ة': 'a', 'ى': 'a', 'ء': '',
  'ئ': 'e', 'ؤ': 'o', 'پ': 'p', 'چ': 'ch', 'ڤ': 'v', 'گ': 'g',
};

// Words that say "a shop" and nothing about which one. Dropped from the front when something is left.
const genericWords = new Set(['متجر', 'محل', 'محلات', 'شركة', 'مؤسسة', 'store', 'shop']);

// English words Egyptian shops write in Arabic letters, kept as English.
const borrowed: Record<string, string> = {
  'ستور': 'store', 'استور': 'store', 'شوب': 'shop', 'اونلاين': 'online', 'أونلاين': 'online', 'ماركت': 'market',
  'هوم': 'home', 'فاشون': 'fashion', 'فاشن': 'fashion', 'بيوتي': 'beauty', 'كيدز': 'kids', 'جاليري': 'gallery',
  'ستايل': 'style', 'برو': 'pro', 'تك': 'tech', 'كير': 'care', 'لوك': 'look',
};

function wordToLatin(word: string): string {
  if (borrowed[word]) return borrowed[word];
  // للهدايا: the joined "for the" reads lel.
  if (word.startsWith('لل') && word.length > 3) return 'lel-' + wordToLatin(word.slice(2));
  const chars = [...word];
  let out = '';
  chars.forEach((char, index) => {
    const digit = '٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹'.indexOf(char);
    if (digit >= 0) { out += String(digit % 10); return; }
    if (/[a-z0-9]/.test(char)) { out += char; return; }
    // The article ال reads el, as Egyptians write it: الحمد becomes elhmd.
    if (index === 0 && char === 'ا' && chars[1] === 'ل' && chars.length > 2) { out += 'el'; return; }
    if (index === 1 && char === 'ل' && chars[0] === 'ا' && chars.length > 2) return;
    // Arabic writes few vowels: و and ي between letters are read as vowels, at a word's start as consonants.
    if (char === 'و') { out += index === 0 ? 'w' : 'ou'; return; }
    if (char === 'ي') { out += index === 0 ? 'y' : index === chars.length - 1 ? 'y' : 'i'; return; }
    out += letters[char] ?? '';
  });
  return out;
}

/** A valid store link (3-40 of a-z, 0-9 and inner hyphens) from a store name, or '' when none can be made. */
export function suggestStoreLink(name: string): string {
  const words = name.toLowerCase().normalize('NFKC')
    .replace(/[ً-ٰٟـ]/g, '') // harakat and tatweel
    .split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  while (words.length > 1 && genericWords.has(words[0])) words.shift();
  // Whole words up to 40 characters, so a long name is not cut in the middle of one.
  let link = '';
  for (const part of words.map(wordToLatin).filter(Boolean)) {
    const next = link ? `${link}-${part}` : part;
    if (next.length > 40) { if (!link) link = part.slice(0, 40); break; }
    link = next;
  }
  link = link.replace(/-+/g, '-').replace(/^-+|-+$/g, '');
  return /^[a-z0-9]([a-z0-9]|-){1,38}[a-z0-9]$/.test(link) ? link : '';
}
