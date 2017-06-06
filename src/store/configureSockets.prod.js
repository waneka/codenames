import { Socket } from 'phoenix';


export default function configureSockets(path) {
  const socket = new Socket("/socket", {params: {}});
  socket.connect();

  const room = "game:" + path.match(/\/([^\/]*)(\/|$)/)[1]
  const channel = socket.channel(room, {});
  return channel;
}
