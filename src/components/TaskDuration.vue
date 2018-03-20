<template>
  <div>
    <h1>Task Duration</h1>
    <div class="row">
      <div class="col-6">
        <h2>Ignore quotes with these codes:</h2>
        <ul>
          <li v-for = "code in codes" v-bind:key="code.id">
            <label>
              <input type="checkbox" v-bind:value="code.id" v-model="ignoredCodes"> {{code.name}}
            </label>
          </li>
        </ul>
      </div>
      <div class="col-6">
        <h2>Display only these codes:</h2>
        <ul>
          <li v-for = "code in codes" v-bind:key="code.id">
            <label>
              <input type="checkbox" v-bind:value="code.id" v-model="displayCodes"> {{code.name}}
            </label>
          </li>
        </ul>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th v-for = "code in displayedCodes" v-bind:key="code.id">
            {{code.name}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for = "(userCodes, user) in users" v-bind:key="user">
          <td>{{user}}</td>
          <td v-for = "code in displayedCodes" v-bind:key="code.id">
            <span v-if="userCodes[code.id] && !userCodes[code.id].hasCodeWithIds(ignoredCodes)">
              {{userCodes[code.id].location.duration | seconds}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/* eslint-disable */


export default {
  name: 'task-duration',
  data () {
    return {
      ignoredCodes:[],
      displayCodes:[]
    }
  },
  computed: {
    project () {
      return this.$store.getters['project']
    },
    quotes () {
      return this.project.quotes
    },
    codes () {
      return this.project.codes
    },
    documents() {
      return this.project.documents
    },
    displayedCodes(){
      let codes = {};
      for(let codeId in this.codes){
        if(this.displayCodes.indexOf(codeId)>-1){
          codes[codeId] = this.codes[codeId]
        }
      }
      return codes;
    },
    users () {
      let users = {}
      for (let codeId in this.codes) {
        let code = this.codes[codeId]
        for(let quote of code.quotes){
          let doc = quote.document
          let user = getUserFromDocumentName(doc.name)
          if (!users.hasOwnProperty(user)){
            users[user] = {}
          }
          users[user][code.id] = quote
        }

      }

      return users
    }
  },
  methods: {

  },
  filters:{
    seconds(string){
      let moment = require('moment')
      let dur = moment.duration(splitTimeString(string))
      return dur.asSeconds()
    }
  }
}

function getUserFromDocumentName (name) {
  return name.split(' ')[0]
}

function splitTimeString (msS) {
  let ms = msS.split(':')
  return {
    minutes: parseInt(ms[0]),
    seconds: parseInt(ms[1])
  }
}

</script>

<style>

</style>
