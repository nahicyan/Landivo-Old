import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <div className="bg-[#FDF8F2]">
      <section className="pt-12 pb-12 sm:pb-16 lg:pt-8">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:items-center lg:grid-cols-2 gap-y-12 lg:gap-x-16">
            
            {/* Left Content */}
            <div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-extrabold leading-tight text-[#3f4f24] sm:text-5xl lg:text-6xl">
                  The Best Land Deals In Texas
                </h1>
                <p className="mt-4 text-lg text-[#324c48] sm:mt-6">
                  Discover unbeatable land deals across Texas with prime locations and great prices. Secure your perfect property today before it's gone!
                </p>
                {/* Search Bar */}
                <form action="#" method="POST" className="mt-6 sm:mt-8">
                  <div className="relative p-2 sm:border sm:border-[#324c48] group sm:rounded-xl sm:focus-within:ring-1 sm:focus-within:ring-[#D4A017] sm:focus-within:border-[#D4A017]">
                    <Input
                      type="text"
                      placeholder="Search by city, county, or zip code"
                      className="block w-full px-4 py-4 text-[#030001] placeholder-[#576756] bg-transparent border border-[#324c48] outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017] rounded-xl sm:border-none sm:focus:ring-0 sm:focus:border-transparent"
                      required
                    />
                    <div className="mt-4 sm:mt-0 sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:items-center sm:pr-2">
                      <Button
                        type="submit"
                        className="bg-[#324c48] hover:bg-[#3f4f24] text-white px-6 py-3 text-lg font-semibold rounded-lg transition"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              {/* Stats */}
              <div className="flex items-center justify-center mt-8 space-x-6 lg:justify-start sm:space-x-8">
                <div className="flex items-center">
                  <p className="text-3xl font-semibold text-[#3f4f24] sm:text-4xl">100+</p>
                  <p className="ml-3 text-sm text-[#3f4f24]">Prime <br />Listings</p>
                </div>

                <div className="hidden sm:block">
                  <svg className="text-[#D4A017]" width="16" height="39" viewBox="0 0 16 39" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0.72265" y1="10.584" x2="15.7226" y2="0.583975"></line>
                    <line x1="0.72265" y1="17.584" x2="15.7226" y2="7.58398"></line>
                    <line x1="0.72265" y1="24.584" x2="15.7226" y2="14.584"></line>
                    <line x1="0.72265" y1="31.584" x2="15.7226" y2="21.584"></line>
                    <line x1="0.72265" y1="38.584" x2="15.7226" y2="28.584"></line>
                  </svg>
                </div>

                <div className="flex items-center">
                  <p className="text-3xl font-semibold text-[#3f4f24] sm:text-4xl">$10M+</p>
                  <p className="ml-3 text-sm text-[#3f4f24]">Lands <br />Sold</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div>
              <img className="w-full rounded-xl shadow-lg" src="./banner.jpg" alt="Texas Land" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
