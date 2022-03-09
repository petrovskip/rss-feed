
import Layout from './components/Layout';
import { Spinner } from 'react-bootstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Layout
      subscribe={true}
      loadingComponent={() =>
        <div className='centered'>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
      errorComponent={() => <div className='centered'>Failed to load resource https://dev98.de/feed!</div>} />
  );
}

export default App;
