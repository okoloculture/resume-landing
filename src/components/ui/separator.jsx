import * as React from "react";

function Separator({ orientation = "horizontal", style, ...props }) {
  return (
    <div
      role="separator"
      style={{
        flexShrink: 0,
        background: "rgba(255,255,255,0.1)",
        ...(orientation === "horizontal"
          ? { height: 1, width: "100%" }
          : { width: 1, height: "100%" }),
        ...style,
      }}
      {...props}
    />
  );
}

export { Separator };
