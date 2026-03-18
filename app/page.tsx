import Hero from "@/app/components/Hero";
import Stats from "@/app/components/Stats";
import Courses from "@/app/components/Courses";
import Subscribe from "@/app/components/Suscribe";
import PricingHero from "@/app/components/pricing/PricingHero";
import Features from "@/app/components/pricing/Features";
import Plans from "@/app/components/pricing/Plans";
import PlanTable from "@/app/components/pricing/PlanTable";
import { Separator } from "@/components/ui/separator";



export default function Page() {
  return (
    <div className="min-h-screen bg-[#e8c46e]">
      
      <Hero />
      <Stats />
      <Separator/>
      <Courses />
      <Subscribe />
    
    </div>
  );
}