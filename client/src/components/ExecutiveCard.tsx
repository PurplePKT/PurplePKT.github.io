import { FaLinkedin } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';

function ExecutiveCard({ executive }: { executive: { id: number; name: string; title: string; imageUrl: string; linkedInUrl: string } }) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <CardContent className="p-4">
        <img 
          src={executive.imageUrl} 
          alt={executive.name} 
          className="w-full h-48 object-cover rounded-md"
        />
        <h4 className="text-xl font-medium mt-4 text-primary">{executive.name}</h4>
        <p className="text-gray-500 text-sm">{executive.title}</p>
        {/* Add the LinkedIn icon here */}
        <div className="mt-2">
          <a href={executive.linkedInUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="inline text-[#0077B5] text-2xl" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExecutiveCard;