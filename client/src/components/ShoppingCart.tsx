import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'wouter';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card text-card-foreground z-50 flex flex-col luxury-shadow animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-primary heading-arabic">
            سلتك
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-luxury"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground mb-4">السلة فارغة</p>
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                متابعة التسوق
              </Button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 bg-secondary p-4 rounded-lg"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {item.size}
                  </p>
                  <p className="text-primary font-bold">
                    {item.price} ر.س
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-luxury"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="p-1 hover:bg-accent hover:text-accent-foreground rounded transition-luxury"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="p-1 hover:bg-destructive hover:text-destructive-foreground rounded transition-luxury ms-auto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="text-sm font-semibold text-foreground mt-2">
                    المجموع: {item.price * item.quantity} ر.س
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span>الإجمالي:</span>
              <span className="text-primary text-2xl">
                {total.toFixed(2)} ر.س
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Link href="/checkout">
                <a onClick={onClose}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3">
                    المتابعة للدفع
                  </Button>
                </a>
              </Link>
              <Button
                onClick={() => {
                  clearCart();
                  onClose();
                }}
                variant="outline"
                className="w-full"
              >
                تفريغ السلة
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
