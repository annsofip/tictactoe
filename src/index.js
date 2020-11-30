import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as core from './core.js'
import beholder from 'beholder-js';

function Square({value, onClick}) {
    return (
        <button
            className="square"
            onClick={onClick}
        >
            {value}
        </button>
    );
}

function getSquare({index, state, eventHandler}) {
    const squares = core.getCurrentStepSquares(state);
    return (
        <Square
            value={squares[index]}
            onClick={() => eventHandler({name: "squareSelected", data: index})}
        />
    );
}

function Board({state, eventHandler}) {
    return (
        <div>
            <div className="board-row">
                {getSquare({index: 0, state, eventHandler})}
                {getSquare({index: 1, state, eventHandler})}
                {getSquare({index: 2, state, eventHandler})}
            </div>
            <div className="board-row">
                {getSquare({index: 3, state, eventHandler})}
                {getSquare({index: 4, state, eventHandler})}
                {getSquare({index: 5, state, eventHandler})}
            </div>
            <div className="board-row">
                {getSquare({index: 6, state, eventHandler})}
                {getSquare({index: 7, state, eventHandler})}
                {getSquare({index: 8, state, eventHandler})}
            </div>
        </div>
    );
}

function Game({state, eventHandler}) {
    console.log(state);
    const winner = core.calculateWinner(state);
    const moves = core.getHistory(state).map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => eventHandler({name: "goToMove", data: move})}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + core.getNextPlayer(state);
    }
    return (
        <div className="game">
            <div className="game-board">
                <Board
                    state={state}
                    eventHandler={eventHandler}
                    squares={core.getCurrentStepSquares(state)}
                />
            </div>
            <div className="game-info">
                <div className="status">{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}


// ========================================
function render(state) {
    ReactDOM.render(
        <Game state={state} eventHandler={eventHandler}/>,
        document.getElementById('root')
    );
}

function eventHandler(event) {
    if (event.name === "squareSelected") {
        model.swap(core.handleSquareSelected, event.data);

    } else if (event.name === "goToMove") {
        model.swap(core.jumpTo, event.data);
    }
}

const model = beholder.mutableThing(core.createInitialState());
model.addWatch('state-change', render);
render(model.deref());
