import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { CallPayoffChart } from '../components/charts/CallPayoffChart';

export const CallPayoffScreen = ({ probDist }) => {
  return (
    <Card className="shadow-lg border-2 border-indigo-200">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b-2 border-indigo-200">
        <CardTitle className="text-indigo-900">Call Payoff vs Stock Price</CardTitle>
      </CardHeader>
      <CardContent className="bg-white">
        <CallPayoffChart data={probDist} />
        <p className="text-sm text-indigo-700 mt-2 text-center font-medium">
          Higher payoffs weighted by quantum probability distribution
        </p>
      </CardContent>
    </Card>
  );
};
