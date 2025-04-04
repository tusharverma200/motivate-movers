
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Workouts from "./pages/Workouts";
import Progress from "./pages/Progress";
import Friends from "./pages/Friends";
import NotFound from "./pages/NotFound";
import FitnessLandingPage from "./pages/LandingPage";
import { useUser } from "@clerk/clerk-react";



const App = () => {
  const queryClient = new QueryClient();

  const user = useUser().isSignedIn;
  console.log(user)
  return (
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FitnessLandingPage />} />
          <Route path="/home" element={ user?<Index />:<Navigate to="/" />} />
          <Route path="/profile" element={user?<Profile />:<Navigate to="/" />} />
          <Route path="/workouts" element={user?<Workouts />:<Navigate to="/" />} />
          <Route path="/progress" element={user?<Progress />:<Navigate to="/" />} />
          <Route path="/friends" element={user?<Friends />:<Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  )

  
};

export default App;
