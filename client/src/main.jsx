import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import SingleAnime from './pages/SingleAnime.jsx';
import Profile from './pages/Profile';
import SearchAnimes from './pages/SearchAnime.jsx';
import SinglePost from './pages/SinglePost';
import Thread from './pages/Thread';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      { index: true, element: <Home /> },
      { path: "/profile", element: <Profile /> },
      { path: "/search", element: <SearchAnimes /> },
      { path: "/anime/:id", element: <SingleAnime /> },
      { path: "/post/:id", element: <SinglePost /> },
      { path: "/thread", element: <Thread />},
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
) 