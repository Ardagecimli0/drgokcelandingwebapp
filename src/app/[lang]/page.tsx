import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PressLogos from "@/components/PressLogos";
import Stats from "@/components/Stats";
import BeforeAfter from "@/components/BeforeAfter";
import HospitalHotel from "@/components/HospitalHotel";
import Testimonials from "@/components/Testimonials";
import RhinoplastyBeforeAfterYT from "@/components/RhinoplastyBeforeAfterYT";
import WhyTurkey from "@/components/WhyTurkey";
import Packages from "@/components/Packages";
import WhyDoctor from "@/components/WhyDoctor";
import Publications from "@/components/Publications";
import ContactForm from "@/components/ContactForm";
import DoctorInfo from "@/components/DoctorInfo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Techniques from "@/components/Techniques";
import Journey from "@/components/Journey";
// Force static generation for Vercel
export const dynamic = 'force-static';

// Generate static params for all language routes
export async function generateStaticParams() {
    return [
        { lang: 'gastric-sleeve-in-turkey' },
        { lang: 'tup-mide-ameliyati-turkiye' },
        { lang: 'schlauchmagen-op-in-der-tuerkei' },
        { lang: 'manga-gastrica-en-turquia' },
        { lang: 'sleeve-gastrectomie-en-turquie' },
        { lang: 'manica-gastrica-in-turchia' },
        { lang: 'operacja-zmniejszenia-zoladka-w-turcji' },
    ];
}

export default function LangPage() {
    return (
        <main className="min-h-screen bg-[#0c1015]">
            <Header />
            <Hero />
            <PressLogos />
            <Stats />
            <BeforeAfter />
            <HospitalHotel />
            <Testimonials />
            <RhinoplastyBeforeAfterYT />
            <WhyTurkey />
            <Packages />
            <WhyDoctor />
            <Techniques />
            <Publications />
            <Journey />
            <ContactForm />
            <DoctorInfo />
            <FAQ />
            <Footer />
        </main>
    );
}
