
import { useState } from "react";
import Navbar from "@/components/Navbar";
import WorkoutCard from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Dumbbell, Heart, Clock, TrendingUp } from "lucide-react";

// Mock data for workouts
const allWorkouts = [
  {
    id: "1",
    title: "High Intensity Interval Training",
    category: "HIIT",
    duration: 30,
    difficulty: "Intermediate" as const,
    exercises: 12,
    likes: 245
  },
  {
    id: "2",
    title: "Full Body Strength",
    category: "Strength",
    duration: 45,
    difficulty: "Beginner" as const,
    exercises: 10,
    likes: 187
  },
  {
    id: "3",
    title: "Morning Yoga Flow",
    category: "Yoga",
    duration: 20,
    difficulty: "Beginner" as const,
    exercises: 8,
    likes: 156
  },
  {
    id: "4",
    title: "Advanced Calisthenics",
    category: "Strength",
    duration: 60,
    difficulty: "Advanced" as const,
    exercises: 15,
    likes: 132
  },
  {
    id: "5",
    title: "Core Crusher",
    category: "Strength",
    duration: 25,
    difficulty: "Intermediate" as const,
    exercises: 8,
    likes: 198
  },
  {
    id: "6",
    title: "Flexibility & Mobility",
    category: "Yoga",
    duration: 35,
    difficulty: "Intermediate" as const,
    exercises: 12,
    likes: 142
  }
];

// Categories for filtering
const categories = [
  { id: "all", name: "All Categories", icon: <Dumbbell className="w-4 h-4" /> },
  { id: "hiit", name: "HIIT", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "strength", name: "Strength", icon: <Dumbbell className="w-4 h-4" /> },
  { id: "yoga", name: "Yoga", icon: <Heart className="w-4 h-4" /> },
  { id: "cardio", name: "Cardio", icon: <Clock className="w-4 h-4" /> }
];

const Workouts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  
  const filterWorkouts = () => {
    return allWorkouts.filter(workout => {
      // Filter by search query
      if (
        searchQuery &&
        !workout.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !workout.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      
      // Filter by category
      if (selectedCategory !== "all" && 
          workout.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      
      // Filter by difficulty
      if (selectedDifficulty !== "all" && 
          workout.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort workouts
      if (sortOption === "newest") {
        return 0; // In a real app, we'd sort by date
      } else if (sortOption === "popular") {
        return b.likes - a.likes;
      } else if (sortOption === "duration") {
        return a.duration - b.duration;
      }
      return 0;
    });
  };
  
  const filteredWorkouts = filterWorkouts();
  
  return (
    <div className="pb-20 sm:pb-0">
      <Navbar />
      <main className="app-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Workout Library</h1>
          
          <div className="relative w-full md:w-auto">
            <Input
              placeholder="Search workouts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Filters - Side Panel */}
          <div className="md:col-span-3">
            <div className="fitness-card">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Filters</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Category</h4>
                  <div className="space-y-1">
                    {categories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        className="w-full justify-start gap-2"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.icon}
                        <span>{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Difficulty</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {["all", "beginner", "intermediate", "advanced"].map(difficulty => (
                      <Button
                        key={difficulty}
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        className="py-1 h-auto"
                        onClick={() => setSelectedDifficulty(difficulty)}
                      >
                        {difficulty === "all" ? "All" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Sort By</h4>
                  <div className="space-y-1">
                    {[
                      { id: "newest", label: "Newest" },
                      { id: "popular", label: "Most Popular" },
                      { id: "duration", label: "Shortest Duration" }
                    ].map(option => (
                      <Button
                        key={option.id}
                        variant={sortOption === option.id ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSortOption(option.id)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Workouts Grid */}
          <div className="md:col-span-9">
            <Tabs defaultValue="all">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {filteredWorkouts.length === 0 ? (
                  <div className="fitness-card text-center py-10">
                    <h3 className="text-lg font-medium mb-2">No workouts found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredWorkouts.map(workout => (
                      <WorkoutCard key={workout.id} workout={workout} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-6">
                <div className="fitness-card text-center py-10">
                  <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground mb-4">Save workouts to access them quickly</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">Browse Workouts</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWorkouts.slice(0, 3).map(workout => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommended" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredWorkouts.slice(1, 4).map(workout => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workouts;
