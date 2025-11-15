import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/Card";
import { SliderInput } from "../components/ui/SliderInput";
import { Button } from "../components/ui/Button";
import { Alert, AlertDescription } from "../components/ui/Alert";

export const MarketParametersScreen = ({
  params,
  onParamChange,
  onCalculate,
  isCalculating,
  validationErrors,
}) => {
  const parameterConfigs = [
    {
      key: "S0",
      label: "Initial Stock Price ($)",
      min: 50,
      max: 200,
      step: 10,
      formatValue: (val) => `$${val}`,
    },
    {
      key: "K",
      label: "Strike Price ($)",
      min: 50,
      max: 200,
      step: 10,
      formatValue: (val) => `$${val}`,
    },
    {
      key: "r",
      label: "Risk-free Rate",
      min: 0.01,
      max: 0.1,
      step: 0.01,
      formatValue: (val) => `${(val * 100).toFixed(0)}%`,
    },
    {
      key: "sigma",
      label: "Volatility (σ)",
      min: 0.1,
      max: 0.5,
      step: 0.05,
      formatValue: (val) => `${(val * 100).toFixed(0)}%`,
    },
    {
      key: "T",
      label: "Maturity (years)",
      min: 1,
      max: 10,
      step: 1,
    },
    {
      key: "n_steps",
      label: "Walk Steps",
      min: 50,
      max: 200,
      step: 10,
    },
    {
      key: "n_walks",
      label: "Number of Walks",
      min: 100,
      max: 1000,
      step: 50,
    },
  ];

  return (
    <Card className="shadow-lg border-2 border-indigo-200">
      <CardHeader className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white">
        <CardTitle>Market Parameters</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {validationErrors && validationErrors.length > 0 && (
          <div className="mb-6">
            <Alert className="bg-red-50 border-l-4 border-red-500">
              <AlertDescription>
                <div className="text-red-800">
                  <strong>Validation Error:</strong>
                  <ul className="list-disc list-inside mt-2">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {parameterConfigs.map(
            ({ key, label, min, max, step, formatValue }) => (
              <SliderInput
                key={key}
                label={label}
                value={params[key]}
                min={min}
                max={max}
                step={step}
                onChange={(value) => onParamChange(key, value)}
                formatValue={formatValue}
              />
            )
          )}
        </div>

        <div className="mt-6">
          <Button onClick={onCalculate} loading={isCalculating}>
            Calculate Option Prices
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
