import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://www.ace.toyo.ac.jp/ct/home"],
  all_frames: true
}

const ExtensionOfToyoNetAce = () => {
  useEffect(() => {
    const downloadButton = document.createElement("button")
    downloadButton.id = "toyoNetAceDlButton"
    downloadButton.textContent = "時間割をjsonにしてダウンロード"

    const handleDownload = () => {
      const confirmDownload = confirm(
        "時間割をJSONとしてダウンロードしますか？"
      )
      if (confirmDownload) {
        const table = document.querySelector(".stdlist")
        if (table) {
          const rows = table.querySelectorAll("tr")
          const data: { [key: number]: string[] } = {}

          rows.forEach((row, rowIndex) => {
            if (rowIndex > 0) {
              const cells = row.querySelectorAll("td")
              const rowData: string[] = Array.from(cells).map((cell) => {
                return cell.textContent !== null &&
                  cell.textContent !== undefined
                  ? cell.textContent
                  : ""
              })
              data[rowIndex] = rowData
            }
          })

          const jsonData = JSON.stringify(data, null, 4)
          const downloadLink = document.createElement("a")
          downloadLink.href = URL.createObjectURL(
            new Blob([jsonData], { type: "application/json" })
          )
          downloadLink.download = "timeTable.json"
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        }
      }
    }
    const container = document.querySelector(".mycourses-body")
    if (container) {
      container.prepend(downloadButton)
      downloadButton.addEventListener("click", handleDownload)
    }
    return () => {
      downloadButton.removeEventListener("click", handleDownload)
      if (container && container.contains(downloadButton)) {
        container.removeChild(downloadButton)
      }
    }
  }, [])

  return null
}

export default ExtensionOfToyoNetAce
