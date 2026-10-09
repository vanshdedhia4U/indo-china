import React from 'react';
import { UtensilsCrossed, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onExploreMenu }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white font-display">
                Indo China
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Cherished family restaurant known for authentic Indo-Chinese wok specialties, sizzling platters, and gracious hospitality in Ambernath.
            </p>
            <div className="text-[11px] text-amber-500 font-medium">
              ★ 4.8 / 5 Rating on Restaurant Guru & Google
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onExploreMenu}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Online Menu & Starters
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <a href="#sizzlers" className="hover:text-amber-400 transition-colors">
                  Signature Sizzlers
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  Google Map & Directions
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Guest Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Address & Phone */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Visit Us</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Shop No. 14, Panvelkar Plaza, Shivaji Rd, Kansai Section, Ambernath, MH 421501</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div>
                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Timings & Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Hours & Service</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">11:30 AM – 12:00 AM</div>
                  <div className="text-neutral-500 text-[11px]">Open All 7 Days a Week</div>
                </div>
              </div>
              <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-800/80">
                Dine-in · Takeaway · Party Catering · High Chairs Available
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Indo China - Family Restaurant. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#menu" className="hover:text-white transition-colors">Menu</a>
            <span>·</span>
            <a href="#reservations" className="hover:text-white transition-colors">Booking</a>
            <span>·</span>
            <a href="#location" className="hover:text-white transition-colors">Directions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
