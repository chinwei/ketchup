<template>
  
  <div class="container" style="width: 600px">
    <button class="button is-primary">Back</button>
    <b-field label="Select a date">
        <b-datepicker
            placeholder="Click to select..."
            icon="calendar-today">
        </b-datepicker>
    </b-field>
    <b-input type="text" placeholder="New Meeting" />
    <b-tag>#softlines</b-tag>

    <h2 class="title is-spaced">Agenda</h2>
    <ul class="list">
      <li class="list__item" v-for="(item, index) in agendaItems">
        <b-input 
          type="text" 
          v-bind:value="item.text" 
          placeholder="New Meeting" 
          @focus="onFocus(item['.key'], index, agendaItems)"
          @blur="onBlur(item['.key'], index)"
          @input="updateItem(agendaItems)"/>

      </li>
      <li>
        <b-input v-model="agendaItem"

          @input="addItem(agendaItems)"/>
      </li>
    </ul>

    <h2 class="title is-spaced">Key Points</h2>
    <ul class="menu-list">
      <li>
        <b-input type="text" placeholder="New Meeting" />
      </li>
    </ul>

    <h2 class="title is-spaced">Action Items</h2>
    <ul>
      <li>
        <b-input type="text" placeholder="New Meeting" />
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'

// How do i know where i have selected?

var config = {
    apiKey: "AIzaSyAY3rOqi6SX9NSyOX14DmTt8p2BQyUeP3A",
    authDomain: "ketchup-e0b85.firebaseapp.com",
    databaseURL: "https://ketchup-e0b85.firebaseio.com/"
  };

// var firebaseApp = firebase.initializeApp(config)
// var db = firebaseApp.database()

export default {
  name: 'EditStrategy',
  data () {
    return {
      currentSelectedInputIndex: Number,
      currentSelectedKey: String,
      selectedSection: String,
      agendaItem: ''
    }
  },
  methods: {
    updateItem(e) {
      console.log('updating..', e)
    },
    addItem(e) {
      console.log('adding', e)
    },
    onBlur(e, index) {
      console.log('blur', e, index)
    },
    onFocus(e, index) {
      console.log('focus', e, index)
      this.currentSelectedInputIndex = index;
      this.currentSelectedKey = e;
    },
    detectKeyPressed(e) {
      console.log('key pressed', e)
      if (e.key === 'Enter' && e.ctrlKey === false) {
        this.addNewItem();
        this.shiftFocusToNewItem();
      } else if (e.key === 'Enter' && e.ctrlKey === true) {
        this.deleteItem()
      }
    },
    addNewItem() {
      this.$firebaseRefs.agendaItems.push({
        text: this.agendaItem
      })

      this.agendaItem = '';
    },
    deleteItem() {
      console.log('delete item');
      this.$firebaseRefs.agendaItems.child(this.currentSelectedKey).remove()
    },
    shiftFocusToNewItem() {

    }
  },
  created () {
    window.addEventListener('keydown', this.detectKeyPressed)
    // this.$firebaseRefs.agendaItems.push({
    //   text: 'hello'
    // })
  },
  firebase: {
    // agendaItems: db.ref('/agenda/')
  }
}
</script>

<style lang="scss">
  .list {
    padding: 32px 0;

    .list__item {
      margin-bottom: 16px;
    }
  }
</style>