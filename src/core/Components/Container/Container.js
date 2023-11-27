import clsx from "clsx";
import React from "react";

const Container = ({ className, children }) => {
  return (
    <div className={clsx("container mx-auto px-4", className)}>{children}</div>
  );
};

export default Container;
