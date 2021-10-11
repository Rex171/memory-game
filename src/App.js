import React, {useEffect, useState} from "react";
import './App.css';
import CardComponent from './Component/CardComponent/CardComponent.js'
import {connect, useDispatch} from "react-redux";
import apple from './img/apple.png';
import banana from './img/banana.png';
import blueberry from './img/blueberry.png';
import grape from './img/grape.png';
import kiwi from './img/kiwi.png';
import lemon from './img/lemon.png';
import mango from './img/mango.png';
import melon from './img/melon.png';
import orange from './img/orange.png';
import pear from './img/pear.png';
import pineapple from './img/pineapple.png';
import strawberry from './img/strawberry.png';
import watermelon from './img/watermelon.png';
import cherry from './img/сherry.png';
import raspberry from './img/raspberry.png';
import plum from './img/plum.png';
import peach from './img/peach.png';
import persimmon from './img/persimmon.png';
import {PURE_CURRENT_CARD_ONE} from "./store/actions/currentCardOne";
import {PURE_CURRENT_CARD_TWO} from "./store/actions/currentCardTwo";
import {END_GAME, START_GAME} from "./store/actions/isGameStart";


function App({currentCards, isGameStart}) {
    const mainArrayCard =
        [
            {id: 0, name: 'apple', logo: apple, delete: false}, {
            id: 1,
            name: 'persimmon',
            logo: persimmon,
            delete: false
        },
            {id: 2, name: 'plum', logo: plum, delete: false}, {id: 3, name: 'peach', logo: peach, delete: false},
            {id: 4, name: 'orange', logo: orange, delete: false}, {id: 5, name: 'pear', logo: pear, delete: false},
            {id: 6, name: 'mango', logo: mango, delete: false}, {id: 7, name: 'banana', logo: banana, delete: false},
            {id: 8, name: 'lemon', logo: lemon, delete: false}, {
            id: 9,
            name: 'pineapple',
            logo: pineapple,
            delete: false
        },
            {id: 10, name: 'melon', logo: melon, delete: false}, {id: 11, name: 'grape', logo: grape, delete: false},
            {id: 12, name: 'blueberry', logo: blueberry, delete: false}, {
            id: 13,
            name: 'raspberry',
            logo: raspberry,
            delete: false
        },
            {id: 14, name: 'pineapple', logo: pineapple, delete: false}, {
            id: 15,
            name: 'cherry',
            logo: cherry,
            delete: false
        },
            {id: 16, name: 'kiwi', logo: kiwi, delete: false}, {id: 17, name: 'pear', logo: pear, delete: false},
            {id: 18, name: 'raspberry', logo: raspberry, delete: false}, {
            id: 19,
            name: 'peach',
            logo: peach,
            delete: false
        },
            {id: 20, name: 'watermelon', logo: watermelon, delete: false}, {
            id: 21,
            name: 'plum',
            logo: plum,
            delete: false
        },
            {id: 22, name: 'strawberry', logo: strawberry, delete: false}, {
            id: 23,
            name: 'kiwi',
            logo: kiwi,
            delete: false
        },
            {id: 24, name: 'banana', logo: banana, delete: false}, {id: 25, name: 'lemon', logo: lemon, delete: false},
            {id: 26, name: 'strawberry', logo: strawberry, delete: false}, {
            id: 27,
            name: 'apple',
            logo: apple,
            delete: false
        },
            {id: 28, name: 'cherry', logo: cherry, delete: false}, {
            id: 29,
            name: 'orange',
            logo: orange,
            delete: false
        },
            {id: 30, name: 'grape', logo: grape, delete: false}, {
            id: 31,
            name: 'blueberry',
            logo: blueberry,
            delete: false
        },
            {id: 32, name: 'persimmon', logo: persimmon, delete: false}, {
            id: 33,
            name: 'mango',
            logo: mango,
            delete: false
        },
            {id: 34, name: 'melon', logo: melon, delete: false}, {
            id: 35,
            name: 'watermelon',
            logo: watermelon,
            delete: false
        }]

    const [result, setResult] = useState([]);
    if (localStorage.getItem('result') === null) {
        localStorage.setItem('result', JSON.stringify(result));
    }
    const resultTable = JSON.parse(localStorage.getItem('result'));

    const [arrayCard, setArrayCard] = useState(mainArrayCard);
    const [timer, setTimer] = useState(0);
    const [gameTimeOut, setGameTimeOut] = useState(null);

    const dispatch = useDispatch();

    const gameProcess = async () => {
        if (currentCards.cardOne && currentCards.cardTwo === null) {
            setGameTimeOut(setTimeout(onTimeout, 5000))
        } else if ((currentCards.cardOne?.name === currentCards.cardTwo?.name)) {
            const indexCardOne = arrayCard.indexOf(currentCards.cardOne);
            const indexCardTwo = arrayCard.indexOf(currentCards.cardTwo);
            arrayCard.splice(indexCardOne, 1, {
                id: currentCards.cardOne.id,
                name: currentCards.cardOne.name,
                logo: currentCards.cardOne.logo,
                delete: true
            });
            arrayCard.splice(indexCardTwo, 1, {
                id: currentCards.cardTwo.id,
                name: currentCards.cardTwo.name,
                logo: currentCards.cardTwo.logo,
                delete: true
            });
            await onTimeout();
            clearTimeout(gameTimeOut);
        }
        if ((currentCards.cardOne?.name !== currentCards.cardTwo?.name) && (currentCards.cardOne !== null && currentCards.cardTwo !== null)) {
            await setTimeout(onTimeout, 400);
            clearTimeout(gameTimeOut);
        }
    }

    useEffect(() => {
        if (currentCards.cardOne || currentCards.cardTwo) {
            gameProcess().then();
        }
    }, [currentCards.cardOne, currentCards.cardTwo]);

    const onTimeout = () => {
        dispatch({type: PURE_CURRENT_CARD_ONE});
        dispatch({type: PURE_CURRENT_CARD_TWO});
    }

    useEffect(() => {
        const arrFind = arrayCard.find((card) => card.delete === false)
        if (isGameStart && arrFind === undefined) {
            alert(`ПОЗДРАВЛЮ ВЫ ПРОШЛИ ИГРУ! Ваше время ${timer} сек.`);
            dispatch({type: END_GAME})
            setArrayCard(mainArrayCard);
            const newResult = [...result, {name: result.length + 1, time: timer}];
            setResult(newResult);
            console.log(newResult);
            localStorage.setItem('result', JSON.stringify(newResult));
        }
    }, [currentCards.cardOne])

    useEffect(() => {
        if (isGameStart === true) {
            setTimeout(() => setTimer(timer + 1), 1000);
        }
        if (isGameStart === false) {
            setTimer(0);
            arrayCard.sort(() => {
                return 0.5 - Math.random()
            });
        }
    }, [isGameStart, timer])

    return (
        <div className="App">
            <div className='memoryContainer'>
                <div className='memoryHeader'>
                    <div className='timer'>Время: {timer}</div>
                    {isGameStart ? <div className='memoryContent'>
                        {arrayCard.map((card) =>
                            <CardComponent key={card.id}
                                           card={card}/>)}
                    </div> : <div className='startView'>
                        <button className='startView_button' type='button'
                                onClick={() => dispatch({type: START_GAME})}>Start
                            game
                        </button>
                    </div>}
                </div>
                <div className='memoryCenter'>
                    <div className='tableResultsTitle'>Таблица резулультатов</div>
                    <div className='tableResults'>
                        {resultTable.length > 0 ? <table>
                            <thead>
                            <tr>
                                <td>Попытка</td>
                                <td>Время (сек.)</td>
                            </tr>
                            </thead>
                            <tbody>
                            {resultTable.map((result) =>
                                <tr key={result.name}>
                                    <td>{result.name}</td>
                                    <td>{result.time}</td>
                                </tr>
                            )}
                            </tbody>
                        </table> : <div> Пока нет результатов</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentCards: state.currentCards,
        isGameStart: state.isGameStart
    }
}

export default connect(mapStateToProps)(App);
