import { useState } from "react";

const useOnHover = (initiallyHovered = false) => {
  const [isHovered, setIsHovered] = useState(initiallyHovered);

  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useOnHover;
