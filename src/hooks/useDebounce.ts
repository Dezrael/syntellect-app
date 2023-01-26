import { useRef, useCallback } from 'react';

/**
 * Hook для создания функции с отложенным вызовом
 *
 * @param callback - функция, которую необходимо сделать debounced
 * @param delay - задержка перед вызовом
 *
 * @returns deboucedCallback - итоговая функция, обёрнутая в debounce
 */
function useDebounce(callback: Function, delay: number) {
    const timer = useRef<number>();

    const deboucedCallback = useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = window.setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );

    return deboucedCallback;
}

export default useDebounce;
