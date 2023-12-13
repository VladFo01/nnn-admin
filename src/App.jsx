import { Provider } from 'react-redux';
import { store } from './store/config';
import { Router } from './router';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Provider store={store}>
    <Router />
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      icon={false}
    />
  </Provider>
);

export default App;
