import {useRef} from 'react';

export function useDebounce(callback: (...args: any) => void, delay: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return (...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
