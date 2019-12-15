import axios from 'axios'

export default async function normalizeAxios(request) {
  const result = await axios(request)
  const normalizedResult = result.data
  return normalizedResult
}
