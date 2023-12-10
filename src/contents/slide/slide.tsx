import axios from "axios"
import $ from "jquery"
import { useCallback, useEffect, useState } from "react"
import type { Data } from "src/types/slideTypes"

import "jqtree"

type TreeNode = {
  name: string
  id: number
  children?: TreeNode[] // `children` はオプショナルで、TreeNode型の配列
}

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

const FetchSlideData = () => {
  const [data, setData] = useState<TreeNode[]>()

  // const getFiledata = useCallback(async () => {
  //   try {
  //     const response = await axios.get<Data>(url)
  //     setData(response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }, [])

  const settree = () => {
    $("#tree1").tree({
      data: testData,
      autoOpen: true,
      dragAndDrop: true
    })

    setData(testData)
  }

  useEffect(() => {
    settree()
  }, [])

  if (!data) return <div>GettingData</div>

  return (
    <>
      <div id="tree1" />
    </>
  )
}

export default FetchSlideData
