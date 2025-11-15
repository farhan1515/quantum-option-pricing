import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const ProbabilityBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="position"
          label={{ value: 'Position', position: 'insideBottom', offset: -5 }}
        />
        <YAxis
          label={{ value: 'Probability', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip
          formatter={(value) => (value * 100).toFixed(2) + '%'}
          labelFormatter={(label) => `Position: ${label}`}
        />
        <Bar dataKey="probability" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};
