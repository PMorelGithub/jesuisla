<template>
  <div>Cette page est l'aide pour les Rappels</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { useSettingsStore } from 'stores/settings.store.js';

export default defineComponent({
  name: 'help-reminder-page',
  setup() {
    // const settingsStore = useSettingsStore();
    // onMounted(() => {
    //   settingsStore.helpTitle = 'home.title'
    //   settingsStore.helpBody = 'home.body'
    // })

    return {
      // settingsStore
    };
  },
});
</script>
