<template>
  <q-dialog :v-model="show">
    <!-- <span slot="title">{{ helpTitle }}</span>
    <span slot="message">{{ helpMessage }}</span>
    <div slot="body"> -->
    {{ helpBody }}
    Text in dialog
    <!-- </div> -->
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useSettingsStore } from 'stores/settings.store.js';

export default defineComponent({
  name: 'HelpDialog',
  props: {
    helpTitle: {
      type: String,
    },
    helpMessage: {
      type: String,
    },
    helpBody: {
      type: String,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  //const settingsStore = useSettingsStore();
  setup() {
    return {};
  },
});
</script>
