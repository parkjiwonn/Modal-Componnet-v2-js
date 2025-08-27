import { useEffect, useRef } from "react";

export const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
        const handlers = handlersRef.current;
        handlers.forEach((callback, element) => {
            if (!element.contains(event.target)) {
                callback();
            }
        })
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (callback) => {
    return (element) => {
        if (!element) return;

        handlersRef.current.set(callback, element);
        
        return () => {
            handlersRef.current.delete(callback);
        }
    }
  };
};