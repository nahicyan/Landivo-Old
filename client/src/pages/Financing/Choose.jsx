import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Choose() {
  return (
    <section className="w-full bg-[#243834] py-16 text-[#FDF8F2]">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Small label like the reference image */}
        <span className="text-xs uppercase tracking-wide text-white/70">
          STEP
        </span>

        {/* Large heading */}
        <h2 className="mt-2 text-5xl font-medium leading-tight md:text-5xl">
        Why Choose Seller Financing with Landivo?
        </h2>

        {/* Three cards in a row (stacked on mobile) */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* CARD 1 */}
          <Card className="bg-[#2a413d] p-12 text-white/90 border-none shadow-sm shadow-black/30">
            <CardHeader className="p-0">
              {/* Faded step number */}
              <CardTitle className="mb-1 text-8xl font-light leading-none bg-gradient-to-b from-white/50 to-white/0 bg-clip-text text-transparent">
                1
              </CardTitle>
              {/* Step title */}
              <p className="text-3xl font-normal leadting-tight text-white mb-4">
              Flexible Options
              </p>
              {/* Step details */}
              <CardDescription className="text-lg font-thin leading-tight text-white/70">
              Minimal credit checks for most deals, with tailored terms for all buyers.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* CARD 2 */}
          <Card className="bg-[#2a413d] p-12 text-white/90 border-none shadow-sm shadow-black/30">
            <CardHeader className="p-0">
              {/* Faded step number */}
              <CardTitle className="mb-1 text-8xl font-light leading-none bg-gradient-to-b from-white/50 to-white/0 bg-clip-text text-transparent">
                2
              </CardTitle>
              {/* Step title */}
              <p className="text-3xl font-normal leadting-tight text-white mb-4">
              Affordable Payments
              </p>
              {/* Step details */}
              <CardDescription className="text-lg font-thin leading-tight text-white/70">
              Low down payments and competitive rates keep land within reach.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* CARD 3 */}
          <Card className="bg-[#2a413d] p-12 text-white/90 border-none shadow-sm shadow-black/30">
            <CardHeader className="p-0">
              {/* Faded step number */}
              <CardTitle className="mb-1 text-8xl font-light leading-none bg-gradient-to-b from-white/50 to-white/0 bg-clip-text text-transparent">
                3
              </CardTitle>
              {/* Step title */}
              <p className="text-3xl font-normal leadting-tight text-white mb-4">
              Full Control
              </p>
              {/* Step details */}
              <CardDescription className="text-lg font-thin leading-tight text-white/70">
              Own your land outright once payments are complete.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
