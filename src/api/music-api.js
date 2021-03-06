
import axios from 'axios'
import delay from 'delay'

const BASE_PATH = 'https://capoeira-music.herokuapp.com/api/v1/'

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
    if (filter && filter.search === '') {
      return []
    }

    const res = await axios.get(`${BASE_PATH}songs`, { params: filter })
    await delay(1)
    return res.data;
  },
  async getSong(slug) {
    const res = await axios.get(`${BASE_PATH}songs/${slug}`)
    await delay(1)
    return res.data;
  },
  async songViewed(slug) {
    await axios.patch(`${BASE_PATH}song-views/${slug}`, { viewed: 1})
  }
}