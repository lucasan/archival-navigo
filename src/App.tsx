
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindingAid from "./pages/FindingAid";
import FindingAidNoSeries from "./pages/FindingAidNoSeries";
import FindingAidNoContainers from "./pages/FindingAidNoContainers";
import FindingAidsListing from "./pages/FindingAidsListing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/finding-aid" element={<FindingAid />} />
          <Route path="/finding-aid-no-series" element={<FindingAidNoSeries />} />
          <Route path="/finding-aid-no-containers" element={<FindingAidNoContainers />} />
          <Route path="/finding-aids-listing" element={<FindingAidsListing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
