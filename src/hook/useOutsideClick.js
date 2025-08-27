import { useEffect, useRef } from "react";

export const useOutsideClick = (callback) => {
  const handlersRef = useRef(new Map());

  useEffect(() => {
    const handleClick = (event) => {
        const handlers = handlersRef.current;
        handlers.forEach((callback, element) => {
            if (element && !element.contains(event.target)) {
                callback();
            }
        })
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (element) => {
    
        if (!element) return;

        handlersRef.current.set(element, callback);
        
        return () => {
            handlersRef.current.delete(element);
        }
    
  };
};