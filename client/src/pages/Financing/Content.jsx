import React from "react";
import { FaCheckCircle } from "react-icons/fa"; // Example icon

export default function Content() {
  return (
    <section className="bg-[#FDF8F2] py-16">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Outer Card */}
        <div className="rounded-xl bg-[#e8efdc] shadow p-8 sm:p-12">
          {/* Top Row: Label & Heading (left), Paragraph (right) */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            
            {/* Left Side: Label + Main Heading */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
                Our Financing
              </p>
              <h2 className="mt-3 text-4xl font-medium text-[#384620] sm:text-5xl">
                Flexible Plans That Put Land Ownership Within Reach
              </h2>
            </div>

            {/* Right Side: Paragraph */}
            <div className="flex items-center">
              <p className="text-lg text-gray-600">
                At Landivo, we’re making it simpler than ever to finance your
                dream property.
              </p>
            </div>
          </div>

          {/* Bottom Row: Three Bullet Points */}
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            
            {/* 1) Quick Financing Approvals */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center space-x-2">
                {/* Example Icon */}
                <FaCheckCircle className="text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Quick Financing Approvals
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Get started in minutes with minimal paperwork.
              </p>
            </div>

            {/* 2) Detailed Payment Insights */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center space-x-2">
                <FaCheckCircle className="text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Detailed Payment Insights
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Track monthly progress and manage your plan with ease.
              </p>
            </div>

            {/* 3) Low Down Payments */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center space-x-2">
                <FaCheckCircle className="text-teal-600" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Low Down Payments
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                Keep upfront costs manageable and budget-friendly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
