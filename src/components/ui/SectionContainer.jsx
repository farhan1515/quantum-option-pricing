export const SectionContainer = ({ children, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
};
