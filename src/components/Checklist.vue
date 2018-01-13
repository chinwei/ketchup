<template>
  <ul class="list">
    {{selectedSection}}
    <li class="list__item" v-for="(item, index) in Items">
      <b-input 
        v-bind:value="item" 
        v-model="Items[index]"
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
        Items: ['sdfds', 'sdf'],
        newItemText: '',
        selectedSection: false,
        selectionContext: {
          state: String,
          context: String,
          index: Number
        }
      }
    },
    created () {
      window.addEventListener('keydown', this.detectKeyPressed)
    },
    methods: {
      addItem(context) {
        if (this.newItemText !== '' && this.selectedSection) {
          this.Items.push(this.newItemText)
          this.newItemText = ''
        }
      },
      deleteItem() {
        if (this.selectedSection) {
          this.Items.splice(this.selectionContext.index, 1)
        }
      },
      updateItem(context) {
        this.Items[context.index]
      },
      onBlur() {
        this.selectedSection = false
      },
      updateSelectionContext(state, context, index) {
        // How to find the current selection context?

        this.selectedSection = true;
        this.selectionContext = {
          state: state,
          context: context,
          index: index
        }
      },
      detectKeyPressed(e) {
        // console.log('key pressed', e)
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