import { useState, useEffect } from 'react'
import './App.css'
import Die from "./Die.jsx"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice,setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(
    ()=>{
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die=>die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
    }
  ,[dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice(){
    let arr = []
    for (let i =0; i <10;i++){
      arr.push(generateNewDie())
    }
    return arr;
  }

  function rollDice(){
    if(tenzies){
      setDice(allNewDice())
      setTenzies(false)
    }else{
      setDice(dice.map(prevDice=>{
        return prevDice.isHeld? prevDice: generateNewDie()
      }))
    }
  }

  function holdDice(id){
    setDice(dice.map(prevDice=>
      {
        return {...prevDice, 
          isHeld: id===prevDice.id? !prevDice.isHeld : prevDice.isHeld}
      }
    ))
  }

  const diceElements = dice.map((die)=><Die value = {die.value} 
  key = {die.id} 
  isHeld = {die.isHeld} 
  holdDice = {()=>holdDice(die.id)}/>)
  
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className = "dice-container">
        {diceElements}
      </div>
      <button onClick ={rollDice} className='roll-dice'>{tenzies?"New Game":"Roll"}</button>
      {tenzies && <Confetti/>}
    </main>
  )
}

export default App
