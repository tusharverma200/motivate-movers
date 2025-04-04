
import { Link, useLocation } from "react-router-dom";
import { Activity, Users, Calendar, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/home", label: "Home", icon: <Activity className="w-5 h-5" /> },
    { path: "/workouts", label: "Workouts", icon: <Calendar className="w-5 h-5" /> },
    { path: "/progress", label: "Progress", icon: <TrendingUp className="w-5 h-5" /> },
    { path: "/friends", label: "Friends", icon: <Users className="w-5 h-5" /> },
    { path: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 sm:sticky sm:top-0 sm:border-t-0 sm:border-b sm:shadow-sm">
      <div className="app-container flex justify-between items-center py-2">
        <Link to="/" className="hidden sm:flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">MotivateMovers</span>
        </Link>

        <nav className="flex items-center justify-around w-full sm:w-auto sm:justify-end sm:gap-4">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button 
                variant={isActive(item.path) ? "default" : "ghost"} 
                className={`flex flex-col sm:flex-row items-center gap-1 px-2 sm:px-4 py-1.5 rounded-full ${
                  isActive(item.path) ? 'bg-primary text-white' : 'text-gray-500'
                }`}
              >
                {item.icon}
                <span className="text-xs sm:text-sm">{item.label}</span>
              </Button>
            </Link>
          ))}

<header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
