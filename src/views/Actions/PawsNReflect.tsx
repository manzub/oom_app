import axios from "axios"
import React, { useEffect, useState } from "react"
import GifItem from "../../components/GifItem"
import HeaderItem from "../../components/HeaderItem"
import classNames from "classnames"

const giphyApiKey = "pM67eHfDVjFpy6qDAG3ll2TCtKbhHqsr"
const chunkSize = 5
export default function PawsNReflect() {

  const [gifs, setGifs] = useState<any[]>([])
  const [searchParams, updateSearchParams] = useState<{ offset: number, limit: number }>({ offset: 0, limit: 15 })
  const [completed, setCompleted] = useState<number[]>([])

  const perItems = gifs.length

  // 3 videos at a time, with options on each gif
  // load 20 gifs then splice into 3 sets each.
  // and create a image item component
  const giphyApi = "https://api.giphy.com/v1/gifs/search"
  function getPawsGiphy({ offset = 0, limit = 21 }: { offset: number, limit: number }) {
    axios.get(`${giphyApi}?api_key=${giphyApiKey}&limit=${limit}&offset=${offset}&q=cat-and-dog`).then(response => {
      const giphys = response.data.data.map(function (item: any, idx: number) {
        return {
          id: item.id, gif: item.images.original.url,
          title: item.title, type: item.type,
          url: item.url, dims: { width: item.images.original.width, height: item.images.original.height }
        }
      })
      const result = giphys.reduce((resultArray: any, item: any, index: number) => {
        const chunkIndex = Math.floor(index / chunkSize)
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }
        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])

      setGifs(result)
      setCompleted([])
    })
  }

  function loadMore() {
    // TODO: loading async
    let offset = searchParams.limit
    let limit = searchParams.limit * 2

    updateSearchParams({ limit: limit, offset: offset })
    getPawsGiphy({ offset, limit })
  }

  useEffect(() => {
    gifs.length === 0 && getPawsGiphy({ offset: 0, limit: 15 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // TODO: HUD circle loader for async state
  // TODO: no more items to load
  return (
    <div className="mainPage">
      <HeaderItem title="Paws N Reflect" />
      <div className="mainContent">
        <div className="gifsnvideos p-2 row">
          {completed.length > 0 && <p className="text-center">Oops that's all for now...</p>}
          {completed.length < Math.round(perItems / chunkSize) && gifs.map((item, idx) => {
            let itemCompleted = completed.includes(idx)
            return (<div className={classNames("d-flex align-items-center justify-content-center", { "hidden": itemCompleted })} key={idx}>
              {!itemCompleted && <GifItem gifItem={item} completedSet={(done: boolean) => {
                if (done) {
                  // do something else
                  setCompleted([...completed, idx])
                }
              }} />}
            </div>)
          })}

          {completed.length >= Math.round(perItems / chunkSize) && <div className="loadMore">
            <div className="d-flex align-items-centre justify-content-center">
              <button onClick={loadMore} className="btn btn-lg rounded-0" style={{ backgroundColor: '#1E63FF', color: '#fff' }}>Laod More!</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  )
}