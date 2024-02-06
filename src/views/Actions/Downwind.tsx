import React, { useEffect, useState } from "react";
import data from "../../data/mindfulcards.json";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../../data/timer";

function Downwind() {
  const navigate = useNavigate()

  // quotes
  let mf_len = data.mindfulcards.length
  let randIndex = Math.floor(Math.random() * mf_len)
  const [quote, setQuote] = useState<MindfulQuote>(data.mindfulcards[randIndex]);
  const [currentSelection, setIndex] = useState<number>(randIndex);

  function randomChoice(i: number) {
    let currentSelection = i;
    // eslint-disable-next-line eqeqeq
    while (currentSelection == i) {
      currentSelection = Math.floor(Math.random() * data.mindfulcards.length)
    }
    return currentSelection;
  }

  function newSelection() {
    let newIndex = randomChoice(currentSelection)
    // TODO: user feedback or async state
    setQuote(data.mindfulcards[newIndex]);
    setIndex(newIndex)
  }

  // timer
  const [countdown_started, setCountdownStatus] = useState(false)
  const { running, completed, seconds, start, pause, reset, stop } = useTimer(10) //quote?.activity_len || 0

  const handleCountdown = () => setCountdownStatus(status => {
    if (status) { //if currently running
      handleReset()
      stop()
    } else { // not running
      start()
    }
    return !status
  })

  // clear action status and reset time
  const handleReset = () => {
    setActionStatus(undefined)
    reset()
  }

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const currentCount = formatTime(seconds)

  // action start
  const [action_start, setActionStatus] = useState<string>()
  const [entries, setEntry] = useState<string[]>([])
  const [typing, setTyping] = useState('')
  const action_type = quote.action_type

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      setEntry([...entries, typing])
      setTyping('')
    }
  }

  useEffect(() => { // only start action on timer and q.action_start param
    // if action hasn't started yet
    if (!action_start) {
      if (quote.action_start === 'inprogress') {
        // while timer is not completed start action
        if (countdown_started && !completed) {
          // delay for 2 seconds [enough time for timer props to update]
          setTimeout(() => {
            setActionStatus('inprogress')
          }, 2000);
        }
      } else if (quote.action_start === 'completed') {
        if (completed) {
          // delay for 2 seconds [enough time for completed message to display]
          setTimeout(() => {
            setActionStatus('inprogress')
          }, 2000);
        }
      }
    }
  }, [action_start, countdown_started, completed, quote.action_start])

  useEffect(() => {
    if (completed) {
      setCountdownStatus(false)
    }
  }, [completed])

  return (
    <div>
      <button onClick={() => navigate(-1)}>close</button>
      {quote && <React.Fragment>
        <h2>{quote.title}</h2>
        <p>{quote.activity}</p>
      </React.Fragment>}
      <button onClick={newSelection}>swap</button>
      <br />
      <p>{countdown_started && currentCount}</p>
      <br />
      {!countdown_started && <button className="start-button" onClick={handleCountdown}>start</button>}
      {(countdown_started && running) && <button className="pause-button" onClick={pause}>pause</button>}
      {(countdown_started && !running) && <button className="resume-button" onClick={start}>resume</button>}
      {countdown_started && <button className="stop-button" onClick={handleCountdown}>stop</button>}
      {countdown_started && <button className="reset-button" onClick={handleReset}>reset</button>}

      {action_start === 'inprogress' && <React.Fragment>
        {action_type === 'textinput' && <React.Fragment>
          <h5>{quote.action}</h5>
          <ul>{entries?.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
          <input
            value={typing}
            onChange={({ target }) => setTyping(target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter your message. Press enter for new entry" />
          <button onClick={() => setActionStatus('completed')}>done</button>
        </React.Fragment>}
      </React.Fragment>}

      {completed && <React.Fragment>
        <h4>Great Job.</h4>
        <span>Start another activity</span>
      </React.Fragment>}
    </div>
  )
}

export default Downwind;