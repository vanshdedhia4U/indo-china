import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Clock, Phone, ExternalLink, Copy, Check, Car, Train, Footprints } from 'lucide-react';
import { RESTAURANT_INFO, NEARBY_LANDMARKS } from '../data/restaurantData';

export const LocationMapSection: React.FC = () => {
  const [mapMode, setMapMode] = useState<'place' | 'directions'>('place');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('Ambernath Railway Station East');
  const [customOrigin, setCustomOrigin] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyCGpRJf-TmtkWK65uekXmLWTXsfPOALwJU';

  // Construct official Google Maps Embed URL with required solution_id attribution
  const placeEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&solution_id=gmp_git_agentskills_v1&q=Indo+China+-+Family+Restaurant,Panvelkar+Plaza,Ambernath&center=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&zoom=17`;

  const activeOrigin = customOrigin.trim() || selectedOrigin;
  const directionsEmbedUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&solution_id=gmp_git_agentskills_v1&origin=${encodeURIComponent(
    activeOrigin
  )}&destination=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}&mode=driving`;

  const currentEmbedUrl = mapMode === 'place' ? placeEmbedUrl : directionsEmbedUrl;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="location" className="py-16 lg:py-24 bg-neutral-900/30 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Location & Accessibility</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Visit Indo China at Panvelkar Plaza
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Conveniently situated on Shivaji Road in Kansai Section, just a short 4-minute drive from Ambernath Railway Station (East).
            </p>
          </div>

          {/* Quick Navigation Action */}
          <div className="flex items-center gap-3">
            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs rounded-lg flex items-center gap-2 transition-colors shadow-md shadow-amber-500/10 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Map Container + Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Interactive Map Embed (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-between p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMapMode('place')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'place'
                      ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Restaurant Pin</span>
                </button>
                <button
                  onClick={() => setMapMode('directions')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    mapMode === 'directions'
                      ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get Driving Route</span>
                </button>
              </div>

              <span className="text-[11px] text-neutral-400 hidden sm:inline px-2">
                Powered by Google Maps Platform
              </span>
            </div>

            {/* Directions Controls when in directions mode */}
            {mapMode === 'directions' && (
              <div className="p-3 bg-neutral-900/90 border border-neutral-800 rounded-xl space-y-2.5 animate-in fade-in duration-150">
                <div className="text-xs font-medium text-neutral-300">
                  Select your starting point or enter custom location:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Ambernath Railway Station East',
                    'Ulhasnagar Station',
                    'Kalyan Junction',
                    'Badlapur Station',
                  ].map((origin) => (
                    <button
                      key={origin}
                      onClick={() => {
                        setSelectedOrigin(origin);
                        setCustomOrigin('');
                      }}
                      className={`px-2.5 py-1 text-xs rounded-md border transition-colors cursor-pointer ${
                        selectedOrigin === origin && !customOrigin
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {origin}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Or type starting area (e.g. Dombivli, Shivaji Chowk)..."
                    value={customOrigin}
                    onChange={(e) => setCustomOrigin(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                  {customOrigin && (
                    <button
                      onClick={() => setCustomOrigin('')}
                      className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white bg-neutral-800 rounded-lg"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Google Maps iFrame */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-4/3 sm:aspect-16/10 shadow-2xl">
              <iframe
                title="Google Maps Location of Indo China Restaurant"
                src={currentEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-105"
              />
            </div>

            {/* Street & Landmark hint below map */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Roadside parking and plaza parking available right outside.</span>
              </div>
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 shrink-0 ml-2"
              >
                <span>Full screen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right: Operational Details & Commute Timings (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address & Contact Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-neutral-400 mb-2">
                  Address & Contact
                </h3>
                <p className="text-sm text-neutral-200 leading-relaxed font-medium">
                  {RESTAURANT_INFO.address}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleCopyAddress}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy Postal Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>{RESTAURANT_INFO.phone}</span>
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-white mb-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Dine-In & Kitchen Hours</span>
                </div>
                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400">Monday – Sunday</span>
                    <span className="font-semibold text-amber-400 font-mono">11:30 AM – 12:00 AM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-800/60">
                    <span className="text-neutral-400">Lunch Service</span>
                    <span className="font-mono text-neutral-200">11:30 AM – 04:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-neutral-400">Dinner Service</span>
                    <span className="font-mono text-neutral-200">06:30 PM – Midnight</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Commute & Landmarks Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Train className="w-4 h-4 text-amber-500" />
                <span>Travel Times from Nearby Hubs</span>
              </h3>

              <div className="space-y-3">
                {NEARBY_LANDMARKS.map((landmark) => (
                  <div
                    key={landmark.name}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-800/60 last:border-0"
                  >
                    <div>
                      <div className="font-medium text-white">{landmark.name}</div>
                      <div className="text-[11px] text-neutral-400">{landmark.distance}</div>
                    </div>
                    <span className="font-mono text-amber-400/90 bg-neutral-950 px-2 py-1 rounded border border-neutral-800 text-[11px]">
                      {landmark.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
