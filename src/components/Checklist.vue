<template>
  <ul class="checklist">
    <li class="checklist-item" v-for="(item, index) in items">
      <div class="checklist-item__dot"></div>
      <b-field>
          <b-input
            ref="items"
            rows="1"
            v-bind:value="item" 
            v-model="items[index]"
            @blur="onBlur"
            @focus="updateSelectionContext('update', 'agenda', index)"/>
      </b-field>
      
    </li>
    <li class="checklist-item">
      <b-input 
        rows="1"
        v-model="newItemText" 
        placeholder="Add new..." 
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
        type: Array
      },
      title: {
        type: String 
      }
    },
    computed: {
      getKeyPressed () {
        return this.$store.getters.getKeyPressed;
      }
    },
    watch: {
      getKeyPressed (e) {
        // console.log('watching', e);

        if (e) {
          if (e.key === 'Enter' && !e.ctrlKey) {
            if (this.selectionContext.state === 'add') {

              this.addItem(this.selectionContext.context);

            } else if (this.selectionContext.state === 'update') {
              
              this.$refs
                .items[this.selectionContext.index]
                .$el.childNodes[0].blur();
            }

          } else if (e.key === 'Enter' && e.ctrlKey) {
            this.deleteItem()
          }
        }
       
        

      }
    },
    methods: {
      addItem(context) {
        if (this.newItemText !== '' && this.selectedSection && this.items) {
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
      },
      onBlur() {

        if (this.selectionContext.state === 'add') {

          this.addItem(this.selectionContext.context);

        }

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
      }
    }
  }  
</script>

<style lang="scss">
  .checklist {
    padding: 8px 0 16px 0;
  }

  .checklist-item {
    margin-bottom: 8px;
    position: relative;

    input, textarea {
      outline: none;
      box-shadow: none;
      border: 0;
      border-radius: 0;
      padding: 0 0 1px 0;
      font-size: 18px;
      &:hover {
        border-bottom: 1px #ccc dashed;
        padding: 0;
      }

      &:focus {
        border-bottom: 1px #555 dashed;
        padding: 0;
      }
    }
  }

  .field {
    width: 100%
  }

  .checklist-item__dot {
    height: 6px;
    width: 6px;
    background: #FF5E5E;
    border-radius: 20px;
    margin-right: 16px;
    position: absolute;
    top: 11px;
    left: -20px;
  }
</style>