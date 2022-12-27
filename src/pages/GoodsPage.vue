<template>
  <q-page padding>
    <div>La page du calcul des GES pour les achats</div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="point_of_sale" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GoodsPage',
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
