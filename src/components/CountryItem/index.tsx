import { FC, useState } from 'react';

import { CountryInfo } from '../../api/apiService';
import { SuggestionItemProps } from '../AutocompleteControl';

import flagPlaceholder from '../../img/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png';
import './style.css';

/**
 * Компонент отображения информации о стране
 *
 * @property {string} item - объект, содержащий информацию о стране
 * @property {function} selectItem = callback-функция, вызывающаяся при нажатии на компонент
 */
const CountryItem: FC<SuggestionItemProps<CountryInfo>> = ({ item, selectItem }) => {
    const [flagSrc, setFlagSrc] = useState(item.flag);

    //Обработчик ошибки загрузки изображения, устанавливает "flagPlaceholder"
    const errorHadle = () => {
        setFlagSrc(flagPlaceholder);
    };

    const clickHadle = () => {
        selectItem(item, item.fullName);
    };

    return (
        <li className="country-item" onClick={clickHadle}>
            <div className="country-item__flag">
                <img src={flagSrc} alt={item.name} onError={errorHadle} />
            </div>
            <div className="country-item__name">
                <span className="country-name__full">{item.fullName}</span>
                {item.fullName !== item.name && (
                    <span className="country-name__short">{item.name}</span>
                )}
            </div>
        </li>
    );
};

export default CountryItem;
