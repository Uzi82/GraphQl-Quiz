import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import client from './Apollo/client'
import './style.css'
import Quizes from './Quizes';
import Quize from './Quize'
import { 
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<Menu />}/>
          <Route path='/:quize' element={<Quize />}/>
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);

function Menu(): JSX.Element {
  return(
    <div className='w-screen h-screen screen flex flex-col align-center pt-24 gap-4'>
      <h1 className='text-white text-6xl'>All quizes</h1>
      <div className='h-1 w-3/5 bg-white'></div>
      <Quizes />
    </div>
  )
}