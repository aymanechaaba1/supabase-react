import { supabase } from '../supabaseClient';
import { Link, useLoaderData } from 'react-router-dom';

export type ChatRoom = {
  chat_room_id?: string;
  created_at: string;
  title: string;
  description?: string;
  logo?: string;
};

export const chatRoomsLoader = async () => {
  const { data: chatRooms } = await supabase.from('chat-rooms').select();
  return chatRooms;
};

function ChatRoomsList() {
  // @ts-ignore
  const chatRooms: ChatRoom[] = useLoaderData();

  return (
    <>
      <h1 className="text-center font-medium">Chat Rooms</h1>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {chatRooms?.map((chatRoom) => (
          <Link
            key={chatRoom.chat_room_id}
            to={`/chat/${chatRoom.chat_room_id}`}
          >
            <div className="rounded-lg hover:shadow-lg p-4 border space-y-2">
              <img
                src={chatRoom.logo}
                className="w-12 h-12 rounded-full object-cover"
                alt=""
              />
              <div>
                <h1>{chatRoom.title}</h1>
                <p className="text-sm">{chatRoom.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ChatRoomsList;
