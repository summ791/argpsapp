import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeProps {
  onGetStarted: () => void;
}

export default function Welcome({ onGetStarted }: WelcomeProps) {
  return (
    <div className="min-h-screen relative">
      {/* Fresh fruits and vegetables background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080" 
          alt="Fresh fruits and vegetables background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Welcome Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="bg-white bg-opacity-95 rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl backdrop-blur-sm">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            ARGPS Nutritious Lifestyle
          </h1>
          <div className="w-16 h-1 bg-wellness-green mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-gray-700 mb-2 font-medium">
            Rithanya Gopinathan
          </p>
          <p className="text-base text-gray-600 mb-8">
            Wellness Consultant
          </p>
          <Button 
            onClick={onGetStarted}
            className="w-full bg-gradient-to-r from-[var(--wellness-green)] to-[var(--wellness-green-light)] text-white font-semibold py-4 px-8 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
