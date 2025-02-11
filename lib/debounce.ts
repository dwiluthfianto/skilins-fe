import { useState, useEffect, useCallback } from 'react';

export default function useDebounce<T>(value: T, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedSetValue = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    // Skip debounce for initial value
    if (debouncedValue === value) {
      return;
    }

    const handler = setTimeout(debouncedSetValue, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, debouncedValue, debouncedSetValue]);

  return debouncedValue;
}
