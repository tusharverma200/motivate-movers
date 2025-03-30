
import { useState } from "react";
import Navbar from "@/components/Navbar";
import SocialFeed from "@/components/SocialFeed";
import UserProfile from "@/components/UserProfile";
import WorkoutCard from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Mock data for recommended workouts
const recommendedWorkouts = [
  {
    id: "1",
    title: "Morning HIIT Blast",
    category: "HIIT",
    duration: 25,
    difficulty: "Intermediate" as const,
    exercises: 8,
    likes: 156
  },
  {
    id: "2",
    title: "Full Body Strength",
    category: "Strength",
    duration: 45,
    difficulty: "Beginner" as const,
    exercises: 12,
    likes: 248
  },
  {
    id: "3",
    title: "Yoga Flow",
    category: "Yoga",
    duration: 30,
    difficulty: "Beginner" as const,
    exercises: 10,
    likes: 187
  }
];

const Index = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState("");
  
  return (
    <div className="pb-20 sm:pb-0">
      <Navbar />
      <main className="app-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Recommendations */}
          <div className="space-y-6">
            <UserProfile compact />
            
            <div className="fitness-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Recommended Workouts</h2>
                <Button variant="ghost" size="sm" className="text-primary">View All</Button>
              </div>
              
              <div className="space-y-3">
                {recommendedWorkouts.map(workout => (
                  <WorkoutCard key={workout.id} workout={workout} compact />
                ))}
              </div>
            </div>
          </div>
          
          {/* Center Column - Social Feed */}
          <div className="lg:col-span-2">
            <div className="fitness-card mb-6">
              <Button 
                onClick={() => setShowCreatePost(!showCreatePost)} 
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Share Your Workout</span>
              </Button>
              
              {showCreatePost && (
                <div className="mt-4 space-y-4">
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="What did you accomplish today?"
                    className="w-full h-24 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowCreatePost(false);
                        setPostContent("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-primary hover:bg-primary/90 text-white">Post</Button>
                  </div>
                </div>
              )}
            </div>
            
            <SocialFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
