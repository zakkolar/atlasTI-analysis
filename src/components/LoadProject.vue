<template>
  <div>
    <h1>Project Settings</h1>
    <div v-if="project" class="row">
      <div class="col">
        <h2>
          Current project: {{project.title}}<br>
          <small>Last exported: {{modified}}</small>
        </h2>
        <button class="btn btn-danger" @click="clearProject()">Clear Project Data</button>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Upload new file</h2>
        <input type="file" class="form-control" @change="loadFile">
      </div>
    </div>
  </div>
</template>

<script>

import {LoadFileFromInput} from '../LoadFileFromInput'
import {CodeExtractor} from '../CodeExtractor'
import {ProjectReader} from "../ProjectReader";

export default {
  name: 'load-project',
  data () {
    return {
    }
  },
  computed: {
    project () {
      return this.$store.getters['project']
    },
    modified () {
      let moment = require('moment')
      let modified = moment(this.project.modified).format("MMMM Do YYYY, h:mm a").toString()
      return modified
    }
  },
  methods: {
    loadFile (e) {
      LoadFileFromInput(e.target, (result) => {
        this.$store.dispatch('setProject', result);
        e.target.value = ''
      })
    },
    clearProject () {
      this.$store.dispatch('clearProject')
    }
  }
}

</script>

<style>

</style>
