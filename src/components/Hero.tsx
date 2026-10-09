import React from 'react';
import { CalendarDays, Utensils, MapPin, Star, Flame, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
  onViewLocation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreMenu, onViewLocation }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-neutral-800">
      {/* Subtle ambient warm glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust marker: rating & locale */}
            <div className="inline-flex items-center gap-3 text-xs text-neutral-400 border border-neutral-800 bg-neutral-900/80 px-3.5 py-1.5 rounded-lg">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {RESTAURANT_INFO.rating}
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>800+ Google Reviews</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-300">Ambernath, Thane</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.1] text-balance">
              Authentic Wok Mastery & Sizzling Delights for the Whole Family
            </h1>

            {/* Narrative description */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              Welcome to <strong className="text-white font-semibold">Indo China</strong> at Panvelkar Plaza. Savor piping-hot cast-iron sizzlers, wok-tossed Hakka noodles, Triple Schezwan platters, and handmade momos prepared with fresh, premium ingredients in an inviting, air-conditioned family atmosphere.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 border border-neutral-700 hover:border-amber-500/50 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>Explore Online Menu</span>
              </button>

              <button
                onClick={onViewLocation}
                className="px-4 py-3.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>Map & Directions</span>
              </button>
            </div>

            {/* Key info bar */}
            <div className="pt-4 border-t border-neutral-900 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Open Daily: 11:30 AM – 12:00 AM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Strict Pure Veg & Non-Veg Kitchen Discipline</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Culinary Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
              {/* Main Food Photo */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-800">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
                  alt="Sizzling Indo China specialty platter with noodles and skewers"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized dark cuisine pattern if image link drops
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Visual gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                {/* Badge overlay on photo */}
                <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md border border-neutral-700/80 px-3 py-1.5 rounded-lg text-xs font-medium text-white flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>Served on Smoking Cast Iron</span>
                </div>

                {/* Floating Dish Spotlight Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 text-white space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Special Mixed Sizzler</span>
                    <span className="text-sm font-bold text-amber-400 font-mono tabular-nums">₹490</span>
                  </div>
                  <p className="text-xs text-neutral-300 line-clamp-1">
                    Grilled skewers, dragon prawns, wok noodles & signature pepper sauce
                  </p>
                </div>
              </div>

              {/* Quick mini-grid preview */}
              <div className="grid grid-cols-2 p-3 gap-2 bg-neutral-950/95 border-t border-neutral-800/80">
                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
                  <img
                    src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=200&q=80"
                    alt="Hakka Noodles"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="text-xs">
                    <div className="font-medium text-neutral-200">Hakka Noodles</div>
                    <div className="text-neutral-400 font-mono tabular-nums">From ₹250</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
                  <img
                    src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=200&q=80"
                    alt="Handmade Momos"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="text-xs">
                    <div className="font-medium text-neutral-200">Steamed Momos</div>
                    <div className="text-neutral-400 font-mono tabular-nums">From ₹180</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accompanying proof chip */}
            <div className="mt-3 text-center text-xs text-neutral-400">
              Freshly prepared to order · Separate Vegetarian and Non-Vegetarian preparation areas
            </div>
          </div>

        </div>

        {/* 4 Pillars Section Below Hero */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Culinary Craft</div>
            <div className="text-sm font-semibold text-white">Authentic Indo-Chinese</div>
            <div className="text-xs text-neutral-400">Mumbai-style wok wok-tossed noodles, schezwan gravies and sizzlers.</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Family Dining</div>
            <div className="text-sm font-semibold text-white">Spacious AC Hall</div>
            <div className="text-xs text-neutral-400">Comfortable booths and extended family tables with prompt warm service.</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Locally Cherished</div>
            <div className="text-sm font-semibold text-white">4.8 ★ on Restaurant Guru</div>
            <div className="text-xs text-neutral-400">Backed by 800+ authentic reviews from Ambernath & Ulhasnagar food lovers.</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Central Locale</div>
            <div className="text-sm font-semibold text-white">Panvelkar Plaza</div>
            <div className="text-xs text-neutral-400">Just 4 minutes from Ambernath Railway Station (East) on Shivaji Road.</div>
          </div>
        </div>

      </div>
    </section>
  );
};
