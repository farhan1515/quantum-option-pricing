export const Button = ({ children, onClick, disabled, loading, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-base hover:from-indigo-800 hover:to-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className}`}
    >
      {loading ? (
        <>
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
          Calculating...
        </>
      ) : (
        children
      )}
    </button>
  );
};
