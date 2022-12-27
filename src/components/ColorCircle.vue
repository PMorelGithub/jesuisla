<template>
  <svg :height="height" :width="width">
    <circle
      :cx="cx"
      :cy="cy"
      :r="r"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      :fill="color"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ColorCircle',
  props: {
    color: {
      type: String,
      required: true,
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
    stroke: {
      type: String,
      default: 'black',
    },
    strokeWidth: {
      type: String,
      default: '0',
    },
  },
  setup() {
    return {};
  },
});
</script>
