<template>
  <div class="container">
    <button @click="newMeeting" class="button is-primary">Meet now</button>
    <div class="columns">
      <div class="column">
        <ul class="list">
          <li class="list__item" v-for="item in meetings">
            <div>{{ item.id }}</div>
            <div>{{ item.title }}</div>
            <div>{{ item.time }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Meetings',
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    newMeeting() {
      var key = firebase.database().ref('/meetings/').push().key
      this.$router.push('/meetings/' + key)
    }
  },
  firebase: {
    meetings: firebase.database().ref('/meetings/')
  }
}
</script>