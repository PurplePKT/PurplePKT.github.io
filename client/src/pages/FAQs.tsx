import { Link } from "wouter";

export default function FAQs() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-6">FAQs</h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page is coming soon. Check back later for frequently asked questions.
        </p>
        <Link href="/">
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md shadow-md">
            Return Home
          </button>
        </Link>
      </div>
    </section>
  );
}