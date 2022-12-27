import Dexie, { Table } from 'dexie';
import { Reminder } from 'components/models';

//
// Declare Database
//
class Database extends Dexie {
  public reminders!: Table<Reminder, number>; // id is number in this case

  public constructor() {
    super('Database');
    this.version(1).stores({
      reminders: '++id,datetime',
    });
  }
}

const db = new Database();

db.transaction('rw', db.reminders, async () => {
  // Make sure we have something in DB:
  if ((await db.reminders.where({ title: 'Josephine' }).count()) === 0) {
    const id = await db.reminders.add({
      title: 'Josephine',
      datetime: '2022-11-22 09:00',
    });
    alert(`Addded reminder with id ${id}`);
  }

  // Query:
  // const youngFriends = await db.friends.where('age').below(25).toArray();

  // // Show result:
  // alert ('My young friends: ' + JSON.stringify(youngFriends));
}).catch((e) => {
  alert(e.stack || e);
});
