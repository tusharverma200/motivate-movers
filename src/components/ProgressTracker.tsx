
import { TrendingUp, Calendar, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the progress chart
const progressData = [
  { day: 'Mon', workout: 30 },
  { day: 'Tue', workout: 45 },
  { day: 'Wed', workout: 0 },
  { day: 'Thu', workout: 60 },
  { day: 'Fri', workout: 30 },
  { day: 'Sat', workout: 90 },
  { day: 'Sun', workout: 45 },
];

// Mock data for goals
const goalData = [
  { name: "Weekly Workouts", current: 4, target: 5, percentage: 80 },
  { name: "Monthly Distance", current: 42, target: 50, unit: "km", percentage: 84 },
  { name: "Weight Goal", current: 68, target: 65, unit: "kg", percentage: 90 },
];

const ProgressTracker = () => {
  return (
    <div className="space-y-6">
      <div className="fitness-card">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Weekly Activity</h3>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={progressData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorWorkout" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                label={{ value: 'Minutes', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="workout" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorWorkout)" 
                name="Workout Duration (min)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="fitness-card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Goals Progress</h3>
        </div>
        
        <div className="space-y-6">
          {goalData.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium">{goal.name}</div>
                <div className="text-sm">
                  {goal.current} / {goal.target} {goal.unit || ""}
                </div>
              </div>
              <Progress value={goal.percentage} className="h-2.5" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="fitness-card">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-lg">Monthly Stats</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="text-4xl font-bold text-primary">12</div>
            <div className="text-sm text-muted-foreground">Workouts Completed</div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="text-4xl font-bold text-primary">420</div>
            <div className="text-sm text-muted-foreground">Minutes Active</div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="text-4xl font-bold text-primary">42</div>
            <div className="text-sm text-muted-foreground">Kilometers</div>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="text-4xl font-bold text-primary">3</div>
            <div className="text-sm text-muted-foreground">New Records</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
