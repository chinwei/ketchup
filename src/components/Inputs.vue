<template>
  <div class="container">
    <div>
      {{selectionContext}}
    </div>
    <div>{{listItems}}</div>

    <div class="columns">
      <div class="column">
        <ul class="list">
          <li class="list__item" v-for="(item, index) in listItems">
            <b-input v-bind:value="item" v-model="listItems[index]" @focus="updateSelectionContext('update', index)"/>
          </li>
          <li class="list__item">
            <b-input v-model="newItemText" placeholder="Add Agenda..." @focus="updateSelectionContext('add')"/>
          </li>
        </ul>
      </div>
      <div class="column">
        <ul class="list">
          <li class="list__item" v-for="(item, index) in listItems">
            <b-input v-bind:value="item" v-model="listItems[index]" @focus="updateSelectionContext('update', index)"/>
          </li>
          <li class="list__item">
            <b-input v-model="newItemText" placeholder="Add Agenda..." @focus="updateSelectionContext('add')"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Inputs',
    data () {
      return {
        listItems: ['sdfds', 'sdf'],
        newItemText: '',
        selectionContext: {
          state: String,
          index: Number
        }
      }
    },
    created () {
      window.addEventListener('keydown', this.detectKeyPressed)
    },
    methods: {
      addItem(context) {
        console.log(context);
        this.listItems.push(this.newItemText)
        this.newItemText = ''
      },
      deleteItem() {
        // How to remove an item from an array?
        this.listItems.splice(0, -1)
      },
      updateItem(context) {
        this.listItems[context.index]
      },
      updateSelectionContext(state, index) {
        // How to find the current selection context?
        this.selectionContext = {
          state: state,
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