import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Product, sizes } from '@/lib/products';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<'صحن' | 'نصف كيلو' | 'كيلو'>('صحن');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.prices[selectedSize],
        size: selectedSize,
        quantity,
        image: product.image,
      });

      toast.success(`تم إضافة ${quantity} ${product.name} إلى السلة! ✨`, {
        duration: 3000,
        icon: <Check size={18} className="text-green-500" />,
      });

      setQuantity(1);
    } catch (error) {
      toast.error('حدث خطأ أثناء إضافة المنتج', {
        duration: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  const priceForSelectedSize = product.prices[selectedSize];
  const totalPrice = priceForSelectedSize * quantity;

  return (
    <div className="bg-card text-card-foreground rounded-2xl overflow-hidden luxury-shadow hover-lift group transition-all duration-300 flex flex-col h-full">
      {/* Image Container - Fixed Height */}
      <div className="relative h-72 overflow-hidden bg-muted flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
            <span>⭐</span>
            <span>مميز</span>
          </div>
        )}
        
        {/* Price Badge - Floating */}
        <div className="absolute bottom-4 right-4 bg-primary/95 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full text-lg font-bold shadow-lg">
          {priceForSelectedSize} ر.س
        </div>
      </div>

      {/* Content Container - Flexible */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-lg font-bold text-primary mb-2 heading-arabic line-clamp-2 h-14 flex items-center">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Divider */}
        <div className="border-t border-border my-4" />

        {/* Size Selection */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
            اختر الحجم
          </label>
          <div className="flex gap-2 flex-wrap">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 min-w-max px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity & Total Price */}
        <div className="bg-secondary/50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">الكمية</span>
            <div className="flex items-center gap-2 bg-background rounded-lg p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 hover:bg-secondary rounded transition-colors duration-200 text-primary hover:text-primary/80"
                aria-label="تقليل الكمية"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-bold text-foreground">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 hover:bg-secondary rounded transition-colors duration-200 text-primary hover:text-primary/80"
                aria-label="زيادة الكمية"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Total Price Display */}
          <div className="flex justify-between items-center pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">الإجمالي</span>
            <span className="text-xl font-bold text-primary">
              {totalPrice} ر.س
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={18} />
          {isAdding ? 'جاري الإضافة...' : 'أضف إلى السلة'}
        </Button>
      </div>
    </div>
  );
}
