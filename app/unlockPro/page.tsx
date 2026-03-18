import PricingHero from "@/app/components/pricing/PricingHero";
import Features from "@/app/components/pricing/Features";
import Plans from "@/app/components/pricing/Plans";
import PlanTable from "@/app/components/pricing/PlanTable";

export default function Page() {
  return (
    <>
      <PricingHero />
      <Features />
      <Plans />
      <PlanTable />
    </>
  );
}