import React, {useState, useEffect} from 'react';
import { LandingPage } from './screens/Home/Landing';
// import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { CampRegistrationPage } from './screens/Home/sections/Registration/CampRegistration';
import { useRouteContext } from './util/context/routeContext';




function App() {

  const routeContext = useRouteContext();
  
  const [currentView, setCurrentView] = useState('/');

  const printElementWithValueOne = (context) => {
    // Loop through each property in the object
    for (const key in context) {
        // Check if the property's value is strictly equal to 1
        if (context[key] === 1) {
          if(key === 'home'){
            setCurrentView(`/`)
          }else{
            setCurrentView(`/${key}`)
          }
        }
    }
};

  useEffect(() => {
  // Call the function with your context
  printElementWithValueOne(routeContext);
  }, [routeContext]);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <>
  //       {/* to-do finsih responsive styling for mobile/tablets */}
  //       <Route path="/" index element={<LandingPage />} />
  //       {/* Registration route */}
  //       <Route path="/registration" element={<CampRegistrationPage/>} />
  //     </>
  //     )
  //   )

  return (
    <>
        {/* <RouterProvider router={router}/>  */}

        { currentView === '/' && <LandingPage /> }
        { currentView === "/registration" && <CampRegistrationPage/> }
    </>
  );
}

export default App;
