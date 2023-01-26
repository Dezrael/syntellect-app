import { makeAutoObservable } from 'mobx';

/**
 * ViewModel для Button-контролов
 */
class ButtonsControlVM {
    /**
     * @public
     * текст в input'е
     */
    inputValue: string = '';

    constructor() {
        makeAutoObservable(this);
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
     * очистка input
     */
    clearInput() {
        this.inputValue = '';
    }
}

export default ButtonsControlVM;
