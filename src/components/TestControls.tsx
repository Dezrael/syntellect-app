import AutocompleteControlVM from '../viewModels/AutocompleteControlVM';
import ButtonsControlVM from '../viewModels/ButtonsControlVM';
import AutoCompleteControl from './AutocompleteControl';
import ButtonsControl from './ButtonsControl';
import CountryItem from './CountryItem';

import { ButtonProps } from './ButtonsControl';
import { CountryInfo, getCountryByName } from '../api/apiService';

/**
 * Набор компонентов для тестирования
 */

/**
 * @type {ButtonsControl} - контрол с 2 кнопками справа:
 *  -При нажатии на первую кнопку очищается содерживое в контроле
 *  -При нажатии на вторую кнопку текст в контроле меняется на 'Hello world!'
 */
export const FirstTestButtonsControl = () => {
    const buttonsControlVM = new ButtonsControlVM();

    const buttons: ButtonProps[] = [
        {
            text: 'Очистить содержимое',
            callback: () => buttonsControlVM.clearInput(),
            position: 'right',
        },
        {
            text: 'Hello world!',
            callback: () => buttonsControlVM.setInputValue('Hello world!'),
            position: 'right',
        },
    ];

    return <ButtonsControl vm={buttonsControlVM} buttons={buttons} />;
};

/**
 * @type {ButtonsControl} - контрол с 1 кнопкой справа и 1 кнопкой слева:
 *  -При нажатии на кнопку справа вызывается alert с текстом в контроле
 *  -При нажатии на кнопку слева проверяется, что в контроле введено число и, если это так, то оно выводится через alert:
 */
export const SecondTestButtonsControl = () => {
    const buttonsControlVM = new ButtonsControlVM();

    const buttons: ButtonProps[] = [
        {
            text: 'Alert',
            callback: () => buttonsControlVM.inputValue && alert(buttonsControlVM.inputValue),
            position: 'right',
        },
        {
            text: 'Alert числа',
            callback: () => {
                const number = +buttonsControlVM.inputValue;
                if (number && Number.isFinite(number)) alert(number);
            },
            position: 'left',
        },
    ];

    return <ButtonsControl vm={buttonsControlVM} buttons={buttons} />;
};

/**
 * @type {AutoCompleteControl} - контрол с максимальным количеством подсказок - 3
 */
export const FirstTestAutocompleteControl = () => {
    const autocompleteControlVm = new AutocompleteControlVM<CountryInfo>(getCountryByName);

    return (
        <AutoCompleteControl
            vm={autocompleteControlVm}
            maxSuggestions={3}
            SuggestionItem={CountryItem}
        />
    );
};

/**
 * @type {AutoCompleteControl} - контрол с максимальным количеством подсказок - 10
 */
export const SecondTestAutocompleteControl = () => {
    const autocompleteControlVm = new AutocompleteControlVM<CountryInfo>(getCountryByName);

    return (
        <AutoCompleteControl
            vm={autocompleteControlVm}
            maxSuggestions={10}
            SuggestionItem={CountryItem}
        />
    );
};
