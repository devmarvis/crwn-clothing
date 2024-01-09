import { createBrowserRouter,  
  RouterProvider
} from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: "shop",
        element: <h1>I am the shop</h1>
      },
      {
        path: "auth",
        element: <Authentication />
      },
    ]
    
  }
])


function App() {

  return <RouterProvider router={router} />
  
}

export default App;
