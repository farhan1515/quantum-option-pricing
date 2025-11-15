import seedrandom from "seedrandom";

/**
 * Simulate Quantum Random Walk with seeded random for reproducibility
 * @param {number} n_steps - Number of steps in the walk
 * @param {number} n_walks - Number of walk simulations
 * @param {number} seed - Random seed for reproducibility (default: 42)
 * @returns {Array} Array of final positions
 */
export const simulateQuantumWalk = (n_steps, n_walks, seed = 42) => {
  // Use seeded random number generator (seedrandom creates a new RNG instance per call)
  const rng = seedrandom(seed.toString(), { global: false });
  const positions = [];

  for (let walk = 0; walk < n_walks; walk++) {
    let position = 0;

    // Each walk takes n_steps random steps
    for (let step = 0; step < n_steps; step++) {
      // Use seeded random instead of Math.random()
      if (rng() < 0.5) {
        position += 1;
      } else {
        position -= 1;
      }
    }

    positions.push(position);
  }

  return positions;
};

/**
 * Price options using Quantum Random Walk
 * @param {number} S0 - Initial stock price
 * @param {number} K - Strike price
 * @param {number} r - Risk-free rate
 * @param {number} sigma - Volatility
 * @param {number} T - Time to maturity
 * @param {Array} positions - Array of final positions from quantum walk
 * @param {number} n_steps - Number of steps used in the walk
 * @returns {Object} Object containing callQRW, putQRW, and probability distribution
 */
export const priceOptionsWithQRW = (S0, K, r, sigma, T, positions, n_steps) => {
  const dt = T / n_steps;
  const u = Math.exp(sigma * Math.sqrt(dt));
  const d = 1 / u;

  // Count position frequencies
  const positionCounts = {};
  positions.forEach((pos) => {
    positionCounts[pos] = (positionCounts[pos] || 0) + 1;
  });

  const n_walks = positions.length;
  const probDist = [];

  // Build probability distribution
  for (let pos in positionCounts) {
    const probability = positionCounts[pos] / n_walks;
    const posInt = parseInt(pos);

    // Calculate stock price at this position
    const price =
      posInt >= 0
        ? S0 * Math.pow(u, posInt)
        : S0 * Math.pow(d, Math.abs(posInt));

    probDist.push({
      position: posInt,
      probability: probability,
      price: price,
      callPayoff: Math.max(price - K, 0),
      putPayoff: Math.max(K - price, 0),
    });
  }

  // Sort by position
  probDist.sort((a, b) => a.position - b.position);

  // Calculate expected payoffs
  let callSum = 0;
  let putSum = 0;

  probDist.forEach((d) => {
    callSum += d.probability * d.callPayoff;
    putSum += d.probability * d.putPayoff;
  });

  // Discount to present value
  const callQRW = Math.exp(-r * T) * callSum;
  const putQRW = Math.exp(-r * T) * putSum;

  // Calculate statistics
  const meanPos = probDist.reduce(
    (sum, d) => sum + d.position * d.probability,
    0
  );
  const variance = probDist.reduce(
    (sum, d) => sum + Math.pow(d.position - meanPos, 2) * d.probability,
    0
  );
  const stdDev = Math.sqrt(variance);

  return {
    callQRW,
    putQRW,
    probDist,
    stats: {
      meanPos,
      stdDev,
      minPos: Math.min(...probDist.map((d) => d.position)),
      maxPos: Math.max(...probDist.map((d) => d.position)),
      numPositions: probDist.length,
    },
  };
};

/**
 * Calculate option prices using Quantum Random Walk
 * Main entry point - combines walk simulation and pricing
 * @param {number} S0 - Initial stock price
 * @param {number} K - Strike price
 * @param {number} r - Risk-free rate
 * @param {number} sigma - Volatility
 * @param {number} T - Time to maturity
 * @param {number} n_steps - Number of steps in the walk
 * @param {number} n_walks - Number of walk simulations
 * @param {number} seed - Random seed (default: 42)
 * @returns {Object} Complete results with prices and statistics
 */
export const calculateOptionPrices = (
  S0,
  K,
  r,
  sigma,
  T,
  n_steps,
  n_walks,
  seed = 42
) => {
  // Run quantum walk simulation
  const positions = simulateQuantumWalk(n_steps, n_walks, seed);

  // Price options using the walk results
  const result = priceOptionsWithQRW(S0, K, r, sigma, T, positions, n_steps);

  return result;
};
