"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarIcon,
  Search,
  Plus,
  Heart,
  MessageCircle,
  Share2,
  BookmarkPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Memory type
type Memory = {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[];
  imageUrl?: string;
  likes: number;
  comments: number;
};

// Sample memories
const sampleMemories: Memory[] = [
  {
    id: "1",
    title: "Our First Conversation",
    content: "Today I had my first meaningful conversation with PartnerGPT. We talked about my goals for the upcoming year and it gave me some great insights on how to approach them.",
    date: new Date(2025, 5, 10),
    tags: ["conversation", "goals", "reflection"],
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    likes: 5,
    comments: 2
  },
  {
    id: "2",
    title: "Morning Journaling Session",
    content: "Started my day with a quick journaling session guided by PartnerGPT. It asked all the right questions to get me thinking about what I want to accomplish today.",
    date: new Date(2025, 5, 12),
    tags: ["journaling", "morning", "routine"],
    likes: 3,
    comments: 1
  },
  {
    id: "3",
    title: "Weekend Trip Planning",
    content: "PartnerGPT helped me plan a surprise weekend getaway. It remembered all my partner's preferences and suggested some amazing restaurants and activities!",
    date: new Date(2025, 5, 13),
    tags: ["planning", "travel", "surprise"],
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    likes: 8,
    comments: 4
  },
  {
    id: "4",
    title: "Book Recommendation Discussion",
    content: "Had a deep conversation about the last book I read. PartnerGPT shared some fascinating perspectives I hadn't considered and recommended similar books I might enjoy.",
    date: new Date(2025, 5, 14),
    tags: ["books", "recommendations", "discussion"],
    likes: 6,
    comments: 3
  }
];

// Filter options
const filterOptions = [
  "All Memories",
  "This Week",
  "This Month",
  "Last 3 Months",
  "Last Year",
  "Favorites"
];

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>(sampleMemories);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Memories");
  
  // Handle search
  const filteredMemories = memories.filter(memory => 
    memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-heading">Your Memories</h1>
        
        <div className="flex gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 p-2 w-full rounded-md border border-input bg-background"
            />
          </div>
          
          <Button className="flex items-center gap-1.5">
            <Plus className="h-4 w-4" />
            New Memory
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="overflow-x-auto mb-6">
        <div className="flex gap-2 min-w-max pb-2">
          {filterOptions.map(filter => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Memories grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredMemories.length > 0 ? (
          filteredMemories.map(memory => (
            <motion.div
              key={memory.id}
              className="border border-border rounded-xl overflow-hidden bg-card flex flex-col h-full"
              variants={itemVariants}
            >
              {memory.imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                  {format(memory.date, "MMM d, yyyy")}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
                <p className="text-muted-foreground mb-3 flex-1 line-clamp-3">
                  {memory.content}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {memory.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="pt-3 border-t border-border flex justify-between">
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm">
                    <Heart className="h-4 w-4" />
                    {memory.likes}
                  </button>
                  <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm">
                    <MessageCircle className="h-4 w-4" />
                    {memory.comments}
                  </button>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:text-foreground">
                    <BookmarkPlus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No memories found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for
            </p>
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Clear search
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
