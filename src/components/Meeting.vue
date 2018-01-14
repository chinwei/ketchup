<template>
  <div class="container">
    <button class="button is-primary" @click="goBack">Back</button>
    <div class="columns">
      <div class="column">
        <div class="title is-spaced">
          <div>Title</div>
          <b-input 
            @blur="updateMeta"
            v-model="title"/>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        {{ meetingData }}
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

  export default {
    name: 'Meeting',
    components: {
      Checklist
    },
    data () {
      return {
        title: '',
        meetingData: {
          agendaList: [],
          notesList: [],
          actionsList: []
        }
      }
    },
    created() {
      console.log(this.$route.params.meeting)
      // console.log(firebase.database())
    },
    methods: {
      goBack() {
        this.$router.push('/meetings/')
      },
      updateLists(e) {
        // console.log(e, 'update!')
        firebase.database().ref('/meetingData/' + this.$route.params.meeting).set(this.meetingData)
      },
      updateMeta() {
        firebase.database().ref('/meetings/' + this.$route.params.meeting).set({
          title: this.title
        })
      }
    },
    firebase: {
      // meetingData: firebase.database().ref('/meetingData/' + this.$route.params.meeting)
    }
  }  
</script>

