import React from "react";
import clsx from "clsx";

export default function Label({ className, children }) {
  return (
    <span className={clsx("custom-label", "capitalize", className)}>
      {children}
    </span>
  );
}
