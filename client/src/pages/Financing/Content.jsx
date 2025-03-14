import React from "react";
import { FaBolt, FaChartBar, FaWallet } from "react-icons/fa";

export default function Content() {
  return (
    <section className="bg-[#FDF8F2] py-16">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Outer Card */}
        <div className="rounded-xl bg-[#e8efdc] p-8 shadow sm:p-12">
          {/* Top Row: 2 columns */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
            
            {/* Left Column: Label + Heading */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-[#3f4f24]">
                Our Financing
              </p>
              <h2 className="mt-3 text-4xl font-medium leading-tight text-[#384620] sm:text-4xl">
                Flexible Plans That Put Land Ownership Within Reach
              </h2>
            </div>

            {/* Right Column: Paragraph */}
            <div className="flex items-center">
              <p className="text-lg leading-relaxed text-gray-600">
                At Landivo, we’re making it simpler than ever to finance your
                dream property.
              </p>
            </div>
          </div>

          {/* Bottom Row: Three Bullet Points */}
          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            
            {/* 1) Quick Financing Approvals */}
            <div className="flex flex-col items-start">
              <FaBolt className="mb-3 text-6xl text-[#3f4f24]" />
              <h3 className="text-2xl font-medium text-gray-800 tracking-tighter">
                Quick Financing Approvals
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Get started in minutes with minimal paperwork.
              </p>
            </div>

            {/* 2) Detailed Payment Insights */}
            <div className="flex flex-col items-start">
              <FaChartBar className="mb-3 text-6xl text-[#3f4f24]" />
              <h3 className="text-2xl font-medium text-gray-800 tracking-tighter">
                Detailed Payment Insights
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Track monthly progress and manage your plan with ease.
              </p>
            </div>

            {/* 3) Low Down Payments */}
            <div className="flex flex-col items-start">
              <FaWallet className="mb-3 text-6xl text-[#3f4f24]" />
              <h3 className="text-2xl font-medium text-gray-800 tracking-tighter">
                Low Down Payments
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Keep upfront costs manageable and budget-friendly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
