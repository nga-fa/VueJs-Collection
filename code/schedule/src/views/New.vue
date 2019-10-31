<template>

<div class="container">

  <form @submit="submitForm">
    <b-card title="Create a new task">
    <b-container fluid>

      <b-col class="my-1">
        <b-row sm="2">
          <label>Title:</label>
        </b-row>
        <b-row sm="4">
          <b-form-input id="input-default" size="sm" v-model="title" placeholder="Enter task title"></b-form-input>
        </b-row>
      </b-col>

      <b-col class="my-1">
        <b-row sm="2">
          <label>Content</label>
        </b-row>
        <b-row sm="4">
          <b-form-input id="input-default" size="sm" v-model="content" placeholder="Enter task content"></b-form-input>
        </b-row>
      </b-col>

      <b-col class="my-1">
        <b-row sm="2">
          <label>Start date and time</label>
        </b-row>
        <b-row sm="4">
          <datetime v-model="startDate" type="datetime"></datetime>
         </b-row>
      </b-col>

      <b-col class="my-1">
        <b-row sm="2">
          <label>End date and time</label>
        </b-row>
        <b-row sm="4">
          <datetime v-model="endDate" type="datetime"></datetime>
          </b-row>
      </b-col>
      <b-button type="submit" >Create New</b-button>
    </b-container>
  </b-card>
  </form>

</div>

</template>

<script>

import { mapActions } from 'vuex'
import { Datetime } from 'vue-datetime'
import axios from 'axios'

export default {
  name: 'new',
  data: () => ({
    title: 'Dummy title',
    content: 'The description too is dummy',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString()
  }),
  methods: {
    ...mapActions(['addTask']),
    submitForm (e) {
      e.preventDefault()
      axios({
        method: 'post',
        url: 'http://localhost:3001/tasks',
        data: {
          title: this.title,
          content: this.content,
          start_date: this.start_date,
          end_date: this.end_date
        }
      })
      alert('Added record !!')
      this.title = ''
      this.content = ''
      this.startDate = new Date().toISOString()
      this.endDate = new Date().toISOString()
    }
  },
  components: {
    datetime: Datetime
  }
}
</script>

<style scoped>

.vdatetime {
  border: 1px solid black;
  width: fit-content;
  align-items: center;
}

form {
  width: 50%;
  margin: auto
}

</style>
