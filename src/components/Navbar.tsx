import React, { useState } from 'react';
import { UtensilsCrossed, CalendarDays, MapPin, Phone, ShoppingBag, Menu, X, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  onOpenBooking: () => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, cartCount, onOpenCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-neutral-950 transition-colors">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Indo China
              </span>
              <span className="text-[11px] font-medium text-amber-500 tracking-wider uppercase -mt-0.5">
                Family Restaurant
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <button
              onClick={() => scrollTo('menu')}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Online Menu
            </button>
            <button
              onClick={() => scrollTo('reservations')}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Table
            </button>
            <button
              onClick={() => scrollTo('sizzlers')}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Our Sizzlers
            </button>
            <button
              onClick={() => scrollTo('reviews')}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Guest Reviews
            </button>
            <button
              onClick={() => scrollTo('location')}
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Location & Hours
            </button>
          </nav>

          {/* Zone 3: 1 primary action + Order Cart indicator */}
          <div className="flex items-center gap-3 shrink-0">
            {cartCount > 0 && (
              <button
                onClick={onOpenCart}
                className="relative px-3 py-2 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                title="View selected dishes"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="font-semibold">{cartCount}</span>
                <span className="hidden sm:inline">Dishes</span>
              </button>
            )}

            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between py-2 px-3 bg-neutral-900 rounded-lg text-xs text-neutral-300 border border-neutral-800">
            <span className="flex items-center gap-1.5 text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Open Daily: 11:30 AM – 12:00 AM
            </span>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-1 text-amber-400 font-medium"
            >
              <Phone className="w-3 h-3" />
              Call
            </a>
          </div>

          <button
            onClick={() => scrollTo('menu')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-neutral-200 hover:bg-neutral-900 transition-colors flex items-center justify-between"
          >
            <span>Explore Menu</span>
            <span className="text-xs text-neutral-500">Starters, Sizzlers, Noodles</span>
          </button>
          <button
            onClick={() => scrollTo('reservations')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-neutral-200 hover:bg-neutral-900 transition-colors flex items-center justify-between"
          >
            <span>Reserve Table</span>
            <span className="text-xs text-amber-500">AC Hall & Booths</span>
          </button>
          <button
            onClick={() => scrollTo('sizzlers')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-neutral-200 hover:bg-neutral-900 transition-colors flex items-center justify-between"
          >
            <span>Signature Sizzlers</span>
            <span className="text-xs text-neutral-500">Hot Cast Iron</span>
          </button>
          <button
            onClick={() => scrollTo('location')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-neutral-200 hover:bg-neutral-900 transition-colors flex items-center justify-between"
          >
            <span>Map & Directions</span>
            <span className="text-xs text-neutral-500">Panvelkar Plaza</span>
          </button>

          <div className="pt-2">
            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-200 rounded-lg text-xs font-medium flex items-center justify-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Open in Google Maps App
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
