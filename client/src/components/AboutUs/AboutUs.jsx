import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const AboutUs = () => {
  return (
    <div className="bg-[#FDF8F2] min-h-screen text-[#4b5b4d]">
      
      {/* Hero Section */}
      <section className="relative w-full bg-[#3f4f24] text-white py-16">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold leading-tight">About Landivo</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Your trusted partner in land investment. We make land ownership **simple, accessible, and secure** for everyone.
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="mt-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#3f4f24] text-center">Our Story</h2>
        <p className="mt-4 text-lg text-[#324c48] text-center max-w-3xl mx-auto">
          Founded in **2010**, Landivo was built on the belief that **everyone should have the opportunity to own land**. With years of experience in **land acquisition, financing, and development**, we’ve helped hundreds of families and investors find the perfect property.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="mt-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#3f4f24] text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-white shadow-md hover:shadow-lg border border-[#D4A017] rounded-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#D4A017]">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#324c48]">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="mt-16 flex justify-center">
        <div className="max-w-6xl w-full bg-[#324c48] text-white rounded-lg px-6 py-10 shadow-md">
          <h2 className="text-3xl font-bold text-center">Why Choose Landivo?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-[#3f4f24] border border-[#D4A017] shadow-md rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#D4A017]">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="mt-16 flex justify-center">
        <div className="max-w-5xl w-full bg-[#D4A017] py-10 px-6 text-center text-[#3f4f24] rounded-lg shadow-md">
          <h2 className="text-3xl font-bold">Start Your Land Ownership Journey</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Our team is ready to help you find and finance your dream property. Take the first step today!
          </p>
          <Button className="mt-6 bg-[#324c48] text-white px-6 py-3 text-lg font-semibold rounded-lg hover:bg-[#3f4f24]">
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

// Values Data
const values = [
  { title: "Transparency", description: "We believe in honest pricing and clear communication." },
  { title: "Integrity", description: "Building trust through ethical and responsible transactions." },
  { title: "Customer Focus", description: "Ensuring you find the best land for your needs." },
];

// Benefits
const benefits = [
  { title: "Secure Transactions", description: "Your investments are safe with us." },
  { title: "Flexible Financing", description: "Tailored payment plans for your convenience." },
  { title: "Expert Support", description: "Guidance from seasoned land experts." },
];

export default AboutUs;
