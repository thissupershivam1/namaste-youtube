
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import store from './utils/Store';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';
import { Suspense, lazy } from 'react';
import SearchResultsPage from './components/SearchResultPage';

const appRouter = createBrowserRouter([{
  path: "/",
  element: <Body/>,
  children: [
    {
      path: "/",
      element: <MainContainer/>,

    },
    {
                  path: "watch",
                 element: <Suspense><WatchPage /></Suspense>,
    },
               {
                path: "search",
                element: <Suspense><SearchResultsPage /></Suspense>,
              },
  ],

},
]);



function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Header/>
      <RouterProvider router={appRouter}/>
      
    </div>
    </Provider>
  );
}

export default App;


// import { Provider } from 'react-redux';
// import './App.css';
// import Body from './components/Body';
// import Header from './components/Header';
// import store from './utils/Store';
// import { Outlet, Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
// import MainContainer from './components/MainContainer';
// import { Suspense, lazy } from 'react';


// const WatchPage = lazy(() => import("../src/components/WatchPage") );
// const SearchResultsPage = lazy(() => import('../src/components/SearchResultPage'));

// export const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element : <App />,
//     errorElement : <></>,
//     children:[
//       {
//         path: "/",
//         element: <Body />,
//         children:[
//           {
//             path:"/",
//             element: <MainContainer />
//           },
//           {
//             path: "watch",
//             element: <Suspense><WatchPage /></Suspense>,
//           },
//           {
//             path: "search",
//             element: <Suspense><SearchResultsPage /></Suspense>,
//           },
//         ]
//       },
//     ]
//   }
// ])


// function App() {
//   return (
//     <Provider store={store}>
//       <Header />
//       {/* Here Outlet Gives the Child */}
//       <Outlet />
//     </Provider>
//   )
// }
// export default App;
