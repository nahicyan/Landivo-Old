import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "@mui/material/styles"; // Import MUI ThemeProvider
import theme from "./theme"; // Our custom theme with colors
import Layout from "./components/Layout/Layout"; // Your layout component
import Site from "./pages/Site"; // Home page
import Properties from "./pages/Properties/Properties"; // Properties listing page
import Property from "./pages/Property/Property"; // Property detail page
import Offer from "./components/Offer/Offer"; // Offer component
import AddProperty from "./pages/AddProperty/AddProperty"; // Add Property page
import { UserProvider } from "./utils/UserContext"; // User context provider
import EditProperty from "./pages/EditProperty/EditProperty"; // Edit Property page
import DFW from "./pages/DFW/DFW"; // DFW Property page
import Austin from "./pages/Austin/Austin"; // Austin Property page
import Houston from "./pages/Houston/Houston"; // Houston Property page
import SanAntonio from "./pages/SanAntonio/SanAntonio"; // San Antonio Property page
import OtherLands from "./pages/OtherLands/OtherLands"; // Other Lands Property page
import Financing from "./pages/Finance/Finance";
import AboutUs from "./pages/AboutUs/AboutUs";
import Support from "./pages/Support/Support";
import Search from "./components/Search/Search";
import Admin from "./pages/Admin/Admin";
import OfferTable from "./components/OfferTable/OfferTable";


// Create the React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        {/* Wrap the app with MUI ThemeProvider for consistent styling */}
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Site />} />
                  <Route path="/properties">
                    <Route index element={<Properties />} />
                    <Route path=":propertyId" element={<Property />} />
                    <Route path=":propertyId/offers" element={<OfferTable />} />
                  </Route>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/financing" element={<Financing />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/DFW" element={<DFW/>} />
                  <Route path="/Austin" element={<Austin/>} />
                  <Route path="/Houston" element={<Houston/>} />
                  <Route path="/SanAntonio" element={<SanAntonio/>} />
                  <Route path="/OtherLands" element={<OtherLands/>} />
                  <Route path="/add-property" element={<AddProperty />} />
                  <Route path="/edit-property/:propertyId" element={<EditProperty />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeProvider>
        {/* Toast notifications container */}
        <ToastContainer />

        {/* React Query DevTools for debugging */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default App;
