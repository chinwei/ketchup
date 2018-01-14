<template>
  <div class="container">
    <button @click="newMeeting" class="button is-primary">Meet now</button>
    <div class="columns">
      <div class="column">
        <ul class="list">
          <li @click="editMeeting(item['.key'])" class="list__item" v-for="item in meetings">
            <div>{{ item.title }}</div>
            <div>{{ item['.key'] }}</div>
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
      // firebase.database().ref('/meetings/' + key).set('')
      // firebase.database().ref('/meetingData/' + key).set({
      //   agendaList: [''],
      //   notesList: [''],
      //   actionsList: ['']
      // })
      this.$router.push('/meetings/' + key)
    },
    editMeeting(key) {
      this.$router.push('/meetings/' + key)
      
    }
  },
  firebase: {
    meetings: firebase.database().ref('/meetings/')
  }
}
</script>