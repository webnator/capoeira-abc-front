
import axios from 'axios'
import delay from 'delay'

const BASE_PATH = 'http://localhost:8081/api/v1/'

export default {
  async getCategories() {
    const res = await axios.get(`${BASE_PATH}categories`)
    await delay(2000)
    return res.data; 
  }
}