import axios from "axios"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useEffect, useState } from "react"
import type { Deadline } from "src/types/moocsTypes"

import styles from "../contents/moocs/index.module.css"

export const config: PlasmoCSConfig = {
  matches: ["https://moocs.iniad.org/*"],
  all_frames: true
}

const url = `https://raw.githubusercontent.com/s1f102003425/deadpiro-json/main/data.json`

// JSONデータを取得する非同期関数
const fetchFileContent = async () => {
  const response = await axios.get(url)
  return response.data
}

// コンテンツを挿入する場所を指定。呼び出さずとも宣言だけで指定した場所に要素を配置できる。
export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  const aside = document.querySelector(".sidebar-menu.tree") as HTMLUListElement
  return aside
}
export const getShadowHostId = () => "INIAD-sharp"

const PlasmoInline = () => {
  const [newData, setNewData] = useState<Deadline | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFileContent()
      setNewData(data.cs2.deadline)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (newData) {
      const aside = document.querySelector(".sidebar-menu.tree")
      if (aside instanceof HTMLUListElement) {
        const newLi = document.createElement("li")
        // ここからCSS指定。paddingだけCSS.moduleきかなかったので直書き。
        newLi.className = styles.titleOfHeader
        newLi.style.padding = " 10px 25px 10px 15px"
        newLi.textContent = "INIAD# CONTENTS"
        aside.appendChild(newLi)

        const deadlineElement = document.createElement("li")
        deadlineElement.className = styles.deadline
        deadlineElement.style.padding = "12px 5px 12px 15px"
        deadlineElement.textContent = "課題締切"
        aside.append(deadlineElement)
        const deadlineInfo = document.createElement("div")
        deadlineInfo.textContent = `締め切り: ${newData.month}/${newData.day} ${newData.hour}時`
        deadlineElement.appendChild(deadlineInfo)
      }
    }
  }, [newData])

  return null
}

export default PlasmoInline
