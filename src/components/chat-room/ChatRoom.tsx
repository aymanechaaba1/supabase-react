import { useParams } from 'react-router-dom';
import Chat from './Chat';

function ChatRoom() {
  const { chatRoomId } = useParams();

  return (
    <>
      <Chat chatRoomId={chatRoomId} />
    </>
  );
}

export default ChatRoom;
