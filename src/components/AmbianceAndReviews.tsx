import React from 'react';
import { Star, Quote, Award, Sparkles, Users, Utensils, ShieldCheck } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';

export const AmbianceAndReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>Guest Experiences</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Loved by Ambernath Families
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Consistently rated 4.8 out of 5 stars by over 800 happy diners across Thane district.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
            <div className="text-3xl font-extrabold text-white font-display">4.8</div>
            <div className="border-l border-neutral-800 pl-4 space-y-0.5">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs text-neutral-400">800+ Verified Reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-500">{rev.date}</span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800/80">
                <div className="text-xs font-semibold text-white">{rev.author}</div>
                <div className="text-[11px] text-amber-500 font-medium">{rev.visitedFor}</div>
                <div className="text-[10px] text-neutral-500 mt-0.5">{rev.source}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambiance & Hospitalities Spotlight */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-semibold text-amber-500 uppercase tracking-wider">
                The Dining Experience
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Warm Hospitality & Comfortable Family Seating
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Whether dropping by for a casual weekday lunch or celebrating milestone family birthdays, our dining hall at Panvelkar Plaza offers a relaxed, clean, and cool retreat.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict vegetarian and non-vegetarian segregation in preparation.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Flexible table arrangements for groups up to 25 people.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Complimentary cake celebration arrangements upon request.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-4/3 relative group">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Indo China dining hall atmosphere"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                  AC Family Dining Hall
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 aspect-4/3 relative group">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                  alt="Cozy restaurant booth setup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                  Intimate Booth Seating
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
