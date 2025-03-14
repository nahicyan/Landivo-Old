import React from "react"
import FinancingHero from "./Hero"
import Choose from "./Choose"
import Content from "./Content"

export default function Financing() {
  return (
    <>
    <div className="w-full bg-[#FDF8F2]">
      <FinancingHero />
    </div>
    <div className="w-full bg-[#FDF8F2]">
      <Content/>
    </div>
    <div className="w-full bg-[#FDF8F2]">
      <Choose/>
    </div>
    </>
  )
}
