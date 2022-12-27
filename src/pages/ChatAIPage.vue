<template>
  <q-page padding>
    <div class="row">
      <q-icon name="bi-robot" :color="color" :size="size" />
      &nbsp;
      <div class="text-h6">Discussion avec une Intelligence Artificielle</div>
    </div>
    <br />
    <div>
      <!-- bottom-slots
      :dense="dense" -->
      <q-input
        outlined
        clearable
        clear-icon="cancel"
        v-model="text"
        label="Entrez votre texte"
        @keydown.enter.prevent="checkEnter"
      >
        <!-- <template v-slot:append>
          <q-icon
            v-if="text !== ''"
            name="close"
            @click="text = ''"
            class="cursor-pointer"
          />
        </template> -->

        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="askIA" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { Configuration, OpenAIApi } from 'openai';
// key: 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

export default defineComponent({
  name: 'ChatAIPage',
  setup() {
    const size = '36px';
    const color = 'primary';
    const text = ref('');
    //    const openai = new OpenAI('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');
    //    const { Configuration, OpenAIApi } = require("openai");
    // const configuration = new Configuration({
    //   // apiKey: process.env.OPENAI_API_KEY,
    //   apiKey: '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'
    // });
    // const openai = new OpenAIApi(configuration);

    const askIA = () => {
      console.log('input', text.value);
      if (text.value.trim() === '') {
        return;
      }
      doComplete(text.value);
      text.value = '';
    };
    const checkEnter = () => {
      console.log('enter pressed');
      askIA();
    };
    async function doComplete(text: string) {
      console.log('input', text);
      // const response = await openai.createModeration({
      //   input: 'I want to kill them.',
      // });
      // console.log(response)
    }

    return {
      size,
      color,
      text,
      askIA,
      checkEnter,
    };
  },
});
</script>
