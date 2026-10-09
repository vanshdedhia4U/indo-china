import React from 'react';
import { X, Plus, Minus, Trash2, CalendarDays, ShoppingBag, ArrowRight } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface OrderTrayProps {
  isOpen: boolean;
  onClose: () => void;
  cart: { [dishId: string]: number };
  onAddToCart: (dish: MenuItem) => void;
  onRemoveFromCart: (dishId: string) => void;
  onClearCart: () => void;
  onProceedToBooking: () => void;
}

export const OrderTray: React.FC<OrderTrayProps> = ({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onProceedToBooking,
}) => {
  if (!isOpen) return null;

  const cartEntries = Object.entries(cart).filter(([_, qty]) => qty > 0);
  const itemsMap = new Map(MENU_ITEMS.map((item) => [item.id, item]));

  const subtotal = cartEntries.reduce((sum, [id, qty]) => {
    const item = itemsMap.get(id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const gst = Math.round(subtotal * 0.05); // 5% GST on Restaurant Dining
  const total = subtotal + gst;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Your Table Selection</h3>
                <p className="text-xs text-neutral-400">Pre-order dishes for your reservation</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
              aria-label="Close tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cartEntries.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-neutral-700 mx-auto" />
                <h4 className="text-sm font-semibold text-neutral-300">Your selection is empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Browse our menu and click &ldquo;Add to Table&rdquo; to estimate bills or pre-select your favorites.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {cartEntries.map(([id, qty]) => {
                  const item = itemsMap.get(id);
                  if (!item) return null;

                  return (
                    <div
                      key={id}
                      className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <span className="text-xs font-semibold text-white truncate block">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          ₹{item.price} each · <span className="text-amber-400 font-mono font-bold">₹{item.price * qty}</span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-lg p-1 shrink-0">
                        <button
                          onClick={() => onRemoveFromCart(id)}
                          className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold font-mono text-white">
                          {qty}
                        </span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="p-1 text-amber-400 hover:text-white rounded hover:bg-neutral-800"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={onClearCart}
                  className="pt-2 text-xs text-neutral-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear all items</span>
                </button>
              </div>
            )}
          </div>

          {/* Summary & Checkout Action */}
          {cartEntries.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-900/50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Items Subtotal</span>
                  <span className="font-mono text-neutral-200">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Estimated GST (5%)</span>
                  <span className="font-mono text-neutral-200">₹{gst}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Total Estimated Bill</span>
                  <span className="font-mono text-amber-400">₹{total}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToBooking();
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Attach to Table Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-neutral-500 text-center">
                  Payment is settled directly at the restaurant after your meal.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
