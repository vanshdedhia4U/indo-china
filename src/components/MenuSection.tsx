import React, { useState, useMemo } from 'react';
import { Search, Flame, Plus, Minus, Check, ShoppingBag, Sparkles, Filter, Leaf, Utensils } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../data/restaurantData';

interface MenuSectionProps {
  cart: { [dishId: string]: number };
  onAddToCart: (dish: MenuItem) => void;
  onRemoveFromCart: (dishId: string) => void;
  onOpenCart: () => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  cart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyBestsellers, setOnlyBestsellers] = useState<boolean>(false);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet match
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;

      // Bestseller match
      if (onlyBestsellers && !item.isBestseller && !item.isChefSpecial) return false;

      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      return true;
    });
  }, [selectedCategory, dietFilter, searchQuery, onlyBestsellers]);

  const totalSelectedCount = useMemo(() => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  }, [cart]);

  return (
    <section id="menu" className="py-16 lg:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">
              <Utensils className="w-4 h-4" />
              <span>Full Dine-In & Takeaway Menu</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Handcrafted Indo-Chinese & Sizzlers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Prepared fresh to order using wok-tossed sauces and aromatic spices. Select your favorite dishes to estimate your table bill or pre-order for dining.
            </p>
          </div>

          {/* Quick Cart Trigger */}
          {totalSelectedCount > 0 && (
            <button
              onClick={onOpenCart}
              className="self-start md:self-auto px-4 py-2.5 rounded-lg bg-amber-500 text-neutral-950 font-semibold text-xs flex items-center gap-2 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Selected {totalSelectedCount} Dish{totalSelectedCount > 1 ? 'es' : ''}</span>
              <span className="bg-neutral-950/20 px-1.5 py-0.5 rounded text-[11px]">View Order Tray</span>
            </button>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="space-y-4 mb-8">
          
          {/* Row 1: Search & Dietary Switchers */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search sizzlers, noodles, momos, gravies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Diet Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  dietFilter === 'all'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                  dietFilter === 'veg'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Pure Veg
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                  dietFilter === 'non-veg'
                    ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Non-Veg
              </button>
            </div>

            {/* Bestseller Toggle */}
            <button
              onClick={() => setOnlyBestsellers(!onlyBestsellers)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer ${
                onlyBestsellers
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-400'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Chef Specials & Bestsellers</span>
            </button>
          </div>

          {/* Row 2: Category Tabs with Horizontal Scrolling */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 shadow-sm shadow-amber-500/20'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center border border-neutral-800/80 rounded-2xl bg-neutral-900/30">
            <Utensils className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No dishes found</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Try adjusting your search terms or dietary filter settings.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietFilter('all');
                setSearchQuery('');
                setOnlyBestsellers(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const quantityInCart = cart[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className="group rounded-xl border border-neutral-800/80 bg-neutral-900/50 hover:bg-neutral-900/90 hover:border-neutral-700 transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  {/* Dish Image + Top Badges */}
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                    {/* Top tags (zero-pill inline layout) */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {/* Veg / Non-Veg Standard Indicator Square */}
                      <div className="p-1 rounded bg-neutral-950/80 backdrop-blur-sm border border-neutral-800 flex items-center gap-1.5">
                        <div
                          className={`w-3 h-3 border flex items-center justify-center ${
                            item.isVeg ? 'border-emerald-500' : 'border-rose-500'
                          }`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-semibold uppercase text-neutral-300 pr-0.5">
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>

                      {/* Bestseller / Chef Special note */}
                      {item.isChefSpecial && (
                        <div className="px-2 py-0.5 rounded bg-amber-500/90 text-neutral-950 text-[10px] font-bold tracking-wide flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Chef Pick</span>
                        </div>
                      )}
                      {!item.isChefSpecial && item.isBestseller && (
                        <div className="px-2 py-0.5 rounded bg-neutral-950/80 backdrop-blur-sm border border-amber-500/40 text-amber-400 text-[10px] font-semibold flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          <span>Popular</span>
                        </div>
                      )}
                    </div>

                    {/* Price and portion strip on photo */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="text-neutral-400 text-[11px]">{item.portion}</span>
                      <span className="text-base font-bold text-white font-mono tabular-nums bg-neutral-950/80 px-2 py-0.5 rounded backdrop-blur-sm border border-neutral-800">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Spice Meter */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      {/* Metadata: Spice level */}
                      <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2.5">
                        <span className="flex items-center gap-0.5">
                          {item.spicyLevel === 0 && <span className="text-neutral-400">Mild Spice</span>}
                          {item.spicyLevel === 1 && <span className="text-amber-400">🌶️ Medium Spice</span>}
                          {item.spicyLevel === 2 && <span className="text-amber-500">🌶️🌶️ Hot Schezwan</span>}
                          {item.spicyLevel === 3 && <span className="text-rose-500">🌶️🌶️🌶️ Extra Fiery</span>}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{item.category.replace('-', ' ')}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Row */}
                    <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between">
                      <div className="text-xs text-neutral-400">
                        {quantityInCart > 0 ? (
                          <span className="text-amber-400 font-medium">{quantityInCart} selected</span>
                        ) : (
                          <span>Freshly made</span>
                        )}
                      </div>

                      {/* Add/Remove Controls */}
                      {quantityInCart === 0 ? (
                        <button
                          onClick={() => onAddToCart(item)}
                          className="px-3.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 text-xs font-semibold border border-neutral-700 hover:border-amber-500 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Table</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 rounded-lg p-0.5">
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="p-1 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold font-mono text-white">
                            {quantityInCart}
                          </span>
                          <button
                            onClick={() => onAddToCart(item)}
                            className="p-1 hover:bg-neutral-700 text-amber-400 rounded transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
