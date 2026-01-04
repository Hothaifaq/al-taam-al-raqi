import { Instagram, MessageCircle, TrendingUp } from 'lucide-react';

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

export default function SocialLinks({ className = '', showLabels = false }: SocialLinksProps) {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/altaam.alraqi',
      color: 'hover:text-pink-500',
    },
    {
      name: 'TikTok',
      icon: TrendingUp,
      url: 'https://tiktok.com/@altaam.alraqi',
      color: 'hover:text-black',
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/966538586280',
      color: 'hover:text-green-500',
    },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map(link => {
        const Icon = link.icon;
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-200 text-foreground ${link.color}`}
            aria-label={link.name}
            title={link.name}
          >
            <Icon size={24} />
            {showLabels && <span className="text-xs ms-1">{link.name}</span>}
          </a>
        );
      })}
    </div>
  );
}
