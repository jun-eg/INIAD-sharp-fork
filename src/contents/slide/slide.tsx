import axios from "axios"
import { useCallback, useEffect, useState } from "react"
import type { Data } from "src/types/slideTypes"

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

  return <div>
    <p>{`${data.year[2023].}`}</p>
  </div>
}

export default FetchSlideData
