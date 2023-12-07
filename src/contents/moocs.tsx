import axios from "axios"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://moocs.iniad.org/*"]
}

const url = `https://raw.githubusercontent.com/s1f102003425/deadpiro-json/main/data.json`

// JSONデータを取得する非同期関数
const fetchFileContent = async () => {
  const response = await axios.get(url)
  return response.data
}

// Plasmoコンテンツスクリプトの設定

// コンテンツを挿入する場所を指定。呼び出さずとも宣言だけで指定した場所に要素を配置できる。
export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const aside = document.querySelector(".sidebar-menu.tree") as HTMLUListElement
  return aside
}
export const getShadowHostId = () => "INIAD-sharp"

// PlasmoInlineコンポーネント
const PlasmoInline = () => {
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (!dataLoaded) {
      const fetchData = async () => {
        const data = await fetchFileContent()
        console.log(data.cs2.deadline)
        const aside = document.querySelector(".sidebar-menu.tree")
        if (aside instanceof HTMLUListElement) {
          const newLi = document.createElement("li")
          newLi.textContent = "INIAD# CONTENTS"
          newLi.style.textAlign = "left"
          newLi.style.backgroundColor = "#1a2226"
          newLi.style.padding = "10px 25px 10px 15px"
          newLi.style.color = "#4b646f"
          newLi.style.fontSize = "12px"
          newLi.style.listStyleType = "none"
          aside.appendChild(newLi)
        }
        setDataLoaded(true)
      }

      fetchData()
    }
  }, [dataLoaded]) // dataLoadedを依存配列に追加

  return null
}

export default PlasmoInline
