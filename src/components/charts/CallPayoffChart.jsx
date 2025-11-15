import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const CallPayoffChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="price"
          type="number"
          domain={['dataMin', 'dataMax']}
          label={{ value: 'Stock Price ($)', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          dataKey="callPayoff"
          label={{ value: 'Payoff ($)', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === 'callPayoff') return '$' + value.toFixed(2);
            if (name === 'probability') return (value * 100).toFixed(2) + '%';
            return value;
          }}
        />
        <Scatter
          data={data}
          fill="#0891b2"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
