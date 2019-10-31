<template>
   <div>
      <h1>List of tasks</h1>
      <div class="todos">
         <div v-for="t in allTodos" :key="t._id" class="to">
            <div id="card" class="container">
               <b-card :title="t.title" :class="t._id">
                  <b-card-text>
                     {{t.content}}
                  </b-card-text>
                  <b-card-text>
                     {{t.start_date}}
                  </b-card-text>
                  <b-card-text>
                     {{t.end_date}}
                  </b-card-text>
                  <b-button class="mt-10" block @click="showModal(t._id)">Edit btn</b-button>
                  <b-button class="mt-10" block @click="remov(t._id)">Delete btn</b-button>
               </b-card>
              <div class="edit-card">
                <b-card :id="t._id" style="display: none" title="Editing task">
                  <form>
                    <b-form-input id="input-default" size="sm" v-model="t.title" placeholder="Enter task content"></b-form-input>
                    <b-form-input id="input-default" size="sm" v-model="t.content" placeholder="Enter task content"></b-form-input>
                    <datetime v-model="t.start_date" type="datetime"></datetime>
                    <datetime v-model="t.end_date" type="datetime"></datetime>
                    <b-button class="mt-3" block @click="update(t._id, t.title, t.content, t.start_date, t.end_date)">Save</b-button>
                    <b-button class="mt-3" block @click="cancel(t._id)">Cancel</b-button>
                  </form>
                </b-card>
              </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'single',
  date: function () {
    //
  },
  methods: {
    ...mapActions(['fetchTasks']),
    update: function (id, title, content, start, end) {
      alert('Updated !!')
      axios({
        method: 'put',
        url: 'http://localhost:3001/tasks/' + id,
        data: {
          title: title,
          content: content,
          start_date: start,
          end_date: end
        }
      })
      this.fetchTasks(this)
      this.cancel(id)
    },
    cancel: function (id) {
      document.getElementById(id).style.display = 'none'
      document.getElementsByClassName(id).style.display = 'block'
    },
    showModal (id) {
      document.getElementById(id).style.display = 'block'
      document.getElementsByClassName(id).style.display = 'none'
    },
    remov (id) {
      axios({
        method: 'delete',
        url: 'http://localhost:3001/tasks/' + id
      })
      alert('Deleted !')
      this.fetchTasks(this)
    }
  },
  computed: mapGetters(['allTodos']),
  created () {
    this.fetchTasks(this)
  }
}
</script>

<style scoped>
  #card{
     max-width: 50%;
  }

  b-card-text{
    font-size: x-large;
  }

  #edit-card{

  }

  input {
    margin: 5px;
  }
</style>
