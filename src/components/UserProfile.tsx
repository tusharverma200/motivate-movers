
import { User, Trophy, Activity, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@clerk/clerk-react";

interface UserProfileProps {
  compact?: boolean;
}

const UserProfile = ({ compact = false }: UserProfileProps) => {
  const userProfile = useUser();
  const userName = userProfile.user?.fullName || "User";
 const userAvatar = userProfile.user?.imageUrl || "/placeholder.svg";
  // Mock user data
  const user = {
    name: userName,
    avatar: userAvatar,
    streak: 12,
    workoutsCompleted: 48,
    currentGoal: "Lose 10 pounds",
    progress: 65,
    friends: 24,
    joinDate: "March 2023"
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-12 h-12 rounded-full bg-muted object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {user.streak}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.currentGoal}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fitness-card">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-muted object-cover"
          />
          <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            {user.streak}
          </div>
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
         
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{user.currentGoal}</span>
              <span className="text-sm font-medium">{user.progress}%</span>
            </div>
            <Progress value={user.progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <Trophy className="w-5 h-5 text-primary mb-1" />
              <span className="font-semibold">{user.streak}</span>
              <span className="text-xs">Day Streak</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <Activity className="w-5 h-5 text-primary mb-1" />
              <span className="font-semibold">{user.workoutsCompleted}</span>
              <span className="text-xs">Workouts</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
              <Users className="w-5 h-5 text-primary mb-1" />
              <span className="font-semibold">{user.friends}</span>
              <span className="text-xs">Friends</span>
            </div>
          </div>
          
      
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
