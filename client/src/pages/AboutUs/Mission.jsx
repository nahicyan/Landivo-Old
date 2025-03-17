import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Mission() {
const navigate = useNavigate();
  return (
    <section className="w-full bg-[#0A2F3C] py-16">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8 px-4 md:flex-row md:items-center">
        
        {/* LEFT COLUMN: Text Content */}
        <div className="w-full md:w-1/2 text-white">
          {/* Large heading */}
          <h1 className="mb-4 text-3xl font-medium leading-tight sm:text-4xl md:text-5xl">
            We’ve Helped Countless Buyers Secure Off-Market Land
          </h1>

          {/* Paragraph */}
          <p className="mb-6 text-base leading-relaxed text-white/90 sm:text-lg">
          At Landivo, our mission is to put land ownership within everyone’s reach.
          We offer flexible seller financing on most of our off-market
          properties, letting you skip the usual bank hurdles. Our focus is on making
          your path to owning land fast, simple and stress-free.
          </p>

          {/* Call to Action Button */}
          <Button
            className="bg-[#00D084] px-6 py-3 text-black hover:bg-[#00B373]"
            size="lg"
            onClick={() => navigate("/properties")}
          >
            Explore Properties
          </Button>
          
        </div>

        {/* RIGHT COLUMN: Illustration/Card */}
        <div className="flex w-full items-center justify-center md:w-1/2">
          <Card className="flex h-full w-full max-w-lg items-center justify-center rounded-2xl bg-white p-2 shadow-md">
            {/* Larger Image */}
            <img
              src="./Mission.jpg"
              alt="Land illustration"
              className="h-auto w-full max-w-md md:max-w-lg object-contain"
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
