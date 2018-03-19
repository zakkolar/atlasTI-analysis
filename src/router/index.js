import Vue from 'vue'
import Router from 'vue-router'
import TaskDuration from '@/components/TaskDuration'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/task-duration',
      component: TaskDuration
    }
  ]
})
