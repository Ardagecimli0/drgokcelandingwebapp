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

export default function ContactForm() {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("+90");
  const [selectedIso, setSelectedIso] = useState("TR");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState < string | null > (null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [email, setEmail] = useState("");
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

      // Prepare the data to send to the API in the format requested
      const payload = {
        name: name,
        phone: `${countryCode}${phone}`,
        email: email,
        lead_source: "Google/Web Form",
        language: locale.toUpperCase(),
        source_language: locale.toUpperCase(),
        ip: "",
        doctor: "Dr Gokce",
        interest: ["Bariatric"],
        procedure: [],
        utm_source: "",
        utm_medium: "",
        utm_keyword: "",
        utm_matchtype: "",
        utm_network: "",
        gclid: "",
        lead_source_detail: "Cevredent Turkey Web App",
      };

      console.log("Sending to Zoho:", payload);

      // Submit the form data to the API
      const response = await fetch(`https://zoho.hotelistan.net/api/form-patient`, {
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
    // ID BURAYA EKLENDİ: Artık butonlar bu bölüme kaydırabilir.
    <section id="contact" className="py-16 bg-[#0c1015] scroll-mt-20">
      <style jsx global>{`
        .phone-input-container { width: 100%; }
        .phone-input-container .form-control {
          width: 100% !important; height: 48px !important; background-color: #0c1015 !important;
          border: 1px solid #374151 !important; border-radius: 8px !important; color: white !important;
          font-size: 16px !important; padding-left: 48px !important;
        }
        .phone-input-container .form-control:focus { border-color: #25D366 !important; box-shadow: none !important; }
        .phone-input-container .flag-dropdown { background-color: #0c1015 !important; border: 1px solid #374151 !important; border-radius: 8px 0 0 8px !important; }
        .phone-input-container .country-list { background-color: #1c2530 !important; color: white !important; border: 1px solid #374151 !important; }
        .phone-input-container .country-list .country:hover { background-color: #0c1015 !important; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl border border-gray-700/50 p-8 md:p-12 bg-[#151b23]/50">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Sol Taraf - Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {t('contactForm.title')}
              </h2>
              <p className="text-gray-400 mb-8 text-sm">
                {t('contactForm.subtitle')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-[#4b5162] rounded-xl p-6 border border-gray-600/50 space-y-4">

                  {/* Name Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder={t('contactForm.namePlaceholder')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:border-[#25D366] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="flex gap-2">
                    <div className="relative w-[100px] shrink-0">
                      <span className={`fi fi-${selectedIso.toLowerCase()} absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none`}></span>
                      <span className="absolute left-9 top-1/2 -translate-y-1/2 z-10 text-white text-xs pointer-events-none">{countryCode}</span>
                      <select
                        value={selectedIso}
                        onChange={handleCountryChange}
                        style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3csvg width=%2712%27 height=%278%27 viewBox=%270 0 12 8%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3cpath d=%27M1 1L6 6L11 1%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3e%3c/svg%3e')", backgroundPosition: 'right 0.3rem center', backgroundRepeat: 'no-repeat' }}
                        className="w-[100px] h-[48px] pl-9 py-3 pr-5 rounded-lg bg-[#0c1015] border border-gray-700 text-transparent text-xs focus:border-[#25D366] outline-none appearance-none cursor-pointer"
                      >
                        {Object.keys(countryToDialCode).sort().map((iso) => (
                          <option key={iso} value={iso} className="text-white bg-[#0c1015]">{countryNames[iso] || iso} {countryToDialCode[iso]}</option>
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
                        className={`w-full h-[48px] pl-12 pr-4 py-3 rounded-lg bg-[#0c1015] border ${phoneError ? 'border-red-500' : 'border-gray-700'} text-white placeholder-gray-500 focus:border-[#25D366] focus:outline-none transition-colors`}
                        required
                      />
                      {phoneError && (
                        <p className="absolute -bottom-5 left-0 text-red-500 text-[10px] whitespace-nowrap">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder={t('contactForm.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#0c1015] border border-gray-700 text-white placeholder-gray-500 focus:border-[#25D366] focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#20BD5A] py-4 rounded-lg text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-green-500/20"
                  >
                    {t('contactForm.submit')}
                  </button>
                </div>
              </form>
            </div>

            {/* Sağ Taraf - Resim */}
            <div className="relative w-full flex justify-center items-center py-8">
              <div className="relative w-full max-w-[500px] h-[450px] md:h-[550px] overflow-hidden group cursor-pointer transition-all duration-500">
                <Image
                  src="/images/fg.png"
                  alt="Dr. Can Kalkavan"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}