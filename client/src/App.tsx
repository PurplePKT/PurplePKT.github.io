import { Route, Switch } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Routes from "./pages/Routes";
import Solicitations from "./pages/Solicitations";
import About from "./pages/About";
import CsvDocumentation from "./pages/CsvDocumentation";

function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-800 via-purple-500 to-fuchsia-500">
        {/* Modern, crisp header with icon */}
        <header className="flex items-center gap-4 px-8 py-6 mx-auto w-full max-w-3xl">
          <span
            className="material-symbols-outlined"
            style={{
              display: "inline-block",
              width: 48,
              height: 48,
              background: "linear-gradient(135deg, #6A1B9A 0%, #9C27B0 100%)",
              borderRadius: "50%",
              boxShadow: "0 2px 10px rgba(106,27,154,0.15)",
              color: "#fff",
              fontSize: "2.2rem",
              textAlign: "center",
              lineHeight: "48px"
            }}
          >
            mail
          </span>
          <h1 className="font-bold text-3xl sm:text-4xl tracking-tight" style={{ color: "#6A1B9A" }}>
            Purple Pocket LLC
          </h1>
        </header>
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-8 backdrop-blur-md main-container">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/routes" component={Routes} />
              <Route path="/solicitations" component={Solicitations} />
              <Route path="/about" component={About} />
              <Route path="/documentation" component={CsvDocumentation} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;