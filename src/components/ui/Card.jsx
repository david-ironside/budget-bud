// src/components/ui/Card.jsx
export function Card({ children, className }) {
    return <div className={`card bg-base-100 shadow-md ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className }) {
    return (
      <div className={`card-body flex items-center justify-center text-center h-full ${className}`}>
        {children}
      </div>
    );
  }
  