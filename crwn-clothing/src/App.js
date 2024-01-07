import { createBrowserRouter,  
  RouterProvider
} from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.component';



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
        path: "sign-in",
        element: <SignIn />
      },
    ]
    
  }
])


function App() {

  return <RouterProvider router={router} />
  
}

export default App;
