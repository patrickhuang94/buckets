import { useState, useEffect } from 'react'
import normalizeAxios from '../services/normalizeAxios'

const cache = {}

const useFetch = (url) => {
  const [isFetched, setIsFetched] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      if (cache[url]) {
        setData(cache[url])
        setIsFetched(true)
      } else {
        const result = await normalizeAxios({ url })
        cache[url] = result
        setData(result)
        setIsFetched(true)
      }
    }

    fetchData()
  }, [url])

  return { isFetched, data }
}

export default useFetch
