import { useCallback } from 'react';
import { observer } from 'mobx-react';

import AutocompleteControlVM from '../../viewModels/AutocompleteControlVM';
import useDebounce from '../../hooks/useDebounce';
import useComponentVisible from '../../hooks/useComponentVisible';

import './style.css';

interface AutocompliteProps<T> {
    /**
     * ViewModel компонента
     */
    vm: AutocompleteControlVM<T>;

    /**
     * Максимальное количество подсказок
     * @default 5
     */
    maxSuggestions?: number;

    /**
     * Компонент, использующийся для рендера подсказки
     * @type {SuggestionItemProps<T>} - props компонента
     */
    SuggestionItem: React.FC<SuggestionItemProps<T>>;

    /**
     * Интервал для отложенного вызова функции (мс) поиска подсказок при вводе текста в input
     * @default 500
     */
    debounceDelay?: number;
}

/**
 * Компонент, представляющий собой текстовый input с отображением подсказок при вводе текста
 * Подскасзки выводятся под input'ом в виде списка
 *
 * Есть возможность настроить максимальное количество подсказок
 * Может переиспользоваться для разных типов выводимых подсказок
 *
 * @template T - generic тип объекта, представляющего собой подсказку
 */
const AutoCompleteControl = observer(
    <T extends object>({
        vm,
        SuggestionItem,
        maxSuggestions = 5,
        debounceDelay = 500,
    }: AutocompliteProps<T>) => {
        //State видимости элемента с подсказками
        const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

        //Debounce функция поиска подсказок
        const deboucedFetchSuggestions = useDebounce(
            (value: string) => vm.fetchSuggestions(value),
            debounceDelay,
        );

        //Обработчик ввода пользователя, вызывающий debounce функцию, если поле не пустое
        const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
            vm.setInputValue(e.target.value);

            if (e.target.value) {
                setIsComponentVisible(true);
                deboucedFetchSuggestions(e.target.value);
            } else {
                //Очистка массива подсказок при пустом input
                setIsComponentVisible(false);
                vm.clearSuggestions();
            }
        };

        //Обработчик выбора подсказки
        const selectItemCallback = useCallback(
            (item: T, name: string) => {
                vm.selectSuggestion(item, name);
                setIsComponentVisible(false);
            },
            [vm, setIsComponentVisible],
        );

        return (
            <div className="autocomlete-control" ref={ref}>
                <input
                    className="autocomlete-control__input"
                    type="text"
                    value={vm.inputValue}
                    onChange={inputChangeHandle}
                />
                {isComponentVisible && (vm.suggestions.length > 0 || vm.isLoading) && (
                    <div className="autocomlete-suggeststions">
                        <ul className="autocomlete-suggeststions__list">
                            {vm.isLoading && (
                                <li className="autocomlete-suggeststions__loader">Загрузка...</li>
                            )}
                            {vm.suggestions
                                ?.map((item, index) => (
                                    <SuggestionItem
                                        key={index}
                                        item={item}
                                        selectItem={selectItemCallback}
                                    />
                                ))
                                .slice(0, maxSuggestions)}
                        </ul>
                    </div>
                )}
            </div>
        );
    },
);

/**
 * Props компонента для рендера подсказки
 */
export interface SuggestionItemProps<T> {
    /**
     * Тип объекта подсказки
     */
    item: T;

    /**
     * Callback-функция выбора подсказки
     */
    selectItem: (item: T, name: string) => void;
}

export default AutoCompleteControl;
