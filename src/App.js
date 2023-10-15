import { useState } from "react";
import diceImg from "./icon-dice.svg";

function App() {
  return (
    <Main>
      <Box></Box>
    </Main>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box() {
  const [isRunning, setIsRunning] = useState(false);
  const [adviceNumber, setAdviceNumber] = useState(1);

  const [advice, setAdvice] = useState("Press the Button");

  async function handleClick() {
    //Check if running
    if (isRunning) return;

    //If not running, make it run
    setIsRunning(true);

    //Generate random number
    setAdviceNumber(Math.floor(Math.random() * 100 + 1));

    //Send request
    const res = await fetch("https://api.adviceslip.com/advice");

    const data = await res.json();

    setAdvice(data.slip.advice);

    //Make it stop running
    setIsRunning(false);
  }

  return (
    <div className="box">
      <p className="advice-no">Advice #{adviceNumber}</p>

      {isRunning ? <Loader /> : <p className="advice">"{advice}"</p>}

      <div className="line">
        <div className="line-image">&nbsp;</div>
      </div>

      <button className="btn" onClick={handleClick}>
        <img src={diceImg} alt="Dice" />
      </button>
    </div>
  );
}

function Loader() {
  return (
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default App;
