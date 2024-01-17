import { createBrowserRouter,  
  RouterProvider
} from 'react-router-dom';
import { useEffect } from 'react';

import { 
  createUserDocFromAuth, 
  getCategoriesAndDocument, 
  onAuthStateChangedListener 
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from './store/user/user.action';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import CategoriesPreview from './routes/categories-preview/categories-preview-component';
import Category from './routes/categories-preview/category/category.component';
import { useDispatch, } from 'react-redux';
import { setCategoriesMap } from './store/category/category.action';




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
        element: <Shop />,
        children: [
          {
            index: true,
            element: <CategoriesPreview />
          },
          {
            path: ":category",
            element: <Category />
          },
        ]
      },
      {
        path: "auth",
        element: <Authentication />
      },
      {
        path: "checkout",
        element: <Checkout />
      }
    ]
    
  }
])


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if(user){
            createUserDocFromAuth(user)
        }
        dispatch(setCurrentUser(user));
        
    });

    return unsubscribe;
  }, []);



  return <RouterProvider router={router} />
  
}

export default App;
