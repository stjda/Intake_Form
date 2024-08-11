import React from 'react';
import { LandingPage } from './screens/Home/Landing';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { CampRegistrationPage } from './screens/Home/sections/Registration/CampRegistration';





function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* to-do finsih responsive styling for mobile/tablets */}
        <Route path="/" index element={<LandingPage />} />
        {/* Registration route */}
        <Route path="/registration" element={<CampRegistrationPage/>} />
      </>
      )
    )

  return (
    <>
        <RouterProvider router={router}/> 
    </>
  );
}

export default App;
