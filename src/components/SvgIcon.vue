<template>
  <template v-if="isExternal">
    <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$attrs" />
  </template>
  <template v-else>
    <svg :class="svgClass" aria-hidden="true" :width="size" :height="size" v-on="$attrs">
      <use :xlink:href="iconName" :fill="color" />
    </svg>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import * as utils from '/@/utils'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    type: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#fff'
    },
    size: {
      type: String,
      default: '1em'
    }
  },
  setup(props) {
    const isExternal = computed(() => utils.isExternal(props.type))
    const iconName = computed(() => `#${props.prefix}-${props.type}`)
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return 'svg-icon'
      }
    })
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.type}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.type}) no-repeat 50% 50%`
    }))

    return {
      isExternal,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: #ccc;
  overflow: hidden;

  .svg-external-icon {
    background-color: #243F49;
    mask-size: cover !important;
    display: inline-block;
  }
}
</style>
