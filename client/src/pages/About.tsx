import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import { useState } from 'react';
import { Check } from 'lucide-react';

export default function About() {
  const [cartOpen, setCartOpen] = useState(false);

  const features = [
    'مكونات طبيعية وفاخرة',
    'صنع يدوي تقليدي',
    'جودة عالية مضمونة',
    'طعم أصيل وغني',
    'تسليم سريع وآمن',
    'خدمة عملاء ممتازة',
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
              قصتنا
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              رحلة من الشغف والحرفية في صنع أفضل الكنافة والحلويات الشرقية
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-primary mb-6 heading-arabic">
                من نحن؟
              </h2>
              <p className="text-foreground mb-4 leading-relaxed">
                الطعم الراقي هي متخصصة في صنع الكنافة والحلويات الشرقية الفاخرة بأسلوب تقليدي يجمع بين الأصالة والحداثة. بدأت رحلتنا برغبة قوية في تقديم طعم حقيقي يستحق الذوق الراقي.
              </p>
              <p className="text-foreground mb-4 leading-relaxed">
                نستخدم أفضل المكونات المختارة بعناية من أجود المصادر، ونطبق أساليب صنع تقليدية مع لمسات عصرية لضمان جودة لا مثيل لها. كل قطعة من منتجاتنا تعكس التزامنا بالتميز.
              </p>
              <p className="text-foreground leading-relaxed">
                نؤمن أن الحلويات ليست مجرد طعام، بل هي لحظات من الفرح والسعادة التي نشاركها مع عائلتك وأحبائك. لذلك نضع كل حبنا واهتمامنا في كل منتج نصنعه.
              </p>
            </div>

            <div className="animate-slide-in-right">
              <img
                src="/images/kunafa-hero-3.jpg"
                alt="الكنافة الفاخرة"
                className="w-full rounded-lg luxury-shadow"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-secondary py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center heading-arabic">
              قيمنا الأساسية
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quality */}
              <div className="bg-card p-8 rounded-lg luxury-shadow text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✨</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 heading-arabic">
                  الجودة العالية
                </h3>
                <p className="text-muted-foreground">
                  نختار أفضل المكونات ونطبق أعلى معايير الجودة في كل خطوة من خطوات الإنتاج
                </p>
              </div>

              {/* Authenticity */}
              <div className="bg-card p-8 rounded-lg luxury-shadow text-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 heading-arabic">
                  الأصالة والتقاليد
                </h3>
                <p className="text-muted-foreground">
                  نحافظ على الوصفات التقليدية الأصيلة مع إضافة لمسات عصرية لتلبية الأذواق المعاصرة
                </p>
              </div>

              {/* Customer Care */}
              <div className="bg-card p-8 rounded-lg luxury-shadow text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 heading-arabic">
                  رعاية العملاء
                </h3>
                <p className="text-muted-foreground">
                  رضاك هو أولويتنا، نسعى لتقديم أفضل خدمة وتجربة تسوق ممتعة
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center heading-arabic">
            لماذا تختار الطعم الراقي؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-secondary rounded-lg hover-lift"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={18} className="text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4 heading-arabic">
              جاهز للاستمتاع بطعم فاخر؟
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              اطلب الآن واستمتع بأفضل الكنافة والحلويات الشرقية
            </p>
            <a
              href="/menu"
              className="inline-block bg-accent text-accent-foreground px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-luxury"
            >
              تصفح القائمة
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
