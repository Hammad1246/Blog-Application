import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import {Provider} from "react-redux"


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Home, AddPost, Post, Signup, Login, YourPosts, Contact, About, LandingPage, EditPost} from "./pages/index"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/add-post", element: <AddPost /> },
      { path: "/post/:slug", element: <Post /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/your-posts", element: <YourPosts /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/", element: <LandingPage /> },
      { path: "/edit-post/:slug", element: <EditPost /> },

    ]
    
  }
]);


createRoot(document.getElementById('root')).render(
  
     <Provider store={store}>
       <RouterProvider router={router} />
     </Provider>
)
