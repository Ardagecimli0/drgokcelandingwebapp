// URL slug'dan locale'e ve locale'den URL slug'a çeviri yardımcıları

export const localeToSlug: Record<string, string> = {
    'en': 'gastric-sleeve-in-turkey',
    'tr': 'tup-mide-ameliyati-turkiye',
    'de': 'schlauchmagen-op-in-der-tuerkei',
    'es': 'manga-gastrica-en-turquia',
    'fr': 'sleeve-gastrectomie-en-turquie',
    'it': 'manica-gastrica-in-turchia',
    'pl': 'operacja-zmniejszenia-zoladka-w-turcji',
};

export const slugToLocale: Record<string, string> = {
    'gastric-sleeve-in-turkey': 'en',
    'tup-mide-ameliyati-turkiye': 'tr',
    'schlauchmagen-op-in-der-tuerkei': 'de',
    'manga-gastrica-en-turquia': 'es',
    'sleeve-gastrectomie-en-turquie': 'fr',
    'manica-gastrica-in-turchia': 'it',
    'operacja-zmniejszenia-zoladka-w-turcji': 'pl',
};

export function getSlugFromPath(pathname: string): string {
    // "/dental-implant-in-turkey" veya "/zahnimplantat-in-der-turkei/thank-you" gibi path'lerden slug çıkar
    const parts = pathname.split('/').filter(Boolean);
    return parts[0] || '';
}

export function getLocaleFromPath(pathname: string): string {
    const slug = getSlugFromPath(pathname);
    return slugToLocale[slug] || 'en';
}

export function getSlugFromLocale(locale: string): string {
    return localeToSlug[locale] || 'gastric-sleeve-in-turkey';
}
