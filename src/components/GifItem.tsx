import React, { useEffect, useState } from "react"
import { ArrowBackCircleOutline, ArrowForwardCircleOutline } from "react-ionicons"

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

  // current item and next item state
  const indexes = Array.from({ length: gifItem.length }, (v, k) => k)

  return (
    <div className="gifcontainer col-12" style={{ width: '100%' }}>
      <div className="d-flex align-items-center justify-content-center">
        <div className="gifItem d-block" style={{ position: 'relative' }}>
          <div className="controls" style={{ position: 'absolute', height: '100%', width: '100%' }}>
            <div className="d-flex align-items-center justify-content-between" style={{ height: '100%', width: '100%' }}>
              <div className="btnItem" style={{ height: '100%' }}>
                {lastIndex >= indexes[0] && <button className="btn" style={{ height: '100%' }} onClick={() => setNextIndex(currentIndex - 1)}>
                  <ArrowBackCircleOutline color="#fff" width="34px" height="34px" />
                </button>}
              </div>
              <div className="btnItem" style={{ height: '100%' }}>
                {currentIndex < indexes[indexes.length - 1] && <button className="btn" style={{ height: '100%' }} onClick={() => setNextIndex(currentIndex + 1)}>
                  <ArrowForwardCircleOutline color="#fff" width="34px" height="34px" />
                </button>}
              </div>
            </div>
          </div>
          <img src={currentItem.gif} width="300px" height="160px" alt="" />

        </div>
      </div>
      <p className="text-center" style={{ fontSize: '10px' }}>{currentItem.title}</p>
    </div>
  )
}