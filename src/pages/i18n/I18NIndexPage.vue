<template>
  <q-page padding>
    <div>Le contenu de la page d'acceuil pour faire l'édition des textes</div>
    <!-- <div>
      <VRuntimeTemplate :template="template"></VRuntimeTemplate>
    </div> -->
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useSettingsStore } from 'stores/settings.store.js';
// import VRuntimeTemplate from 'vue3-runtime-template';

export default defineComponent({
  name: 'i18n-index',
  // components: {
  //     VRuntimeTemplate
  //   },
  setup() {
    // computed: {
    //   someComputed() {
    //     return "Wow, I'm computed";
    //   }
    // }
    // <p>{{ someComputed }}</p>
    const settingsStore = useSettingsStore();
    onMounted(() => {
      settingsStore.helpTitle = 'home.title';
      settingsStore.helpBody = 'home.body';
    });

    return {
      // template: `
      //   <div>
      //     <button @click="sayHi">Say Hi!</button>
      //   </div>
      // `,
      // sayHi() {
      //   console.log('Hi')
      // }
    };
  },
});
</script>
