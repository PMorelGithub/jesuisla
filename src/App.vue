<template>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { supabase } from './boot/supabase';

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    console.log('getSession', data);
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
    console.log('onAuthStateChange', _session);
  });
});
</script>
