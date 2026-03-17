import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import Stats from "@/app/components/Stats";
import Courses from "@/app/components/Courses";
import Footer from "@/app/components/Footer";
import Subscribe from "../components/Suscribe";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#F3DDC9]">
      <Navbar />
      <Hero />
      <Stats />
      <Courses />
      <Subscribe />
      <Footer />
    </div>
  );
}