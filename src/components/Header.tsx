"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

export default function Header() {
  const { t } = useTranslation();

  // Artık isScrolled state'ine ve useEffect scroll dinleyicisine ihtiyacınız kalmadı.
  // Çünkü header her zaman "küçük/koyu" formda kalacak.

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 bg-[#0c1015]/95 py-2"
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/main-logo.png"
            alt="Logo"
            width={150}
            height={60}
            className="h-9 md:h-10 w-auto transition-all duration-300"
          />
        </div>

        {/* CTA Button */}
        <a
          href="https://api.whatsapp.com/send/?phone=905467633721&text&type=phone_number&app_absent=0"
          className="btn-green rounded-full text-white font-semibold flex items-center gap-2 transition-all duration-300 px-4 py-2 text-sm"
        >
          <span className="md:hidden">{t('header.ctaMobile')}</span>
          <span className="hidden md:inline">
            {t('header.ctaDesktop')}
          </span>
        </a>
      </div>
    </header>
  );
}