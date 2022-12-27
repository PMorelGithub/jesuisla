<template>
  <!-- viewBox="0px 0px 24px 24px" -->
  <svg
    version="1.1"
    id="svg5"
    :height="height"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:svg="http://www.w3.org/2000/svg"
  >
    <defs id="defs2" />
    <!-- style="display:inline; margin: 0px; padding: 0px;" -->
    <!-- transform="translate(1,1)" -->
    <g id="layer1">
      <!-- display:inline; -->
      <!-- :stroke="stroke"
        :stroke-width="strokeWidth" -->
      <circle :cx="cx" :cy="cy" :r="r" :fill="color" id="path111" />
    </g>
    <g id="layer2" :transform="markScale">
      <!-- stroke="#ffd700"
        :style="markStyle"
        :fill="markColor"
        :fill="markColor"
        fill="#ffd700"
        stroke="#ffd700"
      style="stroke-width:2.42768" -->
      <path
        :fill="markColor"
        d="M 39.63032,83.218353 16.061957,51.850138 20.586241,45.828561 39.63032,71.175199 80.033229,17.401116 l 4.524284,6.021577 z"
        id="path246"
      />
    </g>
  </svg>
  <!-- <svg :height="height" :width="width">
    <circle :cx="cx" :cy="cy" :r="r" :stroke="stroke" :stroke-width="strokeWidth" :fill="color"/>
  </svg> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ColorCircleMark',
  props: {
    color: {
      type: String,
      default: '#ff9955',
    },
    markColor: {
      type: String,
      default: '#ffd700',
    },
    height: {
      type: String,
      default: '24',
    },
    width: {
      type: String,
      default: '24',
    },
    cx: {
      type: String,
      default: '12',
    },
    cy: {
      type: String,
      default: '12',
    },
    r: {
      type: String,
      default: '12',
    },
    markScale: {
      type: String,
      default: 'scale(0.25)',
    },
    // strokeWidth: {
    // #ffd700
    //   type: String,
    //   default: '0'
    // },
  },
  setup() {
    return {};
  },
});
</script>
