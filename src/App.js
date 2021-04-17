import JobDesc from '../src/containers/JobDesc/JobDesc';
import Header from '../src/components/Header/Header';
import './App.css';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">      
      <Header/>
      <JobDesc/>
      <Footer/>
    </div>
  );
}

export default App;
