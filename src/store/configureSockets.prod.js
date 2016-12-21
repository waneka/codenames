import { Socket } from 'phoenix';


export default function configureSockets() {
  const socket = new Socket("/socket", {params: {}});
  socket.connect();

  const channel = socket.channel("game:public", {});
  return channel;
}
