import Vue from 'vue'
import Router from 'vue-router'
import TaskDuration from '@/components/TaskDuration'
import LoadProject from '@/components/LoadProject'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/task-duration',
      component: TaskDuration
    },
    {
      path: '/load-project',
      component: LoadProject
    }
  ]
})
