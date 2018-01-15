<template>
  <div class="container" style="width: 600px">
    <div class="columns">
      <div class="column">
        <div class="header" style="margin-bottom: 24px">
          <div class="header--view">
            Inbox
          </div>
          <div @click="newMeeting" class="button is-black">Start Meeting</div>
        </div>
        <div class="header--section">Recent</div>
        <ul class="list" style="padding: 8px 0">
          <li @click="editMeeting(key)" class="list__item" v-for="(item, key) in meetings">
            <div class="list__header">{{ item.title }}</div>
            <div class="timestamp">{{item.dateCreated | formatDate}}</div>
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
      meetings: {}
    }
  },
  created() {
    var _this = this;

    firebase.database()
      .ref('/meetings/')
      .on('value', function(snapshot) {
        if (snapshot.val()) {
          // console.log('snapshot: ', snapshot.val())
          _this.meetings = snapshot.val();

        }
      })
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(value).format('MMM DD')
      }
    } 
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
    // meetings: firebase.database().ref('/meetings/')
  }
}
</script>

<style lang="scss">
  .list {

    .list__item {
      background: white;
      position: relative;
      cursor: pointer;

      &:hover {
        .list__header {
          color: #777;
        }
      }
    }

    .timestamp {
      position: absolute;
      top: 7px;
      left: -70px;
      color: #aaa;
    }

    .list__header {
      font-size: 21px
    }
  }

  .header--view {
    font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 24px;
  }

  .header--section {
    font-size: 16px;
    font-weight: 700;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>