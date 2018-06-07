<template>

  <div class="md-portlet">
    <div class="md-portlet-title md-portlet-drag">
      <span class="md-portlet-progress" v-show="inProgress">
        <icon name="spinner" class="inline-icon" spin></icon>
      </span>
      <icon name="th" class="inline-icon"></icon> {{title}}
    </div>
    <div class="md-portlet-content" ref="contentElement" v-show="!inError"/>
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
import axios from 'axios'

export default {
  name: 'portlet-wrapper',
  data: function () {
    return {
      msg: 'Message',
      inProgress: false,
      inError: false,
      errorCancellable: true,
      errorMessage: '',
      title: ''
    }
  },
  computed: {},
  methods: {
    method () {
    }
  },
  watch: {
    msg: function () {
    }
  },
  props: ['def', 'socket'],
  mounted () {
    /* eslint no-eval: 0 */
    this.title = this.def.name
    var tc
    try {
      eval('tc = new ' + this.def.class + '()')
      tc.register(this.$refs.contentElement, {
        def: JSON.parse(JSON.stringify(this.def)),
        axios: axios,
        socket: this.socket,
        wsEndpointUrl: '/md/ws',
        apiEndpointUrl: '/md/api',
        inProgress: (value) => {
          this.inProgress = value
        },
        api: {
          inProgress: (value) => {
            this.inProgress = value
          },
          setTitle: (value) => {
            this.title = value
          },
          error: (value) => {
            this.inError = true
            this.errorMessage = value
          }
        }
      })
    } catch (err) {
      this.inError = true
      this.errorCancellable = false
      this.errorMessage = err.message
      console.error(err)
    }
  }
}
</script>

<style scoped lang="less">

</style>
