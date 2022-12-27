<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated visible="false">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->
        <q-btn
          flat
          dense
          round
          aria-label="Ouvrir ou fermer le menu sur la gauche de l'écran"
          @click="toggleLeftDrawer"
        >
          <q-icon name="menu">
            <q-tooltip
              v-if="settingsStore.tooltipShown"
              anchor="bottom middle"
              self="top middle"
              :offset="[0, 20]"
            >
              {{
                leftDrawerOpen
                  ? $t('tb_menu_close_tooltip')
                  : $t('tb_menu_open_tooltip')
              }}
            </q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn
          v-if="$q.platform.is.desktop"
          flat
          dense
          round
          @click="settingsStore.mini = !settingsStore.mini"
          :aria-label="
            settingsStore.mini
              ? 'Affiche l\'icône et le texte des items du menu sur la gauche'
              : 'Affiche l\'icône seulement des items du menu sur la gauche'
          "
        >
          <q-icon :name="settingsStore.mini ? 'chevron_right' : 'chevron_left'">
          </q-icon>
        </q-btn>

        <q-toolbar-title role="heading" aria-level="1">
          Administration
        </q-toolbar-title>
        <!-- style="min-width: 250px; max-width: 300px"
          map-options
          label-color="grey-1"
        option-label="label"
        option-value="value" -->
        <!-- :flat="isSelected('fr')" -->
        <q-btn
          flat
          dense
          round
          aria-label="Afficher de l'aide contextuelle"
          @click="help()"
        >
          <q-icon name="help"> </q-icon>
        </q-btn>
        <!-- <q-btn
          flat
          dense
          round
          @click="flipmode()"
        >
          <q-icon
            :name="darkmode ? 'light_mode': 'nightlight'"
          >
          </q-icon>
        </q-btn>
        <q-btn
          flat
          dense
          round
        >
          <country-flag
            country='fr'
            @click="$i18n.locale = 'fr';setQuasarLang('fr')"
          />
        </q-btn>
        <q-btn
          flat
          dense
          round
        >
          <country-flag
            country='gb'
            @click="$i18n.locale = 'en';setQuasarLang('en-US')"
          />
        </q-btn> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      elevated
      :mini="settingsStore.mini"
    >
      <q-list no-border link inset-delimiter>
        <q-item clickable v-ripple to="/">
          <q-item-section>
            <q-select
              map-options
              option-label="label"
              option-value="value"
              v-model="settingsStore.versionLevel"
              :options="levelOptions"
              stack-label
              role="listitem"
              aria-label="Choisir un mode de fonctionnement."
              label="Mode"
            />
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          aria-label="Accéder à la page d'accueil"
          to="/"
        >
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>
          <q-item-section>{{ $t('home_menu') }}</q-item-section>
        </q-item>
        <q-expansion-item
          v-show="shouldShow(VERSION.beta)"
          group="leftmenu"
          icon="fas fa-check-double"
          label="À faire"
          header-class="text-primary"
          hide-expand-icon
          to="/todo"
        />

        <q-expansion-item
          v-show="shouldShow(VERSION.alpha)"
          group="leftmenu"
          expand-separator
          icon="person"
          label="Utilisateur"
          header-class="text-primary"
          default-opened
          v-ripple
          @click="expandMenu"
        >
          <q-expansion-item
            v-show="shouldShow(VERSION.beta)"
            :header-inset-level="1"
            icon="how_to_reg"
            label="Inscription"
            header-class="text-primary"
            hide-expand-icon
            v-ripple
            to="/registration"
          />
          <q-expansion-item
            v-show="shouldShow(VERSION.beta)"
            :header-inset-level="1"
            icon="login"
            label="Connexion"
            header-class="text-primary"
            hide-expand-icon
            v-ripple
            to="/connexion"
          />
          <q-expansion-item
            v-show="shouldShow(VERSION.beta)"
            :header-inset-level="1"
            icon="person"
            label="Profil"
            header-class="text-primary"
            hide-expand-icon
            to="/profile"
          />
          <q-expansion-item
            v-show="shouldShow(VERSION.alpha)"
            :header-inset-level="1"
            icon="manage_accounts"
            label="Préférences"
            header-class="text-primary"
            hide-expand-icon
            to="/preferences"
          />

          <q-expansion-item
            v-show="shouldShow(VERSION.beta)"
            :header-inset-level="1"
            icon="logout"
            label="Quitter"
            header-class="text-primary"
            hide-expand-icon
            @click="logout"
          />
        </q-expansion-item>
        <q-expansion-item
          group="leftmenu"
          v-show="shouldShow(VERSION.alpha)"
          expand-separator
          icon="notifications_active"
          label="Notification"
          header-class="text-primary"
          v-ripple
          @click="expandMenu"
        >
          <q-expansion-item
            v-show="shouldShow(VERSION.alpha)"
            :header-inset-level="1"
            icon="fas fa-id-card"
            label="Interview"
            header-class="text-primary"
            hide-expand-icon
            to="/interview"
          />
          <q-expansion-item
            v-show="shouldShow(VERSION.beta)"
            :header-inset-level="1"
            icon="fas fa-flag-checkered"
            label="Signalement"
            header-class="text-primary"
            hide-expand-icon
            to="/signalement"
          />
          <q-expansion-item
            v-show="shouldShow(VERSION.final)"
            :header-inset-level="1"
            icon="fas fa-chart-line"
            label="Présence"
            header-class="text-primary"
            hide-expand-icon
            to="/presence"
          />
          <q-expansion-item
            v-show="shouldShow(VERSION.alpha)"
            :header-inset-level="1"
            icon="event"
            label="Rappel"
            header-class="text-primary"
            hide-expand-icon
            to="/reminder"
          />
        </q-expansion-item>
        <q-expansion-item
          v-show="shouldShow(VERSION.final)"
          group="leftmenu"
          icon="wheelchair_pickup"
          label="Accompagnement"
          header-class="text-primary"
          hide-expand-icon
          to="/guides"
        />
        <q-expansion-item
          v-show="shouldShow(VERSION.final)"
          group="leftmenu"
          icon="medication"
          label="Médicament"
          header-class="text-primary"
          hide-expand-icon
          to="/medications"
        />
        <q-expansion-item
          v-show="shouldShow(VERSION.final)"
          group="leftmenu"
          icon="restaurant_menu"
          label="Alimentation"
          header-class="text-primary"
          hide-expand-icon
          to="/supply"
        />
        <q-expansion-item
          v-show="shouldShow(VERSION.final)"
          group="leftmenu"
          icon="sports_gymnastics"
          label="Exercices"
          header-class="text-primary"
          hide-expand-icon
          to="/exercises"
        />
        <q-expansion-item
          v-show="shouldShow(VERSION.final)"
          group="leftmenu"
          icon="fire_truck"
          label="Sécurité"
          header-class="text-primary"
          hide-expand-icon
          to="/security"
        />
        <q-expansion-item
          group="leftmenu"
          v-show="shouldShow(VERSION.final)"
          expand-separator
          icon="fas fa-smog"
          label="Émissions de GES"
          header-class="text-primary"
          v-ripple
          @click="expandMenu"
        >
          <q-expansion-item
            :header-inset-level="1"
            icon="soup_kitchen"
            label="Alimentation"
            header-class="text-primary"
            hide-expand-icon
            to="/ges_food"
          />
          <q-expansion-item
            :header-inset-level="1"
            icon="commute"
            label="Transport"
            header-class="text-primary"
            hide-expand-icon
            to="/ges_commute"
          />
          <q-expansion-item
            :header-inset-level="1"
            icon="delete"
            label="Déchets"
            header-class="text-primary"
            hide-expand-icon
            to="/ges_waste"
          />
          <q-expansion-item
            :header-inset-level="1"
            icon="point_of_sale"
            label="Achats"
            header-class="text-primary"
            hide-expand-icon
            to="/ges_goods"
          />
          <q-expansion-item
            :header-inset-level="1"
            icon="pool"
            label="Loisirs"
            header-class="text-primary"
            hide-expand-icon
            to="/ges_hobby"
          />
        </q-expansion-item>
        <q-expansion-item
          v-show="shouldShow(VERSION.final)"
          group="leftmenu"
          expand-separator
          icon="fas fa-circle-info"
          header-class="text-primary"
          :content-inset-level="1"
          label="Aide & Support"
          @click="expandMenu"
        >
          <q-list no-bordered>
            <q-item clickable v-ripple to="/">
              <q-item-section>FAQ</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/">
              <q-item-section>Conditions Générales</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/">
              <q-item-section>Politiques de Confidentialité</q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/">
              <q-item-section>Contactez-nous</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-drawer>
    <!-- <q-expansion-item
          v-show="shouldShow(VERSION.alpha)"
          group="leftmenu"
          expand-separator
          icon="person"
          label="Amusement"
          header-class="text-primary"
          default-opened
          v-ripple
          @click="expandMenu"
        >
          <q-expansion-item
            v-show="shouldShow(VERSION.alpha)"
            :header-inset-level="1"
            icon="bi-robot"
            label="Clavarder avec une IA"
            header-class="text-primary"
            hide-expand-icon
            v-ripple
            to="/chat_ai"
          />
        </q-expansion-item> -->

    <q-page-container>
      <div>
        <q-dialog v-model="helpRequested">
          <q-card>
            <q-toolbar>
              <q-toolbar-title
                >{{ $t('help.title') }}: {{ getHelpTitle() }}</q-toolbar-title
              >

              <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>

            <q-card-section>
              {{ getHelpBody() }}
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
// import Vue from 'vue';
import { useUserStore } from 'stores/user.store.js';
import { useSettingsStore } from 'stores/settings.store.js';
import { VERSION } from 'src/components/constants';
import { useQuasar } from 'quasar';
// import { EventBus } from 'quasar'
// import CountryFlag from 'vue-country-flag-next'
// import HelpDialog from 'components/HelpDialog.vue';
// import { getAuth, signInAnonymously, onAuthStateChanged  } from 'firebase/auth';
// import { getAuth, signInAnonymously, onAuthStateChanged  } from 'firebase/auth';
import { Quasar } from 'quasar';
// import i18n from 'src/i18n';
const langList = import.meta.glob(
  '../../node_modules/quasar/lang/(en-US|fr).mjs'
);

export default defineComponent({
  name: 'I18NLayout',

  components: {
    // eslint-disable-next-line vue/no-unused-components
    // CountryFlag,
    // HelpDialog
  },

  setup() {
    const { t } = useI18n();
    const userStore = useUserStore();
    const settingsStore = useSettingsStore();
    const leftDrawerOpen = ref(false);
    const darkmode = ref(false);
    const $q = useQuasar();
    const showHelp = ref(false);
    const helpRequested = ref(false);
    // const auth = getAuth();
    const levelOptions = [
      { label: 'Alpha', value: VERSION.alpha },
      { label: 'Beta', value: VERSION.beta },
      { label: 'Final', value: VERSION.final },
    ];
    onMounted(() => {
      // signInAnonymously(auth)
      //   // eslint-disable-next-line @typescript-eslint/no-empty-function
      //   .then(() => {
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log('Code', errorCode);
      //     console.log('Message', errorMessage);
      //   });
    });
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in, see docs for a list of available properties
    //     // https://firebase.google.com/docs/reference/js/firebase.User
    //     console.log('User: ', user);
    //   } else {
    //     console.log('Sign out');
    //   }
    // });

    return {
      helpRequested,
      showHelp,
      userStore,
      settingsStore,
      VERSION: VERSION,
      levelOptions,
      leftDrawerOpen,
      darkmode,
      // helpBody: ref('Help body triggered'),
      //mini,
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
      help() {
        helpRequested.value = true;
      },
      getHelpTitle() {
        // if (settingsStore.helpBody === '' ) {
        //   return t('home.title');
        // }
        return t(settingsStore.helpTitle);
      },
      getHelpBody() {
        // if (settingsStore.helpBody === '' ) {
        //   return t('home.body');
        // }
        return t(settingsStore.helpBody);
      },
      flipmode() {
        darkmode.value = !darkmode.value;
        $q.dark.toggle();
      },
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout() {
        console.log('logout');
        userStore.authenticated = false;
      },
      expandMenu() {
        settingsStore.mini = false;
      },
      shouldShow(level: number) {
        if (level <= settingsStore.versionLevel.value) {
          return true;
        }
        return false;
      },
    };
  },
});
</script>
