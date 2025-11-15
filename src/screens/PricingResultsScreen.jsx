import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

/**
 * Get error status color based on error percentage
 * GREEN if error < 5%, ORANGE if 5-20%, RED if > 20%
 */
const getErrorStatus = (error) => {
  if (error < 5) {
    return {
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      border: 'border-emerald-300',
      text: 'text-emerald-700',
      label: 'Excellent',
    };
  } else if (error <= 20) {
    return {
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      border: 'border-amber-300',
      text: 'text-amber-700',
      label: 'Acceptable',
    };
  } else {
    return {
      bg: 'bg-gradient-to-br from-red-50 to-rose-50',
      border: 'border-red-300',
      text: 'text-red-700',
      label: 'High Error',
    };
  }
};

const OptionResultCard = ({ title, classical, quantum, error }) => {
  const errorStatus = getErrorStatus(error);

  return (
    <Card className="shadow-lg border-2 border-indigo-200">
      <CardHeader className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
        <CardTitle>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4 bg-white">
        {/* Black-Scholes (Classical) */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border-2 border-indigo-200 shadow-sm">
          <div className="text-sm text-indigo-700 mb-1 font-medium">Black-Scholes (Classical)</div>
          <div className="text-4xl font-bold text-indigo-900">
            ${classical.toFixed(4)}
          </div>
        </div>

        {/* Quantum Random Walk */}
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg border-2 border-cyan-300 shadow-sm">
          <div className="text-sm text-teal-700 mb-1 font-medium">Quantum Random Walk</div>
          <div className="text-4xl font-bold text-teal-700">
            ${quantum.toFixed(4)}
          </div>
        </div>

        {/* Relative Error with Status Color */}
        <div className={`p-4 rounded-lg border-2 shadow-sm ${errorStatus.bg} ${errorStatus.border}`}>
          <div className="flex items-center justify-between mb-1">
            <div className={`text-sm font-medium ${errorStatus.text}`}>Relative Error</div>
            <div className={`text-xs font-semibold px-2 py-1 rounded ${errorStatus.bg} ${errorStatus.text} border ${errorStatus.border}`}>
              {errorStatus.label}
            </div>
          </div>
          <div className={`text-3xl font-bold ${errorStatus.text}`}>
            {error.toFixed(2)}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const PricingResultsScreen = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <OptionResultCard
        title="Call Option Results"
        classical={results.classical.callPrice}
        quantum={results.quantum.callQRW}
        error={results.comparison.callError}
      />
      <OptionResultCard
        title="Put Option Results"
        classical={results.classical.putPrice}
        quantum={results.quantum.putQRW}
        error={results.comparison.putError}
      />
    </div>
  );
};
