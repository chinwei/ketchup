<template>
  <ul class="list">
    <li class="list__item" v-for="(item, index) in items">
      <b-input 
        v-bind:value="item" 
        v-model="items[index]"
        @blur="onBlur"
        @focus="updateSelectionContext('update', 'agenda', index)"/>
    </li>
    <li class="list__item">
      <b-input 
        v-model="newItemText" 
        placeholder="Add Agenda..." 
        @blur="onBlur"
        @focus="updateSelectionContext('add', 'agenda')"/>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'Checklist',
    data () {
      return {
        newItemText: '',
        selectedSection: false,
        selectionContext: {
          state: String,
          context: String,
          index: Number
        },
        changedEvent: {
          index: Number,
          value: String
        }
      }
    },
    props: {
      items: {
        type: Array,
        default: []
      },
      title: {
        type: String 
      }
    },
    created () {
      window.addEventListener('keydown', this.detectKeyPressed)
    },
    methods: {
      addItem(context) {
        if (this.newItemText !== '' && this.selectedSection) {
          this.items.push(this.newItemText)
          this.changedEvent = {
            title: this.title,
            index: this.items.length - 1,
            value: this.newItemText
          }
          this.$emit('updateList', this.changedEvent)
          this.newItemText = ''
        }
      },
      deleteItem() {
        if (this.selectedSection) {
          this.items.splice(this.selectionContext.index, 1)
        }
      },
      updateItem(context) {
        this.items[context.index]
      },
      onBlur() {
        this.selectedSection = false
        if (this.selectionContext.index !== undefined) {
          this.changedEvent = {
            title: this.title,
            index: this.selectionContext.index,
            value: this.items[this.selectionContext.index]
          }
          this.$emit('updateList', this.changedEvent)
        }


      },
      updateSelectionContext(state, context, index) {
        this.selectedSection = true;
        this.selectionContext = {
          state: state,
          context: context,
          index: index
        }
      },
      detectKeyPressed(e) {
        if (e.key === 'Enter' && e.ctrlKey === false) {
          if (this.selectionContext.state === 'add') {
            this.addItem(this.selectionContext.context);
          } else if (this.selectionContext.state === 'update') {
            this.updateItem(this.selectionContext)
          }

        } else if (e.key === 'Enter' && e.ctrlKey === true) {
          this.deleteItem()
        }
      },
    }
  }  
</script>

<style lang="scss">
  .list {
    padding: 32px 0;

    .list__item {
      margin-bottom: 8px;

      input {
        outline: none;
        box-shadow: none;
        border: 0;
        &:hover {
          border: 1px #eee solid;
        }

        &:focus {
          box-shadow: 0 2px 3px #eee;
          background: #f3f3f3;
        }
      }
    }


  }
</style>