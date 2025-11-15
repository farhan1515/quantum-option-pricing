import jstat from 'jstat';

/**
 * Normal CDF using jstat.normal.cdf(x, 0, 1)
 * Standard normal cumulative distribution function
 */
export const normalCDF = (x) => {
  return jstat.normal.cdf(x, 0, 1);
};
