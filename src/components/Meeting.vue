<template>
  <div class="container">
    <button class="button is-primary" @click="goBack">Back</button>
    {{meetingData}}
    <div class="columns">
      <div class="column">
        <div class="title is-spaced">
          <div>Title</div>
          <div>{{ dateCreated }}</div>
          <b-input 
            @blur="updateMeta"
            v-model="title"/>
        </div>
      </div>
    </div>
    
    <div class="columns">
      <div class="column">
        <div class="title">
          Agenda
        </div>
        <checklist
          :items.sync="meetingData.agendaList"
          :title="'agendaList'"
          v-on:updateList="updateLists"/>
      </div>
      <div class="column">
        <div class="title is-spaced">
          Notes
        </div>
        <checklist
          :items.sync="meetingData.notesList"
          :title="'notesList'"
          v-on:updateList="updateLists"/>
      </div>
      <div class="column">
        <div class="title is-spaced">
          Action Items
        </div>
        <checklist
          :items.sync="meetingData.actionsList"
          :title="'actionsList'"
          v-on:updateList="updateLists"/>
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
        formattedDate: moment(1515945142020).format(),
        meetingData: {
          agendaList: [],
          notesList: [],
          actionsList: []
        }
      }
    },
    computed: {
    },
    created() {
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
        .once('value', function(snapshot) {
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
          title: this.title
        })
      }
    },
    firebase: {
      // meetingData: firebase.database().ref('/meetingData/' + this.$route.params.meeting)
    }
  }  
</script>

