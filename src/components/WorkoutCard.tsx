import { Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
interface WorkoutCardProps {
  workout: WgerWorkout;
  onAddToFavourites: (workout: WgerWorkout) => void;
}
const WorkoutCard = ({ workout, onAddToFavourites }: WorkoutCardProps) => {
  const {
    category,
    description,
    equipment,
    muscles,
    muscles_secondary,
    image,
  } = workout;

  //console.log(workout);
  const img = image || "";

  return (
    <div className="fitness-card border rounded-2xl p-4 shadow-md bg-white flex flex-col justify-between">
      {/* Image or Icon */}
      <div className="h-40 w-full rounded-lg mb-3 bg-muted overflow-hidden relative">
        {image ? (
          <img
            src={image}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <Dumbbell className="w-10 h-10 text-primary" />
          </div>
        )}
        <Badge className="absolute top-2 left-2 bg-black/60 text-white border-none">
          {category.name}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-1">{category.name}</h3>

      {/* Muscles */}
      {muscles && muscles.length > 0 && (
        <div className="text-sm text-muted-foreground mb-1">
          <strong>Primary:</strong>{" "}
          {muscles.map((m) => m.name_en ).join(", ")}
        </div>
      )}
      { muscles_secondary && muscles_secondary.length > 0 && (
        <div className="text-sm text-muted-foreground mb-1">
          <strong>Secondary:</strong>{" "}
          {muscles_secondary.map((m) => m.name_en ).join(", ")}
        </div>
      )}

      {/* Equipment */}
      {equipment && equipment.length > 0 && (
        <div className="text-sm text-muted-foreground mb-3">
          <strong>Equipment:</strong>{" "}
          {equipment.map((e) => e.name).join(", ")}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-between items-center mt-3">
        <Button onClick={()=>onAddToFavourites(workout)} variant="outline">Add to Favourites</Button>
        <Button className="bg-primary text-white hover:bg-primary/90">
          Start Workout
        </Button>
      </div>
    </div>
  );
};

export default WorkoutCard;
