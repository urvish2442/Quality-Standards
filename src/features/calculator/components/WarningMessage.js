const WarningMessage = ({ children, className = "" }) => {
  if (!children) {
    return null;
  }

  return (
    <p
      role="status"
      className={`rounded-xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-warning ${className}`}
    >
      {children}
    </p>
  );
};

export default WarningMessage;
