import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import EditMeeting from '@/components/EditMeeting'
import Inputs from '@/components/Inputs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // {
    //   path: '/edit-meeting',
    //   name: 'EditMeeting',
    //   component: EditMeeting
    // },
    {
      path: '/inputs',
      name: 'Inputs',
      component: Inputs
    }
  ]
})
