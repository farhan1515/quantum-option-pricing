export const Alert = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return (
    <div className="text-sm">
      {children}
    </div>
  );
};
