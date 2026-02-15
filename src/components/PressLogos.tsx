"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import Image from "next/image";

const logos = [
  { src: "/images/press/elle.svg", alt: "Elle Magazine" },
  { src: "/images/press/hello.svg", alt: "Hello Magazine" },
  { src: "/images/press/gq.svg", alt: "GQ Magazine" },
  { src: "/images/press/cnn-turk.svg", alt: "CNN Turk" },
  { src: "/images/press/vogue.svg", alt: "Vogue Magazine" },
  { src: "/images/press/elele.svg", alt: "Elele Magazine" },
];

export default function PressLogos() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-8 bg-[#0c1015] overflow-hidden border-y border-gray-800">
      <div className="flex animate-marquee mb-24">
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0 mx-12">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={40}
              className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Video Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          {t('doctorInfo.videoTitle')}
        </h2>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-1 bg-[#c9a96e] rounded-full"></div>
        </div>

        {/* Doctor Video */}
        <div className="max-w-2xl mx-auto mb-8 aspect-video group cursor-pointer relative rounded-xl overflow-hidden">
          {isPlaying ? (
            <iframe
              src="https://www.youtube.com/embed/OnHiHPa3ytY?autoplay=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          ) : (
            <div onClick={() => setIsPlaying(true)} className="relative w-full h-full">
              <img
                src="/images/video-cover.png"
                alt="Video Thumbnail"
                className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
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
    </section>
  );
}
