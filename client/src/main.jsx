import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './pages/Home';
import SingleGame from './pages/SingleGame';
import Profile from './pages/Profile';
import SearchGames from './pages/SearchGames';
import SinglePost from './pages/SinglePost';
import Saved from './pages/SavedGames';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      { index: true, element: <Home /> },
      { path: "/profiles/:username", element: <Profile /> },
      { path: "/search", element: <SearchGames /> },
      { path: "/boardgame/:id", element: <SingleGame /> },
      { path: "/post/:id", element: <SinglePost /> },
      { path: "/saved", element: <Saved /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
) 