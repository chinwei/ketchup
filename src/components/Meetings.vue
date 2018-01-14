<template>
  <div class="container">
    <button @click="newMeeting" class="button is-primary">Meet now</button>
    <div class="columns">
      <div class="column">
        <ul class="list list--card">
          <li @click="editMeeting(item['.key'])" class="list__item" v-for="item in meetings">
            <div class="list__header">{{ item.title }}</div>
            <div>{{ item.dateCreated }}</div>
            <!-- <div>{{ item['.key'] }}</div> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import moment from 'moment'

export default {
  name: 'Meetings',
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    newMeeting() {
      var key = firebase.database().ref('/meetings/').push({
        dateCreated: firebase.database.ServerValue.TIMESTAMP
      }).key

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

<style lang="scss">
  .list--card {
    width: 600px;
    margin: 0 auto;

    .list__item {
      background: white;
      border: 1px #f3f3f3 solid;
      border-radius: 3px;
      box-shadow: 0 0 4px #eee;
      padding: 16px;
      margin-bottom: 16px;
      cursor: pointer;

      &:hover {
        border-color: #ccc;
      }
    }

    .list__header {
      font-size: 21px
    }
  }
</style>