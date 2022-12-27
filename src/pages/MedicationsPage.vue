<template>
  <q-page padding>
    <div class="q-mt-md q-gutter-md">
      <q-icon name="medication" :color="color" :size="size" />
      &nbsp; La page servant à faire la gestion des médicaments
    </div>
    <br />
    <q-stepper v-model="step" vertical color="primary" animated header-nav>
      <!-- :done="step > 1" -->
      <q-step :name="1" prefix="1" title="Reconnaître à partir d'une image">
        Obtenir les spécifications à partir d'une image.

        <q-stepper-navigation>
          <q-btn @click="step = 2" color="primary" label="Suivant" />
        </q-stepper-navigation>
      </q-step>

      <!-- :done="step > 2" -->
      <q-step :name="2" prefix="2" title="Spécifications">
        Le nom du médicament, son DIN, quantité.

        <q-stepper-navigation>
          <q-btn @click="step = 3" color="primary" label="Suivant" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Précédent"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <!-- :done="step > 3" -->
      <q-step :name="3" prefix="3" title="Posolie">
        À quelle fréquence doit-on prendre ce médicament.
        <q-stepper-navigation>
          <q-btn @click="step = 4" color="primary" label="Suivant" />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Précédent"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="4" prefix="4" title="Expration">
        La date d'expiration, la date de renouvellement.

        <q-stepper-navigation>
          <q-btn @click="step = 5" color="primary" label="Suivant" />
          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="Précédent"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="5" prefix="5" title="Sommaire">
        Blablabla.

        <q-stepper-navigation>
          <q-btn color="primary" label="Terminer" />
          <q-btn
            flat
            @click="step = 4"
            color="primary"
            label="Précédent"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MedicationsPage',
  setup() {
    const size = '36px';
    const color = 'primary';

    return {
      step: ref(1),
      size,
      color,
    };
  },
});
</script>
