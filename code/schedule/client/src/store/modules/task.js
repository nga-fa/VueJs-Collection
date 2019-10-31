/* eslint-disable indent */
import axios from 'axios'

const state = {
  todo: [
    {
      id: 0,
      title: '',
      Content: ''
    }
  ]
}

const getters = {
  allTodos: (state) => state.todo
}

const mutations = {
    setTodo: (state, todos) => (state.todo = todos)
}

const actions = {

  async fetchTasks ({ commit }) {
    const response = await axios.get('http://localhost:3001/tasks')
    commit('setTodo', response.data)
  },

  async addTask (titl, content, startDate, endDate) {
    const formData = { title: titl, content: content, start_date: startDate, end_date: endDate }
    const response = await axios.post('http://localhost:3001/tasks', formData)
    .catch((e) => {
      console.log(e)
    })
    console.log('\n\nFrom Add task function: ' + response + '\n\n')
    console.log(titl, content, startDate, endDate, formData)
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
