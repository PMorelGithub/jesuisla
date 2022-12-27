<template>
  <q-page padding>
    <div>
      <h6 class="text-primary">
        <b>
          {{ $t('profiles.mainTitle') }}
        </b>
      </h6>
      <div v-if="showProfiles()">
        <q-list
          dense
          bordered
          class="rounded-borders"
          v-for="(prof, index) in storeProfile.profiles"
          v-bind:key="prof.id"
        >
          <q-item>
            <q-item-section
              top
              clickable
              v-ripple
              class="cursor-pointer"
              @click.prevent="editProfile(prof, index)"
            >
              <q-item-label
                lines="1"
                class="q-mt-xs text-body2 text-weight-bold text-primary"
              >
                <div class="row justify-between">
                  <div>{{ prof.name }}</div>
                  <div>{{ roleToText(prof.role) }}</div>
                </div>
              </q-item-label>
            </q-item-section>
            <q-item-section top side>
              <div>
                <q-btn
                  color="primary"
                  flat
                  dense
                  round
                  icon="delete"
                  @click.prevent="askDelete(prof, index)"
                />
                <q-btn
                  color="primary"
                  flat
                  dense
                  round
                  icon="fas fa-user-edit"
                  @click.prevent="editProfile(prof, index)"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <h6 class="text-primary">
          <b> Choisissez le type de profil que vous voulez créer. </b>
        </h6>
        <div class="row q-gutter-sm">
          <q-btn
            color="primary"
            no-caps
            :disabled="protectorProfile"
            @click="doInitialInsert('protector', true)"
          >
            Protecteur
          </q-btn>
          <q-btn
            color="primary"
            no-caps
            @click="doInitialInsert('protected', false)"
          >
            Protégée
          </q-btn>
        </div>
        <br />
      </div>
      <q-stepper
        v-if="showStepper"
        v-model="step1"
        color="secondary"
        header-nav
        vertical
        animated
      >
        <!-- v-if="profile.protectedChoice === 'others'" -->
        <q-step title="Information" :name="1">
          <div>
            <p>Entrez les informations pertinentes à ce role ...</p>
            <!-- v-if="profile.role !== 'protector' && profile.protectedChoice !== 'ourself'" -->
            <!-- v-model="profile.name" -->
            <!-- :error="$v.profile.name.$error"
              :error-message='$t("signup.validName")'
              @blur="$v.profile.name.$touch"
     					@change="dataChange_name()"
              bottom-slots
            -->
            <q-input
              v-model="state.firstName"
              filled
              type="text"
              :label="$t('signup.name')"
              maxlength="50"
            />

            <!-- <q-input
              bottom-slots
              filled
              v-model="profile.userPhone"
              label="Fixe"
              mask="(###) ### - ####"
              unmasked-value
              @change="dataChange_userPhone()"
            />
            <q-select
              hide-underline="true"
              color='primary'
              filled
              v-model="profile.langPrimary"
              :options="UILanguages"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              label="Langue principale"
              hint="Sélectionnez la langue principale de cette personne"
              hide-hint
     					@input="dataChange_langPrimary()"
            />
            <q-select
              hide-underline="true"
              color='primary'
              filled
              v-model="profile.langSecondary"
              :options="UILanguages"
              option-value="value"
              option-label="label"
              emit-value
              map-options
              label="Langue secondaire"
              hint="Sélectionnez la langue secondaire de cette personne"
              hide-hint
     					@input="dataChange_langSecondary()"
            /> -->
          </div>
        </q-step>

        <!-- <q-step
          title="Contacts"
          :name="2"
          v-if="profile.role == 'protected' || profile.role == 'protector'"
        >
          <h6><b>
            Inscrivez les contacts qui seront désignées comme personne protectrice...
          </b></h6>
          <br />
          <div class="row q-gutter-sm">
            <q-btn
              color="primary"
              no-caps
              @click="initSearch()"
            >
              Rechercher
            </q-btn>
          </div>
          <br />
          <div v-if="showContacts">
            <p>
              Établissez l'ordre dans lequel les contacts seront alerté en faisant glisser les noms pour établir l'ordre.
            </p>
            <br />
            <div center>
              <q-btn
                color="primary"
                @click="addContact()"
              >
                Créer un Contact
              </q-btn>
            </div>
            <br />
          </div>
          <div v-if="showContactForm">
            <p>Entrez les informations pertinentes à ce contact ...</p>
            <q-input
              bottom-slots
              filled
              v-model="contact.name"
              type="text"
              :label='$t("signup.name")'
              maxlength="50"
              :error="$v.contact.name.$error"
              :error-message='$t("signup.validName")'
              @blur="$v.contact.name.$touch"
            />
            <q-input
              bottom-slots
              filled
              v-model="contact.userEmail"
              type="email"
              :label='$t("signup.email")'
              maxlength="50"
              :error="$v.contact.userEmail.$error"
              :error-message='$t("signup.validEmail")'
              @blur="$v.contact.userEmail.$touch"
              hint="Entrez le courriel pour contacter cette personne"
              hide-hint
            />
            <q-input
              bottom-slots
              filled
              v-model="contact.userMobile"
              label="Mobile"
              mask="(###) ### - ####"
            />
            <q-input
              bottom-slots
              filled
              v-model="contact.userPhone"
              label="Fixe"
              mask="(###) ### - ####"
            />
            <p>
              Établissez l'ordre dans lequel se fera les rappels ou les alertes pour cette personne en faisant glisser pour établir l'ordre.
            </p>
            <q-btn
              color="primary"
              label='Sauvegarder ce contact'
              :loading="loadingContact"
              @click="saveContact()"
            >
              <q-spinner slot="loading"/>
            </q-btn>
          </div>
        </q-step>

        <q-step
          :title="profile.role === 'protector' ? 'Alerte' : 'Rappels'"
          :name="3"
        >
          <p
            v-if="profile.role === 'protected' && profile.protectedChoice === 'ourself'"
          >
            Si le système n'a pas reçu de confirmation de votre présence, il débutera ses rappels
            à <b>{{ callbackStr }} heures</b> et vous fera des rappels à toutes les <b>{{ intervalStr }}</b>.
          </p>
          <p
            v-if="profile.role === 'protected' && profile.protectedChoice === 'others'"
          >
            Si le système n'a pas reçu de confirmation de la présence de cette personne, il débutera ses rappels
            à <b>{{ callbackStr }} heures</b> et fera des rappels à cette personne à toutes les <b>{{ intervalStr }}</b>.
          </p>
          <p
            v-if="profile.role == 'protector'"
          >
            Si à <b>{{ alarmStr }} heures</b> le système n'a toujours pas reçu de confirmation de la présence
            de la ou les personnes protégées, alors il vous enverra une alerte pour vous le laisser savoir.
          </p>
          <q-input
            v-if="profile.role == 'protected'"
            bottom-slots
            filled
            v-model="profile.callBackHour"
            mask="time"
            :rules="['time']"
            label="Début du rappel"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy>
                  <q-time
                    v-model="profile.callBackHour"
           					@input="dataChange_callBackHour()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <br/>
          <q-slider
            v-if="profile.role == 'protected'"
            bottom-slots
            filled
            v-model="profile.interval"
            :min="15"
            :max="240"
            :step="15"
            markers
            snap
            label
            label-always
            color="red"
   					@change="dataChange_interval()"
          />
          <div
            v-if="profile.role == 'protected'"
            class="row"
          >
            <span>Interval entre les rappels (en minutes)</span>
          </div>
          <br/>
          <q-input
            v-if="profile.role == 'protector'"
            bottom-slots
            filled
            v-model="profile.alarmHour"
            mask="time"
            :rules="['time']"
            label="Heure de l'alerte"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy>
                  <q-time
                    v-model="profile.alarmHour"
           					@input="dataChange_alarmHour()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-step>

        <q-step
          title="Exclusions"
          :name="4"
          v-if="profile.role == 'protected'"
        >
          <p>
            Choisissez les jours où vous ne voulez pas que le système fasse des rappels à cette personne.
          </p>
          <q-option-group
            type="checkbox"
            v-model="profile.daysExcluded"
   					@input="dataChange_daysExcluded()"
            :options="[
              { label: 'Lundi', value: 'monday' },
              { label: 'Mardi', value: 'tuesday' },
              { label: 'Mercredi', value: 'wednesday' },
              { label: 'Jeudi', value: 'thursday' },
              { label: 'Vendredi', value: 'friday' },
              { label: 'Samedi', value: 'saturday' },
              { label: 'Dimanche', value: 'sunday' }
            ]"
          />
        </q-step>

        <q-step
          title="Début"
          :name="5"
          v-if="profile.role == 'protected' || profile.role == 'protector'"
        >
          <p>
            Choisissez quand débutera la surveillance de cette personne, c'est-à-dire
            le jour où elle devra signaler sa présence et où les
            rappels débuteront si jamais la personne n'a pas signalée sa présence.
          </p>
          <q-input
            bottom-slots
            filled
            v-model="transformDate"
            mask="date"
            :rules="['date']"
            label="Date de début de surveillance"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date
                    v-model="transformDate"
           					@input="dataChange_startDate()"
                    first-day-of-week="0"
                    today-btn
                    :options="date => date >= '2019/04/02'"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <p>
            Indiquez une date de début et de fin de pause si vous voulez mettre en pause le système de surveillance de cette personne.
          </p>
          <q-toggle
            bottom-slots
            filled
            v-model="profile.standBy"
   					@input="dataChange_standBy()"
            label="Mets ce profil en pause"
            left-label
          />
          <q-input
            v-if="profile.standBy"
            bottom-slots
            filled
            v-model="transformDate2"
            mask="date"
            :rules="['date']"
            label="Date de début de la pause"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date
                    v-model="transformDate2"
           					@input="dataChange_pauseStartDate()"
                    first-day-of-week="0"
                    today-btn
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-if="profile.standBy"
            bottom-slots
            filled
            v-model="transformDate3"
            mask="date"
            :rules="['date']"
            label="Date de fin de la pause"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date
                    v-model="transformDate3"
           					@input="dataChange_pauseEndDate()"
                    first-day-of-week="0"
                    today-btn
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

        </q-step> -->
      </q-stepper>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { Profile } from 'components/models';
import { useProfileStore } from 'stores/profiles.store.js';
import { useSettingsStore } from 'stores/settings.store.js';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

export default defineComponent({
  name: 'InterviewPage',
  components: {},
  setup() {
    const settingsStore = useSettingsStore();
    onMounted(() => {
      settingsStore.helpTitle = 'interview.title';
      settingsStore.helpBody = 'interview.body';
    });
    const state = reactive({
      firstName: '',
      lastName: '',
      contact: {
        email: '',
      },
    });
    const rules = {
      firstName: { required }, // Matches state.firstName
      lastName: { required }, // Matches state.lastName
      contact: {
        email: { required, email }, // Matches state.contact.email
      },
    };

    const v$ = useVuelidate(rules, state);
    const storeProfile = useProfileStore();
    //    let profile = ref(null)

    const showProfiles = () => {
      return storeProfile.profiles.length !== 0;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const editProfile = (profile: Profile, index: number) => {
      // console.log('edit profile:', profile, 'index:', index)
      // this.workingProfile = profile
      // this.workingIndex = index
      // this.doc = profile
      // this.profile = profile.data()
      // this.entities.userEmail = profile.userEmail
      // this.entities.userMobile = profile.userMobile
      // this.entities.userPhone = profile.userPhone
      // this.$store.state.profiles.activeProfile = profile
      // this.setActiveStep()
      // this.toggleShow = true
    };
    const roleToText = (role: string) => {
      switch (role) {
        case 'protector':
          return 'Protecteur';
        case 'protected':
          return 'Protégée';
        case 'volunteer':
          return 'Bénévole';
      }
      return 'Non définie';
    };
    const askDelete = (profile: Profile, index: number) => {
      console.log('ask delete profile:', profile, 'index:', index);
      // this.workingProfile = profile
      // this.toggleShow = false
      // this.workingIndex = index
      // this.profileToDelete = profile.id
      // this.doc = profile
      // this.profile = profile.data()
      // this.deleteModal = true
    };
    const protectorProfile = () => {
      // var protectorProfile = this.$store.getters['profiles/protectorProfile']
      // // console.log('>>>>>>protectorProfile', protectorProfile)
      // var withProtector = (protectorProfile !== null && protectorProfile !== undefined && protectorProfile.length !== 0)
      // return withProtector
      return true;
    };
    const protectedProfile = () => {
      // var protectedProfile = this.$store.getters['profiles/protectedProfile']
      // // console.log('>>>>>>protectedProfile', protectedProfile)
      // var withProtected = (protectedProfile !== null && protectedProfile !== undefined && protectedProfile.length !== 0)
      // return withProtected
      return false;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const doInitialInsert = (role: string, protectedChoice: boolean) => {
      // if (role === 'protected') {
      //   if (protectedChoice === false) {
      //     // var profile = this.protectedProfileB()
      //     var profile = await this.$store.getters['profiles/protectedProfile']
      //     if (profile !== null && profile !== undefined && profile.length !== 0) {
      //       this.protectedChoiceModel = 'others'
      //       this.protectedChoice = 'others'
      //     }
      //     else {
      //       this.protectedChoiceModel = 'ourself'
      //       this.protectedChoice = 'ourself'
      //       this.protectedType = true
      //       return
      //     }
      //   }
      // /* } else {
      //   this.protectedChoice = ''*/
      // }
      // if (this.protectedChoiceModel === 'others') {
      //   this.$q.notify({ color: 'positive', message: "Cette fonctionnalité n'est pas encore implémentée.", actions: null })
      //   return
      // }
      // // console.log('before insert profile, protectedChoice', this.protectedChoiceModel)
      // //this.activeRole = role
      // let user = this.$store.getters['user/getUser']
      // // let email = user.email
      // // let language = this.$store.getters['language/getLanguage']
      // var that = this
      // // var name = user.displayName
      // // var preferred = 'mobile'
      // var protect = this.protectedChoiceModel
      // if (role === 'protector') {
      //   protect = ''
      // } else {
      //   if (this.protectedChoiceModel === 'others') {
      //     // name = 'Nom de la personne'
      //     // email = ''
      //     // preferred = 'fixe'
      //   }
      // }
      // var data = {
      //   created_at: firebase.firestore.Timestamp.fromDate(new Date()),
      //   created_by: user.uid,
      //   alarmHour: "12:00",
      //   callBackHour: "09:00",
      //   contacts: [],
      //   daysExcluded: [],
      //   interval: 30,
      //   pauseEndDate: "",
      //   pauseStartDate: "",
      //   role: role,
      //   personId: this.userAccount.id,
      //   protectedChoice: protect,
      //   standBy: false,
      //   startDate: firebase.firestore.Timestamp.fromDate(new Date())
      // }
      // // this.$store.dispatch('profiles/insert', )
      // await this.$store.dispatch('profiles/addProfile', { data: data })
      // .then((result) => {
      //   that.doc = result
      //   that.profile = result.data()
      //   // that.profile = lastProfile.data
      //   /* this.entities.userEmail = this.profile.userEmail
      //   this.entities.userMobile = this.profile.userMobile
      //   this.entities.userPhone = this.profile.userPhone
      //   // this.$store.state.profiles.activeProfile = profile*/
      // 	// console.log('toggle show');
      //   that.toggleShow = true
      //   //that.editThisProfile(result)
      // 	return result
      // })
      // .catch(function(error) {
      // 	console.log(error);
      // 	return null
      // })
    };

    return {
      storeProfile,
      showProfiles,
      editProfile,
      roleToText,
      askDelete,
      protectorProfile,
      protectedProfile,
      doInitialInsert,
      showStepper: ref(true),
      step1: ref(2),
      profile: null,
      state,
      v$,
    };
  },
});
</script>
