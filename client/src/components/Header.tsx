import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, MousePointer2 } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className={`bg-primary text-white shadow-md sticky top-0 z-10 transition-shadow ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <MousePointer2 className="text-primary text-xl" />
              </div>
              <span className="text-xl font-medium">Purple Pocket LLC</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              className="p-2 text-white hover:bg-primary-dark focus:ring-2 focus:ring-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link href="/" className={`py-2 px-1 font-medium ${isActive('/') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}>
              Home
            </Link>
            <Link href="/routes" className={`py-2 px-1 font-medium ${isActive('/routes') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}>
              Routes
            </Link>
            <Link href="/solicitations" className={`py-2 px-1 font-medium ${isActive('/solicitations') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}>
              Solicitations
            </Link>
            <Link href="/about" className={`py-2 px-1 font-medium ${isActive('/about') ? 'border-b-2 border-white' : 'hover:border-b-2 hover:border-white'}`}>
              About
            </Link>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:hidden mt-2 pb-2`}>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded hover:bg-primary-dark"
            >
              Home
            </Link>
            <Link 
              href="/routes" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded hover:bg-primary-dark"
            >
              Routes
            </Link>
            <Link 
              href="/solicitations" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded hover:bg-primary-dark"
            >
              Solicitations
            </Link>
            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className="py-2 px-3 rounded hover:bg-primary-dark"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
