"use client";

import { useState } from "react";
import { format, addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  Tag,
  Trash2,
  X
} from "lucide-react";

// Types
type EventType = "reminder" | "activity" | "milestone" | "task";

type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  time?: string;
  location?: string;
  description?: string;
  type: EventType;
  participants?: string[];
  tags?: string[];
};

// Sample events
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Weekly Check-in",
    date: new Date(2025, 5, 15),
    time: "10:00 AM",
    type: "reminder",
    description: "Regular check-in to discuss goals and progress"
  },
  {
    id: "2",
    title: "Movie Night Suggestion",
    date: new Date(2025, 5, 18),
    time: "7:00 PM",
    type: "activity",
    description: "Watch the new sci-fi movie you've been excited about"
  },
  {
    id: "3",
    title: "3 Month Anniversary",
    date: new Date(2025, 5, 20),
    type: "milestone",
    description: "Celebrate 3 months of using PartnerGPT!"
  },
  {
    id: "4",
    title: "Complete Journal Prompts",
    date: new Date(2025, 5, 12),
    type: "task",
    description: "Finish reflecting on this week's journal prompts"
  },
  {
    id: "5",
    title: "Virtual Coffee Chat",
    date: new Date(2025, 5, 16),
    time: "3:30 PM",
    type: "activity",
    description: "Casual conversation about your recent trip"
  }
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  
  // Month navigation
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  // Get days for current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = subDays(monthStart, monthStart.getDay()); // Start from previous Sunday
  const endDate = addDays(monthEnd, 6 - monthEnd.getDay()); // End on next Saturday
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Get events for selected date
  const selectedDateEvents = events.filter(event => 
    isSameDay(event.date, selectedDate)
  );
  
  // Check if a day has events
  const getDayEvents = (date: Date) => 
    events.filter(event => isSameDay(event.date, date));
  
  // Get event color based on type
  const getEventColor = (type: EventType) => {
    switch (type) {
      case "reminder":
        return "bg-blue-500";
      case "activity":
        return "bg-purple-500";
      case "milestone":
        return "bg-amber-500";
      case "task":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-heading">Calendar</h1>
        
        <Button onClick={() => setShowEventModal(true)} className="flex items-center gap-2 md:w-auto w-full">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>
      
      {/* Calendar navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Calendar grid */}
      <div className="rounded-lg border border-border overflow-hidden mb-8">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 bg-muted text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="py-2 font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 bg-card">
          {days.map((day, i) => {
            const dayEvents = getDayEvents(day);
            const isSelected = isSameDay(day, selectedDate);
            const isCurrentMonth = isSameMonth(day, currentDate);
            
            return (
              <button
                key={i}
                className={`min-h-[100px] p-2 border-t border-r border-border
                  ${i % 7 === 0 ? "border-l" : ""}
                  ${i >= 35 ? "border-b" : ""}
                  ${isSelected ? "bg-primary/10" : ""}
                  ${!isCurrentMonth ? "opacity-40" : ""}
                  hover:bg-muted/50 relative`}
                onClick={() => setSelectedDate(day)}
              >
                <div className={`w-7 h-7 flex items-center justify-center rounded-full mb-1
                  ${isToday(day) ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {format(day, "d")}
                </div>
                
                {/* Event indicators (max 3 shown) */}
                <div className="overflow-hidden space-y-1">
                  {dayEvents.slice(0, 2).map((event, j) => (
                    <div
                      key={j}
                      className={`text-xs truncate px-1.5 py-0.5 rounded-sm text-white ${getEventColor(event.type)}`}
                    >
                      {event.time ? `${event.time} · ` : ""}{event.title}
                    </div>
                  ))}
                  
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-muted-foreground px-1">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Selected date events */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          {format(selectedDate, "EEEE, MMMM d, yyyy")}
          {isToday(selectedDate) && (
            <span className="ml-2 text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              Today
            </span>
          )}
        </h2>
        
        {selectedDateEvents.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {selectedDateEvents.map(event => (
              <motion.div 
                key={event.id}
                variants={itemVariants}
                className={`border-l-4 ${getEventColor(event.type)} p-4 rounded-r-lg bg-card shadow-sm`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground space-y-1.5 mt-2">
                  {event.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </div>
                  )}
                  
                  {event.description && (
                    <p className="pt-1">{event.description}</p>
                  )}
                  
                  {event.tags && event.tags.length > 0 && (
                    <div className="flex items-center gap-2 pt-1">
                      <Tag className="h-3.5 w-3.5" />
                      <div className="flex flex-wrap gap-1">
                        {event.tags.map(tag => (
                          <span key={tag} className="bg-muted px-1.5 py-0.5 rounded-sm text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-lg bg-muted/30">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <CalendarIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No events for this day</h3>
            <p className="text-muted-foreground mb-4">
              Add a new event or choose another day
            </p>
            <Button onClick={() => setShowEventModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        )}
      </div>
      
      {/* Event modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-xl font-bold">Add New Event</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowEventModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Event Title</label>
                <input 
                  type="text"
                  placeholder="Enter event title"
                  className="w-full p-2 rounded-md border border-input bg-background"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <input 
                    type="date" 
                    defaultValue={format(selectedDate, "yyyy-MM-dd")}
                    className="w-full p-2 rounded-md border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time (optional)</label>
                  <input 
                    type="time"
                    className="w-full p-2 rounded-md border border-input bg-background" 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Event Type</label>
                <select className="w-full p-2 rounded-md border border-input bg-background">
                  <option value="reminder">Reminder</option>
                  <option value="activity">Activity</option>
                  <option value="milestone">Milestone</option>
                  <option value="task">Task</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Location (optional)</label>
                <input 
                  type="text"
                  placeholder="Enter location"
                  className="w-full p-2 rounded-md border border-input bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description (optional)</label>
                <textarea 
                  placeholder="Enter description"
                  className="w-full p-2 rounded-md border border-input bg-background min-h-[100px]"
                ></textarea>
              </div>
            </div>
            
            <div className="p-4 border-t border-border flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowEventModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowEventModal(false)}>
                Add Event
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
