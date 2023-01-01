import {MorningService} from "./services/morning-service";
import {Notification} from "./entities/notifications";
import {DaysLeftToString, MorningsLeft} from "./utils/time";
const morningServices = new MorningService()
let notifications = morningServices.getNotifications();

export async function run(client: any) {
  async function loop() {
    let now = new Date();
    // if (now.getHours() === 6 && now.getMinutes() === 0) {
    if (now.getMinutes() === 0) {
      client.channels.cache.get('1059232905886437496').send('Started sending notifications!')
      const total = await handle(client)
      client.channels.cache.get('1059232905886437496').send('Finished sending notifications!')
      client.channels.cache.get('1059232905886437496').send('Total send: ' + total)
    }


    now = new Date();                  // allow for time passing
    let delay = 60000 - (now.getSeconds() % 60000); // exact ms to next minute interval
    setTimeout(loop, delay);
  }

  client.channels.cache.get('1059232905886437496').send('Started!')
  await loop()
}

async function handle(client: any) {
  let counter = 0;
  const now = new Date()
  for (let notification of await notifications) {
    if (notification.date.getTime() > now.getTime()) {
      client.channels.cache.get(notification.channel).send(await formMsg(notification))
      counter++;
    }
  }
  return counter;
}

async function formMsg(notification: Notification) :Promise<String> {
  let str =
`
${notification.customText==null ? "Aamujaaaa " : notification.customText} <@${notification.to}>
Viellä ${MorningsLeft(notification.date)} aamua jäljellä.

${DaysLeftToString(notification.date)}
`

  return str

}
