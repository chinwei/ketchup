<template>
  <div class="container">

    <div class="columns">
      <div class="column">
        <div class="title">
          Agenda
        </div>
        <checklist/>
      </div>
      <div class="column">
        <div class="title is-spaced">
          Notes
        </div>
        <checklist/>
      </div>
      <div class="column">
        <div class="title is-spaced">
          Action Items
        </div>
        <checklist/>
      </div>
      
    </div>
  </div>
</template>

<script>
import Checklist from './Checklist'

  export default {
    name: 'Inputs',
    components: {
      Checklist
    }
  }  
</script>

