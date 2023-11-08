import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import Error from './src/pages/Error';

import Home from './src/pages/Home';
import Food from './src/pages/Food';
import Electronics from './src/pages/Electronics';
import HouseSupplies from './src/pages/HouseSupplies';
import Toys from './src/pages/Toys';
import Books from './src/pages/Books';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Food',
        element: <Food />,
      },
      {
        path: '/Electronics',
        element: <Electronics />,
      },
      {
        path: '/HouseSupplies',
        element: <HouseSupplies />,
      },
      {
        path: '/Toys',
        element: <Toys />,
      },
      {
        path: '/Books',
        element: <Books />,
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
