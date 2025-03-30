
import Navbar from "@/components/Navbar";
import ProgressTracker from "@/components/ProgressTracker";
import GoalCard from "@/components/GoalCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";

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

const Progress = () => {
  return (
    <div className="pb-20 sm:pb-0">
      <Navbar />
      <main className="app-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">My Progress</h1>
          
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white fitness-button">
            <PlusCircle className="w-4 h-4" />
            <span>New Goal</span>
          </Button>
        </div>
        
        <Tabs defaultValue="metrics">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="metrics">Fitness Metrics</TabsTrigger>
            <TabsTrigger value="goals">My Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="mt-6">
            <ProgressTracker />
          </TabsContent>
          
          <TabsContent value="goals" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userGoals.map(goal => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
              
              <div className="fitness-card flex flex-col items-center justify-center text-center border-2 border-dashed border-muted min-h-[200px]">
                <PlusCircle className="w-10 h-10 text-muted-foreground mb-2" />
                <h3 className="font-medium text-lg mb-1">Create New Goal</h3>
                <p className="text-sm text-muted-foreground mb-4">Track your progress towards specific fitness targets</p>
                <Button className="bg-primary hover:bg-primary/90 text-white">Add Goal</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Progress;
