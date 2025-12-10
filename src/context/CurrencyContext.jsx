import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('PKR');

  const currencies = {
    PKR: { symbol: '₨', rate: 1 },
    USD: { symbol: '$', rate: 0.0036 },
    EUR: { symbol: '€', rate: 0.0033 },
    GBP: { symbol: '£', rate: 0.0029}
  };

  const formatPrice = (price) => {
    const convertedPrice = price * currencies[currency].rate;
    return `${currencies[currency].symbol}${convertedPrice.toLocaleString()}`;
  };

  const value = {
    currency,
    setCurrency,
    currencies,
    formatPrice
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};