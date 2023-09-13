import { useContext } from 'react';
import ChatInput from './ChatInput';
import MessagesList from './MessagesList';
import { supabase } from '../../supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';

type Props = {
  chatRoomId: string | undefined;
};

function Chat({ chatRoomId }: Props) {
  // @ts-ignore
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await supabase
        .from('messages')
        .select()
        .eq('chat_room_id', chatRoomId);
      return data;
    },
    queryKey: ['messages'],
    staleTime: Infinity,
    cacheTime: 0,
  });

  if (isLoading)
    return <div className="text-center animate-pulse">Loading messages...</div>;

  const messages: Message[] | undefined = data?.map((message) => ({
    ...message,
  }));

  console.log(messages);

  if (data)
    return (
      <div className="flex flex-col h-full">
        <MessagesList messages={messages} />
        {user && <ChatInput chatRoomId={chatRoomId} />}
      </div>
    );
}

export default Chat;
