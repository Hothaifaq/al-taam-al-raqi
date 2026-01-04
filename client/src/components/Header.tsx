import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'wouter';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const navItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'القائمة', href: '/menu' },
    { label: 'من نحن', href: '/about' },
    { label: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card text-card-foreground border-b border-border luxury-shadow">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-3 hover:opacity-80 transition-luxury">
              <img src="/images/logo.png" alt="الطعم الراقي" className="w-14 h-14 object-contain" />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-primary heading-arabic">
                  الطعم الراقي
                </h1>
                <p className="text-xs text-muted-foreground">حلويات شرقية فاخرة</p>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <a className="text-foreground hover:text-primary transition-luxury font-medium text-sm">
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>

          {/* Right Side - Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 hover:bg-secondary rounded-lg transition-luxury"
              aria-label="السلة"
            >
              <ShoppingCart size={24} className="text-primary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-luxury"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-primary" />
              ) : (
                <Menu size={24} className="text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border space-y-2">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <a
                  className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-luxury"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
