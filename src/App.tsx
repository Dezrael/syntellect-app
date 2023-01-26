import {
    FirstTestButtonsControl,
    SecondTestButtonsControl,
    FirstTestAutocompleteControl,
    SecondTestAutocompleteControl,
} from './components/TestControls';

import './App.css';

function App() {
    return (
        <div className="test-container">
            <div className="test-container__control">
                <h2>Контрол с кнопками 1</h2>
                <p>При нажатии на первую кнопку очищается содерживое в контроле</p>
                <p>При нажатии на вторую кнопку текст в контроле меняется на 'Hello world!'</p>
                <FirstTestButtonsControl />
            </div>
            <hr />
            <div className="test-container__control">
                <h2>Контрол с кнопками 2</h2>
                <p>При нажатии на кнопку справа вызывается alert с текстом в контроле</p>
                <p>
                    При нажатии на кнопку слева проверяем, что в контроле введено число и если это
                    так, то выводим число через alert
                </p>
                <SecondTestButtonsControl />
            </div>
            <hr />
            <div className="test-container__control">
                <h2>Контрол-автокомплит 1</h2>
                <p>Максимальное кол-во подсказок - 3</p>
                <FirstTestAutocompleteControl />
            </div>
            <hr />
            <div className="test-container__control">
                <h2>Контрол-автокомплит 2</h2>
                <p>Максимальное кол-во подсказок - 10</p>
                <SecondTestAutocompleteControl />
            </div>
        </div>
    );
}

export default App;
