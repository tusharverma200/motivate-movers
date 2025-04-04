
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SocialFeed from "@/components/SocialFeed";
import UserProfile from "@/components/UserProfile";
import WorkoutCard from "@/components/WorkoutCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const mockPosts = [
  {
    id: "1",
    user: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg"
    },
    content: "Just completed my 10k run! Feeling amazing and one step closer to my marathon goal. 🏃‍♀️",
    image: null,
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
    workout: {
      type: "Running",
      duration: "45 min",
      distance: "10 km"
    }
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      avatar: "/placeholder.svg"
    },
    content: "New personal best on chest day! Consistency is key, folks. 💪",
    image: null,
    timestamp: "5 hours ago",
    likes: 18,
    comments: 3,
    workout: {
      type: "Strength Training",
      duration: "60 min",
      exercises: ["Bench Press", "Incline Press", "Cable Flys"]
    }
  },
  {
    id: "3",
    user: {
      name: "Jasmine Park",
      avatar: "/placeholder.svg"
    },
    content: "Morning yoga to start the day right. Who else makes time for mindfulness in their fitness routine?",
    image: null,
    timestamp: "8 hours ago",
    likes: 32,
    comments: 7,
    workout: {
      type: "Yoga",
      duration: "30 min",
      focus: "Flexibility & Balance"
    }
  }
];

const Index = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState("");
  const Posts = JSON.parse(localStorage.getItem("posts"));
  const [posts, setPosts] = useState(Posts || mockPosts); // ← Import this from SocialFeed file or move it here
  const user = useUser();
  const recommended = JSON.parse(localStorage.getItem("recommendedWorkouts"));
  localStorage.setItem("posts", JSON.stringify(posts));

  useEffect(()=>{

   const response =  axios.get("https://wger.de/api/v2/muscle/")
     console.log(response)
  }, [])
  
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
                <Link to="/workouts" variant="ghost" size="sm" className="text-primary">View All</Link>
              </div>
              
              <div className="space-y-3">
                {recommended.slice(1,4).map(workout => (
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
                    <Button
  onClick={() => {
    const newPost = {
      id: Date.now().toString(),
      user: {
        name: user.user?.fullName || "User",
        avatar: user.user?.imageUrl || "/placeholder.svg"
      },
      content: postContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      image: null,
      workout: null
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
    setShowCreatePost(false);
  }}
  className="bg-primary hover:bg-primary/90 text-white"
>
  Post
</Button>

                  </div>
                </div>
              )}
            </div>
            
            <SocialFeed posts={Posts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
