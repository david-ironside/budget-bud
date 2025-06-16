// components/ui/Button.jsx
import clsx from "clsx";

export default function Button({ children, variant, type = "button", className = "", ...props }) {
  const base = "btn rounded-full shadow-sm tracking-wide";
  const variantClass = variant === "outline" ? "btn-outline" : "btn-primary";

  return (
    <button
      type={type}
      className={clsx(base, variantClass, className)}
      {...props}
    >
      {children}
    </button>
  );
}
