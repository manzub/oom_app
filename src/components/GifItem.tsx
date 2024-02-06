import React, { useEffect, useState } from "react"

export default function GifItem({ gifItem }: { gifItem: any[] }) {
  const [currentItem, setCurrentItem] = useState(gifItem[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(-1)

  useEffect(() => {
    setCurrentItem(gifItem[currentIndex])
  }, [currentIndex, gifItem])

  const setNextIndex = (index: number) => {
    setCurrentIndex(index)
    setLastIndex(index - 1)
  }

  // TODO: pause/play image and gif [use image/gif].
  // TODO: prev/next duration.
  // TODO:: use height dims from gifitem
  // current item and next item state
  const indexes = Array.from({ length: gifItem.length }, (v, k) => k)

  return (
    <div className="gifcontainer" style={{ backgroundColor: '#e3e3e3', flex: 1 }}>
      {<React.Fragment>
        <img src={currentItem.gif} width="200px" height="150px" alt="" />
        <p>{currentItem.title}</p>
        <button>paws</button>
      </React.Fragment>}
      {lastIndex >= indexes[0] && <button onClick={() => setNextIndex(currentIndex - 1)}>prev</button>}
      {currentIndex < indexes[indexes.length - 1] && <button onClick={() => setNextIndex(currentIndex + 1)}>next</button>}
    </div>
  )
}