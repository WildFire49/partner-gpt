"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Message types
type MessageRole = "user" | "assistant";
type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
};

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hi there! I'm your PartnerGPT companion. How are you feeling today?",
    timestamp: new Date(),
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "" || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response after short delay
    setTimeout(() => {
      const responses = [
        "I understand how you feel. Would you like to talk more about that?",
        "Thanks for sharing that with me. How does that make you feel?",
        "I'm here for you. Tell me more about what's on your mind.",
        "That's interesting! I'd love to hear more about your perspective on this.",
        "I appreciate you opening up to me. Is there anything specific you'd like to discuss?",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  // Auto-resize textarea as content grows
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [input]);
  
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed z-20 top-20 left-4 p-2 rounded-md bg-background border border-border"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed lg:static inset-0 z-10 w-[280px] lg:w-80 border-r border-border bg-card lg:bg-muted/30 p-4 overflow-auto"
          >
            <div className="flex flex-col h-full">
              <h2 className="font-bold text-xl mb-4">Chat History</h2>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full p-2 rounded-md border border-input bg-background"
                />
              </div>
              
              <div className="flex-1 overflow-auto space-y-2">
                <button className="w-full p-3 text-left rounded-lg hover:bg-muted flex items-center gap-2 bg-primary/10">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div>
                    <p className="text-sm font-medium">Current Chat</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </button>
                
                {[...Array(5)].map((_, i) => (
                  <button 
                    key={i}
                    className="w-full p-3 text-left rounded-lg hover:bg-muted flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40"></div>
                    <div>
                      <p className="text-sm font-medium">Chat {i + 1}</p>
                      <p className="text-xs text-muted-foreground">{i + 1} days ago</p>
                    </div>
                  </button>
                ))}
              </div>
              
              <Button className="mt-4">New Chat</Button>
              <div className="h-20 lg:hidden"></div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-tl-none p-4 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Chat input */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2">
              <div className="flex-1 bg-background border border-input rounded-lg flex items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  rows={1}
                  className="min-h-[44px] max-h-[200px] w-full resize-none bg-transparent p-2 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
              </div>
              
              <Button 
                type="submit"
                size="icon"
                disabled={input.trim() === "" || isLoading}
                className="h-11 w-11 rounded-full flex-shrink-0"
              >
                <Send size={20} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
