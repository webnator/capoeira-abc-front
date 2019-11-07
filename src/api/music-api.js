
import axios from 'axios'
import delay from 'delay'

const BASE_PATH = 'http://localhost:8081/api/v1/'

export default {
  async getCategories() {
    const res = await axios.get(`${BASE_PATH}categories`)
    await delay(1)
    return res.data;
  },
  async getSongs(filter) {
    if (filter && filter.category) {
      filter.category = filter.category.join(',')
    }

    const res = await axios.get(`${BASE_PATH}songs`, { params: filter })
    await delay(1)
    return res.data;
  }
}