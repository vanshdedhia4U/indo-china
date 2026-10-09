/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { SizzlerSpotlight } from './components/SizzlerSpotlight';
import { BookingSystem } from './components/BookingSystem';
import { LocationMapSection } from './components/LocationMapSection';
import { AmbianceAndReviews } from './components/AmbianceAndReviews';
import { Footer } from './components/Footer';
import { OrderTray } from './components/OrderTray';
import { MobileQuickBar } from './components/MobileQuickBar';
import { MenuItem } from './data/restaurantData';

export default function App() {
  const [cart, setCart] = useState<{ [dishId: string]: number }>({});
  const [isOrderTrayOpen, setIsOrderTrayOpen] = useState(false);

  const cartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, q) => sum + q, 0);
  }, [cart]);

  const handleAddToCart = (dish: MenuItem) => {
    setCart((prev) => ({
      ...prev,
      [dish.id]: (prev[dish.id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[dishId] > 1) {
        next[dishId] -= 1;
      } else {
        delete next[dishId];
      }
      return next;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950 pb-16 md:pb-0">
      {/* Navigation */}
      <Navbar
        onOpenBooking={() => scrollToSection('reservations')}
        cartCount={cartCount}
        onOpenCart={() => setIsOrderTrayOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => scrollToSection('reservations')}
          onExploreMenu={() => scrollToSection('menu')}
          onViewLocation={() => scrollToSection('location')}
        />

        {/* Signature Sizzlers Showcase */}
        <SizzlerSpotlight
          cart={cart}
          onAddToCart={handleAddToCart}
        />

        {/* Complete Online Menu Section */}
        <MenuSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onOpenCart={() => setIsOrderTrayOpen(true)}
        />

        {/* Table Booking & Reservation System */}
        <BookingSystem
          preselectedDishIds={Object.keys(cart)}
          cartCount={cartCount}
        />

        {/* Official Google Maps Location & Commute Section */}
        <LocationMapSection />

        {/* Ambiance & Guest Reviews */}
        <AmbianceAndReviews />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => scrollToSection('reservations')}
        onExploreMenu={() => scrollToSection('menu')}
      />

      {/* Slide-over Table Pre-Order / Bill Estimator Tray */}
      <OrderTray
        isOpen={isOrderTrayOpen}
        onClose={() => setIsOrderTrayOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToBooking={() => scrollToSection('reservations')}
      />

      {/* Sticky Mobile Quick Actions Bar */}
      <MobileQuickBar
        onOpenBooking={() => scrollToSection('reservations')}
        cartCount={cartCount}
        onOpenCart={() => setIsOrderTrayOpen(true)}
      />
    </div>
  );
}
