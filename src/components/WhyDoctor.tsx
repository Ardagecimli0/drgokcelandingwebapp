"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";

export default function WhyDoctor() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  const features = [
    {
      label: t('whyDoctor.features.leadership.label'),
      text: t('whyDoctor.features.leadership.text'),
    },
    {
      label: t('whyDoctor.features.expertise.label'),
      text: t('whyDoctor.features.expertise.text'),
    },
    {
      label: t('whyDoctor.features.scientific.label'),
      text: t('whyDoctor.features.scientific.text'),
    },
    {
      label: t('whyDoctor.features.technology.label'),
      text: t('whyDoctor.features.technology.text'),
    },
    {
      label: t('whyDoctor.features.guarantee.label'),
      text: t('whyDoctor.features.guarantee.text'),
    },
  ];

  return (
    <section className="py-16 bg-[#0c1015]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side - Features */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-[1.1]">
                {t('whyDoctor.titleLine1')}<br />
                {t('whyDoctor.titleLine2')}<br />
                {t('whyDoctor.titleLine3')}
              </h2>
              <div className="w-20 h-1.5 bg-[#c9a96e] rounded-full"></div>
            </div>

            <div className="divide-y divide-gray-800/50">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="py-3 transition-all duration-300 hover:pl-2 group"
                >
                  <p className="text-gray-300 text-lg lg:text-xl leading-relaxed">
                    <span className="text-[#c9a96e] font-semibold italic">
                      {feature.label}
                    </span>{" "}
                    <span className="text-gray-400">
                      {feature.text}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="https://api.whatsapp.com/send/?phone=905467633721&text&type=phone_number&app_absent=0"
                className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#1da850] px-8 py-4 rounded-full text-white font-bold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('whyDoctor.ctaButton')}
              </a>
            </div>
          </div>

          {/* Right Side - Video (Zıplama Efekti Eklendi) */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(201,169,110,0.2)]">
            {isPlaying ? (
              <iframe
                src="https://player.vimeo.com/video/1017836538?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
                title="Doc. Dr. Feridun Gökçe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            ) : (
              <div onClick={() => setIsPlaying(true)} className="relative w-full h-full cursor-pointer group">
                <img
                  src="/images/cover123.png"
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}