/// <reference types="vite/client" />

type Message = {
  message_id?: string;
  chat_room_id: string | undefined;
  created_at?: string;
  content: string;
  user_id: string;
};

type User = {
  user_id?: string;
  name: string;
  email: string;
  image: string;
  loggedIn?: false;
  active?: false;
};
