import { io } from "socket.io-client";

export default class SocketService {
  connect(baseUrl) {
    return io(baseUrl);
  }

  disconnect(connection) {
    connection.disconnect();
  }
}
