<template>
  <div class="home">
    <v-app id="dayspan" v-cloak>
      <ds-calendar-app v-on:saved="saveEvent($event)" :calendar="calendar"></ds-calendar-app>
    </v-app>
  </div>
</template>

<script>
import { Calendar } from 'dayspan'
import axios from 'axios'

export default {
  name: 'calendr',
  data: () => ({
    data: [],
    readOnly: false,
    Calendar: Calendar.months()
  }),
  methods: {
    saveEvent: function (e) {
      alert('Saved event !!!')
      console.log(e)
      axios({
        method: 'post',
        url: 'http://localhost:3001/tasks',
        data: {
          title: e.details.title,
          content: e.details.description
        }
      })
    }
  }
}
</script>
