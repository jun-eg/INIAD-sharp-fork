import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import type { Data } from "src/types/slideTypes"

const testData = [
  {
    name: "2023",
    id: 1,
    children: [
      { name: "cs1", id: 2 },
      { name: "cs2", id: 3 }
    ]
  }
]
$("#tree1").tree({
  data: testData,
  autoOpen: true,
  drabAndDrop: true
})

const url = `https://raw.githubusercontent.com/jun-eg/deadline-json-fork/main/data.json`

const FetchSlideData = () => {
  const [data, setData] = useState<Data | null>(null)

  const getFiledata = useCallback(async () => {
    try {
      const response = await axios.get<Data>(url)
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    getFiledata()
  }, [getFiledata])

  if (!data) return <div>GettingData</div>

  return <div />
}

export default FetchSlideData
