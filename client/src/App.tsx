import { Route, Switch } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Routes from "./pages/Routes";
import Solicitations from "./pages/Solicitations";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Feedback from "./pages/Feedback";
import Testimonials from "./pages/Testimonials";


function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/routes" component={Routes} />
            <Route path="/solicitations" component={Solicitations} />
            <Route path="/about" component={About} />
            <Route path="/faqs" component={FAQs} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/testimonials" component={Testimonials} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
