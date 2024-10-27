import { io, Socket } from "socket.io-client";

export let socket: Socket;

const initSocket = async () => {
    console.log('creating socket...');
    let s = io(import.meta.env.VITE_WS_URL, {  });
    socket = s;

    s.on("connect", () => {
        console.log('socket created with ID:', s.id); 
    });

    s.on("connect_error", (error) => {
        console.error('Failed to connect', error);
    });

    s.on("error", (error) => {
        console.error('Error on socket', error);
    });
};
initSocket();
