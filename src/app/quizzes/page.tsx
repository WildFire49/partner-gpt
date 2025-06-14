"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trophy, 
  Award,
  ChevronRight,
  ArrowRight
} from "lucide-react";

// Quiz types
type QuizCategory = "personality" | "relationship" | "fun" | "growth";

type Quiz = {
  id: string;
  title: string;
  description: string;
  category: QuizCategory;
  questionCount: number;
  timeEstimate: string;
  imageUrl?: string;
  completed?: boolean;
  featured?: boolean;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
};

// Sample quizzes
const sampleQuizzes: Quiz[] = [
  {
    id: "love-language",
    title: "Love Language Quiz",
    description: "Discover how you prefer to give and receive love with this insightful assessment.",
    category: "relationship",
    questionCount: 15,
    timeEstimate: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=500&auto=format&fit=crop",
    featured: true
  },
  {
    id: "personality-type",
    title: "Personality Type Indicator",
    description: "Learn about your personality traits and how they influence your relationships.",
    category: "personality",
    questionCount: 20,
    timeEstimate: "8 min",
    imageUrl: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "relationship-strengths",
    title: "Relationship Strengths",
    description: "Identify the strongest aspects of your relationship and areas for growth.",
    category: "relationship",
    questionCount: 12,
    timeEstimate: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: "emotional-intelligence",
    title: "Emotional Intelligence Assessment",
    description: "Measure your ability to recognize and manage emotions in yourself and others.",
    category: "growth",
    questionCount: 18,
    timeEstimate: "7 min",
  },
  {
    id: "movie-match",
    title: "Movie Taste Matcher",
    description: "Fun quiz to discover movies you might enjoy based on your preferences.",
    category: "fun",
    questionCount: 10,
    timeEstimate: "3 min",
    completed: true,
  },
  {
    id: "communication-style",
    title: "Communication Style Analysis",
    description: "Understand how you communicate and how to connect better with others.",
    category: "growth",
    questionCount: 15,
    timeEstimate: "6 min",
    imageUrl: "https://images.unsplash.com/photo-1522839912487-139b3043853a?q=80&w=500&auto=format&fit=crop",
  },
];

// Sample questions for a quiz
const sampleQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "What makes you feel most appreciated?",
    options: [
      "Receiving a thoughtful gift",
      "Spending quality time together",
      "Hearing words of affirmation",
      "Physical touch like hugs or hand-holding"
    ]
  },
  {
    id: "q2",
    question: "When someone is upset, you typically:",
    options: [
      "Give them space to process their feelings",
      "Offer practical solutions to their problem",
      "Listen attentively and validate their feelings",
      "Try to cheer them up with humor or activities"
    ]
  },
  {
    id: "q3",
    question: "You feel most connected to others when:",
    options: [
      "Having deep conversations about meaningful topics",
      "Engaging in shared activities or experiences",
      "Supporting each other through challenges",
      "Celebrating achievements together"
    ]
  },
];

export default function QuizzesPage() {
  const [activeCategory, setActiveCategory] = useState<QuizCategory | "all">("all");
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  
  // Filter quizzes by category
  const filteredQuizzes = activeCategory === "all"
    ? sampleQuizzes
    : sampleQuizzes.filter(quiz => quiz.category === activeCategory);
    
  // Featured quiz
  const featuredQuiz = sampleQuizzes.find(quiz => quiz.featured);
  
  // Handle starting a quiz
  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };
  
  // Handle answering a question
  const answerQuestion = (optionIndex: number) => {
    const currentQuestion = sampleQuestions[currentQuestionIndex];
    setAnswers({...answers, [currentQuestion.id]: optionIndex});
    
    // Move to next question or finish quiz
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Complete the quiz
  const completeQuiz = () => {
    setActiveQuiz(null);
  };
  
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
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="container py-8 max-w-6xl">
      {activeQuiz ? (
        // Quiz taking interface
        <div className="max-w-3xl mx-auto">
          {/* Quiz header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{activeQuiz.title}</h1>
            <p className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {sampleQuestions.length}
            </p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-2 bg-muted rounded-full mb-12">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ 
                width: `${((currentQuestionIndex + 1) / sampleQuestions.length) * 100}%` 
              }}
            ></div>
          </div>
          
          {/* Current question */}
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                {sampleQuestions[currentQuestionIndex].question}
              </h2>
              
              <div className="space-y-3">
                {sampleQuestions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => answerQuestion(index)}
                    className={`w-full text-left p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors ${
                      answers[sampleQuestions[currentQuestionIndex].id] === index
                        ? "border-primary bg-primary/10"
                        : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-10">
            <Button 
              variant="outline" 
              onClick={() => setActiveQuiz(null)}
            >
              Exit Quiz
            </Button>
            
            {currentQuestionIndex === sampleQuestions.length - 1 && (
              <Button onClick={completeQuiz}>
                Complete Quiz
              </Button>
            )}
          </div>
        </div>
      ) : (
        // Quiz listing
        <>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-heading">Quizzes & Assessments</h1>
          </div>
          
          {/* Featured quiz */}
          {featuredQuiz && (
            <div className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent mix-blend-multiply"></div>
                <div 
                  className="bg-cover bg-center h-64 md:h-80"
                  style={{ backgroundImage: `url(${featuredQuiz.imageUrl})` }}
                >
                  <div className="h-full p-6 md:p-8 flex flex-col justify-end relative z-10">
                    <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs inline-block w-fit mb-4">
                      Featured
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {featuredQuiz.title}
                    </h2>
                    <p className="text-white/80 mb-5 max-w-lg">
                      {featuredQuiz.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <Button 
                        onClick={() => startQuiz(featuredQuiz)} 
                        className="flex items-center gap-1"
                      >
                        Take Quiz <ArrowRight className="h-4 w-4" />
                      </Button>
                      <div className="text-white/80 flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4" />
                        {featuredQuiz.timeEstimate}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Category filters */}
          <div className="overflow-x-auto mb-6">
            <div className="flex gap-2 min-w-max pb-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                All Quizzes
              </button>
              <button
                onClick={() => setActiveCategory("personality")}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === "personality"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Personality
              </button>
              <button
                onClick={() => setActiveCategory("relationship")}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === "relationship"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Relationship
              </button>
              <button
                onClick={() => setActiveCategory("growth")}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === "growth"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Personal Growth
              </button>
              <button
                onClick={() => setActiveCategory("fun")}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === "fun"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Fun
              </button>
            </div>
          </div>
          
          {/* Quiz cards */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredQuizzes.map(quiz => (
              <motion.div
                key={quiz.id}
                variants={itemVariants}
                className="border border-border rounded-xl overflow-hidden bg-card flex flex-col"
              >
                {quiz.imageUrl && (
                  <div className="h-40 overflow-hidden">
                    <img
                      src={quiz.imageUrl}
                      alt={quiz.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2">
                    {quiz.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      {quiz.questionCount} questions
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {quiz.timeEstimate}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => startQuiz(quiz)}
                    variant={quiz.completed ? "outline" : "default"}
                    className="w-full flex items-center justify-center gap-1"
                  >
                    {quiz.completed ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Take Again
                      </>
                    ) : (
                      <>
                        Start Quiz
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
}
