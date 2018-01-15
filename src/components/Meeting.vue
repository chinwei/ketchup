<template>
  <div class="container" style="width: 600px">
    <div class="columns">
      <div class="column view-header">
        <div @click="goBack" class="icon view-header__icon">
          <svg>
            <use href="/static/images/sprites.svg#arrow-left"></use>
          </svg>
        </div>
        <b-input
          ref='title'
          class="header--view"
          placeholder="Give the meeting a title"
          @blur="updateMeta"
          v-model="title"/>
        <div class="timestamp">{{ dateCreated }}</div>
      </div>
    </div>
    
    <div class="columns">
      <div class="column">

        <div class="meeting-section">
          <div class="header--section">
            Agenda
          </div>
          <checklist
            :items.sync="meetingData.agendaList"
            :keypressed="keyPressed"
            :title="'agendaList'"
            v-on:updateList="updateLists"/>
          
        </div>
        <div class="meeting-section">
          <div class="header--section">
            Notes
          </div>
          <checklist
            :items.sync="meetingData.notesList"
            :title="'notesList'"
            v-on:updateList="updateLists"/>
        </div>
      
        <div class="meeting-section">
          <div class="header--section">
            Action Items
          </div>
          <checklist
            :items.sync="meetingData.actionsList"
            :title="'actionsList'"
            v-on:updateList="updateLists"/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Checklist from './Checklist'
import moment from 'moment'

  export default {
    name: 'Meeting',
    components: {
      Checklist
    },
    data () {
      return {
        title: '',
        dateCreated: '',
        keyPressed: KeyboardEvent,
        meetingData: {
          agendaList: [],
          notesList: [],
          actionsList: []
        }
      }
    },
    mounted() {
      this.$refs.title.focus();
    },
    created() {

      window.addEventListener('keydown', this.detectKeyPressed)

      var _this = this
      firebase.database()
        .ref('/meetings/' + this.$route.params.meeting)
        .on('value', function(snapshot) {
          if (snapshot.val()) {
            _this.title = snapshot.val().title
            _this.dateCreated = moment(snapshot.val().dateCreated).fromNow()
          }
        })

      firebase.database()
        .ref('/meetingData/' + this.$route.params.meeting)
        .on('value', function(snapshot) {
          if (snapshot.val()) {
            _this.meetingData = {
              agendaList: snapshot.val().agendaList ? snapshot.val().agendaList : [],
              notesList: snapshot.val().notesList ? snapshot.val().notesList : [],
              actionsList: snapshot.val().actionsList ? snapshot.val().actionsList : []
            }
            
          }
          
        })

    },
    methods: {
      goBack() {
        this.$router.push('/')
      },
      updateLists() {
        // console.log(e, 'update!')
        firebase.database().ref('/meetingData/' + this.$route.params.meeting).set(this.meetingData)
      },
      updateMeta() {
        firebase.database().ref('/meetings/' + this.$route.params.meeting).update({
          title: this.title ? this.title : 'Untitled Meeting'
        })
      },
      detectKeyPressed(e) {
        this.keyPressed = e;
      }
    }
  }  
</script>

<style lang="scss">
  .timestamp {
    font-size: 14px;
  }

  .header--view {
    margin-bottom: 4px;
    > input.input {
      font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
      font-size: 32px;
      font-weight: 800;
      padding: 0 0 1px 0;
      background: none;
      border-radius: 0;
      border: none;
      outline: none;
      box-shadow: none;
      height: unset;

      &:hover {
        border-bottom: 1px #ccc dashed;
        padding: 0;
      }

      &:hover {
        border-bottom: 1px #555 dashed;
        padding: 0;
      }



    }
  }

  .header--section {
    font-size: 16px;
    font-weight: 700;
  }

  .meeting-section {
    margin-bottom: 24px;
  }

  .icon {
    height: 32px;
    width: 32px;

    > svg {
      width: 32px;
      height: 32px;
    }
  }

  .view-header {
    position: relative;
    margin-bottom: 24px;

    .view-header__icon {
      // width: 50px;
      // height: 50px;
      border-radius: 100px;
      position: absolute;
      top: 20px;
      left: -80px;
      cursor: pointer;
      
      svg {
        fill: #ccc;
      }

      &:hover {
        // background: #f3f3f3;

        svg {
          fill: #333;
        }
      }

    }


  }
</style>
