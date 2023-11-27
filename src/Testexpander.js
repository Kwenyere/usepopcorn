import { useState } from "react";

export default function TestExpander({
  children,
  collapsenumOfWords = 20,
  expandedButton = "show more",
  collapseButton = "show less",
  expanded = false,
  buttonColor = "#1f09cd",
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displaText = isExpanded
    ? children
    : children.split(" ").slice(0, collapsenumOfWords).join() + "...";

  const buttonStyle = {
    border: "none",
    marginLeft: `${4}px`,
    background: "none",
    cursor: "pointer",
    color: buttonColor,
  };
  return (
    <div>
      <span>{displaText}</span>
      <button style={buttonStyle} onClick={() => setIsExpanded((exp) => !exp)}>
        {isExpanded ? collapseButton : expandedButton}
      </button>
    </div>
  );
}
