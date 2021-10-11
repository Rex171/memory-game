import React, {useEffect, useState} from 'react';
import './CardComponent.css'
import {connect, useDispatch} from "react-redux";
import {ADD_CURRENT_CARD_ONE} from "../../store/actions/currentCardOne";
import {ADD_CURRENT_CARD_TWO} from "../../store/actions/currentCardTwo";

const CardComponent = ({card, currentCards, isGameStart}) => {
    const [isVisibleOne, setIsVisibleOne] = useState(false);
    const [isVisibleTwo, setIsVisibleTwo] = useState(false);
    const dispatch = useDispatch();

    const onClickCard = () => {
        if (currentCards.cardOne === null) {
            dispatch({type: ADD_CURRENT_CARD_ONE, payload: card})
            setIsVisibleOne(true);
        } else if (currentCards.cardTwo === null && (currentCards.cardOne.id !== card.id)) {
            dispatch({type: ADD_CURRENT_CARD_TWO, payload: card})
            setIsVisibleTwo(true);
        }
    }

    useEffect(() => {
        if (currentCards.cardOne === null) {
            setIsVisibleOne(false);
        }
        if (currentCards.cardTwo === null) {
            setIsVisibleTwo(false);
        }
    }, [currentCards.cardOne, currentCards.cardTwo]);

    useEffect(() => {
        const card = document.querySelector('.card');
        if (!isGameStart) {
            console.log(card);
            const cardBack = document.querySelectorAll('.card-back')
            for (let i = 0; i < cardBack.children.length; i++) {
                cardBack.children[i].classList.remove('hidden');
            }
        }
    }, [isGameStart])

    return (
        <div className='card' onClick={card.delete === false ? onClickCard : undefined}>
            <div className={`card-back ${(isVisibleOne || isVisibleTwo) || card.delete ? 'hidden' : ''}`}/>
            <img className='card-face' alt='card-face' src={card.logo} width='80%'/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentCards: state.currentCards,
        isGameStart: state.isGameStart
    }
}

export default connect(mapStateToProps)(CardComponent);