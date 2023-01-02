import {MorningService} from "./services/morning-service";
import {Notification} from "./entities/notifications";
import {DaysLeftToString, MorningsLeft} from "./utils/time";

const morningServices = new MorningService()
let notifications = morningServices.getNotifications();

export async function run(client: any) {

  // Infinite recursion, runs once per minute
  async function loop() {
    let now = new Date();

    // 06:00
    if (now.getHours() === 6 && now.getMinutes() === 0) {
      client.channels.cache.get('1059232905886437496').send('Started sending notifications!')
      const total = await handle(client, false)
      client.channels.cache.get('1059232905886437496').send('Finished sending notifications! \nTotal send: ' + total)
    }

    // XX:55
    if (now.getMinutes() === 55) {
      // refresh notifications
      notifications = morningServices.getNotifications();
    }

    // XX:XX
    const total = await handle(client, true)
    if (total > 0) client.channels.cache.get('1059232905886437496').send('Finished sending Debug notifications! \nTotal send: ' + total)

    now = new Date();                  // allow for time passing
    let delay = 60000 - (now.getSeconds() % 60000); // exact ms to next minute interval
    setTimeout(loop, delay);
  }

  // Start up notification
  client.channels.cache.get('1059232905886437496').send('Started!')
  await loop()
}

// Sends Notification messages
async function handle(client: any, debug: boolean) {
  let counter = 0;
  const now = new Date()
  for (let notification of await notifications) {
    if (debug) {
      if (notification.customText == "DEBUG") {
        client.channels.cache.get(notification.channel).send(await formMsg(notification))
        counter++;
      }
    } else {
      if (notification.date.getTime() > now.getTime()) {
        client.channels.cache.get(notification.channel).send(await formMsg(notification))
        counter++;
      }
    }
  }
  return counter;
}

// Forms Notification message string
async function formMsg(notification: Notification): Promise<String> {
  let str =
    `
${notification.customText == null ? "Aamujaaaa " : notification.customText} <@${notification.to}>
Viellä ${MorningsLeft(notification.date)} aamua jäljellä.

${DaysLeftToString(notification.date)}
`

  return str
}
