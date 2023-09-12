import { useParams } from 'react-router-dom';
import Chat from './Chat';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

function ChatRoom() {
  const { chatRoomId } = useParams();

  return (
    <>
      <Chat chatRoomId={chatRoomId} />
    </>
  );
}

export default ChatRoom;
