import { normalCDF } from './normalCDF';

/**
 * Black-Scholes Call Option Price
 */
export const blackScholesCall = (S0, K, r, sigma, T) => {
  const d1 = (Math.log(S0 / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  
  const callPrice = S0 * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
  return callPrice;
};

/**
 * Black-Scholes Put Option Price
 */
export const blackScholesPut = (S0, K, r, sigma, T) => {
  const d1 = (Math.log(S0 / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  
  const putPrice = K * Math.exp(-r * T) * normalCDF(-d2) - S0 * normalCDF(-d1);
  return putPrice;
};

/**
 * Calculate both Call and Put prices (for backward compatibility)
 */
export const calculateBlackScholes = (params) => {
  const { S0, K, r, sigma, T } = params;
  return {
    callPrice: blackScholesCall(S0, K, r, sigma, T),
    putPrice: blackScholesPut(S0, K, r, sigma, T),
  };
};
