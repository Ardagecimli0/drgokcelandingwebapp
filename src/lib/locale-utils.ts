// URL slug'dan dil kodunu çıkar
// Örnekler: 
// "zahnimplantat-in-der-turkei" -> "de"
// "dental-implant-in-turkey" -> "en"
// "implante-dental-en-turquia" -> "es"
export function extractLocaleFromSlug(slug: string): string {
    if (!slug || slug === '') return 'en';

    const validLocales = ['en', 'tr', 'de', 'es', 'fr', 'it', 'pl'];

    // Eğer direkt dil kodu ise (en, tr, de, es, fr, it)
    if (validLocales.includes(slug)) {
        return slug;
    }

    // URL slug'dan dil kodunu eşleştir
    const slugToLocale: Record<string, string> = {
        'gastric-sleeve-in-turkey': 'en',
        'tup-mide-ameliyati-turkiye': 'tr',
        'schlauchmagen-op-in-der-tuerkei': 'de',
        'manga-gastrica-en-turquia': 'es',
        'sleeve-gastrectomie-en-turquie': 'fr',
        'manica-gastrica-in-turchia': 'it',
        'operacja-zmniejszenia-zoladka-w-turcji': 'pl',
    };

    if (slugToLocale[slug]) {
        return slugToLocale[slug];
    }

    return 'en';
}
