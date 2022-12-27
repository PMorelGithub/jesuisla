<template>
  <q-page padding>
    <div>
      La page de gestion des exercises physiques pour garder une bonne santé
    </div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="sports_gymnastics" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExercisesPage',
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
