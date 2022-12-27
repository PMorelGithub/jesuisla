<template>
  <q-page padding>
    <div>La page servant à signaler sa présence</div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="fas fa-flag-checkered" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignalementPage',
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
