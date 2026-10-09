import React from 'react';
import { Flame, Sparkles, Plus, Clock, ShieldCheck, Heart } from 'lucide-react';
import { MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface SizzlerSpotlightProps {
  onAddToCart: (dish: MenuItem) => void;
  cart: { [dishId: string]: number };
}

export const SizzlerSpotlight: React.FC<SizzlerSpotlightProps> = ({ onAddToCart, cart }) => {
  const sizzlers = MENU_ITEMS.filter((item) => item.category === 'sizzlers');

  return (
    <section id="sizzlers" className="py-16 lg:py-24 bg-neutral-900/40 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>The Signature Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Smoking Cast-Iron Sizzlers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
            Heated to blistering temperatures and assembled tableside. Hear the sizzle, inhale the aromatic roasted garlic and schezwan steam, and enjoy layers of grilled skewers, noodles, butter rice, and crispy potatoes.
          </p>
        </div>

        {/* Sizzler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sizzlers.map((item) => {
            const inCart = cart[item.id] || 0;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/90 overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 group"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 px-2 py-1 rounded text-[11px] font-medium text-white flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <span>{item.isVeg ? 'Pure Veg Sizzler' : 'Non-Veg Sizzler'}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-neutral-950/90 px-2.5 py-1 rounded-lg border border-neutral-800 text-sm font-bold text-amber-400 font-mono tabular-nums">
                    ₹{item.price}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
                    <span className="text-neutral-500">{item.portion}</span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                        inCart > 0
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{inCart > 0 ? `Added (${inCart})` : 'Add Sizzler'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sizzler Anatomy Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">How We Build Your Sizzler</h4>
              <p className="text-xs text-neutral-400">
                1. Searing Cast Iron Bed & Buttered Cabbage Leaf · 2. Hakka Noodles & Burnt Garlic Rice · 3. Charred Skewers / Paneer · 4. French Fries & Veggies · 5. Sizzling Table Sauce Pour
              </p>
            </div>
          </div>
          <div className="text-xs text-amber-400 font-medium whitespace-nowrap bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800">
            Average Table Prep Time: 15–18 Mins
          </div>
        </div>

      </div>
    </section>
  );
};
