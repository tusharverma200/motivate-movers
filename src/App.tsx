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
  const { isSignedIn, isLoaded } = useUser();
  console.log("isSignedIn", isSignedIn);
  console.log("isLoaded", isLoaded);
  console.log("user", useUser());

  if (!isLoaded) {
    // You can return a loader here if desired
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <FitnessLandingPage />} />
            <Route path="/home" element={ isSignedIn? <Index />: <Navigate to="/"/> } />
            <Route path="/profile" element={ isSignedIn? <Profile />: <Navigate to="/"/> } />
            <Route path="/workouts" element={isSignedIn?  <Workouts />: <Navigate to="/"/> } />
            <Route path="/progress" element={isSignedIn?  <Progress />: <Navigate to="/"/> } />
            <Route path="/friends" element={ isSignedIn?  <Friends /> : <Navigate to="/"/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
