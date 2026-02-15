"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import { fetchCountryByIP, countryToDialCode } from "@/lib/getIp";
import { validatePhone } from "@/lib/validation";

// Country names for dropdown display
const countryNames: Record<string, string> = {
  'AF': 'Afghanistan', 'AL': 'Albania', 'DZ': 'Algeria', 'AD': 'Andorra', 'AO': 'Angola',
  'AR': 'Argentina', 'AM': 'Armenia', 'AU': 'Australia', 'AT': 'Austria', 'AZ': 'Azerbaijan',
  'BH': 'Bahrain', 'BD': 'Bangladesh', 'BY': 'Belarus', 'BE': 'Belgium', 'BZ': 'Belize',
  'BJ': 'Benin', 'BT': 'Bhutan', 'BO': 'Bolivia', 'BA': 'Bosnia', 'BW': 'Botswana',
  'BR': 'Brazil', 'BN': 'Brunei', 'BG': 'Bulgaria', 'BF': 'Burkina Faso', 'BI': 'Burundi',
  'KH': 'Cambodia', 'CM': 'Cameroon', 'CA': 'Canada', 'CV': 'Cape Verde', 'CF': 'Central African Republic',
  'TD': 'Chad', 'CL': 'Chile', 'CN': 'China', 'CO': 'Colombia', 'KM': 'Comoros',
  'CR': 'Costa Rica', 'HR': 'Croatia', 'CU': 'Cuba', 'CY': 'Cyprus', 'CZ': 'Czech Republic',
  'CD': 'DR Congo', 'DK': 'Denmark', 'DJ': 'Djibouti', 'DO': 'Dominican Republic', 'EC': 'Ecuador',
  'EG': 'Egypt', 'SV': 'El Salvador', 'GQ': 'Equatorial Guinea', 'ER': 'Eritrea', 'EE': 'Estonia',
  'ET': 'Ethiopia', 'FJ': 'Fiji', 'FI': 'Finland', 'FR': 'France', 'GA': 'Gabon',
  'GM': 'Gambia', 'GE': 'Georgia', 'DE': 'Germany', 'GH': 'Ghana', 'GR': 'Greece',
  'GT': 'Guatemala', 'GN': 'Guinea', 'GW': 'Guinea-Bissau', 'GY': 'Guyana', 'HT': 'Haiti',
  'HN': 'Honduras', 'HK': 'Hong Kong', 'HU': 'Hungary', 'IS': 'Iceland', 'IN': 'India',
  'ID': 'Indonesia', 'IR': 'Iran', 'IQ': 'Iraq', 'IE': 'Ireland', 'IL': 'Israel',
  'IT': 'Italy', 'JM': 'Jamaica', 'JP': 'Japan', 'JO': 'Jordan', 'KZ': 'Kazakhstan',
  'KE': 'Kenya', 'KI': 'Kiribati', 'KW': 'Kuwait', 'KG': 'Kyrgyzstan', 'LA': 'Laos',
  'LV': 'Latvia', 'LB': 'Lebanon', 'LS': 'Lesotho', 'LR': 'Liberia', 'LY': 'Libya',
  'LI': 'Liechtenstein', 'LT': 'Lithuania', 'LU': 'Luxembourg', 'MK': 'North Macedonia', 'MG': 'Madagascar',
  'MW': 'Malawi', 'MY': 'Malaysia', 'MV': 'Maldives', 'ML': 'Mali', 'MT': 'Malta',
  'MR': 'Mauritania', 'MU': 'Mauritius', 'MX': 'Mexico', 'MD': 'Moldova', 'MC': 'Monaco',
  'MN': 'Mongolia', 'ME': 'Montenegro', 'MA': 'Morocco', 'MZ': 'Mozambique', 'MM': 'Myanmar',
  'NA': 'Namibia', 'NP': 'Nepal', 'NL': 'Netherlands', 'NZ': 'New Zealand', 'NI': 'Nicaragua',
  'NE': 'Niger', 'NG': 'Nigeria', 'NO': 'Norway', 'OM': 'Oman', 'PK': 'Pakistan',
  'PA': 'Panama', 'PG': 'Papua New Guinea', 'PY': 'Paraguay', 'PE': 'Peru', 'PH': 'Philippines',
  'PL': 'Poland', 'PT': 'Portugal', 'QA': 'Qatar', 'RO': 'Romania', 'RU': 'Russia',
  'RW': 'Rwanda', 'SA': 'Saudi Arabia (المملكة العربية السعودية)', 'SN': 'Senegal', 'RS': 'Serbia', 'SC': 'Seychelles',
  'SL': 'Sierra Leone', 'SG': 'Singapore', 'SK': 'Slovakia', 'SI': 'Slovenia', 'SO': 'Somalia',
  'ZA': 'South Africa', 'KR': 'South Korea', 'SS': 'South Sudan', 'ES': 'Spain', 'LK': 'Sri Lanka',
  'SD': 'Sudan', 'SR': 'Suriname', 'SE': 'Sweden', 'CH': 'Switzerland', 'SY': 'Syria',
  'TW': 'Taiwan', 'TJ': 'Tajikistan', 'TZ': 'Tanzania', 'TH': 'Thailand', 'TG': 'Togo',
  'TO': 'Tonga', 'TT': 'Trinidad and Tobago', 'TN': 'Tunisia', 'TR': 'Turkey (Türkiye)', 'TM': 'Turkmenistan',
  'UG': 'Uganda', 'UA': 'Ukraine', 'AE': 'United Arab Emirates', 'GB': 'United Kingdom', 'US': 'United States',
  'UY': 'Uruguay', 'UZ': 'Uzbekistan', 'VE': 'Venezuela', 'VN': 'Vietnam', 'YE': 'Yemen',
  'ZM': 'Zambia', 'ZW': 'Zimbabwe',
};

export default function Hero() {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+90");
  const [selectedIso, setSelectedIso] = useState("TR");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState < string | null > (null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const initCountry = async () => {
      const result = await fetchCountryByIP();
      if (result) {
        setCountryCode(result.dialCode);
        setSelectedIso(result.countryCode);
      }
    };
    initCountry();
  }, []);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIso = e.target.value;
    setSelectedIso(newIso);
    if (countryToDialCode[newIso]) {
      setCountryCode(countryToDialCode[newIso]);
      // Re-validate when country changes if already touched
      if (phoneTouched && phone) {
        const result = validatePhone(phone, countryToDialCode[newIso]);
        setPhoneError(result.isValid ? null : result.error || "Invalid phone");
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (phoneTouched) {
      const result = validatePhone(value, countryCode);
      setPhoneError(result.isValid ? null : result.error || "Invalid phone");
    }
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    const result = validatePhone(phone, countryCode);
    setPhoneError(result.isValid ? null : result.error || "Invalid phone");
  };


  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation before submit
    const result = validatePhone(phone, countryCode);
    if (!result.isValid) {
      setPhoneError(result.error || "Invalid phone number");
      setPhoneTouched(true);
      return;
    }

    try {
      // Get the current language from the URL
      const currentPath = window.location.pathname;
      const slug = currentPath.split('/').filter(Boolean)[0] || 'gastric-sleeve-in-turkey';

      // Map URL slug to locale
      const slugToLocale: Record<string, string> = {
        'gastric-sleeve-in-turkey': 'en',
        'tup-mide-ameliyati-turkiye': 'tr',
        'schlauchmagen-op-in-der-tuerkei': 'de',
        'manga-gastrica-en-turquia': 'es',
        'sleeve-gastrectomie-en-turquie': 'fr',
        'manica-gastrica-in-turchia': 'it',
        'operacja-zmniejszenia-zoladka-w-turcji': 'pl',
      };

      const locale = slugToLocale[slug] || 'en';

      // Map language code to full name for Zoho
      const languageMap: Record<string, string> = {
        'en': 'English',
        'tr': 'Turkish',
        'de': 'German',
        'es': 'Spanish',
        'fr': 'French',
        'it': 'Italian',
        'pl': 'Polish',
      };

      const languageName = languageMap[locale] || 'English';

      // Prepare the data to send to the API
      const payload = {
        name: name,
        phone: `${countryCode}${phone}`,
        email: email,
        lead_source: "Google/Web Form",
        language: locale.toUpperCase(),
        source_language: locale.toUpperCase(),
        ip: "",
        doctor: "Dr. Gokce",
        interest: ["Bariatric"],
        procedure: [],
        utm_source: "",
        utm_medium: "",
        utm_keyword: "",
        utm_matchtype: "",
        utm_network: "",
        gclid: "",
      };

      console.log("Sending to Zoho:", payload);

      // Submit the form data to the API
      const response = await fetch(`https://cevre.hotelistan.net/api/form-patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Zoho response status:", response.status);

      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }

      // Redirect to thank you page with localized URL
      window.location.href = `/${slug}/thank-you`;
    } catch (error) {
      console.error("API isteği başarısız:", error);
      // Optionally show an error message to the user
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <section className="pt-16 pb-16 min-h-[85vh] relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #12171e 0%, #1a2028 50%, #12171e 100%)' }}>
      <style jsx global>{`
        .hero-phone-input { width: 100%; }
        .hero-phone-input .form-control {
          width: 100% !important;
          height: 48px !important;
          background-color: #1c2530 !important;
          border: 1px solid #374151 !important;
          border-radius: 8px !important;
          color: white !important;
          font-size: 16px !important;
          padding-left: 48px !important;
        }
        .hero-phone-input .form-control:focus { border-color: #25D366 !important; box-shadow: none !important; }
        .hero-phone-input .flag-dropdown {
          background-color: #1c2530 !important;
          border: 1px solid #374151 !important;
          border-radius: 8px 0 0 8px !important;
        }
        .hero-phone-input .country-list { background-color: #1c2530 !important; color: white !important; }
        .hero-phone-input .country-list .country:hover { background-color: #0c1015 !important; }
      `}</style>

      <div className={`max-w-7xl mx-auto px-4 mt-4 lg:mt-6 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

        {/* Mobile Title Section (Visible only on mobile/tablet) */}
        <div className="lg:hidden text-center mb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t('hero.title')}
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 lg:gap-6 items-start">

          {/* Sol Taraf - Doktor Görseli */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              <Image
                src="/images/doctor.webp"
                alt="Dr. Gokce"
                width={500}
                height={600}
                className="w-full h-auto max-h-[400px] md:max-h-[450px] lg:max-h-[600px] object-cover object-top transition-transform duration-300 ease-in-out hover:-translate-y-3 rounded-3xl overflow-hidden shadow-2xl"
                priority
              />
              {/* Doctor Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-3xl px-6 py-4 text-center">
                <p className="text-white font-bold text-lg">Doc. Dr. Feridun Gökçe</p>
                <p className="text-gray-300 text-sm">{t('hero.doctorSpecialty')}</p>
              </div>
            </div>

            {/* Free Consultation Button */}
            <div className="mt-6 flex justify-center">
              <a
                href="https://api.whatsapp.com/send/?phone=905467633721&text&type=phone_number&app_absent=0"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb956] px-8 py-4 rounded-full text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('hero.formTitle')}
              </a>
            </div>
          </div>

          {/* Orta Kısım - Rozetler */}
          <div className="lg:col-span-2 flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-4 lg:gap-6 py-6 lg:py-0 mt-6 lg:mt-0">
            {["google.png", "rated.png", "uems-logo.png", "real.png", "star.png"].map((img, idx) => (
              <Image
                key={idx}
                src={`/images/${img}`}
                alt="Badge"
                width={120}
                height={120}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 object-contain hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>

          {/* Sağ Taraf - Başlık ve Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="hidden lg:block text-4xl md:text-5xl lg:text-[50px] font-bold text-white mb-4 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-[#b08d57] text-xl md:text-2xl font-bold leading-snug">
                {t('hero.subtitle')}
              </p>
              <p className="text-lg text-white font-bold mt-2">{t('hero.formTitle')}</p>
              <p className="text-gray-400 text-sm mt-1">{t('header.ctaDesktop')}</p>
            </div>

            <div className="bg-[#4b5162] backdrop-blur-sm rounded-xl p-5 border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">{t('hero.formTitle')}</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder={t('hero.formNamePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#1c2530] border border-gray-600 text-white focus:border-[#25D366] outline-none"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative w-[100px] shrink-0">
                    <span className={`fi fi-${selectedIso.toLowerCase()} absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none`}></span>
                    <span className="absolute left-9 top-1/2 -translate-y-1/2 z-10 text-white text-xs pointer-events-none">{countryCode}</span>
                    <select
                      value={selectedIso}
                      onChange={handleCountryChange}
                      style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3csvg width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M1 1L6 6L11 1%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3e%3c/svg%3e')", backgroundPosition: 'right 0.3rem center', backgroundRepeat: 'no-repeat' }}
                      className="w-[100px] h-[48px] pl-9 py-3 pr-5 rounded-lg bg-[#1c2530] border border-gray-600 text-transparent text-xs focus:border-[#25D366] outline-none appearance-none cursor-pointer"
                    >
                      {Object.keys(countryToDialCode).sort().map((iso) => (
                        <option key={iso} value={iso} className="text-white bg-[#1c2530]">{countryNames[iso] || iso} {countryToDialCode[iso]}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      className={`w-full h-[48px] pl-12 pr-4 py-3 rounded-lg bg-[#1c2530] border ${phoneError ? 'border-red-500' : 'border-gray-600'} text-white focus:border-[#25D366] outline-none transition-colors`}
                      required
                    />
                    {phoneError && (
                      <p className="absolute -bottom-5 left-0 text-red-500 text-[10px] whitespace-nowrap">
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder={t('hero.formEmailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#1c2530] border border-gray-600 text-white focus:border-[#25D366] outline-none"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-[#25D366] py-3 rounded-lg text-white font-bold hover:bg-[#1eb956] transition-colors">
                  {t('hero.formSubmit')}
                </button>
              </form>
            </div>


          </div>
        </div>
      </div>

      {/* WhatsApp Butonu */}
      <a
        href="https://api.whatsapp.com/send/?phone=905467633721&text&type=phone_number&app_absent=0"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
}