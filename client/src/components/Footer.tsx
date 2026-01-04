import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import SocialLinks from './SocialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* نبذة عن المطعم */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold heading-arabic">
              الطعم الراقي
            </h3>
            <p className="text-sm text-primary-foreground/85 leading-relaxed">
              متخصصون في صنع أفضل الكنافة والحلويات الشرقية الفاخرة بأصالة وجودة عالية.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wide">تابعنا:</span>
              <SocialLinks className="flex gap-3" />
            </div>
          </div>

          {/* روابط سريعة */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold heading-arabic uppercase tracking-wide">
              روابط سريعة
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/" className="hover:text-accent transition-luxury hover:translate-x-1 inline-block">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="/menu" className="hover:text-accent transition-luxury hover:translate-x-1 inline-block">
                  القائمة
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-accent transition-luxury hover:translate-x-1 inline-block">
                  من نحن
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-accent transition-luxury hover:translate-x-1 inline-block">
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* تواصل معنا */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold heading-arabic uppercase tracking-wide">
              تواصل معنا
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 hover:translate-x-1 transition-transform group">
                <Phone size={20} className="flex-shrink-0 text-accent group-hover:scale-110 transition-transform" />
                <a href="tel:+966530105022" className="hover:text-accent transition-luxury">
                  +966 53 010 5022
                </a>
              </li>
              <li className="flex items-center gap-3 hover:translate-x-1 transition-transform group">
                <Mail size={20} className="flex-shrink-0 text-accent group-hover:scale-110 transition-transform" />
                <a href="mailto:raqee@gmail.com" className="hover:text-accent transition-luxury truncate">
                  raqee@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 hover:translate-x-1 transition-transform group">
                <MapPin size={20} className="flex-shrink-0 text-accent mt-0.5 group-hover:scale-110 transition-transform" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center gap-3 hover:translate-x-1 transition-transform group">
                <MessageCircle size={20} className="flex-shrink-0 text-accent group-hover:scale-110 transition-transform" />
                <a href="https://wa.me/966530105022" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-luxury">
                  واتس آب
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* حقوق النشر */}
        <div className="border-t border-primary-foreground/20 pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-primary-foreground/70 gap-6">
            <p>
              © {currentYear} الطعم الراقي. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#" className="hover:text-accent transition-luxury">
                سياسة الخصوصية
              </a>
              <span>•</span>
              <a href="#" className="hover:text-accent transition-luxury">
                شروط الخدمة
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
