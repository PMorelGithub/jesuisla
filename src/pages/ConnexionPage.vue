<script setup>
import { ref } from 'vue';
import { supabase } from '../boot/supabase';

const loading = ref(false);
const email = ref('');

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({ email: email.value });
    if (error) throw error;
    alert('Check your email for the login link!');
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-page padding>
    <div class="row q-gutter-md">
      <q-icon name="login" color="primary" size="md" />
      <div class="text-h6" text-color="primary">Connexion</div>
      <q-space />
    </div>
    <br />
    <div>
      <q-card>
        <q-card-section class="q-pa-md q-gutter-md">
          <div class="text-h6">
            Connectez-vous via le lien magique avec votre email ci-dessous
          </div>
          <q-input type="email" placeholder="Votre courriel" v-model="email" />
          <q-btn
            :label="loading ? 'Chargement' : 'Envoyer le lien magique'"
            :disabled="loading"
            @click="handleLogin"
          />
        </q-card-section>
      </q-card>
    </div>
    <!-- <form class="row flex-center flex" @submit.prevent="handleLogin">
        <div class="col-6 form-widget">
            <h1 class="header">Supabase + Vue 3</h1>
            <p class="description">Sign in via magic link with your email below</p>
            <div>
                <input class="inputField" type="email" placeholder="Your email" v-model="email" />
            </div>
            <div>
                <input type="submit" class="button block" :value="loading ? 'Loading' : 'Send magic link'"
                    :disabled="loading" />
            </div>
        </div>
    </form> -->
  </q-page>
</template>
