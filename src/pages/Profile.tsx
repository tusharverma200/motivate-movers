
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import GoalCard from "@/components/GoalCard";
import WorkoutCard from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

// Mock data for user goals
const userGoals = [
  {
    id: "1",
    title: "Run a 5K",
    description: "Complete a 5K run under 30 minutes",
    progress: 3.2,
    target: 5,
    unit: "km",
    dueDate: "June 30, 2023",
    category: "fitness" as const
  },
  {
    id: "2",
    title: "Protein Intake",
    description: "Consume 120g of protein daily",
    progress: 100,
    target: 100,
    unit: "g",
    category: "nutrition" as const
  },
  {
    id: "3",
    title: "Meditation",
    description: "Meditate for 10 minutes daily",
    progress: 5,
    target: 10,
    unit: "min",
    dueDate: "Daily",
    category: "wellness" as const
  }
];


const Profile = () => {

   const Goals = JSON.parse(localStorage.getItem("userGoals")) || userGoals;
const workouts = JSON.parse(localStorage.getItem("recommendedWorkouts"));

  return (
    <div className="pb-20 sm:pb-0">
      <Navbar />
      <main className="app-container py-6">
        <UserProfile />
        
        <div className="mt-8">
          <Tabs defaultValue="goals">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="history">Workout History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="goals" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Fitness Goals</h2>
                <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white fitness-button">
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Goal</span>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Goals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Workouts</h2>
                <Button variant="outline" className="fitness-button">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workouts.slice(0,3).map(workout => (
                  <div key={workout.id} className="space-y-1">
                    <WorkoutCard workout={workout} />
                    <div className="text-sm text-muted-foreground px-2">
                      Completed {workout.date}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;
