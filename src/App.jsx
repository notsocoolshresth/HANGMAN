import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import Languages from './Lanuguages'
import React from 'react'
import { getRandomWord, getFarewellText } from "./utils"
import { languages } from './language'
function App() {

  const [count, setCount] = useState(0)
  const [win, setWin] = useState(false)
  const [end, setEnd] = useState(false)
  const [currword, setcurrword] = useState(getRandomWord())
  const [triesleft, setTriesleft] = useState(8)
  const [setofcurrword, setSetofcurrword] = useState(new Set(currword.toUpperCase().split('')))
  const [setofguessed, setSetofguessed] = useState(new Set())

  function game_end() {
    if (triesleft == 0 || issubset(setofcurrword, setofguessed)) {
      setEnd(true)
      if (issubset(setofcurrword, setofguessed)) {
        setWin(true)
      }
    }
  }
  function issubset(set1, set2) {
    for (let elem of set1) {
      if (!set2.has(elem)) {
        return false
      }
    }
    return true
  }

  function change_guess_set(letter) {
    if (setofguessed.has(letter)) {
      console.log("Already Guessed")
    }
    else {
      setSetofguessed(new Set([...setofguessed, letter]))
      if (setofcurrword.has(letter)) {
        console.log("Correct Guess")
      }
      else {
        console.log("Incorrect Guess")

        setTriesleft((prevTries) => (prevTries >= 1 ? prevTries - 1 : 0));
      }
    }
  }
  function message() {
    return (

      <h2 className='farewellmessage' role="alert">{getFarewellText(languages[8 - triesleft - 1].name)}</h2>

    )
  }
  React.useEffect(() => {
    game_end();
  }, [setofguessed])
  const set_prev_guessed = React.useRef();
  React.useEffect(() => {
    set_prev_guessed.current = triesleft;
  }, [triesleft])
  React.useEffect(() => {
    setSetofcurrword(new Set(currword.toUpperCase().split('')))
  },[currword])

  
  function reset_game() {
    setSetofguessed(new Set())
    setcurrword(getRandomWord())
    setTriesleft(8)
    setEnd(false)
    setWin(false)
    set_prev_guessed.current = undefined;
  }


  const s = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  const alpha = s.split("");
  console.log(triesleft)
  var alphaList = '', wordnow = '';
  console.log(setofcurrword)
  



  if (!end) {
    alphaList = alpha.map((letter, index) => {
      let className = "alpha";
      if (setofguessed.has(letter)) {
        className += setofcurrword.has(letter) ? "correct" : "wrong";
      }
      return (
        <div
          key={index}
          className={className}
          onClick={() => change_guess_set(letter)}
        >
          {letter}
        </div>
      );
    });

    wordnow = currword.toUpperCase().split('').map((letter, index) => (
      <span key={index} className="letter">
        {(setofguessed.has(letter) || letter === " ") ? letter : ""}
      </span>
    ));
  }
  else{
    wordnow = currword.toUpperCase().split('').map((letter, index) => (
      <span key={index} className="letter">
        {letter}
      </span>
    ));
    alphaList = alpha.map((letter, index) => {
      let className = "alpha";
     
        className += setofcurrword.has(letter) ? "correcttotal" : "wrongtotal";
      
      return (
        <div
          key={index}
          className={className}
          onClick={() => change_guess_set(letter)}
        >
          {letter}
        </div>
      );
    });
  }


  return (

    <div className="App">

      <Header ended={end} won={win} index={8 - triesleft} />
      {!end && (triesleft == 0 || set_prev_guessed.current != triesleft && set_prev_guessed.current != undefined) && message()}
      <Languages left={8 - triesleft} />
      <div className='barofwords'>{wordnow}</div>
      <div className='Alphabets'>{alphaList}</div>
      {end &&  <button className='reset' onClick={reset_game}>New Game</button>}
    </div>

  )
}
export default App
