import { useState, useEffect, useRef } from 'react';

/**
 * Hook для настройки видимости компонента при клике за его пределами
 *
 * @param initialIsVisible - настройка изначальной видимости компонента
 *
 * @returns ref - ссылка на DIV элемент хука useRef
 * @returns isComponentVisible - состояние видимости компонента
 * @returns setIsComponentVisible - функция изменения состояния видимости компонента
 */
function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (ref.current && !ref.current.contains(target)) {
            setIsComponentVisible(false);
        } else {
            setIsComponentVisible(true);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
}

export default useComponentVisible;
