<template>
  <div class="hello container">
    <h1>Ketchup!</h1>

     <b-dropdown>
            <button @click="goToEditStrategy" class="button is-primary" slot="trigger">Start Meeting</button>
        </b-dropdown>

        <span>
          {{ anArray }}
        </span>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      
    }
  },
  created () {
    
  },
  methods: {
    goToEditStrategy () {
      this.$router.push('/edit-meeting')
    }
  },
  firebase: {
    // anArray: db.ref('/')
  }
}
</script>
