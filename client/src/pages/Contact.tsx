import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [cartOpen, setCartOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('تم إرسال رسالتك بنجاح! سنرد عليك قريبًا.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('حدث خطأ في إرسال الرسالة. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'الهاتف',
      value: '+966 50 123 4567',
      href: 'tel:+966501234567',
    },
    {
      icon: Mail,
      label: 'البريد الإلكتروني',
      value: 'info@altaam.com',
      href: 'mailto:info@altaam.com',
    },
    {
      icon: MapPin,
      label: 'العنوان',
      value: 'الرياض، المملكة العربية السعودية',
      href: '#',
    },
    {
      icon: MessageCircle,
      label: 'واتس آب',
      value: '+966 50 123 4567',
      href: 'https://wa.me/966501234567',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16">
          <div className="container text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 heading-arabic">
              تواصل معنا
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نحن هنا للإجابة على أسئلتك والاستماع إلى آرائك
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('https') ? '_blank' : undefined}
                  rel={info.href.startsWith('https') ? 'noopener noreferrer' : undefined}
                  className="bg-card p-6 rounded-lg luxury-shadow hover-lift text-center group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-luxury">
                    <Icon size={24} className="text-primary group-hover:text-primary-foreground transition-luxury" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{info.label}</h3>
                  <p className="text-primary font-semibold text-sm">{info.value}</p>
                </a>
              );
            })}
          </div>

          {/* Business Hours */}
          <div className="bg-secondary p-8 rounded-lg mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={24} className="text-primary" />
              <h2 className="text-2xl font-bold text-primary heading-arabic">
                ساعات العمل
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-foreground mb-2">أيام العمل</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>الأحد - الخميس: 10 ص - 11 م</li>
                  <li>الجمعة: 12 ظ - 11 م</li>
                  <li>السبت: 10 ص - 11 م</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-2">ملاحظة مهمة</p>
                <p className="text-muted-foreground">
                  نقدم خدمة التوصيل السريع في جميع أيام الأسبوع. للطلبات الخاصة، يرجى التواصل معنا مسبقًا.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-primary mb-6 heading-arabic">
                أرسل لنا رسالة
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-luxury"
                    placeholder="أدخل اسمك"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-luxury"
                    placeholder="بريدك الإلكتروني"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-luxury"
                    placeholder="رقم هاتفك"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    الرسالة
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-luxury resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-luxury"
                >
                  {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </Button>
              </form>
            </div>

            {/* Map Section */}
            <div className="animate-slide-in-right">
              <h3 className="text-2xl font-bold text-primary mb-4 heading-arabic">
                📍 موقعنا على الخريطة
              </h3>
              <div className="bg-card rounded-lg overflow-hidden luxury-shadow mb-6 h-96">
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.8987443145447!2d46.67530!3d24.71360!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1d5c5c5c5c5d%3A0x5c5c5c5c5c5c5c5c!2z2YXZhNin2YQg2KfZhNmF2YrZiNmE!5e0!3m2!1sar!2ssa!4v1234567890"
                ></iframe>
              </div>
              <div className="bg-secondary p-8 rounded-lg">
                <h3 className="text-xl font-bold text-primary mb-4 heading-arabic">
                  معلومات إضافية
                </h3>
                <p className="text-foreground mb-4">
                  هل لديك أسئلة حول منتجاتنا أو خدماتنا؟ نحن هنا للمساعدة! يمكنك التواصل معنا عبر أي من قنوات التواصل المتاحة.
                </p>
                <p className="text-foreground mb-4">
                  نحرص على الرد على جميع الاستفسارات في أسرع وقت ممكن. شكرًا لاختيارك الطعم الراقي!
                </p>
                <a
                  href="https://wa.me/966501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-luxury"
                >
                  تواصل عبر واتس آب
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
