<template>
  <div class="mdesktop-wrapper" :class="theme">
    <div class="control-bar">
      <div class="title">
        <span class="user-info" v-if="user">{{user.displayName}}</span>
        mDesktop - develop
      </div>
      <div class="controls">
        <button @click="logout()">Logout</button>
        <button @click="refresh()">Refresh</button>
        <button @click="saveLayout()">Save Layout</button>
        Theme:
        <button @click="theme='dark'">Dark</button>
        <button @click="theme='light'">Light</button>
        <button @click="theme='bluegreen'">Blue / Green</button>
      </div>
    </div>

      <grid-layout class="mdesktop" v-if="portlets"
        :layout="layout"
        :col-num="4" :row-height="170"
        :is-draggable="true" :is-resizable="true" :is-mirrored="false" :vertical-compact="true"
        :margin="[10, 10]" :use-css-transforms="true">

        <grid-item v-for="(item, index) in layout"
                   :x="item.x" :y="item.y"
                   :w="item.w" :h="item.h"
                   :i="item.i" v-bind:key="index" class="md-portlet-wrapper"
                   drag-allow-from=".md-portlet-drag"
                   drag-ignore-from=".md-portlet-content">
          <component :is="(getPortlet(item.i).type || 'js') + '-portlet-wrapper'"
                     :def="getPortlet(item.i)"
                     :title="getPortlet(item.i).name"
                     :url="getPortlet(item.i).url"
                     :socket="socket" />

        </grid-item>
      </grid-layout>
    </div>
  <!--</div>-->
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import io from 'socket.io-client'
import JsPortletWrapper from './JsPortletWrapper'
import VuePortletWrapper from './VuePortletWrapper'

let socket = io()
let GridLayout = VueGridLayout.GridLayout
let GridItem = VueGridLayout.GridItem

export default {
  name: 'm-desktop',
  data () {
    return {
      socket: socket
    }
  },
  computed: {
    portlets () {
      return this.$store.state.md.portlets
    },
    layout () {
      return this.$store.state.md.layout
    },
    user () {
      return this.$store.state.md.user
    },
    theme () {
      return this.$store.state.md.theme
    }
  },
  methods: {
    refresh () {
      socket.emit('refresh', true)
    },
    logout () {
      location.href = '/auth/logout'
    },
    saveLayout () {
      console.log(JSON.stringify(this.layout, null, 3))
      alert('Not implemented yet')
    },
    getPortlet (index) {
      return this.portlets[index]
    }
  },
  components: {GridLayout, GridItem, JsPortletWrapper, VuePortletWrapper},
  mounted: function () {
    this.$store.dispatch('loadContext').then(() => {

    })
  }
}
</script>

<style lang="less">
  @import "../themes/themes";

</style>
