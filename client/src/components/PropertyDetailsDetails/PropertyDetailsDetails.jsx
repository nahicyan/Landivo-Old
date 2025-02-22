"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Lucide Icons (https://lucide.dev/icons)
import {
  CarFront,
  UtilityPole,
  MapPinned,
  UmbrellaOff,
  NotebookPen,
  DollarSign,
  Home,
  Info,
} from "lucide-react";
import PropertyMap from "../PropertyMap/PropertyMap";

export default function PropertyDetailsDetails({ propertyData }) {
  return (
    <div className="bg-[FFF] text-[var(--text)] p-4">
      {/* Two columns: "Location" & "Property details" */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Location */}
        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-4 tracking-tight">
            Location
          </h2>
          <Table className="w-full text-lg">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  Street Address
                </TableCell>
                <TableCell>{propertyData.streetAddress}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  County
                </TableCell>
                <TableCell>{propertyData.county}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  State
                </TableCell>
                <TableCell>{propertyData.state}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-700">Zip</TableCell>
                <TableCell>{propertyData.zip}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  Coordinates
                </TableCell>
                <TableCell>
                  <span className="flex justify-between items-center w-full">
                    {/* Display Coordinates */}
                    <span>
                      {propertyData.latitude}, {propertyData.longitude}
                    </span>

                    {/* Car Icon as a Button */}
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${propertyData.latitude},${propertyData.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2"
                    >
                      <CarFront className="w-6 h-6 text-gray-600" />
                    </a>
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Right Column: Property details */}
        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-4 tracking-tight">
            Property Details
          </h2>
          <Table className="w-full text-lg">
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  Parcel
                </TableCell>
                <TableCell>{propertyData.apnOrPin}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  Size
                </TableCell>
                <TableCell>{propertyData.sqft?.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  Acreage
                </TableCell>
                <TableCell>{propertyData.acre}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  Zoning
                </TableCell>
                <TableCell>{propertyData.zoning}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-gray-700">
                  Restrictions
                </TableCell>
                <TableCell>{propertyData.restrictions}</TableCell>
              </TableRow>
              {/* Add more property fields as needed */}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Accordion sections (sample items with icons) */}
      <Accordion type="single" collapsible className="mt-8 space-y-2">
        <AccordionItem value="Direction" className="border-b border-[#c1d7d3]">
          <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
            <div className="flex items-center gap-2">
              <CarFront className="w-6 h-6 text-gray-600" />
              <span>Direction</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <span className="flex items-center gap-2 text-base">
              {propertyData.direction && <span>{propertyData.direction}.</span>}
              <p>For driving directions,</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${propertyData.latitude},${propertyData.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="link" className="text-primary px-0 text-base">
                  Click here
                </Button>
              </a>
            </span>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="Untilities" className="border-b border-[#c1d7d3]">
          <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
            <div className="flex items-center gap-2">
              <UtilityPole className="w-6 h-6 text-gray-600" />
              <span>Utilites & Infrastructure</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Table className="w-[70%] text-lg">
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-gray-700">
                    Water
                  </TableCell>
                  <TableCell>{propertyData.water}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700">
                    Sewer
                  </TableCell>
                  <TableCell>{propertyData.sewer}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700">
                    Electricity
                  </TableCell>
                  <TableCell>{propertyData.electric}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700">
                    Road Condition
                  </TableCell>
                  <TableCell>{propertyData.roadCondition}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700">
                    Mobile Home Friendly
                  </TableCell>
                  <TableCell>{propertyData.mobileHomeFriendly}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        <Accordion
          type="single"
          collapsible
          defaultValue="Map"
          className="mt-8 space-y-2"
        >
          <AccordionItem value="Map" className="border-b border-[#c1d7d3]">
            <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
              <div className="flex items-center gap-2">
                <MapPinned className="w-6 h-6 text-gray-600" />
                <span>Map</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <PropertyMap propertyData={propertyData} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {propertyData.financing === "Available" && (
          <AccordionItem
            value="MonthlyPayment"
            className="border-b border-[#c1d7d3]"
          >
            <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
              <div className="flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-gray-600" />
                <span>Monthly Payment</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                This feature is currently being worked on. Please check back
                soon.
              </p>
            </AccordionContent>
          </AccordionItem>
        )}

        {propertyData.hoaPoa === "Yes" && (
          <AccordionItem value="HOA" className="border-b border-[#c1d7d3]">
            <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
              <div className="flex items-center gap-2">
                <Home className="w-6 h-6 text-gray-600" />
                <span>HOA</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Table className="w-full text-base tracking-tight">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-gray-700">
                      HOA
                    </TableCell>
                    <TableCell>{propertyData.hoaPoa}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-gray-700">
                      HOA Information
                    </TableCell>
                    <TableCell>{propertyData.hoaDeedDevInfo}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        )}
        {propertyData.floodplain !== "No" && (
          <AccordionItem
            value="Enviromental Risk"
            className="border-b border-[#c1d7d3]"
          >
            <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
              <div className="flex items-center gap-2">
                <UmbrellaOff className="w-6 h-6 text-gray-600" />
                <span>Enviromental Risk</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Table className="w-[50%] text-base tracking-tight">
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-gray-700">
                      Floodplain
                    </TableCell>
                    <TableCell>{propertyData.floodplain}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        )}
        {propertyData.notes && (
          <AccordionItem value="Notes" className="border-b border-[#c1d7d3]">
            <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
              <div className="flex items-center gap-2">
                <Info className="w-6 h-6 text-gray-600" />
                <span>Additional Information</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div
                className="text-base"
                dangerouslySetInnerHTML={{ __html: propertyData.notes }}
              />
            </AccordionContent>
          </AccordionItem>
        )}

        <Accordion type="single" collapsible defaultValue="Notes">
          <AccordionItem value="Notes" className="border-b border-[#c1d7d3]">
            <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
              <div className="flex items-center gap-2">
                <NotebookPen className="w-6 h-6 text-gray-600" />
                <span>Buyer Guidelines</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-base w-[75%]">
                <p>Cash OR Hard Money Only.</p>
                <p>Earnest money deposit varies per property.</p>
                <p>Buyer pays ALL closing costs.</p>
                <p>
                  Buyer to pay Administrative Fee Payable to Landers Investment
                  LLC for <p>$395 additional/added to the Assignment fee.</p>
                </p>
                <p>
                  Agents, please add your commission to the buyer's sales price.
                </p>
                <p>Daisy Chainers do not apply—no Option period.</p>
                <p>Please do your due diligence before making an offer.</p>
                <p>This Property is being sold AS-IS.</p>
                <p>Close Date: ASAP</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Accordion>
    </div>
  );
}
