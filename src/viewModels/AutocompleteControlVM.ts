import { makeAutoObservable, runInAction } from 'mobx';

/**
 * ViewModel для Autocomplete-контролов
 *
 * @param {function} fetchFunction - функция получения подсказок с сервера
 */
class AutocompleteControlVM<T> {
    /**
     * @public
     * текст поиска подсказок
     */
    inputValue: string = '';

    /**
     * @public
     * статус загрузки подсказок
     */
    isLoading: boolean = false;

    /**
     * @public
     * массив подсказок
     */
    suggestions: T[] = [];

    private fetchFunction;

    constructor(fetchFunction: (search: string) => Promise<T[]>) {
        this.fetchFunction = fetchFunction;
        makeAutoObservable(this);
    }

    /**
     * @public
     * @async action получения подсказок
     */
    async fetchSuggestions(search: string) {
        this.suggestions = [];
        this.isLoading = true;
        try {
            const result = await this.fetchFunction(search);
            runInAction(() => {
                this.suggestions = result;
            });
        } catch (e) {
            console.error(`Не удалось загрузить список подсказок: ${e}`);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    /**
     * @public
     * изменение значения input
     */
    setInputValue(value: string) {
        this.inputValue = value;
    }

    /**
     * @public
     * выбор подсказки
     */
    selectSuggestion(item: T, name: string) {
        this.inputValue = name;
        this.suggestions = [item];
    }

    /**
     * @public
     * очистка подсказок
     */
    clearSuggestions() {
        this.suggestions = [];
    }
}

export default AutocompleteControlVM;
