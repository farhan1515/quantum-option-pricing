import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { ProbabilityBarChart } from '../components/charts/ProbabilityBarChart';

export const QuantumDistributionScreen = ({ stats, probDist }) => {
  return (
    <>
      <Card className="shadow-lg border-2 border-indigo-200 mb-6">
        <CardHeader className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
          <CardTitle>
            Quantum Walk Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 bg-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-lg text-center border-2 border-indigo-200 shadow-sm">
              <div className="text-sm text-indigo-700 font-medium">Mean Position</div>
              <div className="text-2xl font-bold text-indigo-900">
                {stats.meanPos.toFixed(2)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg text-center border-2 border-blue-200 shadow-sm">
              <div className="text-sm text-blue-700 font-medium">Std Deviation</div>
              <div className="text-2xl font-bold text-blue-900">
                {stats.stdDev.toFixed(2)}
              </div>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg text-center border-2 border-cyan-200 shadow-sm">
              <div className="text-sm text-teal-700 font-medium">Position Range</div>
              <div className="text-2xl font-bold text-teal-900">
                [{stats.minPos}, {stats.maxPos}]
              </div>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-lg text-center border-2 border-teal-200 shadow-sm">
              <div className="text-sm text-emerald-700 font-medium">Positions</div>
              <div className="text-2xl font-bold text-emerald-900">
                {stats.numPositions}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-2 border-indigo-200">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b-2 border-indigo-200">
          <CardTitle className="text-indigo-900">Position Probability Distribution</CardTitle>
        </CardHeader>
        <CardContent className="bg-white">
          <ProbabilityBarChart data={probDist} />
          <p className="text-sm text-indigo-700 mt-2 text-center font-medium">
            Bell-curve distribution demonstrates proper quantum walk behavior
          </p>
        </CardContent>
      </Card>
    </>
  );
};
