import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import GifItem from "../../components/GifItem"
import HeaderItem from "../../components/HeaderItem"

export default function PawsNReflect() {
  const navigate = useNavigate()

  const [gifs, setGifs] = useState<any[]>([])

  // TODO: 3 videos at a time, with options on each gif
  // load 20 gifs then splice into 3 sets each.
  // and create a image item component
  const giphyApi = "https://api.giphy.com/v1/gifs/search"
  function getPawsGiphy() {
    axios.get(`${giphyApi}?api_key=pM67eHfDVjFpy6qDAG3ll2TCtKbhHqsr&limit=21&q=cat-and-dog`).then(response => {
      const giphys = response.data.data.map(function (item: any, idx: number) {
        return {
          id: item.id, gif: item.images.original.url,
          title: item.title, type: item.type,
          url: item.url, dims: { width: item.images.original.width, height: item.images.original.height }
        }
      })
      const chunkSize = 7
      const result = giphys.reduce((resultArray: any, item: any, index: number) => {
        const chunkIndex = Math.floor(index / chunkSize)
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] // start a new chunk
        }
        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])

      setGifs(result)
    })
  }

  useEffect(() => {
    gifs.length === 0 && getPawsGiphy()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mainPage">
      <HeaderItem title="Paws N Reflect" />
      <div className="mainContent">
        <div className="gifsnvideos p-2 row">
          {gifs.map((item, idx) => <GifItem gifItem={item} key={idx} />)}
        </div>
      </div>
    </div>
  )
}