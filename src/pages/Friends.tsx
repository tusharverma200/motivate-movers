
import Navbar from "@/components/Navbar";
import FriendsList from "@/components/FriendsList";

const Friends = () => {
  return (
    <div className="pb-20 sm:pb-0">
      <Navbar />
      <main className="app-container py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Connect With Friends</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <FriendsList />
          </div>
          
          <div className="lg:col-span-4">
            <div className="fitness-card">
              <h3 className="font-bold text-lg mb-4">Why Connect?</h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-3 py-1">
                  <h4 className="font-medium">Stay Motivated</h4>
                  <p className="text-sm text-muted-foreground">Friends can help you stay accountable and push you to achieve your goals.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-3 py-1">
                  <h4 className="font-medium">Share Achievements</h4>
                  <p className="text-sm text-muted-foreground">Celebrate your fitness milestones with friends who understand the journey.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-3 py-1">
                  <h4 className="font-medium">Find Workout Partners</h4>
                  <p className="text-sm text-muted-foreground">Exercise is more fun with friends! Find local workout buddies.</p>
                </div>
                
                <div className="border-l-4 border-primary pl-3 py-1">
                  <h4 className="font-medium">Exchange Tips</h4>
                  <p className="text-sm text-muted-foreground">Learn from others' experiences and share your own fitness knowledge.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Friends;
