import React, { useState } from 'react';
import { CalendarDays, Clock, Users, MapPin, CheckCircle2, Phone, Mail, User, Sparkles, AlertCircle, UtensilsCrossed, Download, Share2 } from 'lucide-react';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/restaurantData';

interface BookingSystemProps {
  preselectedDishIds?: string[];
  cartCount: number;
}

export interface ReservationData {
  bookingId: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  seatingArea: string;
  occasion: string;
  specialRequests: string;
  preselectedItemsCount: number;
  createdAt: string;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ preselectedDishIds = [], cartCount }) => {
  // Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState<string>(todayStr);
  const [timeSlot, setTimeSlot] = useState<string>('08:00 PM');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [seatingArea, setSeatingArea] = useState<string>('AC Main Family Dining');
  const [occasion, setOccasion] = useState<string>('Casual Family Dinner');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [attachMenuOrder, setAttachMenuOrder] = useState<boolean>(cartCount > 0);

  // Status & Validation
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const availableTimeSlots = [
    // Lunch Slots
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM',
    // Dinner Slots
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    // Simulate instant reservation confirmation processing
    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newReservation: ReservationData = {
        bookingId: `IC-AMB-${randomNum}`,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Not specified',
        date,
        timeSlot,
        guestCount,
        seatingArea,
        occasion,
        specialRequests: specialRequests.trim(),
        preselectedItemsCount: attachMenuOrder ? cartCount : 0,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConfirmedReservation(newReservation);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
    setValidationError(null);
  };

  return (
    <section id="reservations" className="py-16 lg:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2">
            <CalendarDays className="w-4 h-4 text-amber-500" />
            <span>Table Reservation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Book Your Family Table
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Guarantee your table at Panvelkar Plaza, Ambernath. Instant confirmation with zero booking fee.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Pass */
          <div className="rounded-2xl border border-amber-500/30 bg-neutral-900/90 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col items-center text-center pb-8 border-b border-neutral-800">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">Table Confirmed!</h3>
              <p className="text-xs text-neutral-400 mt-1">
                Booking Reference:{' '}
                <span className="font-mono font-bold text-amber-400 text-sm">
                  {confirmedReservation.bookingId}
                </span>
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                A confirmation has been logged for{' '}
                <strong className="text-white">{confirmedReservation.fullName}</strong>.
              </p>
            </div>

            {/* Voucher Details */}
            <div className="py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-neutral-800">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500">Date</span>
                <div className="text-sm font-semibold text-white mt-1">
                  {new Date(confirmedReservation.date).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500">Time Slot</span>
                <div className="text-sm font-semibold text-amber-400 mt-1 font-mono">
                  {confirmedReservation.timeSlot}
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500">Guests</span>
                <div className="text-sm font-semibold text-white mt-1">
                  {confirmedReservation.guestCount} People
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-neutral-500">Seating</span>
                <div className="text-sm font-semibold text-white mt-1 truncate">
                  {confirmedReservation.seatingArea}
                </div>
              </div>
            </div>

            {/* Notes & Pre-orders */}
            <div className="py-6 space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Venue:</strong> Shop No. 14, Panvelkar Plaza, Shivaji Rd, Kansai Section, Ambernath (E)
                </span>
              </div>
              {confirmedReservation.preselectedItemsCount > 0 && (
                <div className="flex items-center gap-2 text-amber-300 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                  <UtensilsCrossed className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>{confirmedReservation.preselectedItemsCount} dish(es)</strong> attached to this booking. Your selections will be prioritized by the chef upon seating.
                  </span>
                </div>
              )}
              {confirmedReservation.specialRequests && (
                <div className="text-neutral-400 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                  <strong>Special Note:</strong> &ldquo;{confirmedReservation.specialRequests}&rdquo;
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Navigate via Google Maps</span>
              </a>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Reception</span>
                </a>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Book Another Table
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-10 space-y-8"
          >
            {validationError && (
              <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Step 1: Party Size & Date/Time */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-neutral-400">
                1. Date, Time & Party Size
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date Input */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                    required
                  />
                </div>

                {/* Guest Count */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Number of Guests
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={25}
                      value={guestCount}
                      onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white font-mono focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                    <div className="text-xs text-neutral-400 whitespace-nowrap">
                      {guestCount <= 2 && 'Couple'}
                      {guestCount >= 3 && guestCount <= 6 && 'Family Table'}
                      {guestCount > 6 && 'Group'}
                    </div>
                  </div>
                </div>

                {/* Seating Area */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Seating Area
                  </label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="AC Main Family Dining">AC Main Family Hall</option>
                    <option value="Cozy Corner Booth">Cozy Corner Booth</option>
                    <option value="Celebratory Long Table">Celebratory Long Table</option>
                    <option value="Front Lounge Table">Front Lounge Table</option>
                  </select>
                </div>
              </div>

              {/* Time Slots Chips */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-2">
                  Select Seating Time Slot
                </label>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1 bg-neutral-950 rounded-xl border border-neutral-800/80">
                  {availableTimeSlots.map((slot) => {
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm'
                            : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 2: Occasion & Contact Details */}
            <div className="space-y-4 pt-4 border-t border-neutral-800">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider text-neutral-400">
                2. Guest Information & Preferences
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kulkarni"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Mobile Number (+91) *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="e.g. 98230 45890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="e.g. guest@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Dining Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="Casual Family Dinner">Casual Family Dinner</option>
                    <option value="Birthday Party Celebration">Birthday Party Celebration</option>
                    <option value="Anniversary Special">Wedding / Anniversary</option>
                    <option value="Friends Get-Together">Friends Get-Together</option>
                    <option value="Business Lunch">Business Meeting / Lunch</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Special Notes / Dietary Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Need high chair for baby, less spicy food, quiet booth, birthday cake assistance, etc."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              {/* Attach Menu Orders if any */}
              {cartCount > 0 && (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <UtensilsCrossed className="w-4 h-4 text-amber-500 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-white">
                        Attach {cartCount} Pre-Selected Dish{cartCount > 1 ? 'es' : ''} to Table
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Kitchen will initiate prep so food is served hot right after seating.
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={attachMenuOrder}
                    onChange={(e) => setAttachMenuOrder(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-neutral-400 text-center sm:text-left">
                No advance payment needed · Tables are held for 15 minutes past scheduled time
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-neutral-950 font-bold text-sm rounded-lg transition-all shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Table...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
