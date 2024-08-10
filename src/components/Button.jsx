import React from "react";

export default function Button({
  text,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      className={`mr-5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${className}`}
      {...props}
      type={type}
    >
      {text}
    </button>
  );
}
