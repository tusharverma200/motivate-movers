
import { UserPlus, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { mock } from "node:test";

// Mock data for friends
let mockFriends = [
  { id: "1", name: "Emma Wilson", avatar: "/placeholder.svg", status: "friend", streak: 8, goal: "5k Training" },
  { id: "2", name: "James Lee", avatar: "/placeholder.svg", status: "friend", streak: 15, goal: "Weight Loss" },
  { id: "3", name: "Olivia Martinez", avatar: "/placeholder.svg", status: "friend", streak: 21, goal: "Muscle Building" },
  { id: "4", name: "Noah Taylor", avatar: "/placeholder.svg", status: "friend", streak: 5, goal: "Flexibility" },
];

// Mock data for suggestions
let mockSuggestions = [
  { id: "5", name: "Sophia Johnson", avatar: "/placeholder.svg", status: "suggestion", mutualFriends: 3 },
  { id: "6", name: "William Brown", avatar: "/placeholder.svg", status: "suggestion", mutualFriends: 2 },
  { id: "7", name: "Ava Davis", avatar: "/placeholder.svg", status: "suggestion", mutualFriends: 4 },
];

// Mock data for requests
let mockRequests = [
  { id: "8", name: "Liam Garcia", avatar: "/placeholder.svg", status: "request", mutualFriends: 1 },
  { id: "9", name: "Mia Rodriguez", avatar: "/placeholder.svg", status: "request", mutualFriends: 2 },
];

const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState(mockFriends);
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [requests, setRequests] = useState(mockRequests);

useEffect(()=>{

  const getResponse = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/users")
     console.log(response.data.users)
     const data = response.data.users
     let i=0;
while(i<response.data.users.length){
  for( let j =0; j<mockFriends.length; j++){
    mockFriends[j].avatar = data[i].image
    i++;
  }
  for( let j =0; j<mockSuggestions.length; j++){
    mockSuggestions[j].avatar = data[i].image
    i++;
  }
  for( let j =0; j<mockRequests.length; j++){
    mockRequests[j].avatar = data[i].image
    i++;
  }
  break;
}

    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  getResponse()
})
  
  const handleAddFriend = (id: string) => {
    const updatedSuggestions = suggestions.filter(suggestion => suggestion.id !== id);
    setSuggestions(updatedSuggestions);
    // In a real app, this would send a friend request
  };
  
  const handleAcceptRequest = (id: string) => {
    const request = requests.find(req => req.id === id);
    if (request) {
      setFriends([...friends, { ...request, status: "friend", streak: 0, goal: "New User" }]);
      setRequests(requests.filter(req => req.id !== id));
    }
  };
  
  const handleRejectRequest = (id: string) => {
    setRequests(requests.filter(req => req.id !== id));
  };
  
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Input
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      
      <Tabs defaultValue="friends">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
          <TabsTrigger value="requests">Requests ({requests.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="friends" className="mt-4 space-y-3">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No friends found matching "{searchQuery}"
            </div>
          ) : (
            filteredFriends.map(friend => (
              <FriendCard 
                key={friend.id}
                user={friend}
                type="friend"
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="suggestions" className="mt-4 space-y-3">
          {suggestions.map(suggestion => (
            <FriendCard 
              key={suggestion.id}
              user={suggestion}
              type="suggestion"
              onAddFriend={() => handleAddFriend(suggestion.id)}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="requests" className="mt-4 space-y-3">
          {requests.map(request => (
            <FriendCard 
              key={request.id}
              user={request}
              type="request"
              onAccept={() => handleAcceptRequest(request.id)}
              onReject={() => handleRejectRequest(request.id)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface FriendCardProps {
  user: any;
  type: "friend" | "suggestion" | "request";
  onAddFriend?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
}

const FriendCard = ({ user, type, onAddFriend, onAccept, onReject }: FriendCardProps) => {
  return (
    <div className="fitness-card flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10">
                <User className="w-6 h-6 text-primary" />
              </div>
            )}
          </div>
          {type === "friend" && user.streak > 0 && (
            <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {user.streak}
            </div>
          )}
        </div>
        
        <div>
          <h4 className="font-semibold">{user.name}</h4>
          {type === "friend" && (
            <p className="text-xs text-muted-foreground">{user.goal}</p>
          )}
          {(type === "suggestion" || type === "request") && user.mutualFriends > 0 && (
            <p className="text-xs text-muted-foreground">{user.mutualFriends} mutual friends</p>
          )}
        </div>
      </div>
      
      <div className="flex gap-2">
        {type === "friend" && (
          <Button variant="outline" size="sm">Message</Button>
        )}
        
        {type === "suggestion" && (
          <Button 
            onClick={onAddFriend}
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add</span>
          </Button>
        )}
        
        {type === "request" && (
          <>
            <Button 
              onClick={onReject}
              variant="outline" 
              size="sm"
            >
              Decline
            </Button>
            <Button 
              onClick={onAccept}
              variant="default" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Check className="w-4 h-4" />
              <span>Accept</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsList;
