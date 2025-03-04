"use client";

import React, { useState, useEffect, useContext } from "react";
import ImageUploadPreview from "@/components/ImageUploadPreview/ImageUploadPreview";


export default function MediaTags({ formData, handleChange }) {
const [uploadedImages, setUploadedImages] = useState([]);


    return (


          <div className="w-full flex-shrink-0 p-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Media & Tags</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Left Tag"
                name="ltag"
                value={formData.ltag}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
              />
              <input
                type="text"
                placeholder="Right Tag"
                name="rtag"
                value={formData.rtag}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#D4A017] focus:ring-1 focus:ring-[#D4A017]"
              />
            </div>
            <div>
              <ImageUploadPreview
                existingImages={[]} // No pre-existing images when adding a property.
                newImages={uploadedImages}
                onExistingChange={() => {}}
                onNewChange={setUploadedImages}
              />
            </div>
          </div>

    );
}
