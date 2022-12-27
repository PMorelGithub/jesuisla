<template>
  <div>Cette page sert à afficher l'aide de l'accueil</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSettingsStore } from 'stores/settings.store.js';
// import HelpReminderPage from 'components/help/HelpReminderPage.vue'

export default defineComponent({
  name: 'help-index',
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
