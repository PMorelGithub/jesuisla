<template>
  <q-page padding>
    <div class="row">
      <q-icon name="manage_accounts" color="primary" size="36px" />
      &nbsp;
      <div class="text-h6">Préférences</div>
    </div>
    <br />
    <div class="text-subtitle1">
      La page servant à faire la gestion des préférences de l'utilisateur
    </div>
    <br />

    <q-list bordered dense class="rounded-borders">
      <q-expansion-item
        expand-separator
        group="prefgroup"
        icon="home"
        label="Affichage"
        header-class="text-primary"
      >
        <div class="q-pa-md">
          <q-form class="q-gutter-md">
            <q-toggle
              v-model="settingsStore.darkMode"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              label="Afficher l'interface en mode sombre"
              @update:model-value="flipmode()"
            />
            <div class="text-subtitle1">Langue d'affichage</div>
            <div class="q-gutter-md">
              <q-btn flat dense round stack label="Français">
                <country-flag
                  country="fr"
                  @click="
                    $i18n.locale = 'fr';
                    setQuasarLang('fr');
                  "
                />
              </q-btn>
              <q-btn flat dense round stack label="English">
                <country-flag
                  country="gb"
                  @click="
                    $i18n.locale = 'en-US';
                    setQuasarLang('en-US');
                  "
                />
              </q-btn>
            </div>
            <!-- <q-select
              v-model="model"
              :options="options"
              label="Langue d'affichage"
              options-selected-class="text-deep-orange"
              @update:model-value="languageSelected"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select> -->
          </q-form>
        </div>
      </q-expansion-item>
      <!-- <q-expansion-item
        group="prefgroup"
        expand-separator
        icon="notifications_active"
        label="Notification"
        header-class="text-primary"
          :header-inset-level="1"
      > -->
      <q-expansion-item
        expand-separator
        icon="event"
        label="Rappel"
        header-class="text-primary"
      >
        <div class="q-pa-md">
          <q-form class="q-gutter-md">
            <q-toggle
              v-model="settingsStore.reminderCalendar"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              label="Toujours afficher le calendrier"
              @update:model-value="reminderCalendar()"
            />
          </q-form>
        </div>
      </q-expansion-item>
      <!-- </q-expansion-item> -->
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useSettingsStore } from 'stores/settings.store.js';
import { Quasar, useQuasar } from 'quasar';
import CountryFlag from 'vue-country-flag-next';

const langList = import.meta.glob(
  '../../node_modules/quasar/lang/(en-US|fr).mjs'
);

export default defineComponent({
  name: 'PreferencePage',
  components: {
    CountryFlag,
  },
  setup() {
    const settingsStore = useSettingsStore();
    const $q = useQuasar();
    //    const model = ref(null)
    onMounted(() => {
      settingsStore.helpTitle = 'preferences.title';
      settingsStore.helpBody = 'preferences.body';
    });

    return {
      settingsStore,
      flipmode() {
        $q.dark.set(settingsStore.darkMode);
        settingsStore.saveDarkMode();
      },
      reminderCalendar() {
        settingsStore.saveReminderCalendar();
      },
      setQuasarLang(language: string) {
        console.log('Langue: ', language);
        try {
          langList[`../../node_modules/quasar/lang/${language}.mjs`]().then(
            (lang) => {
              Quasar.lang.set(lang.default);
            }
          );
        } catch (err) {
          console.log('err: ', err);
          // Requested Quasar Language Pack does not exist,
          // let's not break the app, so catching error
        }
      },
      // model,

      // options: [
      //   {
      //     label: 'Français',
      //     value: 'fr',
      //     description: 'Affichage en français',
      //     icon: 'mail'
      //   },
      //   {
      //     label: 'English',
      //     value: 'en-US',
      //     description: 'Display in english',
      //     icon: 'bluetooth'
      //   },
      // ]
    };
  },
});
</script>
