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
  Calendar,
  Home,
  DollarSign,
  Banknote,
  Medal,
  History,
  School,
  AlertTriangle,
  Map,
} from "lucide-react";
import PropertyMap from "../PropertyMap/PropertyMap";

export default function PropertyDetailsDetails({ propertyData }) {
  return (
    <div className="bg-[var(--background)] text-[var(--text)] p-4">
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
                <TableCell>{propertyData.streetaddress}</TableCell>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Location */}
              <div>
                <Table className="w-full text-lg">
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
                  </TableBody>
                </Table>
              </div>
              <div></div>
            </div>
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
        {propertyData.financing === "Yes" && (
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
            <AccordionContent></AccordionContent>
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
          <AccordionContent></AccordionContent>
        </AccordionItem>
        {propertyData.notes && (
          <AccordionItem value="Notes" className="border-b border-[#c1d7d3]">
            <AccordionTrigger className="flex items-center justify-between w-full text-left text-xl font-medium text-gray-800 tracking-tight">
              <div className="flex items-center gap-2">
                <Home className="w-6 h-6 text-gray-600" />
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
      </Accordion>
    </div>
  );
}
