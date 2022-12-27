/*
- d99bff fushia
- 85b6ff bleu
- 4ecb71 vert
- ffd500 orange
- ff9bad rose
- ffffff blanc
- 000000 noir
  aqua = 'aqua',
  gray = 'gray',
  lime = 'lime',
  maroon = 'maroon',
  navy = 'navy',
  olive = 'olive',
  purple ='purple',
  red = 'red',
  silver ='silver',
  teal ='teal',
  yellow = 'yellow',

e45d49
fd9637
fec107
95ce1f
3da1ff
4bb7c4
8c57e7


*/
// export enum SVG_COLORS {
//   black = '#000000',
//   orange = '#ffd500',
//   pink = '#ff9bad',
//   blue = '#85b6ff',
//   fuchsia = '#d99bff',
//   green = '#4ecb71',
//   white = '#ffffff',
//   transparent = '#ffffff00'
// }
// export enum SVG_COLORS {
//   col1 = '#e45d49',
//   col2 = '#fd9637',
//   col3 = '#fec107',
//   col4 = '#95ce1f',
//   col5 = '#3da1ff',
//   col6 = '#4bb7c4',
//   col7 = '#8c57e7',
// //  col8 = '#ffffff00'
// }
export enum RING {
  one_time = '1',
  many_time = '2',
}
export enum REPEAT {
  no = '0',
  each_day = '1',
  each_month = '2',
  each_year = '3',
  each = '4',
}

export enum ALERT {
  no = '0',
  date_time = '1',
  week_days = '2',
  few_hours = '3',
}

export interface Reminder {
  id?: number;
  created_at?: string;
  modified_at?: string;
  title: string;
  color?: string;
  note?: string;
  list?: string[];
  images?: string[];
  alert?: string;
  datetime?: string;
  weekdays?: string[];
  weekdays_time?: string;
  few_hours?: string;
  repeat?: string;
  repeat_day?: string;
  ring?: string;
  done?: boolean;
  done_at?: string;
}

export interface Profile {
  id?: number;
  name: '';
  alarmHour: '12:00';
  callBackHour: '09:00';
  contacts: [];
  daysExcluded: [];
  interval: 30;
  pauseEndDate: '';
  pauseStartDate: '';
  role: '';
  personId: '';
  protectedChoice: '';
  standBy: false;
  startDate: '';
}
