import Hero from "@/app/components/Hero";
import Stats from "@/app/components/Stats";
import Courses from "@/app/components/Courses";
import Subscribe from "@/app/components/Suscribe";
import PricingHero from "@/app/components/pricing/PricingHero";
import Features from "@/app/components/pricing/Features";
import Plans from "@/app/components/pricing/Plans";
import PlanTable from "@/app/components/pricing/PlanTable";


export default function Page() {
  return (
    <div className="min-h-screen bg-[#F3DDC9]">
      
      <Hero />
      <Stats />
      <Courses />
      <Subscribe />
      <>
        <PricingHero />
        <Features />
        <Plans />
        <PlanTable />
      </>
    </div>
  );
}