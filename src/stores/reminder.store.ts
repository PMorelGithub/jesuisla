import { defineStore } from 'pinia';
// import { uid } from 'quasar'
//import { Reminder, SVG_COLORS } from 'components/models';
import { Reminder } from 'components/models';

export const useReminderStore = defineStore('reminder', {
  state: () => ({
    reminders: <Reminder[]>[
      // { key: uid(), title: 'Loyer', datetime: '1 novembre, 11 h 00', repeat: 'Mensuel', color: SVG_COLORS.white },
      // { key: uid(), title: 'Téléjournal', datetime: 'Hier, 17 h 55', repeat: 'Quotidien', color: SVG_COLORS.white },
      // { key: uid(), title: 'Part du loyer de maman', datetime: '29 novembre, 11 h 00', repeat: 'Mensuel', color: SVG_COLORS.yellow },
      // { key: uid(), title: 'Google projet effacé', datetime: '7 décembre, 10 h00', repeat: '', color: SVG_COLORS.fuchsia },
      // { key: uid(), title: 'Coloscopie résultat', datetime: '1 mai 2023, 09h 00', repeat: '', color: SVG_COLORS.blue },
    ],
    dbStyle: 0,
    loading: false,
  }),
  actions: {
    async addReminder(reminder: Reminder) {
      if (this.dbStyle == 0) {
        const lg = this.reminders.length;
        reminder.id = lg;
      }
      // console.log('Add', reminder)
      this.reminders.push(reminder);
    },
    // async modifyReminder(reminder: { key: string; name: string; datetime: string; repeat: string; color: SVG_COLORS; }) {
    async modifyReminder(reminder: Reminder) {
      // console.log('Modify', reminder)
      const rem = <Reminder>this.reminders.find((item) => {
        return item.id == reminder.id;
      });
      // console.log('rem', rem)
      if (rem && rem !== undefined && rem !== null) {
        rem.title = reminder.title;
        rem.datetime = reminder.datetime;
        rem.repeat = reminder.repeat;
        rem.color = reminder.color;
        rem.done = reminder.done;
      }
    },
    async deleteReminder(id: number) {
      // console.log('Delete', id)
      this.reminders = this.reminders.filter((t) => {
        return t.id !== id;
      });
    },
    async doneReminder(id: number) {
      const rem = <Reminder>this.reminders.find((item) => {
        return item.id == id;
      });
      // console.log('rem', rem)
      if (rem && rem !== undefined && rem !== null) {
        rem.done = !rem.done;
      }
    },
    async setColorReminder(id: number | undefined, color: string) {
      const rem = <Reminder>this.reminders.find((item) => {
        return item.id == id;
      });
      // console.log('rem', rem, color)
      if (rem && rem !== undefined && rem !== null) {
        rem.color = color;
      }
    },
  },
});
