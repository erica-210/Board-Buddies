import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Home from './Home.jsx';
import SavedGames from './SavedGames.jsx';
import SearchGames from './SearchGames.jsx';
import SingleComment from './singleComment.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      { index: true, element: <Home /> },
      { path: "/saved", element: <SavedGames /> },
      { path: "/search", element: <SearchGames /> },
      { path: "/comments", element: <SingleComment /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)