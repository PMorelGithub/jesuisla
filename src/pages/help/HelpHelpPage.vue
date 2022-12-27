<template>
  <div>Cette page sert à afficher l'aide pour l'aide</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSettingsStore } from 'stores/settings.store.js';
// import HelpReminderPage from 'components/help/HelpReminderPage.vue'

export default defineComponent({
  name: 'help-help',
  components: {
    // HelpReminderPage
  },
  setup() {
    const settingsStore = useSettingsStore();
    // onMounted(() => {
    //   settingsStore.helpTitle = 'home.title'
    //   settingsStore.helpBody = 'home.body'
    // })

    return {
      settingsStore,
    };
  },
});
</script>
