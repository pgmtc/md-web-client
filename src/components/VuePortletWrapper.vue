<template>
  <div class="md-portlet">
    <div class="md-portlet-title md-portlet-drag">
      <span class="md-portlet-progress" v-show="inProgress">
        <icon name="spinner" spin></icon>
      </span>
      <icon name="th" class="inline-icon"></icon> {{title}}
    </div>
    <div class="md-portlet-content" v-show="!inError">
      <component :is="componentToLoad"></component>
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
  async mounted () {
    /* eslint no-eval: 0 */
    this.title = this.def.name
    var cmpDef = window.vuePortlet
    if (cmpDef) {
      var cmpName = cmpDef.default.name
      Vue.component(cmpName, cmpDef.default)
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
