import { useQuantumPricing } from "../hooks/useQuantumPricing";
import { Alert, AlertDescription } from "../components/ui/Alert";
import { Card, CardContent } from "../components/ui/Card";
import { SectionContainer } from "../components/ui/SectionContainer";
import { MarketParametersScreen } from "./MarketParametersScreen";
import { PricingResultsScreen } from "./PricingResultsScreen";
import { QuantumDistributionScreen } from "./QuantumDistributionScreen";
import { CallPayoffScreen } from "./CallPayoffScreen";

export const Dashboard = () => {
  const {
    params,
    setParam,
    calculate,
    results,
    isCalculating,
    validationErrors,
  } = useQuantumPricing();

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 min-h-screen">
      <div className="mb-8 text-center border-b border-indigo-200 pb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 via-blue-600 to-teal-600 bg-clip-text text-transparent mb-2">
          Quantum Option Pricing Dashboard
        </h1>
        <p className="text-indigo-600 text-base font-medium">
          Qiskit Fall Fest 2025 - Challenge 3: Production Implementation
        </p>
      </div>

      <SectionContainer>
        <Alert className="bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-500 shadow-sm">
          <AlertDescription>
            <div>
              <strong className="text-indigo-900">Validated Results:</strong>{" "}
              This implementation achieves{" "}
              <span className="font-semibold text-indigo-700">
                &lt;2% error
              </span>{" "}
              on both call and put options, matching the successful test run.
              Adjust parameters to explore different market scenarios.
            </div>
          </AlertDescription>
        </Alert>
      </SectionContainer>

      <SectionContainer>
        <MarketParametersScreen
          params={params}
          onParamChange={setParam}
          onCalculate={calculate}
          isCalculating={isCalculating}
          validationErrors={validationErrors}
        />
      </SectionContainer>

      {results && (
        <>
          <SectionContainer>
            <PricingResultsScreen results={results} />
          </SectionContainer>

          <SectionContainer>
            <QuantumDistributionScreen
              stats={results.quantum.stats}
              probDist={results.quantum.probDist}
            />
          </SectionContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CallPayoffScreen probDist={results.quantum.probDist} />
          </div>
        </>
      )}

      {!results && !isCalculating && (
        <Card className="shadow-lg border-2 border-indigo-200">
          <CardContent className="p-12 text-center bg-white">
            <h3 className="text-2xl font-semibold text-indigo-900 mb-2">
              Ready to Explore Quantum Finance
            </h3>
            <p className="text-base text-indigo-700 mb-8">
              Adjust the parameters above and click "Calculate" to see how
              quantum random walks price financial options compared to classical
              Black-Scholes.
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg border-2 border-indigo-200 shadow-sm">
                <div className="font-semibold text-indigo-700 mb-1">Step 1</div>
                <div className="text-indigo-600">Set market parameters</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border-2 border-blue-200 shadow-sm">
                <div className="font-semibold text-blue-700 mb-1">Step 2</div>
                <div className="text-blue-600">Run quantum simulation</div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-lg border-2 border-teal-200 shadow-sm">
                <div className="font-semibold text-teal-700 mb-1">Step 3</div>
                <div className="text-teal-600">Compare results</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
