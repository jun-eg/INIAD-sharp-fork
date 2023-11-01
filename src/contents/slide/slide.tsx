// import axios from "axios"

// const urls: string[] = []

// const getSlideData = (): Promise<string> => {
//   return axios
//     .get(
//       "https://raw.githubusercontent.com/jun-eg/test-zip/main/data/slide.json"
//     )
//     .then((response) => {
//       return response.data
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// }

// type NestedObject = {
//   [key: string]: string | NestedObject
// }

// const isNestedObject = (value: unknown): value is NestedObject => {
//   return typeof value === "object" && value !== null
// }

// const findUrls = (obj: unknown) => {
//   if (isNestedObject(obj)) {
//     for (const key in obj) {
//       const value = obj[key]
//       if (isNestedObject(value)) {
//         findUrls(value)
//       } else if (key === "url" && typeof value === "string") {
//         urls.push(value)
//       }
//     }
//   }
//   console.log(urls)
// }

// const fetchData = async () => {
//   try {
//     const data = await getSlideData()
//     findUrls(data)
//   } catch (error) {
//     console.error(error)
//   }
// }

// fetchData()
