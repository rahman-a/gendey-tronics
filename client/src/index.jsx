import React from 'react'
import ReactDOM, { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { store } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './index.scss'
import App from './App'

const helmetContext = {}

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  hydrate(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>,
    rootElement
  )
} else {
  ReactDOM.render(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <Router>
//         <App />
//       </Router>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )
