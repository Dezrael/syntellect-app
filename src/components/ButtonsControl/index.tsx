import { FC } from 'react';
import { observer } from 'mobx-react';

import ButtonsControlVM from '../../viewModels/ButtonsControlVM';

import './style.css';

interface ButtonControlProps {
    /**
     * ViewModel компонента
     */
    vm: ButtonsControlVM;

    /**
     * Массив с настройками кнопок
     */
    buttons?: ButtonProps[];
}

/**
 * Компонент, включающий в себя текстовый input и позволяющий настраивать и выводить разное кол-во кнопок слева и справа от него.
 * Для каждой кнопки настраивается текст, callback и положение относительно input.
 *
 */
const ButtonsControl: FC<ButtonControlProps> = observer(({ vm, buttons }) => {
    const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        vm.setInputValue(e.target.value);
    };

    return (
        <div className="buttons-control">
            <input
                type="text"
                className="buttons-control__input"
                value={vm.inputValue}
                onChange={inputChangeHandle}
            />
            {buttons?.map((button, index) => (
                <Button key={index} {...button} />
            ))}
        </div>
    );
});

export interface ButtonProps {
    /**
     * Текст кнопки
     */
    text: string;

    /**
     * Callback-функция нажатия на кнопку
     */
    callback: () => void;

    /**
     * Позиция кнопки относительно input'а
     */
    position: 'left' | 'right';
}

/**
 * Вспомогательный компонент для рендера кнопки с заданным текстом и callback-функцией
 */
const Button: FC<ButtonProps> = ({ text, callback, position }) => {
    return (
        <button className={`buttons-control__button button-${position}`} onClick={callback}>
            {text}
        </button>
    );
};

export default ButtonsControl;
