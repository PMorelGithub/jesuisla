<template>
  <q-page padding>
    <div>La page servant à faire la gestion de son alimentation</div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="restaurant_menu" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SupplyPage',
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
