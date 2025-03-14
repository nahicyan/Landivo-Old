import React from "react";

export default function Content() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-screen-md px-4 text-center">
        {/* Small label, uppercase */}
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          Our Mission
        </p>

        {/* Main heading, bold & large */}
        <h2 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
        We’ve Helped Countless Buyers Secure Off-Market Land
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-lg text-gray-600">
        At Landivo, our mission is to put land ownership within everyone’s reach. That’s why we offer flexible seller financing on most of our off-market properties, letting you skip the usual bank hurdles. While some deals may involve a brief credit check to tailor the best terms, our focus is on making your path to owning land fast, simple, and stress-free.        </p>
      </div>
    </section>
  );
}
