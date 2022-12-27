import { defineStore } from 'pinia';
// import { uid } from 'quasar'
//import { Reminder, SVG_COLORS } from 'components/models';
import { Profile } from 'components/models';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    // profiles: []
    profiles: <Profile[]>[],
    profile: null,

    // reminders: <Reminder[]>
    // [
    //   // { key: uid(), title: 'Loyer', datetime: '1 novembre, 11 h 00', repeat: 'Mensuel', color: SVG_COLORS.white },
    //   // { key: uid(), title: 'Téléjournal', datetime: 'Hier, 17 h 55', repeat: 'Quotidien', color: SVG_COLORS.white },
    //   // { key: uid(), title: 'Part du loyer de maman', datetime: '29 novembre, 11 h 00', repeat: 'Mensuel', color: SVG_COLORS.yellow },
    //   // { key: uid(), title: 'Google projet effacé', datetime: '7 décembre, 10 h00', repeat: '', color: SVG_COLORS.fuchsia },
    //   // { key: uid(), title: 'Coloscopie résultat', datetime: '1 mai 2023, 09h 00', repeat: '', color: SVG_COLORS.blue },
    // ],
    // dbStyle: 0,
    // loading: false
  }),
  //  actions: {
  // async addReminder(reminder: Reminder) {
  //   if (this.dbStyle == 0) {
  //     const lg = this.reminders.length
  //     reminder.id = lg
  //   }
  //   // console.log('Add', reminder)
  //   this.reminders.push(reminder)
  // },
  // // async modifyReminder(reminder: { key: string; name: string; datetime: string; repeat: string; color: SVG_COLORS; }) {
  // async modifyReminder(reminder: Reminder) {
  //   // console.log('Modify', reminder)
  //   const rem = <Reminder> this.reminders.find((item) => {
  //     return item.id == reminder.id
  //   })
  //   // console.log('rem', rem)
  //   if (rem && rem !== undefined && rem !== null) {
  //     rem.title = reminder.title
  //     rem.datetime = reminder.datetime
  //     rem.repeat = reminder.repeat
  //     rem.color = reminder.color
  //     rem.done = reminder.done
  //   }
  // },
  // async deleteReminder(id: number) {
  //   // console.log('Delete', id)
  //   this.reminders = this.reminders.filter(t => {
  //     return t.id !== id
  //   })
  // },
  // async doneReminder(id: number) {
  //   const rem = <Reminder> this.reminders.find((item) => {
  //     return item.id == id
  //   })
  //   // console.log('rem', rem)
  //   if (rem && rem !== undefined && rem !== null) {
  //     rem.done = !rem.done
  //   }
  // },
  // async setColorReminder(id: number | undefined, color: string) {
  //   const rem = <Reminder> this.reminders.find((item) => {
  //     return item.id == id
  //   })
  //   // console.log('rem', rem, color)
  //   if (rem && rem !== undefined && rem !== null) {
  //     rem.color = color
  //   }
  // },
  //  },
});
/*
import firebase from 'firebase'
import 'firebase/firestore'

export default {
  namespaced: true,
  state: {
    db: firebase.firestore(),
    profiles: []
  },
  mutations: {},
  actions: {
    async closeDB({dispatch, commit, state}, payload) {
      state.profiles = []
    },
    async deleteUserProfiles({dispatch, commit, state}, profileId) {
      var docs = Object.values(state.profiles)
      for( var i = docs.length-1; i >= 0; i--) {
        //console.log('id',docs[i].id)
        await state.db.collection("profiles").doc(docs[i].id).delete()
        /* .then(function() {
        })
        .catch(function(error) {
        }); */
//       }
//       state.profiles = []
//     },
//     async patch({dispatch, commit, state}, params) {
//       var db = firebase.firestore()
//       // await db.collection("persons").where("created_by", "==", personId)
//       console.log('params', params)
//       // var id = state.profiles[0].id
//       var id = params.id
//       var profileRef = db.collection("profiles").doc(id);

//       // Set the "capital" field of the city 'DC'
//       return profileRef.update(params.params)
//       .then(function() {
//           console.log("Document successfully updated!");
//       })
//       .catch(function(error) {
//           // The document probably doesn't exist.
//           console.error("Error updating document: ", error);
//       });

//     },
//     async delete({dispatch, commit, state}, profileId) {
//       var db = firebase.firestore()
//       // await db.collection("persons").where("created_by", "==", personId)
//       console.log('profileId', profileId)
//       // var id = state.profiles[0].id
//       // var id = params.id
//       var profileRef = await db.collection("profiles").doc(profileId);

//       // Set the "capital" field of the city 'DC'
//       return await profileRef.delete()
//         .then(function() {
//             console.log("Document successfully deleted!", profileId);
//             var docs = Object.values(state.profiles)
//             for( var i = docs.length-1; i >= 0; i--) {
//               console.log('id',docs[i].id)
//               if ( docs[i].id === profileId) {
//                 docs.splice(i, 1)
//                 break
//               }
//             }
//             state.profiles = docs
//         })
//         .catch(function(error) {
//             // The document probably doesn't exist.
//             console.error("Error deleting document: ", error);
//         });
//     },
//     async getProfilesWithUserId({dispatch, commit, state}, personId) {
//       var db = firebase.firestore()
//       await db.collection("profiles").where("created_by", "==", personId)
//       .get()
//       .then(function(querySnapshot) {
//         state.profiles = []
//         querySnapshot.forEach(function(doc) {
//               // doc.data() is never undefined for query doc snapshots
//               //console.log(doc.id, " => ", doc.data());
//               //var newDoc = {id: doc.id, data: doc.data()}
//               state.profiles.push(doc)
//               //return doc
//           });
//       })
//       .catch(function(error) {
//           console.log("Error getting documents: ", error);
//           return error
//       });
//     },
//     async addProfile({dispatch, commit, state}, payload) {
//       // var db = firebase.firestore()
//       var newProfileRef = await state.db.collection("profiles").doc()
//       await newProfileRef.set(payload.data)
//         .then((result) => {
//           // console.log('result', result);
//         })
//         .catch(function(error) {
//           console.log(error);
//           return null
//         })
//       // console.log('result', newProfileRef);
//       var newDoc = await dispatch('getProfilesWithId', newProfileRef.id)
//       /* console.log("newProfileRef: ", newProfileRef)
//       newDoc = {id: newProfileRef.id, data: payload.data}
//       // state.profiles = []
//       state.profiles.push(newDoc)
//       console.log("state.profiles.length: ", state.profiles.length)*/
//       return newDoc
//     },
//     async getProfilesWithId({dispatch, commit, state}, profileId) {
//       // var db = firebase.firestore()
//       var result = null
//       await state.db.collection("profiles").doc(profileId).get()
//       .then(function(doc) {
//         // state.profiles = []
//         // querySnapshot.forEach(function(doc) {
//               // doc.data() is never undefined for query doc snapshots
//               //console.log(doc.id, " => ", doc.data());
//               //var newDoc = {id: doc.id, data: doc.data()}
//               state.profiles.push(doc)
//               result = doc
//               return doc
//           // });
//       })
//       .catch(function(error) {
//           console.log("Error getting documents: ", error);
//           return error
//       });
//       return result
//     }
//   },
//   getters: {
//     profiles: state => {
//       var list = []
//       const docs = Object.values(state.profiles)
//       // console.log('Profiles', docs)
//       docs.forEach(function(item) {
//         //console.log('profile', item)
//         list.push(item)
//       })
//       return list
//     },
//     profilesCount: state => {
//       (state.profiles !== undefined && state.profiles !== null) ? state.profiles.length : 0
//     },
//     getLastAdded: state => {
//       if (state.profiles.lenth === 0) {
//         return null
//       }
//       return state.profiles[state.profiles.length-1].data
//     },
//     userProtectedProfile: (state, getters, rootState, rootGetters) => {
//       // let user = rootGetters['user/getUser']
//       // let email = user.email
//       const docs = Object.values(state.profiles)
//       // console.log('docs',docs)
//       var profile = docs.filter(item => {
//         if (item.data().role === 'protected') {
//           if (item.data().protectedChoice === 'ourself') {
//             // console.log('find one:', item)
//             return item
//           }
//         }
//       })
//       return profile
//     },
//     userProtectedProfiles: state => {
//       const docs = Object.values(state.profiles)
//       console.log('docs',docs)
//       var profile = docs.filter(item => {
//         if (item.data().role === 'protected') {
//           // console.log('find one:', item)
//           return item
//         }
//       })
//       return profile
//     },
//     protectorProfile: state => {
//       const docs = Object.values(state.profiles)
//       // console.log('docs',docs)
//       var profile = docs.filter(item => {
//         if (item.data().role === 'protector') {
//           // console.log('find one:', item)
//           return item
//         }
//       })
//       return profile
//     },
//     protectedProfile: state => {
//       const docs = Object.values(state.profiles)
//       // console.log('docs',docs)
//       var profile = docs.filter(item => {
//         if (item.data().role === 'protected' && item.data().protectedCoice === 'ourself') {
//           // console.log('find one:', item)
//           return item
//         }
//       })
//       return profile
//     },
//     getProfileWithId: state => profileId => {
//       // state.someArr.find(el => el === param)
//       const docs = Object.values(state.profiles)
//       console.log('docs',docs)
//       var profile = docs.filter(item => {
//         if (item.id === profileId) {
//           // console.log('find one:', item)
//           return item
//         }
//       })
//       return profile
//     }

//   }
// }
