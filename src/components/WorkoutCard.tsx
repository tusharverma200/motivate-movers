
import { Calendar, Clock, Dumbbell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WorkoutCardProps {
  workout: {
    id: string;
    title: string;
    category: string;
    duration: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    exercises: number;
    likes: number;
    image?: string;
  };
  compact?: boolean;
}

const WorkoutCard = ({ workout, compact = false }: WorkoutCardProps) => {
  const { title, category, duration, difficulty, exercises, likes, image } = workout;
  
  const getDifficultyColor = (level: string) => {
    switch(level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (compact) {
    return (
      <div className="fitness-card flex gap-3">
        <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <Dumbbell className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base">{title}</h3>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {duration} min
            </span>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty}
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fitness-card overflow-hidden">
      <div className="h-40 -mx-6 -mt-6 mb-4 bg-muted relative">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <Dumbbell className="w-12 h-12 text-primary" />
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-black/60 text-white border-none">
          {category}
        </Badge>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{duration} min</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Dumbbell className="w-4 h-4 text-muted-foreground" />
          <span>{exercises} exercises</span>
        </div>
        <Badge variant="outline" className={getDifficultyColor(difficulty)}>
          {difficulty}
        </Badge>
      </div>
      
      <div className="flex justify-between items-center">
        <Button variant="secondary" className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          <span>{likes}</span>
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-white">Start Workout</Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
