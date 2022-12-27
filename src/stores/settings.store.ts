import { defineStore } from 'pinia';
import { VERSION } from 'src/components/constants';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    mini: false,
    tooltipShown: true,
    darkMode: false,
    // showHelp: false,
    helpBody: '',
    helpTitle: '',
    wizard: {
      duration: 300,
      long_duration: 2000,
    },
    //    activeWizard: '',
    //    activeTour: null,
    reminderCalendar: false,
    versionLevel: { label: 'Alpha', value: VERSION.alpha },
  }),
  actions: {
    saveDarkMode() {
      console.log('save dark mode', this.darkMode);
    },
    saveReminderCalendar() {
      console.log('save reminder calendar', this.reminderCalendar);
    },
  },
});
