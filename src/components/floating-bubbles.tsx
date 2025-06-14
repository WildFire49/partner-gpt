"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";

interface Bubble {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
  color: string;
}

export function FloatingBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full width and height
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize bubbles
    const initBubbles = () => {
      bubblesRef.current = [];
      const bubbleCount = Math.floor(window.innerWidth * window.innerHeight / 20000);
      
      // Bubble color based on theme
      const getLightColors = () => [
        'rgba(255, 182, 193, 0.4)',  // Light pink
        'rgba(173, 216, 230, 0.4)',  // Light blue
        'rgba(255, 222, 173, 0.4)',  // Light orange
        'rgba(152, 251, 152, 0.4)',  // Light green
        'rgba(221, 160, 221, 0.4)',  // Light purple
      ];
      
      const getDarkColors = () => [
        'rgba(255, 105, 180, 0.3)',  // Hot pink
        'rgba(100, 149, 237, 0.3)',  // Cornflower blue
        'rgba(255, 165, 0, 0.3)',    // Orange
        'rgba(50, 205, 50, 0.3)',    // Lime green
        'rgba(186, 85, 211, 0.3)',   // Medium orchid
      ];
      
      const colors = theme === 'dark' ? getDarkColors() : getLightColors();
      
      for (let i = 0; i < bubbleCount; i++) {
        bubblesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 60 + 20,
          alpha: Math.random() * 0.3 + 0.1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    // Animate bubbles
    const animateBubbles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubblesRef.current.forEach(bubble => {
        // Move bubble
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;
        
        // Wrap around edges
        if (bubble.x < -bubble.size) bubble.x = canvas.width + bubble.size;
        if (bubble.x > canvas.width + bubble.size) bubble.x = -bubble.size;
        if (bubble.y < -bubble.size) bubble.y = canvas.height + bubble.size;
        if (bubble.y > canvas.height + bubble.size) bubble.y = -bubble.size;
        
        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animateBubbles);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      initBubbles();
    });

    // Initialize
    resizeCanvas();
    initBubbles();
    animateBubbles();

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      bubblesRef.current.forEach(bubble => {
        // Calculate distance from mouse to bubble
        const dx = mouseX - bubble.x;
        const dy = mouseY - bubble.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // If mouse is close to bubble, push it away slightly
        if (dist < 200) {
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * (1 - dist / 200) * 2;
          const pushY = Math.sin(angle) * (1 - dist / 200) * 2;
          
          bubble.speedX -= pushX;
          bubble.speedY -= pushY;
          
          // Limit max speed
          const maxSpeed = 2;
          const currentSpeed = Math.sqrt(bubble.speedX * bubble.speedX + bubble.speedY * bubble.speedY);
          if (currentSpeed > maxSpeed) {
            bubble.speedX = (bubble.speedX / currentSpeed) * maxSpeed;
            bubble.speedY = (bubble.speedY / currentSpeed) * maxSpeed;
          }
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
