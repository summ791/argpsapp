import { Link, useLocation } from "wouter";
import { Home, CalendarCheck, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-40 border-b border-gray-100">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800 text-center">
            ARGPS Nutritious Lifestyle
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 pb-20 min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex justify-around py-2">
          <Link href="/">
            <button 
              className={`flex flex-col items-center py-2 px-4 ${
                location === "/" ? "text-[var(--wellness-green)]" : "text-gray-400"
              }`}
            >
              <Home className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Home</span>
            </button>
          </Link>
          
          <Link href="/booking">
            <button 
              className={`flex flex-col items-center py-2 px-4 ${
                location === "/booking" ? "text-[var(--wellness-green)]" : "text-gray-400"
              }`}
            >
              <CalendarCheck className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Book</span>
            </button>
          </Link>
          
          <Link href="/profile">
            <button 
              className={`flex flex-col items-center py-2 px-4 ${
                location === "/profile" ? "text-[var(--wellness-green)]" : "text-gray-400"
              }`}
            >
              <User className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">Profile</span>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
