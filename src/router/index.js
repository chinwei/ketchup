import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import EditMeeting from '@/components/EditMeeting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/edit-meeting',
      name: 'EditMeeting',
      component: EditMeeting
    }
  ]
})
