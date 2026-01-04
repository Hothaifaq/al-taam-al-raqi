import { useState } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';
import { ChevronRight, Star, Truck, Heart, Award } from 'lucide-react';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main>
        {/* Hero Section - Premium & Luxurious */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/kunafa-hero-2.jpg"
              alt="كنافة فاخرة"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 rtl:bg-gradient-to-l" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-2xl animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary/25 backdrop-blur-sm text-primary-foreground border border-primary/40 px-5 py-2.5 rounded-full mb-8 font-semibold text-sm tracking-wide">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span>الخيار الأول للحلويات الشرقية الفاخرة</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 heading-arabic leading-tight drop-shadow-lg">
                الطعم الذي <br />
                <span className="text-primary">يستحق الذوق الراقي</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-100 mb-10 leading-relaxed max-w-lg font-light">
                نقدم لكم أصالة الكنافة النابلسية والحلويات الشرقية الفاخرة، مصنوعة بحب وإتقان من أجود المكونات الطبيعية لتجربة حسية لا تُنسى.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu">
                  <a className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
                    تصفح القائمة
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </Link>
                <Link href="/about">
                  <a className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 hover:border-white/50 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1">
                    قصتنا
                  </a>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-white/20">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">100%</p>
                  <p className="text-sm text-gray-300">مكونات طبيعية</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">+5K</p>
                  <p className="text-sm text-gray-300">عميل راضٍ</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">20+</p>
                  <p className="text-sm text-gray-300">صنف فاخر</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Elegant Cards */}
        <section className="py-28 bg-secondary/40">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 heading-arabic">لماذا الطعم الراقي؟</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                نحن نؤمن بأن الجودة هي أساس النجاح، ولذلك نلتزم بأعلى المعايير في كل قطعة حلويات نقدمها لكم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { 
                  icon: Award, 
                  title: 'جودة استثنائية', 
                  desc: 'نستخدم أجود أنواع السمن الحيواني والمكسرات الفاخرة لضمان طعم أصيل وفريد' 
                },
                { 
                  icon: Truck, 
                  title: 'توصيل سريع', 
                  desc: 'نصل إليك أينما كنت في الرياض مع الحفاظ التام على حرارة وجودة الطلب' 
                },
                { 
                  icon: Heart, 
                  title: 'صنع بحب', 
                  desc: 'كل قطعة حلويات تمر عبر أيدي خبراء شغوفين مكرسين لتقديم الأفضل' 
                }
              ].map((feature, i) => (
                <div key={i} className="bg-card p-10 rounded-3xl luxury-shadow hover-lift text-center group">
                  <div className="w-20 h-20 bg-primary/15 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4 heading-arabic">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products - Best Sellers */}
        <section className="py-28 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-block mb-6">
                <span className="text-primary font-bold text-sm uppercase tracking-widest">⭐ الأفضل لدينا</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 heading-arabic">الأكثر مبيعاً</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                اكتشف تشكيلتنا المختارة من الحلويات الفاخرة التي نالت إعجاب آلاف عملائنا الراضين
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/menu">
                <a className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
                  عرض القائمة الكاملة
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action - Premium */}
        <section className="py-24">
          <div className="container">
            <div className="relative rounded-3xl overflow-hidden bg-primary p-16 md:p-24 text-center text-primary-foreground">
              <div className="absolute top-0 left-0 w-72 h-72 bg-white/8 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/8 rounded-full translate-x-1/3 translate-y-1/3" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 heading-arabic leading-tight">
                  هل أنت جاهز لتجربة الطعم الراقي؟
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-12 leading-relaxed font-light">
                  اطلب الآن واستمتع بألذ الحلويات الشرقية تصلك إلى باب منزلك طازجة وساخنة
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link href="/menu">
                    <a className="bg-white text-primary hover:bg-gray-100 px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                      اطلب الآن
                    </a>
                  </Link>
                  <a 
                    href="https://wa.me/966530105022" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-transparent border-2 border-white/40 hover:border-white text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-white/10"
                  >
                    تواصل معنا
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Preview - Visual Showcase */}
        <section className="py-28 bg-secondary/30">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                <img 
                  src="/images/kunafa-hero-1.jpg" 
                  alt="عالم الكنافة" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-12">
                  <h3 className="text-4xl font-bold text-white mb-3 heading-arabic">عالم الكنافة</h3>
                  <p className="text-gray-200 mb-6 text-lg">نابلسية، ناعمة، خشنة، وبالقشطة</p>
                  <Link href="/menu">
                    <a className="text-primary font-bold flex items-center gap-2 text-lg hover:gap-3 transition-all group">
                      اكتشف المزيد 
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl">
                <img 
                  src="/images/kunafa-hero-3.jpg" 
                  alt="حلويات شرقية" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-12">
                  <h3 className="text-4xl font-bold text-white mb-3 heading-arabic">حلويات شرقية</h3>
                  <p className="text-gray-200 mb-6 text-lg">بقلاوة، بسبوسة، وأصناف متنوعة</p>
                  <Link href="/menu">
                    <a className="text-primary font-bold flex items-center gap-2 text-lg hover:gap-3 transition-all group">
                      اكتشف المزيد 
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
