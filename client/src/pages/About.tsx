      import { useState, useEffect } from "react";
      import { Executive } from "../data/types";
      import { Card, CardContent } from "@/components/ui/card";
      import ExecutiveCard from '@/components/ExecutiveCard';
      import { Skeleton } from "@/components/ui/skeleton";
      import { Button } from "@/components/ui/button";
      import { CheckCircle } from "lucide-react";

      const About = () => {
        const [executives, setExecutives] = useState<Executive[]>([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<Error | null>(null);

        useEffect(() => {
          const fetchExecutives = async () => {
            try {
              setLoading(true);
              const response = await fetch("/data/executives.json");
              if (!response.ok) {
                throw new Error(`Failed to fetch executives data: ${response.statusText}`);
              }
              const data = await response.json();
              setExecutives(data);
              setLoading(false);
            } catch (err) {
              const error = err instanceof Error ? err : new Error("Failed to load executives data");
              setError(error);
              setLoading(false);
            }
          };
          fetchExecutives();
        }, []);

        // Render loading skeleton
        if (loading) {
          return (
            <section id="about" className="py-10 bg-background">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">About Purple Pocket LLC</h2>
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-2/3 md:pr-8">
                        <Skeleton className="h-8 w-48 mb-4" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-4 w-3/4 mb-6" />
                        <Skeleton className="h-8 w-48 mt-6 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                      </div>
                      <div className="md:w-1/3 mt-6 md:mt-0">
                        <Skeleton className="h-64 w-full mb-6" />
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-4 w-full mb-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <h3 className="text-2xl font-bold mb-6 text-center text-primary">Our Leadership Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <Skeleton className="h-48 w-full mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-3" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // Render error state
        if (error) {
          return (
            <section id="about" className="py-10 bg-background">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-primary">About Purple Pocket LLC</h2>
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                  <h3 className="text-xl text-destructive font-bold mb-4">Error Loading About Page</h3>
                  <p className="mb-4">{error.message}</p>
                  <Button onClick={() => window.location.reload()}>Try Again</Button>
                </div>
              </div>
            </section>
          );
        }

        return (
          <section id="about" className="py-10 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center text-primary">About Purple Pocket LLC</h2>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/3 md:pr-8">
                      <h3 className="text-xl font-semibold mb-4 text-primary">Our Mission</h3>
                      <p className="text-gray-700 mb-4 indented">
                        Purple Pocket LLC is a specialized logistics management company focused on connecting qualified carriers with USPS route opportunities. 
                        We facilitate the bidding process for USPS routes and help ensure efficient mail delivery across the United States.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Our mission is simple: to deliver with integrity and to operate with excellence. We understand the importance of timely, dependable service—not just for the postal system, but for the people and communities that count on us every day.
                      </p>
                      <p className="text-gray-700 mb-4">
                        We hold ourselves and our drivers to the highest standards. From route management to customer interaction, our focus is on doing the job right—with care, with precision, and with pride in the work we do.
                      </p>
                      <p className="text-gray-700 mb-4">
                        At Purple Pocket LLC, we believe that rural routes deserve big-city dependability. And we are here to deliver just that.
                      </p>
                      <h3 className="text-xl font-semibold mb-4 mt-6 text-primary">What We Do</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                        <li>Connect qualified drivers with available USPS routes</li>
                        <li>Manage the bidding process for postal contracts</li>
                        <li>Provide guidance on regulatory compliance</li>
                        <li>Offer training and support for new contractors</li>
                        <li>Monitor performance metrics to ensure service quality</li>
                      </ul>
                    </div>
                    <div className="md:w-1/3 mt-6 md:mt-0">
                      <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                        alt="Purple Pocket LLC team meeting" 
                        className="rounded-lg shadow-md w-full"
                      />
                      <div className="mt-6">
                        <h4 className="font-medium text-primary mb-2">Our Values</h4>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <CheckCircle className="text-secondary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">Reliability and accountability in every contract</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="text-secondary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">Transparency in bidding and contracting processes</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="text-secondary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">Excellence in service delivery and support</span>
                          </div>
                          <div className="flex items-start">
                            <CheckCircle className="text-secondary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">Innovation in logistics management solutions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Executive Team */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {executives.map((executive) => (
                  <ExecutiveCard key={executive.id} executive={executive} />
                ))}
              </div>
            </div>
          </section>
        );
      };

      export default About;
