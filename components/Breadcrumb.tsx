import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      {/* Home Link */}
      <Link 
        href="/" 
        className="flex items-center hover:text-purple-400 transition"
      >
        <Home size={16} className="mr-1" />
        <span>Home</span>
      </Link>

      {/* Breadcrumb Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight size={16} className="text-gray-600" />
            
            {isLast || !item.href ? (
              // Last item or no link - just text
              <span className="text-gray-300 font-medium">
                {item.label}
              </span>
            ) : (
              // Clickable link
              <Link 
                href={item.href} 
                className="hover:text-purple-400 transition"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}