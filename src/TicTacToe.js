import React from "react";
import { useState } from "react";
import './App.css'

function MakeSquare({ value, onSquareClick }) {
    const [data, setData] = useState();

    const handleClick = async () => {
        onSquareClick();
    }

    return (
        <button onClick={handleClick} style={{ padding: '10px', border: '2px solid green', width: '10px', height: '10px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>{value}</button>
    )
}

function Game({ sqNumbers, xIsNext, handleOnPlay }) {
    console.log("MEENU 00000", sqNumbers)
    const handleClick = async (i) => {
        if (sqNumbers[i] || calculateWinner(sqNumbers)) {
            return;
        }
        const newSqr = sqNumbers.slice();
        newSqr[i] = xIsNext ? 'X' : 'O';
        handleOnPlay(newSqr);
    }

    const titleCard = () => {
        let status = ''
        let winner = calculateWinner(sqNumbers)
        if (winner) {
            status = 'Congrats ' + winner + ' !!';
        } else {
            status = 'Next Player: ' + (xIsNext ? 'X' : 'O')
        }
        return status;
    }

    const calculateWinner = (sqNumbers) => {

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (sqNumbers[a] && sqNumbers[a] == sqNumbers[b] && sqNumbers[b] == sqNumbers[c]) {
                return sqNumbers[a];
            }
        }
        return null;
    }

    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {titleCard()}
                <div className="game-board">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MakeSquare value={sqNumbers[0]} onSquareClick={() => handleClick(0)} />
                        <MakeSquare value={sqNumbers[1]} onSquareClick={() => handleClick(1)} />
                        <MakeSquare value={sqNumbers[2]} onSquareClick={() => handleClick(2)} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MakeSquare value={sqNumbers[3]} onSquareClick={() => handleClick(3)} />
                        <MakeSquare value={sqNumbers[4]} onSquareClick={() => handleClick(4)} />
                        <MakeSquare value={sqNumbers[5]} onSquareClick={() => handleClick(5)} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MakeSquare value={sqNumbers[6]} onSquareClick={() => handleClick(6)} />
                        <MakeSquare value={sqNumbers[7]} onSquareClick={() => handleClick(7)} />
                        <MakeSquare value={sqNumbers[8]} onSquareClick={() => handleClick(8)} />
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

function TicTacToe() {
    const [userClickCount, setUserClickCount] = useState(0);
    const xIsNext = userClickCount % 2 == 0;
    const [history, setHistory] = useState(Array(9).fill(null));
    const sqNumbers = history[userClickCount] || [];

    const printTheMoves = () => {
        return  history.map((item, index) => {
            if(item){
                if (index > 0) {
                    return <button style={{width: '100px'}} onClick={() => setUserClickCount(index)}>{`Go to Step #${index}`}</button>
                } else {
                    return <button style={{width: '100px'}} onClick={() => setUserClickCount(0)}>Go to First Step</button>
                }
            }
           
        })
    }

    const handleOnPlay = (newSquare) => {
        const newHistory = ([...history.slice(0, userClickCount + 1), newSquare]);
        console.log("MEENU handleOnPlay newSquare", newSquare, '-newHistory-', newHistory)
        setHistory(newHistory);
        setUserClickCount(userClickCount + 1);
    }

    return (
        <div>
            <Game
                sqNumbers={sqNumbers}
                xIsNext={xIsNext}
                handleOnPlay={handleOnPlay}
            />
            <div data-testid='moves-history' style={{display: 'flex', flexDirection: 'column'}}>
                {printTheMoves()}
            </div>
        </div>
    )
}

export default TicTacToe;


/*
1. When the winner is calculatd on last move of the square, it's not displayed 
2. Style needs to be changed
3. Who is next can be added
4. Push to git

*/