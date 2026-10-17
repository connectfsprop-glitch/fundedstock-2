
/**
 * Core Trading Plans Registry
 * These are the "Original Plans" that are immutable and non-removable.
 * New plans added via Admin Plan Manager are merged with this list.
 */

export const LEGACY_PLANS = [
    // --- INDIAN MARKET: INSTANT PRO ---
    // Price Protocol: Set 20% lower than corresponding Normal Instant sizes
    { id: 'legacy-pro-5l', title: '5 Lakh Pro', size: '5 Lakh', price: 17279, category: 'pro', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-pro-10l', title: '10 Lakh Pro', size: '10 Lakh', price: 27839, category: 'pro', market_type: 'indian', is_popular: true, is_active: true },
    { id: 'legacy-pro-25l', title: '25 Lakh Pro', size: '25 Lakh', price: 47520, category: 'pro', market_type: 'indian', is_popular: false, is_active: true },

    // --- INDIAN MARKET: STANDARD INSTANT ---
    { id: 'legacy-inst-1l', title: '1 Lakh Instant', size: '1 Lakh', price: 7199, category: 'instant', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-inst-2l', title: '2 Lakh Instant', size: '2 Lakh', price: 11999, category: 'instant', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-inst-5l', title: '5 Lakh Instant', size: '5 Lakh', price: 21599, category: 'instant', market_type: 'indian', is_popular: true, is_active: true },
    { id: 'legacy-inst-10l', title: '10 Lakh Instant', size: '10 Lakh', price: 34799, category: 'instant', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-inst-25l', title: '25 Lakh Instant', size: '25 Lakh', price: 59400, category: 'instant', market_type: 'indian', is_popular: false, is_active: true },

    // --- INDIAN MARKET: 1-STEP ---
    { id: 'legacy-1s-1l', title: '1 Lakh 1-Step', size: '1 Lakh', price: 5519, category: '1-step', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-1s-2l', title: '2 Lakh 1-Step', size: '2 Lakh', price: 9119, category: '1-step', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-1s-5l', title: '5 Lakh 1-Step', size: '5 Lakh', price: 15119, category: '1-step', market_type: 'indian', is_popular: true, is_active: true },
    { id: 'legacy-1s-10l', title: '10 Lakh 1-Step', size: '10 Lakh', price: 23519, category: '1-step', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-1s-25l', title: '25 Lakh 1-Step', size: '25 Lakh', price: 41999, category: '1-step', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-1s-50l', title: '50 Lakh 1-Step', size: '50 Lakh', price: 65999, category: '1-step', market_type: 'indian', is_popular: false, is_active: true },

    // --- INDIAN MARKET: 2-STEP ---
    { id: 'legacy-2s-1l', title: '1 Lakh 2-Step', size: '1 Lakh', price: 3599, category: '2-step', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-2s-2l', title: '2 Lakh 2-Step', size: '2 Lakh', price: 5999, category: '2-step', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-2s-5l', title: '5 Lakh 2-Step', size: '5 Lakh', price: 9599, category: '2-step', market_type: 'indian', is_popular: true, is_active: true },
    { id: 'legacy-2s-10l', title: '10 Lakh 2-Step', size: '10 Lakh', price: 15599, category: '2-step', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-2s-25l', title: '25 Lakh 2-Step', size: '25 Lakh', price: 26399, category: '2-step', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-2s-50l', title: '50 Lakh 2-Step', size: '50 Lakh', price: 35999, category: '2-step', market_type: 'indian', is_popular: false, is_active: true, is_featured: true },

    // --- INDIAN MARKET: PTP ---
    { id: 'legacy-ptp-5l', title: '5 Lakh PassThenPay', size: '5 Lakh', price: 239, category: 'ptp', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-ptp-10l', title: '10 Lakh PassThenPay', size: '10 Lakh', price: 359, category: 'ptp', market_type: 'indian', is_popular: true, is_active: true },
    { id: 'legacy-ptp-25l', title: '25 Lakh PassThenPay', size: '25 Lakh', price: 479, category: 'ptp', market_type: 'indian', is_popular: false, is_active: true },
    { id: 'legacy-ptp-50l', title: '50 Lakh PassThenPay', size: '50 Lakh', price: 599, category: 'ptp', market_type: 'indian', is_popular: false, is_active: true },

    // --- FOREX MARKET: 2-STEP ---
    { id: 'legacy-fx-2s-5k', title: '$5k Forex 2-Step', size: '5,000', price: 5040, usd_price: 59, category: '2-step', market_type: 'forex', is_popular: false, is_active: true },
    { id: 'legacy-fx-2s-10k', title: '$10k Forex 2-Step', size: '10,000', price: 9120, usd_price: 107, category: '2-step', market_type: 'forex', is_popular: false, is_active: true },
    { id: 'legacy-fx-2s-25k', title: '$25k Forex 2-Step', size: '25,000', price: 17400, usd_price: 203, category: '2-step', market_type: 'forex', is_popular: true, is_active: true },
    { id: 'legacy-fx-2s-50k', title: '$50k Forex 2-Step', size: '50,000', price: 30600, usd_price: 359, category: '2-step', market_type: 'forex', is_popular: false, is_active: true },
    { id: 'legacy-fx-2s-100k', title: '$100k Forex 2-Step', size: '100,000', price: 51000, usd_price: 599, category: '2-step', market_type: 'forex', is_popular: false, is_active: true },
];
