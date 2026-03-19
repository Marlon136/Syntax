import PricingHero from "@/app/components/pricing/PricingHero";
import Features from "@/app/components/pricing/Features";
import Plans from "@/app/components/pricing/Plans";
import PlanTable from "@/app/components/pricing/PlanTable";
import { Separator } from "@/components/ui/separator";


export default function Page() {
  return (
    <>
      <PricingHero />
      <Separator/> 
      <Plans />
      <PlanTable />

      <br></br>
    </>
  );
}