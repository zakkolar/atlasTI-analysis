<template>
  <div>
    <h2>Task Duration</h2>
    <p>Code > Output > Codebook</p>
    <p>Grouping: no grouping</p>
    <p>Report options:</p>
    <ul>
      <li>Quotations
        <ul>
          <li>In Document</li>
        </ul>
      </li>
    </ul>
    <input type="file" @change="loadFile">
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th v-for = "code in codeList" v-bind:key="code">
            {{code}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for = "(codes, user) in users" v-bind:key="user">
          <td>{{user}}</td>
          <td v-for = "code in codeList" v-bind:key="code">
            <span v-if="codes[code]">{{codes[code].duration}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import {LoadFileFromInput} from '../LoadFileFromInput'
import {CodeExtractor} from '../CodeExtractor'

export default {
  name: 'task-duration',
  data () {
    return {
      codeList: [],
      users: []
    }
  },
  methods: {
    loadFile (e) {
      LoadFileFromInput(e.target, (result) => {
        let codeExtractor = new CodeExtractor(result)
        let codes = codeExtractor.getCodes()

        this.codeList = codes.map((code) => {
          return code.code
        })

        this.users = this.transformCodes(codes)
      })
    },
    transformCodes (codes) {
      let users = {}
      let moment = require('moment')
      for (let code of codes) {
        for (let instance of code.instances) {
          if (!users.hasOwnProperty(instance.user)) {
            users[instance.user] = {}
          }

          let start = moment.duration(splitTimeString(instance.start))
          let end = moment.duration(splitTimeString(instance.end))

          let duration = end.subtract(start).asSeconds()

          users[instance.user][code.code] = {
            start: instance.start,
            end: instance.end,
            duration: duration
          }
        }
      }
      return users
    }
  }
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
