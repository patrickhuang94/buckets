import { useEffect } from 'react'
import normalizeAxios from '../services/normalizeAxios'

const useFetch = (url, options, callback) => {
  useEffect(() => {
    async function fetchData() {
      const data = await normalizeAxios({
        method: options.method,
        url,
      })

      callback(data)
    }

    fetchData()
  }, [])
}

export default useFetch
