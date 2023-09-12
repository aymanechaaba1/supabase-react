import ClientPusher from 'pusher-js';
import ServerPusher from 'pusher';

export const clientPusher = new ClientPusher('521ada7c1d478e67acbb', {
  cluster: 'eu',
});

export const serverPusher = new ServerPusher({
  appId: '1669313',
  key: '521ada7c1d478e67acbb',
  secret: 'df94868c8aefe91a4100',
  cluster: 'eu',
  useTLS: true,
});
