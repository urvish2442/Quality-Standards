const WarningMessage = ({ children, className = "" }) => {
  if (!children) {
    return null;
  }

  return (
    <p
      role="status"
      className={`border-warning/30 bg-warning/10 text-warning rounded-xl border px-4 py-3 text-sm ${className}`}
    >
      {children}
    </p>
  );
};

export default WarningMessage;
