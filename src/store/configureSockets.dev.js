import { Socket } from 'phoenix';


export default function configureSockets() {
  const socket = new Socket("ws://localhost:4000/socket", {params: {}});
  socket.connect();

  const channel = socket.channel("game:public", {});
  return channel;
}
