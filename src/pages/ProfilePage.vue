<template>
  <q-page padding>
    <div>La page servant à faire la gestion des données de l'utilisateur</div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="fas fa-user" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProfilePage',
  setup() {
    const size = '128px';
    const color = 'teal';

    return {
      size,
      color,
    };
  },
});
</script>
