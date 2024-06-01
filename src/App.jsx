import { useState } from 'react'
import { TURNS } from './constants'
import { checkWinner, checkEndGame } from './logic/board'
import TurnModal from './components/TurnModal'
import GameModal from './components/GameModal'
import Winner from './components/Winner'

import confetti from 'canvas-confetti'
import './App.css'



function App() {

  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocaStorage = window.localStorage.getItem('turn')
    
    return turnFromLocaStorage ?? TURNS.x
  })

  const [winner, setWinner] = useState(null)

  const trunsChange = turn === TURNS.x ? TURNS.o : TURNS.x

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = trunsChange;
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <>
      <h1>TATETI</h1>
      <main className='board'>
        <button onClick={resetGame}>
          Empezar de nuevo
        </button>
        <GameModal board={board} updateBoard={updateBoard} />
        <TurnModal turn={turn} />
        <Winner resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App
