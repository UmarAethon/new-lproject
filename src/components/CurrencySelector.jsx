import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const CurrencySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-[var(--primary)] transition-colors py-2 px-2 sm:px-3 rounded-lg hover:bg-gray-50"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:block">{currency}</span>
        <span className="text-sm font-medium sm:hidden">{currencies[currency].symbol}</span>
<ChevronDown className="w-3 h-3" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-24 sm:w-32 bg-white shadow-xl rounded-lg border py-2 z-50">
          {Object.entries(currencies).map(([code, { symbol }]) => (
            <button
              key={code}
              onClick={() => {
                setCurrency(code);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                currency === code ? 'text-[var(--accent)] font-medium' : 'text-gray-700'
              }`}
            >
              <span className="block sm:hidden">{symbol} {code}</span>
              <span className="hidden sm:block">{code} ({symbol})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;