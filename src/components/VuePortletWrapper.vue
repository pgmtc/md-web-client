<template>
  <div class="md-portlet">
    <div class="md-portlet-title md-portlet-drag">
      <span class="md-portlet-progress" v-show="inProgress">
        <icon name="spinner" spin></icon>
      </span>
      <icon name="th" class="inline-icon"></icon> {{title}}
    </div>
    <div class="md-portlet-content" v-show="!inError">
      <component :is="componentToLoad"
                 :$ctx="$context"
                 v-on:inProgress="inProgressHandler"
      ></component>
    </div>
    <div class="md-portlet-error" v-show="inError">
      <div class="title">
        <icon name="exclamation-triangle" class="inline-icon"></icon>
        Error when loading portlet<br>
      </div>
      <div class="message">{{errorMessage}}</div>
      <div class="buttons">
        <button v-if="errorCancellable" @click="inError = false">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
// import Context from './Context'
import Context from '@pgmtc/md-lib/client/Context'

export default {
  name: 'portlet-wrapper',
  data: function () {
    return {
      msg: 'Message',
      inProgress: false,
      inError: false,
      errorCancellable: true,
      errorMessage: '',
      title: '',
      componentToLoad: null
    }
  },
  computed: {
    $context () {
      let ctx = new Context()
      ctx.WS_ENDPOINT_URL = '/md/ws'
      ctx.API_ENDPOINT_URL = '/md/api'
      ctx.GRPC_ENDPOINT_URL = '/md/grpc'
      ctx.def = JSON.stringify(this.def)
      ctx.axios = axios
      ctx.socket = this.socket
      ctx.on('error', ::this.errorHandler)
      ctx.on('progress', ::this.inProgressHandler)
      ctx.on('title', ::this.setTitleHandler)
      return ctx
    }
  },
  methods: {
    inProgressHandler (value) {
      this.inProgress = value
    },
    errorHandler (err) {
      this.$emit('error', err)
    },
    setTitleHandler (value) {
      this.title = value
    }
  },
  watch: {
    msg: function () {
    }
  },
  props: ['def', 'socket'],
  async mounted () {
    /* eslint no-eval: 0 */
    this.title = this.def.name
    var cmpDef = window.vuePortlet
    if (cmpDef) {
      var cmpName = cmpDef.default.name
      Vue.component(cmpName, cmpDef.default)
      // Vue.extend(cmpName, cmpDef.default)
      this.componentToLoad = cmpName
    } else {
      this.errorMessage = 'Cannot locate component object: ' + this.def.class
      this.errorCancellable = false
      this.inError = true
    }
  }
}
</script>

<style scoped lang="less">
  .errorMessage {
    font-style: italic;
    padding: 5pt;
  }
</style>
