import { useEffect, useRef } from 'react';

export const useShakeAnimation = () => {
  const styleRef = useRef(null);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      .shake-animation {
        animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      }
    `;

    document.head.appendChild(styleEl);
    styleRef.current = styleEl;

    return () => {
      if (styleRef.current && document.head.contains(styleRef.current)) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

  const triggerShake = (element) => {
    if (!element) return;

    element.classList.add('shake-animation');
    setTimeout(() => {
      element.classList.remove('shake-animation');
    }, 500);
  };

  const triggerShakeById = (elementId) => {
    const element = document.getElementById(elementId);
    triggerShake(element);
  };

  const triggerShakeByRef = (ref) => {
    if (ref && ref.current) {
      triggerShake(ref.current);
    }
  };

  return {
    triggerShake,
    triggerShakeById,
    triggerShakeByRef,
  };
};
