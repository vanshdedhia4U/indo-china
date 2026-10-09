import React from 'react';
import { Phone, CalendarDays, MapPin, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MobileQuickBarProps {
  onOpenBooking: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenBooking,
  cartCount,
  onOpenCart,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-3 py-2">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        <a
          href={`tel:${RESTAURANT_INFO.phone}`}
          className="flex-1 py-2 px-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call Now</span>
        </a>

        {cartCount > 0 ? (
          <button
            onClick={onOpenCart}
            className="flex-1 py-2 px-2.5 rounded-lg bg-neutral-900 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Tray ({cartCount})</span>
          </button>
        ) : (
          <a
            href={RESTAURANT_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Map</span>
          </a>
        )}

        <button
          onClick={onOpenBooking}
          className="flex-1 py-2 px-3 rounded-lg bg-amber-500 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-amber-500/30 cursor-pointer"
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Book Table</span>
        </button>
      </div>
    </div>
  );
};
