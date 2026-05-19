"use client";


import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/lib/auth";
import PricingHero from "@/app/components/pricing/PricingHero";
import Plans from "@/app/components/pricing/Plans";
import PlanTable from "@/app/components/pricing/PlanTable";
import { Separator } from "@/components/ui/separator";

import SubscribeStatus from "./SubscribeStatus";
import React, { Suspense } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <>
      <PricingHero />

      <Suspense fallback={null}>
        <SubscribeStatus />
      </Suspense>

      <Separator />
      <Plans />
      <PlanTable />

      <br />
    </>
  );
}