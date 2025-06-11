import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

import Welcome from "@/pages/welcome";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import Booking from "@/pages/booking";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";
import Header from "./components/Header";

function Router() {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <Welcome onGetStarted={() => setShowWelcome(false)} />;
  }

  return (
    <>
      <Header />
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/booking" component={Booking} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
