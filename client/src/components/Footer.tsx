import { Link } from "wouter";
import { MousePointer2, Facebook, Twitter, Linkedin, Github, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                <MousePointer2 className="text-primary text-xl" />
              </div>
              <span className="text-xl font-medium">Purple Pocket LLC</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Connecting qualified carriers with USPS route opportunities since 2015. Specializing in route management and contract facilitation.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-lg font-medium mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link href="/routes" className="text-gray-400 hover:text-white transition-colors">Routes</Link>
                </li>
                <li>
                  <Link href="/solicitations" className="text-gray-400 hover:text-white transition-colors">Solicitations</Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-lg font-medium mb-4">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <Link href="/documentation" className="text-gray-400 hover:text-white transition-colors">CSV Documentation</Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-400 hover:text-white transition-colors">How It Works</Link>
                </li>
                <li>
                  <Link href="/documentation" className="text-gray-400 hover:text-white transition-colors">FAQ</Link>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h5 className="text-lg font-medium mb-4">Contact Us</h5>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin className="text-gray-400 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-400">1234 Postal Way, Suite 500<br />Denver, CO 80202</span>
                </li>
                <li className="flex items-center">
                  <Phone className="text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-gray-400">(303) 555-1234</span>
                </li>
                <li className="flex items-center">
                  <Mail className="text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-gray-400">info@purplepocketllc.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Purple Pocket LLC. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;