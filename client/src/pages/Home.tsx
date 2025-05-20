import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Map, FileText } from "lucide-react";

const Home = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">USPS Route Management</h1>
            <p className="text-lg mb-6 text-muted-foreground">
              Purple Pocket LLC specializes in managing and facilitating USPS route bidding and applications.
              We connect qualified drivers with available routes to ensure efficient mail delivery across the country.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/routes">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md shadow-md flex items-center">
                  <LuMap className="mr-2" /> View Routes
                </Button>
              </Link>
              <Link href="/solicitations">
                <Button variant="secondary" className="px-6 py-3 rounded-md shadow-md flex items-center">
                  <LuFileText className="mr-2" /> View Solicitations
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1591373030640-1a31034c9bf4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="USPS mail truck delivering mail on a residential street" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
