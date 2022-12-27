<template>
  <q-page padding>
    <div>La page servant à faire l'enregistrement au site</div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="how_to_reg" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RegistrationPage',
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
