
import { useState } from "react";
import { Heart, MessageSquare, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for social feed posts
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

const SocialFeed = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="all">All Activity</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {mockPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="friends" className="space-y-4 mt-4">
          {mockPosts.slice(0, 2).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
        
        <TabsContent value="trending" className="space-y-4 mt-4">
          {mockPosts.slice(1, 3).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const PostCard = ({ post }: { post: any }) => {
  const [liked, setLiked] = useState(false);
  
  return (
    <div className="fitness-card space-y-4">
      {/* Post header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          {post.user.avatar ? (
            <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <User className="w-5 h-5 text-primary" />
            </div>
          )}
        </div>
        <div>
          <h4 className="font-semibold">{post.user.name}</h4>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
      </div>
      
      {/* Post content */}
      <p>{post.content}</p>
      
      {/* Workout details (if available) */}
      {post.workout && (
        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="text-sm font-medium mb-1">{post.workout.type}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {post.workout.duration && <span>{post.workout.duration}</span>}
            {post.workout.distance && <span>{post.workout.distance}</span>}
            {post.workout.exercises && (
              <span>{post.workout.exercises.join(", ")}</span>
            )}
            {post.workout.focus && <span>{post.workout.focus}</span>}
          </div>
        </div>
      )}
      
      {/* Post image (if available) */}
      {post.image && (
        <div className="rounded-lg overflow-hidden">
          <img src={post.image} alt="Post content" className="w-full h-auto" />
        </div>
      )}
      
      {/* Post actions */}
      <div className="flex justify-between pt-2 border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`flex items-center gap-1 ${liked ? 'text-red-500' : ''}`}
          onClick={() => setLiked(!liked)}
        >
          <Heart className="w-4 h-4" fill={liked ? "currentColor" : "none"} />
          <span>{liked ? post.likes + 1 : post.likes}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          <span>{post.comments}</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialFeed;
