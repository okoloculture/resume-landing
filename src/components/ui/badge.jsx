import * as React from "react";

function Badge({ className = "", variant = "default", style, children, ...props }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 9999,
        border: "1px solid transparent",
        padding: "2px 10px",
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.5,
        ...(variant === "outline" ? { border: "1px solid currentColor" } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
