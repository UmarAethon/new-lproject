import React from 'react';
import { Gift } from 'lucide-react';

const PromotionalBanner = () => {
  return (
    <div className="bg-[var(--accent)] text-[var(--primary)] py-2 sm:py-3">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center space-x-2 sm:space-x-3">
          <Gift className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base font-semibold text-center">
            Free gift on every order – Code: HOLIDAY
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;