export const SliderInput = ({ label, value, min, max, step, onChange, formatValue }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-indigo-900 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-base font-bold text-indigo-700">
          {formatValue ? formatValue(value) : value}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
    </div>
  );
};
