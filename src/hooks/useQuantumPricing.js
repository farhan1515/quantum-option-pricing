import { useState } from "react";
import { blackScholesCall, blackScholesPut } from "../utils/blackScholes";
import { calculateOptionPrices } from "../utils/quantumWalk";

// DEFAULT PARAMETERS (DO NOT CHANGE)
export const defaultParams = {
  S0: 100, // Initial stock price
  K: 100, // Strike price
  r: 0.02, // Risk-free rate (2%)
  sigma: 0.2, // Volatility (20%)
  T: 5, // Maturity (5 years)
  n_steps: 100, // Walk steps
  n_walks: 500, // Number of samples
  seed: 42, // SEEDED for reproducibility
};

/**
 * Validate parameters
 */
const validateParams = (params) => {
  const errors = [];

  // Validate n_steps and n_walks (must be positive integers)
  if (!Number.isInteger(params.n_steps) || params.n_steps <= 0) {
    errors.push("n_steps must be a positive integer");
  }
  if (!Number.isInteger(params.n_walks) || params.n_walks <= 0) {
    errors.push("n_walks must be a positive integer");
  }

  // Validate S0, K, r, sigma, T (must be positive numbers)
  if (params.S0 <= 0) errors.push("Initial Stock Price (S0) must be positive");
  if (params.K <= 0) errors.push("Strike Price (K) must be positive");
  if (params.r <= 0) errors.push("Risk-free Rate (r) must be positive");
  if (params.sigma <= 0) errors.push("Volatility (sigma) must be positive");
  if (params.T <= 0) errors.push("Maturity (T) must be positive");

  return errors;
};

export const useQuantumPricing = () => {
  const [params, setParams] = useState({ ...defaultParams });
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const setParam = (key, value) => {
    // For n_steps and n_walks, ensure they are integers
    if (key === "n_steps" || key === "n_walks") {
      const intValue = parseInt(value);
      setParams((prev) => ({ ...prev, [key]: intValue }));
    } else {
      setParams((prev) => ({ ...prev, [key]: parseFloat(value) }));
    }
    setResults(null);
    setValidationErrors([]);
  };

  const calculate = () => {
    // Validate parameters
    const errors = validateParams(params);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors([]);
    setIsCalculating(true);

    setTimeout(() => {
      try {
        // Calculate Black-Scholes prices
        const callBS = blackScholesCall(
          params.S0,
          params.K,
          params.r,
          params.sigma,
          params.T
        );
        const putBS = blackScholesPut(
          params.S0,
          params.K,
          params.r,
          params.sigma,
          params.T
        );

        // Calculate Quantum Random Walk prices
        const qrw = calculateOptionPrices(
          params.S0,
          params.K,
          params.r,
          params.sigma,
          params.T,
          params.n_steps,
          params.n_walks,
          params.seed
        );

        // Calculate relative error percentage (same as Python: abs(qrw - bs) / bs * 100)
        const callError = (Math.abs(qrw.callQRW - callBS) / callBS) * 100;
        const putError = (Math.abs(qrw.putQRW - putBS) / putBS) * 100;

        // Log for debugging (same format as Python)
        console.log(
          `Black-Scholes Call: $${callBS.toFixed(4)} Put: $${putBS.toFixed(4)}`
        );
        console.log(
          `Quantum Walk Call: $${qrw.callQRW.toFixed(
            4
          )} Put: $${qrw.putQRW.toFixed(4)}`
        );
        console.log(
          `Call Error: ${callError.toFixed(2)}% Put Error: ${putError.toFixed(
            2
          )}%`
        );

        setResults({
          classical: {
            callPrice: callBS,
            putPrice: putBS,
          },
          quantum: {
            callQRW: qrw.callQRW,
            putQRW: qrw.putQRW,
            probDist: qrw.probDist,
            stats: qrw.stats,
          },
          comparison: {
            callError,
            putError,
          },
        });

        setIsCalculating(false);
      } catch (error) {
        console.error("Calculation error:", error);
        setValidationErrors([
          "An error occurred during calculation. Please check your parameters.",
        ]);
        setIsCalculating(false);
      }
    }, 1000);
  };

  return {
    params,
    setParam,
    calculate,
    results,
    isCalculating,
    validationErrors,
  };
};
