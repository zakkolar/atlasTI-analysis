<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Atlas.TI Analysis</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/load-project">Load Project</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/task-duration">Task Duration</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <div class="row">
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

</style>
