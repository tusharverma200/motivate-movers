
import { Trophy, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface GoalCardProps {
  goal: {
    id: string;
    title: string;
    description: string;
    progress: number;
    target: number;
    unit: string;
    dueDate?: string;
    category: "fitness" | "nutrition" | "wellness";
  };
}

const GoalCard = ({ goal }: GoalCardProps) => {
  const { title, description, progress, target, unit, dueDate, category } = goal;
  
  const percentage = Math.min(Math.round((progress / target) * 100), 100);
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "fitness": return "bg-blue-100 text-blue-800";
      case "nutrition": return "bg-green-100 text-green-800";
      case "wellness": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className={cn(
      "fitness-card border-l-4",
      category === "fitness" ? "border-l-blue-500" : 
      category === "nutrition" ? "border-l-green-500" : 
      "border-l-purple-500"
    )}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          getCategoryColor(category)
        )}>
          {category}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">{progress} of {target} {unit}</span>
          </div>
          <div className="text-sm font-medium">{percentage}%</div>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
      
      {percentage === 100 && (
        <div className="mt-3 flex items-center gap-2 text-amber-500">
          <Trophy className="w-4 h-4" />
          <span className="text-sm font-medium">Goal achieved!</span>
        </div>
      )}
      
      {dueDate && percentage < 100 && (
        <div className="mt-3 text-sm text-muted-foreground">
          Due by {dueDate}
        </div>
      )}
    </div>
  );
};

export default GoalCard;
