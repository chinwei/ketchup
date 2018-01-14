import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Meeting from '@/components/Meeting'
import Meetings from '@/components/Meetings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/meetings',
      name: 'Meetings',
      component: Meetings
    },
    {
      path: '/meetings/:meeting',
      name: 'Meeting',
      component: Meeting
    }
  ]
})
