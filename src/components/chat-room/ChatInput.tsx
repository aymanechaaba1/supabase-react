import { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { supabase } from '../../supabaseClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverPusher } from '../../libs/pusher';

type Props = {
  chatRoomId: string | undefined;
};

function ChatInput({ chatRoomId }: Props) {
  const [content, setContent] = useState<string>('');
  // @ts-ignore
  const { user } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (message: Message) => {
      await supabase.from('messages').insert(message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['messages']);
    },
  });

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!content) return;

    const newMessage: Message = {
      content,
      chat_room_id: chatRoomId,
      user_id: user.id,
    };

    // add message to db
    mutateAsync(newMessage);
    serverPusher.trigger('messages', 'new-message', newMessage);

    // clear input
    setContent('');
  };

  return (
    <form className="flex items-center gap-4 p-4">
      <input
        onChange={(e) => {
          setContent(e.target.value);
        }}
        type="text"
        placeholder="type a message..."
        className="flex-1 rounded-lg shadow-lg py-2 px-4 outline-none border"
      />
      <button
        onClick={sendMessage}
        disabled={!content}
        type="submit"
        className="bg-blue-500 rounded-lg py-2 px-4 text-white font-medium"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
