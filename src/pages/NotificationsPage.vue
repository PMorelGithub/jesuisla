<template>
  <q-page padding>
    <div>La page servant à signaler sa présence</div>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="notifications_active" :color="color" :size="size" />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotificationsPage',
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
