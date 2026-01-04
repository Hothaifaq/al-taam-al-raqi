import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ShoppingCart from '@/components/ShoppingCart';
import LocationPicker from '@/components/LocationPicker';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useLocation } from 'wouter';
import { Truck, Store } from 'lucide-react';

export default function Checkout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [, setLocation] = useLocation();
  const { items, total, clearCart } = useCart();
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState(false);
  const deliveryFee = deliveryMethod === 'pickup' ? 0 : 10;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header onCartClick={() => setCartOpen(true)} />
        <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

        <main className="container py-20 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4 heading-arabic">
            سلتك فارغة
          </h1>
          <p className="text-muted-foreground mb-8">
            يرجى إضافة منتجات قبل المتابعة للدفع
          </p>
          <Button
            onClick={() => setLocation('/menu')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3"
          >
            العودة إلى القائمة
          </Button>
        </main>

        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSelect = (address: string, lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      address,
      latitude: lat,
      longitude: lng,
    }));
    toast.success('تم تحديد الموقع بنجاح!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare order summary
      const orderSummary = items
        .map(item => `${item.name} (${item.size}) x${item.quantity} = ${item.price * item.quantity} ر.س`)
        .join('\n');

      const deliveryFee = deliveryMethod === 'pickup' ? 0 : 10;
      const totalWithDelivery = total + deliveryFee;
      const message = `
*طلب جديد من الطعم الراقي*

*بيانات العميل:*
الاسم: ${formData.name}
الهاتف: ${formData.phone}
البريد: ${formData.email}

*طريقة التسليم:* ${deliveryMethod === 'pickup' ? 'استلام من المتجر' : 'توصيل'}
${deliveryMethod === 'delivery' ? `العنوان: ${formData.address}` : ''}
${deliveryMethod === 'delivery' && formData.latitude ? `الموقع على الخريطة: https://maps.google.com/?q=${formData.latitude},${formData.longitude}` : ''}

*المنتجات:*
${orderSummary}

*رسوم التوصيل:* ${deliveryFee} ر.س
*الإجمالي:* ${totalWithDelivery.toFixed(2)} ر.س

${formData.notes ? `*ملاحظات:* ${formData.notes}` : ''}
      `.trim();

      // Send via WhatsApp
      const whatsappUrl = `https://wa.me/966501234567?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      toast.success('تم إرسال طلبك! سيتم التواصل معك قريبًا.');
      clearCart();
      setTimeout(() => setLocation('/'), 2000);
    } catch (error) {
      toast.error('حدث خطأ. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setCartOpen(true)} />
      <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="container py-12">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center heading-arabic">
          إكمال الطلب
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Info */}
              <div className="bg-card p-6 rounded-lg luxury-shadow">
                <h2 className="text-2xl font-bold text-primary mb-6 heading-arabic">
                  بيانات العميل
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-luxury"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-luxury"
                      placeholder="05xxxxxxxxx"
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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-luxury"
                      placeholder="بريدك الإلكتروني"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-card p-6 rounded-lg luxury-shadow">
                <h2 className="text-2xl font-bold text-primary mb-6 heading-arabic">
                  طريقة التسليم
                </h2>

                <div className="space-y-4">
                  {/* Delivery Option */}
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary hover:bg-secondary transition-luxury" style={{ borderColor: deliveryMethod === 'delivery' ? 'var(--primary)' : 'var(--border)' }}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={deliveryMethod === 'delivery'}
                      onChange={() => setDeliveryMethod('delivery')}
                      className="w-4 h-4"
                    />
                    <Truck size={20} className="text-primary ms-3" />
                    <div className="ms-3">
                      <p className="font-bold text-foreground">توصيل إلى عنواني</p>
                      <p className="text-sm text-muted-foreground">توصيل سريع وآمن</p>
                    </div>
                  </label>

                  {/* Pickup Option */}
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary hover:bg-secondary transition-luxury" style={{ borderColor: deliveryMethod === 'pickup' ? 'var(--primary)' : 'var(--border)' }}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={deliveryMethod === 'pickup'}
                      onChange={() => setDeliveryMethod('pickup')}
                      className="w-4 h-4"
                    />
                    <Store size={20} className="text-primary ms-3" />
                    <div className="ms-3">
                      <p className="font-bold text-foreground">استلام من المتجر</p>
                      <p className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية</p>
                    </div>
                  </label>
                </div>

                {/* Address Field with Location Picker */}
                {deliveryMethod === 'delivery' && (
                  <div className="mt-4">
                    <LocationPicker
                      onLocationSelect={handleLocationSelect}
                      initialAddress={formData.address}
                    />
                  </div>
                )}
              </div>

              {/* Additional Notes */}
              <div className="bg-card p-6 rounded-lg luxury-shadow">
                <h2 className="text-2xl font-bold text-primary mb-6 heading-arabic">
                  ملاحظات إضافية
                </h2>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-luxury resize-none"
                  placeholder="أي ملاحظات خاصة أو طلبات خاصة..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-lg transition-luxury text-lg"
              >
                {loading ? 'جاري المعالجة...' : 'تأكيد الطلب عبر واتس آب'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg luxury-shadow sticky top-24">
              <h2 className="text-2xl font-bold text-primary mb-6 heading-arabic">
                ملخص الطلب
              </h2>

              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map(item => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex justify-between items-start pb-4 border-b border-border"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.size} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-primary text-sm">
                      {(item.price * item.quantity).toFixed(2)} ر.س
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>المجموع الجزئي:</span>
                  <span>{total.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>التوصيل:</span>
                  <span className={deliveryMethod === 'pickup' ? 'text-green-600 font-semibold' : 'text-foreground font-semibold'}>
                    {deliveryMethod === 'pickup' ? 'مجاني' : '10 ر.س'}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary pt-3 border-t border-border">
                  <span>الإجمالي:</span>
                  <span>{(total + (deliveryMethod === 'pickup' ? 0 : 10)).toFixed(2)} ر.س</span>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-secondary rounded-lg text-sm text-muted-foreground">
                <p className="mb-2">
                  ✓ جميع الأسعار تشمل الضريبة
                </p>
                <p className="mb-2">
                  ✓ رسوم التوصيل: 10 ر.س (مجاني للاستلام من المتجر)
                </p>
                <p>
                  ✓ سيتم التواصل معك عبر واتس آب لتأكيد الطلب
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
