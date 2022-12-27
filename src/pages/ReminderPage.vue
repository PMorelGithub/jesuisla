<template>
  <div>
    <q-page padding>
      <!-- <Datepicker v-model="dateTime" locale="en-US"></Datepicker>
    <Datepicker v-model="dateTime" locale="fr" cancelText="Annuler" selectText="Sélectionner" /> -->
      <div class="row q-gutter-md">
        <q-icon name="event" color="primary" size="md" />
        <div class="text-h6" text-color="primary">Rappel</div>
        <q-space />
        <q-btn
          class="wizard-new-reminder"
          round
          size="md"
          color="primary"
          icon="add_task"
          aria-label="Bouton pour créer un nouveau rappel"
          @click="
            reminderInit();
            add = true;
            modify = false;
            list = false;
          "
        />
        <!-- <q-btn
        round
        size="md"
        aria-label="Bouton pour faire une recherche - Non implémenté"
        color="primary"
        icon="search"
      />
      <q-btn
        round
        size="md"
        aria-label="Bouton pour afficher un menu d'options"
        color="primary"
        icon="more_vert"
      >
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Modifier</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Trier</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Terminer</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn> -->
        <!-- <q-btn
        round
        size="md"
        color="primary"
        icon="fas fa-wand-magic-sparkles"
        aria-label="Suivre une démonstration faite par le Magicien"
        @click="wizardAddTask()"
      /> -->
        <!--         split         push
        @click="onMainClick"
      -->
        <q-btn-dropdown
          round
          size="md"
          color="primary"
          icon="fas fa-wand-magic-sparkles"
          aria-label="Choisir une démonstration faite par le Magicien"
        >
          <q-list>
            <q-item clickable v-close-popup @click="wizardAddReminder()">
              <q-item-section avatar>
                <q-avatar icon="add_task" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Ajouter un rappel</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="wizardListReminder()">
              <q-item-section avatar>
                <q-avatar icon="list" color="secondary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Liste de rappel(s)</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <br />
      <div v-if="add">
        <q-stepper
          v-if="!withCard"
          v-model="stepperStep"
          vertical
          color="primary"
          animated
          header-nav
        >
          <!-- :done="step > 1" -->
          <q-step
            :name="1"
            prefix="1"
            title="Le nom et la couleur de ce rappel"
          >
            <div class="row q-gutter-md">
              <q-input
                class="wizard-name-input"
                outlined
                dense
                style="min-width: 210px"
                v-model="reminder.title"
                label="Nom du rappel"
                :key="nameFieldKey"
              >
                <template
                  v-if="reminder.color != 'white' || reminder.done"
                  v-slot:prepend
                >
                  <ColorCircleMark
                    :color="reminder.color ? reminder.color : 'white'"
                    :markColor="
                      reminder.done
                        ? 'black'
                        : reminder.color
                        ? reminder.color
                        : 'black'
                    "
                  />
                </template>
                <!-- <template v-slot:append>
                <q-btn
                  round
                  size="md"
                  icon="more_vert"
                >
                  <q-menu>
                    <div class="row q-pa-md">
                      <div class="column">
                        <div class="text-h6 q-mb-md">Ajouter</div>
                        <q-separator />
                        <q-list dense>
                          <q-item clickable v-close-popup>
                            <q-item-section>Une note</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section>Une liste</q-item-section>
                          </q-item>
                          <q-item clickable v-close-popup>
                            <q-item-section>Une image</q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </div>
                  </q-menu>
                </q-btn>
              </template> -->
                <!-- <template v-slot:after>
                <q-btn
                  class="wizard-palette-btn"
                  ref="wizardPalette"
                  round
                  size="md"
                  color="primary"
                  aria-label="Ouvre une boîte pour choisir une couleur associé à ce rappel"
                  icon="palette"
                >
                  <q-popup-proxy
                    v-model="showPalettePopup"
                    :offset="[0, 15]"
                  >
                    <q-banner
                    >
                      <div class="q-gutter-xs">
                        <q-btn
                          v-for="(color, index) in colors" :key="index"
                          round
                          size="md"
                          padding="xs"
                          @click="setColor(reminder.id, color)"
                          :class="color == '#fd9637' ? 'wizard-palette' : ''"
                        >
                          <ColorCircle
                            :color="color"
                          >
                          </ColorCircle>
                        </q-btn>
                        <q-btn
                          v-if="(reminder.color && reminder.color !== 'white')"
                          round
                          size="md"
                          padding="xs"
                          icon="cancel"
                          class="wizard-palette-btn-cancel"
                          @click="setColor(reminder.id, 'white')"
                        >
                        </q-btn>
                      </div>
                    </q-banner>
                  </q-popup-proxy>
                </q-btn>
              </template> -->
              </q-input>
              <q-btn
                class="wizard-palette-btn"
                ref="wizardPalette"
                round
                size="md"
                color="primary"
                aria-label="Ouvre une boîte pour choisir une couleur associé à ce rappel"
                icon="palette"
              >
                <q-popup-proxy v-model="showPalettePopup" :offset="[0, 15]">
                  <q-banner>
                    <div class="q-gutter-xs">
                      <q-btn
                        v-for="(color, index) in colors"
                        :key="index"
                        round
                        size="md"
                        padding="xs"
                        @click="setColor(reminder.id, color)"
                        :class="color == '#fd9637' ? 'wizard-palette' : ''"
                      >
                        <ColorCircle :color="color"> </ColorCircle>
                      </q-btn>
                      <q-btn
                        v-if="reminder.color && reminder.color !== 'white'"
                        round
                        size="md"
                        padding="xs"
                        icon="cancel"
                        class="wizard-palette-btn-cancel"
                        @click="setColor(reminder.id, 'white')"
                      >
                      </q-btn>
                    </div>
                  </q-banner>
                </q-popup-proxy>
              </q-btn>
            </div>
            <div v-if="reminder.note">
              <br />
              <q-input
                type="textarea"
                outlined
                v-model="reminder.note"
                label="Note pour ce rappel"
              >
              </q-input>
            </div>
            <!-- <q-stepper-navigation>
            <q-btn @click="step = 2" color="primary" label="Suivant" />
          </q-stepper-navigation> -->
          </q-step>

          <!-- :done="step > 2" -->
          <q-step :name="2" prefix="2" title="Alerte" class="wizard-step-alert">
            <div>
              <div class="column items-start">
                <q-list dense style="min-width: 100px">
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-radio
                        v-model="reminder.alert"
                        :val="ALERT.no"
                        color="primary"
                        class="wizard-step-alert-no"
                        :key="nameFieldKey"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Aucune alerte</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-radio
                        v-model="reminder.alert"
                        :val="ALERT.date_time"
                        color="primary"
                        class="wizard-step-alert-date-time"
                        :key="nameFieldKey"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Date & Heure</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item
                    v-show="reminder.alert == ALERT.date_time"
                    v-model="showDateAndTimePopup"
                    class="wizard-step-alert-date-time-panel"
                  >
                    <q-item-section>
                      <div class="row q-gutter-sm">
                        <q-date
                          v-model="reminder.datetime"
                          mask="YYYY-MM-DD HH:mm"
                          :options="dateOptionsFn"
                        >
                        </q-date>
                        <q-time
                          v-model="reminder.datetime"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
                        </q-time>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-radio
                        v-model="reminder.alert"
                        :val="ALERT.week_days"
                        color="primary"
                        class="wizard-step-alert-week-days"
                        :key="nameFieldKey"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Jour de la semaine</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="reminder.alert == ALERT.week_days">
                    <q-item-section>
                      <br />
                      <div class="q-gutter-xs">
                        <q-chip
                          v-model:selected="daysLetter.Sunday"
                          color="primary"
                          text-color="white"
                        >
                          D
                        </q-chip>
                        <q-chip
                          v-model:selected="daysLetter.Monday"
                          color="primary"
                          text-color="white"
                        >
                          L
                        </q-chip>
                        <q-chip
                          v-model:selected="daysLetter.Tuesday"
                          color="primary"
                          text-color="white"
                        >
                          M
                        </q-chip>
                        <q-chip
                          v-model:selected="daysLetter.Wednesday"
                          color="primary"
                          text-color="white"
                        >
                          M
                        </q-chip>
                        <q-chip
                          v-model:selected="daysLetter.Thursday"
                          color="primary"
                          text-color="white"
                        >
                          J
                        </q-chip>
                        <q-chip
                          v-model:selected="daysLetter.Friday"
                          color="primary"
                          text-color="white"
                        >
                          V
                        </q-chip>
                        <q-chip
                          v-model:selected="daysLetter.Saturday"
                          color="primary"
                          text-color="white"
                        >
                          S
                        </q-chip>
                      </div>
                      <!-- <div class="row q-pa-md q-gutter-sm">
                    <q-btn-toggle
                      v-model="reminder.weekdays"
                      toggle-color="primary"
                      :options="[
                        {label: 'D', value: '0'},
                        {label: 'L', value: '1'},
                        {label: 'M', value: '2'},
                        {label: 'M', value: '3'},
                        {label: 'J', value: '4'},
                        {label: 'V', value: '5'},
                        {label: 'S', value: '6'},
                      ]"
                      >
                    </q-btn-toggle>
                  </div> -->
                      <div class="row q-pa-md q-gutter-sm">
                        <q-time
                          v-model="reminder.weekdays_time"
                          mask="YYYY-MM-DD HH:mm"
                          format24h
                        >
                        </q-time>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-radio
                        v-model="reminder.alert"
                        :val="ALERT.few_hours"
                        color="primary"
                        class="wizard-step-alert-few-hours"
                        :key="nameFieldKey"
                      />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Dans quelques heures</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item v-if="reminder.alert == ALERT.few_hours">
                    <q-item-section>
                      <br />
                      <div class="row q-pa-md q-gutter-sm">
                        <q-slider
                          v-model="hourModel"
                          :min="0"
                          :max="24"
                          :step="1"
                          label
                          label-always
                        />
                      </div>
                      {{ hourModel }} heure(s) à partir de maintenant
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>

            <!-- <q-stepper-navigation>
            <q-btn @click="step = 3" color="primary" label="Suivant" />
            <q-btn flat @click="step = 1" color="primary" label="Précédent" class="q-ml-sm" />
          </q-stepper-navigation> -->
          </q-step>

          <!-- :done="step > 3" -->
          <q-step
            :name="3"
            prefix="3"
            title="Répétitions"
            class="wizard-step-repeat"
          >
            <q-list dense style="min-width: 100px">
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="reminder.repeat"
                    :val="REPEAT.no"
                    color="primary"
                    class="wizard-step-repeat-no"
                    :key="nameFieldKey"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Ne pas répéter</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="reminder.repeat"
                    :val="REPEAT.each_day"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Tous les jours</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="reminder.repeat"
                    :val="REPEAT.each"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Chaque {{ dayOfWeek() }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="reminder.repeat"
                    :val="REPEAT.each_month"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Tous les mois</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="reminder.repeat"
                    :val="REPEAT.each_year"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Tous les ans</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- <q-stepper-navigation>
            <q-btn @click="step = 4" color="primary" label="Suivant" />
            <q-btn flat @click="step = 2" color="primary" label="Précédent" class="q-ml-sm" />
          </q-stepper-navigation> -->
          </q-step>

          <q-step :name="4" prefix="4" title="Sonnerie">
            <q-list dense style="min-width: 100px">
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="reminder.ring"
                    :val="RING.one_time"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Faire sonner une fois</q-item-label>
                </q-item-section>
              </q-item>
              <q-item tag="label" v-ripple>
                <q-item-section avatar>
                  <q-radio
                    v-model="reminder.ring"
                    :val="RING.many_time"
                    color="primary"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Laisser sonner</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <!-- <q-stepper-navigation>
            <q-btn @click="step = 5" color="primary" label="Suivant" />
            <q-btn flat @click="step = 3" color="primary" label="Précédent" class="q-ml-sm" />
          </q-stepper-navigation> -->
          </q-step>

          <q-step :name="5" prefix="5" title="Sommaire">
            Blablabla.

            <q-stepper-navigation>
              <q-btn color="primary" label="Terminer" />
              <q-btn
                flat
                @click="stepperStep = 4"
                color="primary"
                label="Précédent"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>
          <!-- <template v-slot:message>
          <q-banner v-if="step === 1" class="bg-purple-8 text-white q-px-lg">
            Campaign settings are important...
          </q-banner>
        </template> -->
        </q-stepper>
        <br />
        <q-toolbar>
          <div class="row q-gutter-md">
            <q-btn
              @click="
                add = false;
                modify = false;
                list = true;
              "
              color="primary"
              flat
              label="Annuler"
            />
            <q-btn @click="checkData()" color="primary" label="Enregistrer" />
            <q-btn v-if="modify" color="primary" label="Terminer">
              <q-popup-proxy :offset="[10, 10]">
                <q-banner>
                  <div class="q-gutter-sm">
                    {{
                      reminder.done
                        ? "Voulez-vous remettre ce rappel comme étant non 'Terminé'?"
                        : "Voulez-vous marquer ce rappel comme étant 'Terminé'?"
                    }}

                    <q-btn v-close-popup flat color="primary" label="Non" />
                    <q-btn
                      v-close-popup
                      color="primary"
                      label="Oui"
                      @click="doneSelected(reminder.id)"
                    />
                  </div>
                </q-banner>
              </q-popup-proxy>
            </q-btn>
            <q-btn v-if="modify" color="primary" label="Effacer">
              <q-popup-proxy :offset="[10, 10]">
                <q-banner>
                  <div class="q-gutter-sm">
                    Voulez-vous effacer ce rappel?
                    <q-btn v-close-popup flat color="primary" label="Non" />
                    <q-btn
                      v-close-popup
                      color="primary"
                      label="Oui"
                      @click="deleteSelected(reminder.id)"
                    />
                  </div>
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </div>
        </q-toolbar>
      </div>
      <div v-if="list">
        <div v-if="noReminders()" class="text-subtitle1">
          C'est dans cette page que vous créez des rappels, comme arrosez les
          plantes par exemple.<br />
          Utilisez le bouton
          <q-icon name="add_task" size="xs" />
          pour créer votre premier rappel
        </div>

        <div v-if="!noReminders()">
          <q-list
            bordered
            class="rounded-borders"
            v-for="reminder in storeReminder.reminders"
            v-bind:key="reminder.id"
          >
            <!-- clickable
            @click="editSelected(reminder)"
            v-ripple -->
            <q-item dense>
              <q-item-section avatar>
                <q-avatar v-if="reminder.done">
                  <ColorCircleMark
                    :color="reminder.color ? reminder.color : 'white'"
                    markColor="black"
                  />
                </q-avatar>
                <!-- :color="reminder.color" -->
                <q-avatar v-if="!reminder.done">
                  <!-- <ColorCircle :color="getColorReminder(reminder.color)" height="24" width="24" cx="12" cy="12" r="12">
                </ColorCircle> -->
                  <ColorCircle
                    :color="reminder.color ? reminder.color : 'white'"
                  >
                  </ColorCircle>
                </q-avatar>
                <!-- <q-avatar
                :style="getItemBackgroundColor(reminder.color)"
                :color="reminder.color"
                :text-color="$q.dark.isActive ? SVG_COLORS.white : SVG_COLORS.black"
                :icon="reminder.done ? 'done' : 'img:/assets/transparent-circle.svg'"
              /> -->
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">
                  <!-- <ColorCircle :color="getColorReminder(reminder.color)" height="12" width="12" cx="6" cy="6" r="6"></ColorCircle> -->
                  {{ reminder.title }}
                  <!-- <q-icon
                  v-if="reminder.done"
                  name="done" color="primary"/> -->
                </q-item-label>
                <q-item-label caption lines="2">
                  <!-- $q.dark.isActive -->
                  <!-- <ColorCircle :color="$q.dark.isActive ? SVG_COLORS.black : SVG_COLORS.white" height="12" width="12" cx="6" cy="6" r="6"></ColorCircle> -->
                  <!-- <ColorCircle :color="SVG_COLORS.transparent" height="12" width="12" cx="6" cy="6" r="6"></ColorCircle> -->
                  <!-- {{ showRepeat(reminder.repeat) }} -->
                  {{ reminder.datetime }}
                  <!-- <q-icon
                  v-if="reminder.repeat != ''"
                  name="event_repeat" color="primary"/> -->
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <div class="row q-gutter-xs">
                  <q-btn
                    round
                    size="xs"
                    icon="edit"
                    color="primary"
                    @click="editSelected(reminder)"
                  >
                    <q-tooltip> Modifier ce rappel </q-tooltip>
                  </q-btn>
                  <!-- @click="doneClicked(reminder)" -->
                  <q-btn
                    round
                    size="xs"
                    icon="done"
                    color="primary"
                    @click="doneSelected(reminder.id)"
                  >
                    <q-tooltip>
                      Marquer ce rappel comme étant terminé
                    </q-tooltip>
                  </q-btn>
                  <!-- @click="deleteClicked(reminder)" -->
                  <q-btn
                    round
                    size="xs"
                    icon="delete"
                    color="primary"
                    @click="deleteSelected(reminder.id)"
                  >
                    <q-tooltip> Effacer ce rappel </q-tooltip>
                  </q-btn>
                  <!-- <q-icon name="edit" color="primary" />
                <q-icon name="done" color="primary" />
                <q-icon name="delete" color="primary" /> -->
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <!-- <HelpDialog :show="settingsStore.showHelp" :helpBody="helpBody"/> -->
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick, onMounted } from 'vue';
import { useQuasar } from 'quasar';
// import { EventBus } from 'quasar'
// import HelpDialog from 'components/HelpDialog.vue';
// import { uid } from 'quasar'
import { useReminderStore } from 'stores/reminder.store.js';
import { useSettingsStore } from 'stores/settings.store.js';
import ColorCircle from 'components/ColorCircle.vue';
import ColorCircleMark from 'components/ColorCircleMark.vue';
import { Reminder, RING, REPEAT, ALERT } from 'components/models';
import 'shepherd.js/dist/css/shepherd.css';
import Shepherd from 'shepherd.js';
// import {offset} from '@floating-ui/dom';
// import Datepicker from '@vuepic/vue-datepicker';
// import '@vuepic/vue-datepicker/dist/main.css'

export default defineComponent({
  name: 'ReminderPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    // Datepicker,
    // HelpDialog,
    // VueCtkDateTimePicker,
    // DateTimePicker,
    // DatePicker,
    // TimePicker,
    ColorCircle,
    ColorCircleMark,
  },
  setup() {
    //const showHelp = ref(false)
    // const bus = new EventBus()
    // console.log('bus', bus)
    const wizardPalette = ref(null);
    const tourAdd = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        title: "L'assistant pour Rappel",
        cancelIcon: {
          enabled: true,
          // label is used for aria-label
          label: "Sert à fermer l'assistant",
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
        // floatingUIOptions: {
        //   middlewares: [offset({ mainAxis: 20, crossAxis: 12 })]
        // }
      },
    });
    const tourList = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        title: "L'assistant pour Rappel",
        cancelIcon: {
          enabled: true,
          // label is used for aria-label
          label: "Sert à fermer l'assistant",
        },
        scrollTo: { behavior: 'smooth', block: 'center' },
      },
    });
    const storeReminder = useReminderStore();
    const settingsStore = useSettingsStore();
    const $q = useQuasar();
    const size = '36px';
    const color = 'primary';
    const stepperStep = ref(1);
    const showPalettePopup = ref(false);
    const showDateAndTimePopup = ref(false);

    const daysLetter = reactive({
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    });
    const secondColor = ref('');
    let add = ref(false);
    let modify = ref(false);
    let list = ref(true);
    let validTimeEntered = ref(false);
    const nameFieldKey = ref(0);
    const dateOptionsFn = (date: string) => {
      const d = formatDate(Date.now(), '/');
      const d1 = d.substring(0, 10);
      // console.log(d1)
      return date >= d1;
      // return true
    };
    // const timeOptionsFn = (hr: number, min: number | null) => {
    // let dateString = ''
    // if (reminder.datetime) {
    //   dateString = reminder.datetime.substring(0, 10)
    // }
    // else {
    //   return true
    // }

    // let dToday =  new Date()
    // let dInput = new Date(dateString)
    // if (dInput.getFullYear() > dToday.getFullYear()) {
    //   console.log('input year > now year')
    //   return true
    // }
    // if (dInput.getFullYear() == dToday.getFullYear()) {
    //   if (dInput.getMonth() == dToday.getMonth()) {
    //     if (dInput.getDate()+1 == dToday.getDate()) {
    //       if (hr <= dToday.getHours()) {
    //         if (min && min <= dToday.getMinutes()) {
    //           console.log('input minute <= now minute')
    //           return false
    //         }
    //         else {
    //           return true
    //         }
    //       }
    //       else {
    //         console.log('input hour <= now hour')
    //         return false
    //       }
    //     }
    //     else {
    //       console.log('input date', dInput.getDate(), ' >= now date', dToday.getDate())
    //       return true
    //     }
    //   }
    //   else {
    //     console.log('input month >= now month')
    //     return true
    //   }
    // }
    // return true
    // }

    // let reminderColor = ref('#194D33A8')

    // let uid = uid()
    let reminder: Reminder = {
      id: -1,
      title: '',
      datetime: '',
      repeat: '',
      color: 'white',
      done: false,
    };
    let initialDatetime = '';
    /*
      SVG_COLORS.aqua,
      SVG_COLORS.gray,
      SVG_COLORS.lime,
      SVG_COLORS.maroon,
      SVG_COLORS.navy,
      SVG_COLORS.olive,
      SVG_COLORS.purple,
      SVG_COLORS.red,
      SVG_COLORS.silver,
      SVG_COLORS.teal,
      SVG_COLORS.yellow,

    */
    //     let colors = [
    // //      SVG_COLORS.black,
    // //      SVG_COLORS.transparent,
    //       SVG_COLORS.orange,
    //       SVG_COLORS.pink,
    //       SVG_COLORS.blue,
    //       SVG_COLORS.fuchsia,
    //       SVG_COLORS.green,
    //       SVG_COLORS.white,
    //     ]
    let colors = [
      '#e45d49',
      '#fd9637',
      '#fec107',
      '#95ce1f',
      '#3da1ff',
      '#4bb7c4',
      '#8c57e7',
    ];
    const reminderInit = () => {
      validTimeEntered.value = false;
      const d = formatDate(Date.now() + 900 * 1000, '-');
      // console.log('date', d)
      reminder.id = -1;
      reminder.title = '';
      reminder.note = '';
      reminder.datetime = d;
      initialDatetime = reminder.datetime;
      reminder.repeat = REPEAT.no;
      reminder.ring = RING.one_time;
      reminder.alert = ALERT.no;
      reminder.color = 'white';
      reminder.done = false;
      stepperStep.value = 1;
      forceRerender();
    };

    const forceRerender = () => {
      nameFieldKey.value += 1;
    };
    const validateTime = (caller: number) => {
      validTimeEntered.value = false;
      if (reminder.datetime) {
        let dInput = new Date(reminder.datetime);
        let dNow = new Date();
        if (dInput < dNow) {
          console.log('date < now');
          if (caller == 1) {
            $q.notify({
              message:
                "La date et l'heure choisies sont plus petites que la date et l'heure actuelle",
              color: 'primary',
            });
            return;
          }
          $q.notify({
            message:
              "La date et l'heure choisies sont plus petites que la date et l'heure actuelle. Elles sont réinitialisées à leurs valeurs initiales",
            color: 'primary',
          });
          reminder.datetime = initialDatetime;
          validTimeEntered.value = true;
          return;
        }
      }
      validTimeEntered.value = true;
      console.log('date > now');
    };
    const formatDate = (aDate: string | number | Date, delemiter: string) => {
      const d = new Date(aDate);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();
      let h = '' + d.getHours();
      let mi = '' + d.getMinutes();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      if (h.length < 2) h = '0' + h;
      if (mi.length < 2) mi = '0' + mi;

      return [year, month, day].join(delemiter) + ' ' + [h, mi].join(':');
    };
    onMounted(() => {
      settingsStore.helpTitle = 'reminder.title';
      settingsStore.helpBody = 'reminder.body';
    });
    // D:\dev\estula2\node_modules\shepherd.js\src\types\shepherd.d.ts
    return {
      storeReminder,
      settingsStore,
      forceRerender,
      reminderInit,
      dateOptionsFn,
      //timeOptionsFn,
      validateTime,
      wizardAddReminder() {
        console.log('wizard add reminder called');
        // Showing main Wizard page for add reminder
        // tourAdd.addSteps([])
        tourAdd.addStep({
          text: "Cet assistant sert à vous enseigner comment faire la création d'un rappel",
          buttons: [
            {
              action() {
                // go to the new reminder button
                console.log('going to the new reminder button');
                return this.next();
              },
              text: 'Suivant',
            },
          ],
          id: 'intro',
        });
        // Focusing on new reminder button
        tourAdd.addStep({
          text: 'Choisissez ce bouton pour créer un nouveau rappel.',
          attachTo: {
            element: '.wizard-new-reminder',
            on: 'top',
          },
          buttons: [
            {
              action() {
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                if (!add.value || stepperStep.value !== 1) {
                  console.log('New reminder panel is not visible');
                  reminderInit();
                  add.value = true;
                  modify.value = false;
                  list.value = false;
                } else {
                  console.log('New reminder is visible');
                }
                nextTick(() => {
                  console.log('going to the new reminder name field');
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'new-reminder',
        });
        // Focusing on add a name to the reminder
        tourAdd.addStep({
          text: 'Saississez un nom que vous allez donner à ce rappel.',
          attachTo: {
            element: '.wizard-name-input',
            on: 'top',
          },
          buttons: [
            {
              action() {
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                if (reminder.title === '') {
                  console.log('Name field is empty');
                  reminder.title = 'Nouveau rappel';
                  forceRerender();
                } else {
                  console.log('Name field is not empty');
                }
                nextTick(() => {
                  console.log('going to the choose a color button');
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'name-input',
        });
        // Focusing on choose a color button
        tourAdd.addStep({
          text: 'Choisissez ce bouton pour afficher une serie de pastilles de couleur que vous pouvez associer à votre rappel.',
          attachTo: {
            element: '.wizard-palette-btn',
            on: 'top',
          },
          buttons: [
            {
              action() {
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                // console.log('going to the Alert section')
                // stepperStep.value = 2
                // reminder.alert = ALERT.no
                showPalettePopup.value = true;
                nextTick(() => {
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'palette-btn',
        });
        // Focusing on the palette to choose a color
        tourAdd.addStep({
          text: 'Choisissez une couleur que vous souhaitez associer à votre rappel.',
          canClickTarget: false,
          attachTo: {
            element: '.wizard-palette',
            on: 'top',
          },
          buttons: [
            {
              action() {
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                // console.log('going to the Alert section')
                // stepperStep.value = 2
                // reminder.alert = ALERT.no
                (reminder.color = '#fd9637'), forceRerender();
                showPalettePopup.value = true;
                nextTick(() => {
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'palette',
        });
        // Focusing on the cancel color button on the palette
        tourAdd.addStep({
          text: 'Choisissez ce bouton pour retirer une couleur associée à votre rappel.',
          canClickTarget: false,
          attachTo: {
            element: '.wizard-palette-btn-cancel',
            on: 'top',
          },
          buttons: [
            {
              action() {
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                console.log('going to the Alert section');
                stepperStep.value = 2;
                reminder.alert = ALERT.no;
                nextTick(() => {
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'palette-btn',
        });
        // Focusing on the Alert section
        tourAdd.addStep({
          text: "Choisissez le genre d'alerte que vous souhaitez associer à votre rappel. Ceci est optionnel",
          attachTo: {
            element: '.wizard-step-alert',
            on: 'top',
          },
          buttons: [
            {
              action() {
                stepperStep.value = 1;
                setTimeout(() => {
                  console.log('going to the choose color button');
                  return this.back();
                }, settingsStore.wizard.duration);
              },
              text: 'Précédent',
            },
            {
              action() {
                if (stepperStep.value !== 2) {
                  console.log('Step Alert is close');
                  stepperStep.value = 2;
                  reminder.alert = ALERT.no;
                } else {
                  console.log('Step Alert is open');
                }
                nextTick(() => {
                  console.log('going to the No alert option');
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'step-alert',
        });
        // Focusing on the No Alert option
        tourAdd.addStep({
          text: "Choisissez 'Aucune alerte' si vous ne souhaitez pas mettre une alerte pour ce rappel. C'est la valeur par défaut d'un rappel",
          attachTo: {
            element: '.wizard-step-alert-no',
            on: 'top',
          },
          buttons: [
            {
              action() {
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                if (reminder.alert !== ALERT.date_time) {
                  console.log('Step Alert date and time is not selected');
                  reminder.alert = ALERT.date_time;
                  forceRerender();
                } else {
                  console.log('Step Alert date and time is open');
                }
                nextTick(() => {
                  console.log('going to the Date and time alert option');
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'step-alert-no',
        });
        // Focusing on the Date & Time option
        tourAdd.addStep({
          text: "Choisissez 'Date & Heure' si vous souhaitez mettre une alerte qui vous sera affichée à une certaine date et heure pour ce rappel.",
          attachTo: {
            element: '.wizard-step-alert-date-time',
            on: 'top',
          },
          buttons: [
            {
              action() {
                reminder.alert = ALERT.no;
                forceRerender();
                setTimeout(() => {
                  console.log('going to the No alert option');
                  return this.back();
                }, settingsStore.wizard.duration);
              },
              text: 'Précédent',
            },
            {
              action() {
                // if (reminder.alert !== ALERT.week_days)  {
                //   console.log('Step Alerte week days is not selected')
                //   reminder.alert = ALERT.week_days
                //   forceRerender()
                // }
                // else {
                //   console.log('Step Alerte week days is open')
                // }
                showDateAndTimePopup.value = true;
                nextTick(() => {
                  console.log('going to the Date and time panel');
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'step-alert-date-time',
        });
        // Focusing on the Date & Time panel
        tourAdd.addStep({
          text: "Choisissez la date et l'heure que vous souhaitez associer à ce rappel.",
          attachTo: {
            element: '.wizard-step-alert-date-time-panel',
            on: 'top',
          },
          buttons: [
            {
              action() {
                reminder.alert = ALERT.no;
                forceRerender();
                setTimeout(() => {
                  console.log('going to the No alert option');
                  return this.back();
                }, settingsStore.wizard.duration);
              },
              text: 'Précédent',
            },
            {
              action() {
                if (reminder.alert !== ALERT.week_days) {
                  console.log('Step Alerte week days is not selected');
                  showDateAndTimePopup.value = false;
                  reminder.alert = ALERT.week_days;
                  forceRerender();
                } else {
                  console.log('Step Alerte week days is open');
                }
                nextTick(() => {
                  console.log('going to the Week days alert option');
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'step-alert-date-time-panel',
        });
        // Focusing on the Week days option
        tourAdd.addStep({
          text: "Choisissez 'Jour de la semaine' si vous souhaitez mettre une alerte qui vous sera affichée à une heure précise pour le(s) jour(s) de la semaine choisi(s) pour ce rappel.",
          attachTo: {
            element: '.wizard-step-alert-week-days',
            on: 'top',
          },
          buttons: [
            {
              action() {
                reminder.alert = ALERT.date_time;
                forceRerender();
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                if (reminder.alert !== ALERT.few_hours) {
                  console.log('Step Alerte few hours is not selected');
                  reminder.alert = ALERT.few_hours;
                  forceRerender();
                } else {
                  console.log('Step Alerte few hours is open');
                }
                nextTick(() => {
                  console.log('going to the Few hours alert option');
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'step-alert-week-days',
        });
        // Focusing on the Few hours option
        tourAdd.addStep({
          text: "Choisissez 'Dans quelques heures' si vous souhaitez mettre une alerte qui vous sera affichée dans quelques heures aujourd'hui pour ce rappel.",
          attachTo: {
            element: '.wizard-step-alert-few-hours',
            on: 'top',
          },
          buttons: [
            {
              action() {
                reminder.alert = ALERT.week_days;
                forceRerender();
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                console.log('going to the Repeat section');
                stepperStep.value = 3;
                reminder.repeat = REPEAT.no;
                nextTick(() => {
                  return this.next();
                });
              },
              text: 'Suivant',
            },
          ],
          id: 'step-alert-few-hours',
        });
        // Focusing on the Repeat section
        tourAdd.addStep({
          text: 'Choisissez le genre de répétition que vous souhaitez associer à votre rappel. Ceci est optionnel',
          attachTo: {
            element: '.wizard-step-repeat',
            on: 'top',
          },
          buttons: [
            {
              action() {
                stepperStep.value = 2;
                reminder.alert = ALERT.few_hours;
                setTimeout(() => {
                  console.log('going to the Alert section');
                  return this.back();
                }, settingsStore.wizard.duration);
              },
              text: 'Précédent',
            },
            {
              action() {
                if (stepperStep.value !== 3) {
                  console.log('Step Repeat is close');
                  stepperStep.value = 3;
                  reminder.repeat = REPEAT.each_day;
                  // forceRerender()
                  // setTimeout(
                  //   () => {
                  //     console.log('going to the No repeat option')
                  //     return this.next()
                  //   }, settingsStore.wizard.duration);
                } else {
                  console.log('Step Repeat open');
                  console.log('going to the No repeat option');
                  nextTick(() => {
                    return this.next();
                  });
                }
              },
              text: 'Suivant',
            },
          ],
          id: 'step-repeat',
        });
        // Focusing on the No repeat option
        tourAdd.addStep({
          text: "Choisissez 'Ne pas répéter' si vous ne souhaitez pas mettre de répétition(s) pour ce rappel. C'est la valeur par défaut d'un rappel",
          attachTo: {
            element: '.wizard-step-repeat-no',
            on: 'top',
          },
          buttons: [
            {
              action() {
                return this.back();
              },
              text: 'Précédent',
            },
            {
              action() {
                if (reminder.repeat !== REPEAT.each_day) {
                  console.log('Step Repeat Every day is not selected');
                  reminder.repeat = REPEAT.each_day;
                  forceRerender();
                  setTimeout(() => {
                    console.log('going to the Repeat each day option');
                    return this.next();
                  }, settingsStore.wizard.duration);
                } else {
                  console.log('Step Repeat Every day is open');
                  console.log('going to the Repeat each day option');
                  return this.next();
                }
              },
              text: 'Suivant',
            },
          ],
          id: 'step-repeat-no',
        });
        tourAdd.start();
      },
      wizardListReminder() {
        console.log('wizard list reminder called');
        // Showing main Wizard page for the list of reminders
        // tourList.addSteps([])
        tourList.addStep({
          text: 'Cet assistant sert à vous enseigner comment faire la gestion de la liste de vos rappels.',
          buttons: [
            {
              action() {
                // go to the new reminder button
                console.log('going to the new reminder button');
                return this.next();
              },
              text: 'Suivant',
            },
          ],
          id: 'intro',
        });
        tourList.start();
      },
      showRepeat(repeat: string | undefined) {
        if (repeat == '') {
          return '';
        }
        return ',' + repeat;
      },
      editSelected(rem: {
        id?: number;
        title: string;
        datetime?: string;
        repeat?: string;
        color?: string;
        done?: boolean;
      }) {
        reminder.id = rem.id;
        reminder.title = rem.title;
        reminder.datetime = rem.datetime;
        if (reminder.datetime) {
          initialDatetime = reminder.datetime;
        }
        reminder.repeat = rem.repeat;
        reminder.color = rem.color;
        reminder.done = rem.done;
        add.value = true;
        modify.value = true;
        list.value = false;
        validTimeEntered.value = false;
        // console.log('edit', reminder)
      },
      doneSelected(id: number | undefined) {
        if (id === undefined) {
          return;
        }
        storeReminder.doneReminder(id);
        add.value = false;
        modify.value = false;
        list.value = true;
      },
      deleteSelected(id: number | undefined) {
        if (id === undefined) {
          return;
        }
        storeReminder.deleteReminder(id);
        add.value = false;
        modify.value = false;
        list.value = true;
      },
      getColorReminder(color: string | undefined) {
        if (color === undefined) {
          // if ($q.dark.isActive) {
          //   return SVG_COLORS.black
          // }
          // return SVG_COLORS.white
          return 'white';
        }
        return color;
      },
      noReminders() {
        return storeReminder.reminders && storeReminder.reminders.length == 0;
      },
      // getMarkColorReminder(color: SVG_COLORS | undefined) {
      //   if (color === undefined || color === SVG_COLORS.white) {
      //     return SVG_COLORS.transparent
      //   }
      //   return color
      // },
      setColor(id: number | undefined, color: string) {
        if (id === undefined) {
          return;
        }
        storeReminder.setColorReminder(id, color);
        reminder.color = color;
        forceRerender();
      },
      // help() {
      //   console.log('help')
      //   // showHelp.value = true
      //   settingsStore.showHelp = true
      // },

      dayOfWeek() {
        // console.log('$q', $q)
        // console.log('language', $q.lang)
        // console.log('today', $q.lang.date.days[0])
        // console.log('iso code', $q.lang.isoName)
        const day = new Date().toLocaleString($q.lang.isoName, {
          weekday: 'long',
        });
        return day;
      },
      checkData() {
        let error = false;
        if (reminder.title == '') {
          console.log('Nom requis');
          error = true;
        }
        // if (reminder.datetime == '') {
        //   console.log('Date et heure requises')
        //   error = true
        // }
        // if (reminder.repeat == '') {
        //   console.log('Répétition requis')
        //   // error = true
        // }
        if (!error) {
          add.value = false;
          list.value = true;
          let aId = reminder.id;
          let modify = true;
          if (aId === undefined || aId < 0) {
            modify = false;
          }
          let rem: Reminder = {
            id: reminder.id,
            title: reminder.title,
            datetime: reminder.datetime,
            repeat: reminder.repeat,
            color: reminder.color,
            done: reminder.done,
            ring: reminder.ring,
          };
          // console.log('Rem', rem)
          if (modify) {
            storeReminder.modifyReminder(rem);
          } else {
            storeReminder.addReminder(rem);
          }
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      doneClicked(rem: {
        id?: number;
        title: string;
        datetime?: string;
        repeat?: string;
        color?: string;
        done?: boolean;
      }) {
        console.log('done');
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      deleteClicked(rem: {
        id?: number;
        title: string;
        datetime?: string;
        repeat?: string;
        color?: string;
        done?: boolean;
      }) {
        console.log('delete');
      },

      // getItemBackgroundColor(color: string | undefined) {
      //   // if (color && (color === '')) {
      //   //   return 'black'
      //   // }
      //   return color
      // },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      // voidFunc() {
      // },
      //      SVG_COLORS: SVG_COLORS,
      reminder: ref(reminder),
      validTimeEntered: ref(validTimeEntered),
      add: ref(add),
      modify: ref(modify),
      list: ref(list),
      showCalendar: ref(false),
      showTimeOptions: ref(false),
      showDateOptions: ref(false),
      withCard: ref(false),
      hourModel: ref(0),
      wizardTimeoutDuration: ref(500),
      // datetime: ref(dayjs().format('YYYY-MM-DD HH:mm')),
      dateTime: ref(null),
      helpBody: ref('Help body triggered'),
      nameFieldKey,
      stepperStep,
      showPalettePopup,
      showDateAndTimePopup,
      size,
      color,
      secondColor,
      colors,
      RING: RING,
      REPEAT: REPEAT,
      ALERT: ALERT,
      daysLetter,
      wizardPalette,
      // getHelp() {
      //   return showHelp.value
      // },
      // showHelp
    };
  },
});
</script>
