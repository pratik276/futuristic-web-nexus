
import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.id = "cursor";
    document.body.appendChild(cursor);

    const dot = document.createElement("div");
    dot.id = "cursor-dot";
    dot.style.position = "fixed";
    dot.style.width = "4px";
    dot.style.height = "4px";
    dot.style.backgroundColor = "#8B5CF6";
    dot.style.borderRadius = "50%";
    dot.style.transform = "translate(-50%, -50%)";
    dot.style.pointerEvents = "none";
    dot.style.zIndex = "9999";
    dot.style.transition = "opacity 0.2s";
    document.body.appendChild(dot);

    let cursorVisible = false;
    let cursorEnlarged = false;

    const moveCursor = (e: MouseEvent) => {
      const mouseY = e.clientY;
      const mouseX = e.clientX;

      if (cursorVisible) {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const toggleCursorVisibility = () => {
      if (cursorVisible) {
        cursor.style.opacity = "1";
        dot.style.opacity = "1";
      } else {
        cursor.style.opacity = "0";
        dot.style.opacity = "0";
      }
    };

    const mouseEnter = () => {
      cursorVisible = true;
      toggleCursorVisibility();
    };

    const mouseLeave = () => {
      cursorVisible = false;
      toggleCursorVisibility();
    };

    const mouseDown = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    };

    const mouseUp = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        cursorEnlarged = true;
        cursor.style.backgroundColor = "rgba(139, 92, 246, 0.2)";
        cursor.style.mixBlendMode = "screen";
        cursor.style.width = "40px";
        cursor.style.height = "40px";
      }
    };

    const mouseOut = () => {
      cursorEnlarged = false;
      cursor.style.backgroundColor = "transparent";
      cursor.style.mixBlendMode = "normal";
      cursor.style.width = "20px";
      cursor.style.height = "20px";
    };

    // Initialize cursor position and display
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", mouseEnter);
    document.addEventListener("mouseleave", mouseLeave);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mouseover", mouseOver);
    document.addEventListener("mouseout", mouseOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", mouseEnter);
      document.removeEventListener("mouseleave", mouseLeave);
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("mouseover", mouseOver);
      document.removeEventListener("mouseout", mouseOut);
      
      document.body.removeChild(cursor);
      document.body.removeChild(dot);
    };
  }, []);

  return null;
};

export default CustomCursor;
