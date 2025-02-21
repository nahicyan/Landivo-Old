import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Financing = () => {
  return (
    <div className="bg-[#FDF8F2] min-h-screen text-[#4b5b4d]">
      {/* Header Section */}
      <section className="pt-16 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-[#3f4f24] sm:text-5xl">
            Flexible Land Financing Options
          </h1>
          <p className="mt-4 text-lg text-[#324c48]">
            We offer{" "}
            <span className="text-[#D4A017] font-semibold">
              affordable financing solutions
            </span>{" "}
            to make land ownership easier than ever. Explore flexible plans
            tailored to your needs.
          </p>
        </div>
      </section>

      {/* Financing Options */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {financingOptions.map((option) => (
          <Card
            key={option.title}
            className="bg-white shadow-lg hover:shadow-xl transition-all border border-[#D4A017]"
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold text-[#3f4f24]">
                {option.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#324c48]">{option.description}</p>
              <p className="mt-4 text-lg font-semibold text-[#D4A017]">
                {option.rate}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
      {/* Why Choose Our Financing? */}
      <section className="mt-16 flex justify-center">
        <div className="max-w-6xl w-full bg-[#324c48] text-white rounded-lg px-6 py-10 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-[#3f4f24] border border-[#D4A017] shadow-md rounded-lg"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#D4A017]">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#FFF]">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mt-16 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[#3f4f24]">How It Works</h2>
        <p className="mt-4 text-lg text-[#324c48]">
          Our financing process is simple, transparent, and designed for your
          needs.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg border border-[#D4A017] rounded-lg"
            >
              <h3 className="text-xl font-bold text-[#3f4f24]">{step.step}</h3>
              <p className="mt-2 text-[#324c48]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mt-16 max-w-4xl mx-auto px-6">
        <Card className="bg-white shadow-lg p-6 border border-[#3f4f24]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#3f4f24]">
              Get Pre-Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#324c48]">
              Fill out this form and our team will reach out with your financing
              options.
            </p>
            <form className="mt-6 space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                className="border-[#324c48] rounded-lg"
              />
              <Input
                type="email"
                placeholder="Email Address"
                className="border-[#324c48] rounded-lg"
              />
              <Textarea
                placeholder="Your Message"
                className="border-[#324c48] rounded-lg"
              />
              <Button className="w-full bg-[#324c48] hover:bg-[#3f4f24] text-white py-3 text-lg font-semibold rounded-lg">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Call-to-Action Section */}
      <section className="mt-16 flex justify-center">
        <div className="max-w-5xl w-full bg-[#D4A017] py-10 px-6 text-center text-[#3f4f24] rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Own Land with Confidence</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Our financing process is{" "}
            <span className="font-semibold">
              simple, transparent, and designed for you.
            </span>
            Whether you're a first-time buyer or an investor, we make land
            ownership easy.
          </p>
          <Button className="mt-6 bg-[#324c48] text-white px-6 py-3 text-lg font-semibold rounded-lg hover:bg-[#3f4f24]">
            Start Financing Now
          </Button>
        </div>
      </section>
    </div>
  );
};

// Financing Options Data
const financingOptions = [
  {
    title: "Low Interest Loans",
    description:
      "Fixed-rate loans with competitive interest rates and low monthly payments.",
    rate: "Rates as low as 4.5%",
  },
  {
    title: "Owner Financing",
    description:
      "Flexible terms with no credit check required. Get approved instantly!",
    rate: "No Bank Required",
  },
  {
    title: "Short-Term Financing",
    description:
      "Perfect for investors looking to flip land within 12-24 months.",
    rate: "12-24 Month Terms",
  },
];

// Benefits Data
const benefits = [
  {
    title: "No Credit Check",
    description: "Get approved instantly without impacting your credit score.",
  },
  {
    title: "Flexible Payment Plans",
    description: "Choose a financing plan that works for you and your budget.",
  },
  {
    title: "Fast Approval Process",
    description: "Quick and easy application process with minimal paperwork.",
  },
];

// Steps Data
const steps = [
  {
    step: "1. Apply Online",
    description: "Fill out our simple online form to get started.",
  },
  {
    step: "2. Get Approved",
    description:
      "Receive approval within 24-48 hours with custom financing plans.",
  },
  {
    step: "3. Purchase Your Land",
    description:
      "Complete the purchase and start building your dream property.",
  },
];

export default Financing;
