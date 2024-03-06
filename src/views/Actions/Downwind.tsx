import React, { useEffect, useState } from "react";
import { useTimer } from "../../data/timer";
import HeaderItem from "../../components/HeaderItem";
import "./Downwind.css"
import { PauseSharp, PlayBackSharp, PlaySharp, RefreshSharp, StopSharp } from "react-ionicons";
import Affirmations from "../../components/Affirmations";
import ActionItem from "../../components/ActionItem";

// TODO: action state after popup
// TODO: loading state for every comp
export default function Downwind() {

  const [mindfulcards, setMindfulcards] = useState<MindfulQuote[]>([])
  // quotes
  const [quote, setQuote] = useState<MindfulQuote>({ title: '', activity: '', action: '', action_type: '', action_start: '', activity_len: 10 });
  const [currentSelection, setIndex] = useState<number>(0);

  function randomChoice(i: number) {
    let currentSelection = i;
    // eslint-disable-next-line eqeqeq
    while (currentSelection == i) {
      currentSelection = Math.floor(Math.random() * mindfulcards.length)
    }
    return currentSelection;
  }

  function newSelection() {
    let newIndex = randomChoice(currentSelection)
    // TODO: user feedback or async state
    setQuote(mindfulcards[newIndex]);
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
  const [showAffirm, setPopUpStatus] = useState(false)
  const [action_start, setActionStatus] = useState<string>()
  const action_type = quote.action_type

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
      } else if (quote.action_start === 'after_timer') {
        if (completed) {
          // delay for 2 seconds [enough time for completed message to display]
          setTimeout(() => {
            setActionStatus('inprogress')
          }, 1000);
        }
      }
    }
  }, [action_start, countdown_started, completed, quote.action_start])

  useEffect(() => {
    if (completed) {
      if (action_start === "completed") {
        setPopUpStatus(true)
      }
      setCountdownStatus(false)
    }
  }, [completed, action_start])

  useEffect(() => {
    async function getMindfulcards() {
      if (mindfulcards.length === 0) {
        // TODO: loading comp
        const response = await fetch('http://127.0.0.1:8000/mindfulcards')
        const data = await response.json()

        if (data.status === "success") {
          const cards = data.data;
          let mf_len = cards.length
          let randIndex = Math.floor(Math.random() * mf_len)
          setMindfulcards(cards)
          setQuote(cards[randIndex])
          setIndex(randIndex)
        }
      }
    }

    getMindfulcards()
  }, [mindfulcards])

  return (
    <div className="mainPage">
      <HeaderItem title="Downwind" />
      <div className="mainContent">
        {quote && <div className="mainContent__flex">
          <div className="content__body gap-4">
            <h3 className="downwind__title">{quote.title}</h3>
            <p className="downwind__desc text-center">{quote.activity}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{countdown_started && currentCount}</p>
          </div>
          <div className="content__actions">
            {!countdown_started ? <button onClick={newSelection} className="btn">
              <RefreshSharp title="Swap Card" color="#DD6AB3" width="54px" height="54px" />
            </button> : <React.Fragment>
              {(countdown_started && running) && <button onClick={pause} className="btn">
                <PauseSharp title="Pause" color="#DD6AB3" width="54px" height="54px" />
              </button>}

              {(countdown_started && !running) && <button onClick={start} className="btn">
                <PlaySharp title="Resume" color="#DD6AB3" width="54px" height="54px" />
              </button>}
            </React.Fragment>}
            <div onClick={handleCountdown}>
              {!countdown_started ? <button className="btn">
                <PlaySharp title="Start" color="#DD6AB3" width="54px" height="54px" />
              </button> : <button className="btn">
                <StopSharp title="Stop" color="#DD6AB3" width="54px" height="54px" />
              </button>}
            </div>
            {countdown_started && <button className="btn reset-button" onClick={handleReset}>
              <PlayBackSharp title="Reset Timer" color="#DD6AB3" width="54px" height="54px" />
            </button>}
          </div>
        </div>}


        {action_start === 'inprogress' && <React.Fragment>
          {action_type === 'textinput' && <React.Fragment>
            <ActionItem activity={quote.action} popOut={() => setActionStatus('completed')} />
          </React.Fragment>}
        </React.Fragment>}

        {showAffirm && <Affirmations
          emoji="🥳💨"
          bgColor="#EC5ABF"
          title="Great Job"
          footerText="Start another activity?"
          popOut={() => setPopUpStatus(false)} />}
      </div>
    </div>
  )
}