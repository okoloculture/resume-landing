import * as React from "react";

function Card({ style, children, ...props }) {
  return <div style={{ borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", ...style }} {...props}>{children}</div>;
}
function CardHeader({ style, children, ...props }) {
  return <div style={{ padding: "24px 24px 0", ...style }} {...props}>{children}</div>;
}
function CardTitle({ style, children, ...props }) {
  return <h3 style={{ fontSize: 18, fontWeight: 600, ...style }} {...props}>{children}</h3>;
}
function CardContent({ style, children, ...props }) {
  return <div style={{ padding: 24, ...style }} {...props}>{children}</div>;
}

export { Card, CardHeader, CardTitle, CardContent };
