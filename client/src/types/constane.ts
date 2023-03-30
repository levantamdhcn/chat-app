export enum SOCKET_EVENTS {
    USERS_ONLINE = 'users_online',
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',
    MSG_SEND = 'msg_send',
    MSG_SEND_FILE = 'msg_send:file',
    MSG_RECEIVE = 'msg_receive',
    ERROR = 'error',
    START_TYPING = 'start_typing',
    TYPING = "typing",
    STOP_TYPING = 'stop_typing',
    NEW_LOGIN = 'new_login',
}