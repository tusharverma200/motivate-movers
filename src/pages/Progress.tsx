
import Navbar from "@/components/Navbar";
import ProgressTracker from "@/components/ProgressTracker";
import GoalCard from "@/components/GoalCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useState } from "react";

// Mock data for user goals
const userGoalsDemo = [
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
  const [popupOpen, setPopuPOpen] = React.useState(false);
  const [goal, setGoal] = useState(
  {
    id: "",
      title: "",
      description: "",
      progress: 0,
      target: 0,
      unit: "",
      dueDate: "",
      category: "fitness",
    }
  );
  goal.id= Math.random().toString(36).substring(2, 9); // Generate a random ID for the goal
  const Goals = JSON.parse(localStorage.getItem("userGoals"));
  const [userGoals, setUserGoals] = React.useState(Goals || userGoalsDemo);
  localStorage.setItem("userGoals", JSON.stringify(userGoals));
 
  console.log(Goals);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal((prev) => ({ ...prev, [name]: value }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserGoals((prev) => [...prev, goal]);
    // Reset goal state after submission
    setGoal(  {
      id: "",
      title: "",
      description: "",
      progress: 0,
      target: 0,
      unit: "",
      dueDate: "",
      category: "fitness",
    });
    // Close the popover

    setPopuPOpen(false);
  };

  return (
    <div className="pb-20 sm:pb-0">
      <Navbar />
      <main className="app-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">My Progress</h1>
          
          <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-primary"> <PlusCircle/> Add Goal</Button>
        </PopoverTrigger>
        <PopoverContent className="w-160">
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Fill Goal Details</h2>

 

      {/* Title */}
      <label className="block mb-2">
        <span className="text-gray-700">Title</span>
        <input
          type="text"
          name="title"
          className="w-full p-2 border rounded"
          value={goal.title}
          onChange={handleChange}
          required
        />
      </label>

      {/* Description */}
      <label className="block mb-2">
        <span className="text-gray-700">Description</span>
        <input
          type="text"
          name="description"
          className="w-full p-2 border rounded"
          value={goal.description}
          onChange={handleChange}
          required
        />
      </label>

      {/* Progress */}
      <label className="block mb-2">
        <span className="text-gray-700">Progress</span>
        <input
          type="number"
          name="progress"
          className="w-full p-2 border rounded"
          value={goal.progress}
          onChange={handleChange}
          required
        />
      </label>

      {/* Target */}
      <label className="block mb-2">
        <span className="text-gray-700">Target</span>
        <input
          type="number"
          name="target"
          className="w-full p-2 border rounded"
          value={goal.target}
          onChange={handleChange}
          required
        />
      </label>

      {/* Unit */}
      <label className="block mb-2">
        <span className="text-gray-700">Unit</span>
        <input
          type="text"
          name="unit"
          className="w-full p-2 border rounded"
          value={goal.unit}
          onChange={handleChange}
          required
        />
      </label>

      {/* Due Date */}
      <label className="block mb-2">
        <span className="text-gray-700">Due Date</span>
        <input
          type="date"
          name="dueDate"
          className="w-full p-2 border rounded"
          value={goal.dueDate}
          onChange={handleChange}
        />
      </label>

      {/* Category */}
      <label className="block mb-4">
        <span className="text-gray-700">Category</span>
        <select
          name="category"
          className="w-full p-2 border rounded"
          value={goal.category}
          onChange={handleChange}
        >
          <option value="fitness">Fitness</option>
          <option value="nutrition">Nutrition</option>
          <option value="wellness">Wellness</option>
        </select>
      </label>

      {/* Submit Button */}
      <Button type="submit" className="bg-primary hover:bg-primary/90 text-white w-full">
        Submit Goal
      </Button>
    </form>
        </PopoverContent>
      </Popover>
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


                <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-primary">Add Goal</Button>
        </PopoverTrigger>
        <PopoverContent className="w-160">
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Fill Goal Details</h2>

 

      {/* Title */}
      <label className="block mb-1">
        <span className="text-gray-700">Title</span>
        <input
          type="text"
          name="title"
          className="w-full p-2 border rounded"
          value={goal.title}
          onChange={handleChange}
          required
        />
      </label>

      {/* Description */}
      <label className="block mb-1">
        <span className="text-gray-700">Description</span>
        <input
          type="text"
          name="description"
          className="w-full p-2 border rounded"
          value={goal.description}
          onChange={handleChange}
          required
        />
      </label>

      {/* Progress */}
      <label className="block mb-1">
        <span className="text-gray-700">Progress</span>
        <input
          type="number"
          name="progress"
          className="w-full p-2 border rounded"
          value={goal.progress}
          onChange={handleChange}
          required
        />
      </label>

      {/* Target */}
      <label className="block mb-1">
        <span className="text-gray-700">Target</span>
        <input
          type="number"
          name="target"
          className="w-full p-2 border rounded"
          value={goal.target}
          onChange={handleChange}
          required
        />
      </label>

      {/* Unit */}
      <label className="block mb-1">
        <span className="text-gray-700">Unit</span>
        <input
          type="text"
          name="unit"
          className="w-full p-2 border rounded"
          value={goal.unit}
          onChange={handleChange}
          required
        />
      </label>

      {/* Due Date */}
      <label className="block mb-1">
        <span className="text-gray-700">Due Date</span>
        <input
          type="date"
          name="dueDate"
          className="w-full p-2 border rounded"
          value={goal.dueDate}
          onChange={handleChange}
        />
      </label>

      {/* Category */}
      <label className="block mb-1">
        <span className="text-gray-700">Category</span>
        <select
          name="category"
          className="w-full p-2 border rounded"
          value={goal.category}
          onChange={handleChange}
        >
          <option value="fitness">Fitness</option>
          <option value="nutrition">Nutrition</option>
          <option value="wellness">Wellness</option>
        </select>
      </label>

      {/* Submit Button */}
      <Button type="submit" className="bg-primary hover:bg-primary/90 text-white w-full">
        Submit Goal
      </Button>
    </form>
        </PopoverContent>
      </Popover>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    
    </div>
  );
};

export default Progress;
