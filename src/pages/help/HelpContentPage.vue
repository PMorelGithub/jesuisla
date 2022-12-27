<template>
  <div v-if="helpTopic === 'home.title'">
    <help-index-page></help-index-page>
  </div>
  <div v-if="helpTopic === 'reminder.title'">
    <help-reminder-page></help-reminder-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSettingsStore } from 'stores/settings.store.js';
import HelpReminderPage from 'pages/help/HelpReminderPage.vue';
import HelpIndexPage from 'pages/help/HelpIndexPage.vue';

export default defineComponent({
  name: 'help-index',
  props: {
    helpTopic: String,
  },
  components: {
    HelpReminderPage,
    HelpIndexPage,
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
