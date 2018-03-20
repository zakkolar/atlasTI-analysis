/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import {LocalStorage} from "./LocalStorage";
import {ProjectReader} from "./ProjectReader";

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    project: null
  },
  mutations: {
    setProject(state, xml){
      if(xml){
        let reader = new ProjectReader(xml)
        let project = reader.getProject()
        state.project = project.getData()
      }
      else{
        state.project = null
      }
    }
  },
  actions: {
    setProject(context, xml){
      context.commit('setProject', xml)
      LocalStorage.set('projectXml', xml)
    },
    restoreProject(context){
      let project = LocalStorage.get('projectXml')
      context.commit('setProject', project)
    },
    clearProject(context){
      context.commit('setProject', null)
      LocalStorage.remove('projectXml')
    }
  },
  getters:{
    project(state){
      return state.project
    }
  }

})
