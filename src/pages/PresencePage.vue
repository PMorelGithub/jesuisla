<template>
  <q-page padding>
    <div>La page servant à montrer le suivi des présences</div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="fas fa-chart-line" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PresencePage',
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
