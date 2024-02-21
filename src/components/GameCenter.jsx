import { useEffect, useState } from "react";
import { TrashOutline } from "react-ionicons";
import Affirmations from "./Affirmations";

export default function GameCenter() {

  const [completed, setCompleted] = useState(false)

  // create array from 8 items
  let arr = Array.from(Array(6).keys()).map(x => `${x++}`);
  const [sht, updateList] = useState(arr)
  const [to_delete, setToDelete] = useState(-1);
  // const [drag_start, setDragStatus] = useState(false)

  const pop = (index) => {
    const items = sht
    items.length === 0 && updateList([])

    if (items.length !== 0) {
      items.splice(index, 1)
      updateList(items)
    }

    setToDelete(-1)
    console.log('popped')
  }

  // const bind = useLongPress(() => (!drag_start ? pop(to_delete) : undefined), { threshold: 1000, cancelOnMovement: 10 });

  function onDragStart(index) {
    // setDragStatus(true)
    setToDelete(index)
  }
  function onDragOver(e) {
    e.preventDefault();
  }
  function onDrop(e) {
    // setDragStatus(false)
    // console.log('dropped', items[to_delete])
    pop(to_delete)
  }

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    sht.length === 0 && setCompleted(true)
  }, [sht])

  const randIds = ["a", "b", "c", "d", "e"]

  return (
    <div className="gameCenter">
      <div className="gameItems">
        {sht.map((item, idx) => <div
          onDragStart={() => onDragStart(idx)}
          draggable
          itemID={idx}
          className="trashItem"
          id={randIds[Math.floor(Math.random() * randIds.length - 1)]}
          key={item}>
          <span style={{ fontSize: '67px' }}>💩</span>
        </div>)}

      </div>

      <div className="trashBottom">
        <div onDrop={onDrop} onDragOver={onDragOver} className="trash_btn">
          <TrashOutline color="#fff" width="47px" height="47px" />
        </div>
      </div>

      {completed && <Affirmations
        emoji="🥳💨"
        bgColor="#EC5ABF"
        title="Good Job"
        footerText="admittance is the first step to healing"
        popOut={() => setCompleted(false)} />}
    </div>
  )
}