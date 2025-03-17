import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Example icons from lucide-react (used in shadcn)
import { Map, DollarSign, Handshake, Sprout } from "lucide-react";

export default function AboutUsContent() {
  return (
    <section className="bg-[#FDF8F2] py-16">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Main Heading */}
        <h2 className="text-4xl text-center font-medium leading-tight text-[#384620] sm:text-5xl">
          What Sets Us Apart
        </h2>

        {/* Optional Subtext */}
        <p className="mx-auto mt-2 max-w-2xl text-center text-gray-500">
          Explore how Landivo makes land ownership accessible and buyer-friendly.
        </p>

        {/* 4-Card Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          
          {/* CARD 1 */}
          <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <CardHeader className="p-0">
              {/* Icon circle with gold color */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(212,160,23,0.1)] shadow-md shadow-[rgba(212,160,23,0.2)]">
                <Map className="h-6 w-6 text-[#D4A017]" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Off-Market Expertise
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-gray-600">
                We uncover hidden land deals, giving you first access to unique properties.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* CARD 2 */}
          <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <CardHeader className="p-0">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(212,160,23,0.1)] shadow-md shadow-[rgba(212,160,23,0.2)]">
                <DollarSign className="h-6 w-6 text-[#D4A017]" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Flexible Financing
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-gray-600">
                Most deals include seller financing, tailored to your budget, with minimal credit checks.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* CARD 3 */}
          <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <CardHeader className="p-0">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(212,160,23,0.1)] shadow-md shadow-[rgba(212,160,23,0.2)]">
                <Handshake className="h-6 w-6 text-[#D4A017]" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Buyer-First Approach
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-gray-600">
                From start to finish, we streamline your path to ownership with clear terms and fast closings.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* CARD 4 */}
          <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <CardHeader className="p-0">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(212,160,23,0.1)] shadow-md shadow-[rgba(212,160,23,0.2)]">
                <Sprout className="h-6 w-6 text-[#D4A017]" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                Let’s Build Your Future
              </CardTitle>
              <CardDescription className="mt-2 text-sm text-gray-600">
                Whether you’re a first-time buyer or investor, we’ll help you find and own the perfect lot.
              </CardDescription>
            </CardHeader>
          </Card>

        </div>
      </div>
    </section>
  );
}
