
export function createInitialState() {
    return {
        history: [{
            squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
    }
}

export function getHistory(state) {
    return state.history;
}

export function getNextPlayer(state) {
    return state.xIsNext ? 'X' : 'O';
}

export function calculateWinner(state) {
    const squares = getCurrentStepSquares(state);
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function jumpTo(state, step) {
    return {
        ...state,
        stepNumber: step,
        xIsNext: (step % 2) === 0,
    };
}

export function getCurrentStepSquares(state) {
    return state.history[state.stepNumber].squares;

}

export function handleSquareSelected(state, i) {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(state) || squares[i]) {
        return state;
    }
    squares[i] = state.xIsNext ? 'X' : 'O';
    return {
        history: history.concat([{
            squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
    };
}




