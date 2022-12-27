<template>
  <q-page padding>
    <div>La page de récapitulation des choses à faire</div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="fas fa-check-double" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoPage',
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
