
import { useState } from "react";
import Navbar from "@/components/Navbar";
import WorkoutCard from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Dumbbell, Heart, Clock, TrendingUp } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import  WgerWorkout  from "../components/WorkoutCard"; 
// Mock data for workouts

interface Muscle {
  id: number;
  name: string;
  name_en: string;
  image_url_main?: string;
}

interface Equipment {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface WgerWorkout {
  id: number;
  category: Category;
  description: string;
  equipment: Equipment[];
  muscles: Muscle[];
  muscles_secondary: Muscle[];
  image?: string;
}



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
  const Workouts = JSON.parse(localStorage.getItem("recommendedWorkouts"));
  const [workouts, setWorkouts] = useState<WgerWorkout[]>(Workouts || []);
  const [loading, setLoading] = useState(true);
  const Favourites = JSON.parse(localStorage.getItem("favouriteWorkouts"));
  const [favouriteWorkouts, setFavouriteWorkouts] = useState<WgerWorkout[]>(Favourites|| []);
  localStorage.setItem("recommendedWorkouts", JSON.stringify(workouts));
  localStorage.setItem("favouriteWorkouts", JSON.stringify(favouriteWorkouts));
  useEffect(()=>{

    const getResponse = async () => {
      try {
        const exerciseResponse = await axios.get(
          "https://wger.de/api/v2/exerciseinfo/?language=2&limit=30"
        );
        const exercises = exerciseResponse.data.results;

        const imageResponse = await axios.get(
          "https://wger.de/api/v2/exerciseimage/?limit=300"
        );
        const images = imageResponse.data.results;
        const workoutsWithImages: WgerWorkout[] = exercises.map((exercise: any) => {
          const matchingImages = images.filter((img: any) => img.uuid === exercise.exercise_uuid);
          return {
            ...exercise,
            imagesMatched: matchingImages,
          };
        });

        let workWithImages = []
        exercises.forEach((exercise: any) => {
         images.forEach((img: any) => {
          
            if (img.exercise_uuid === exercise.uuid) {
              workWithImages.push({
                ...exercise,
                image: img.image,
              });
            }}) 
        })
        setWorkouts(workWithImages);
    //   console.log(workoutsWithImages)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getResponse();

  }, [])

  const handleAddToFavourites = (workout: WgerWorkout) => {
    // Avoid duplicates
    setFavouriteWorkouts((prev) => {
      if (prev.find((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };
  
  
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
            <Search className="absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                {workouts.length === 0 ? (
                  <div className="fitness-card text-center py-10">
                    <h3 className="text-lg font-medium mb-2">No workouts found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workouts.map(workout => (
                      <WorkoutCard key={workout.id} workout={workout}  onAddToFavourites={handleAddToFavourites} />
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-6">
  {favouriteWorkouts.length === 0 ? (
    <div className="fitness-card text-center py-10">
      <h3 className="text-lg font-medium mb-2">No favorites yet</h3>
      <p className="text-muted-foreground mb-4">Save workouts to access them quickly</p>
      <Button className="bg-primary hover:bg-primary/90 text-white">Browse Workouts</Button>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {favouriteWorkouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
          onAddToFavourites={handleAddToFavourites}
        />
      ))}
    </div>
  )}
</TabsContent>         
              <TabsContent value="recent" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workouts.slice(0, 3).map(workout => (
                    <WorkoutCard key={workout.id} workout={workout}  onAddToFavourites={handleAddToFavourites} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommended" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workouts.slice(1, 4).map(workout => (
                    <WorkoutCard key={workout.id} workout={workout}  onAddToFavourites={handleAddToFavourites} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
      </main>
    </div>
  );
};

export default Workouts;
