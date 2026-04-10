export default function Container({ children, className = "" }) {
  return (
    <div className={`container-minta ${className}`}>{children}</div>
  );
}
