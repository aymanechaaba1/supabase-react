import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ChatRoom from './components/chat-room/ChatRoom';
import ChatRoomsList, { chatRoomsLoader } from './components/ChatRoomsList';
import Home from './components/Home';

import HomeLayout from './layouts/HomeLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/chat-rooms',
        element: <ChatRoomsList />,
        loader: chatRoomsLoader,
      },
      {
        path: '/chat/:chatRoomId',
        element: <ChatRoom />,
      },
    ],
  },
]);

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
