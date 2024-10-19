import Graph from './components/graph/Graph';
import Navbar from './components/Navbar';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Graph />
    </div>
  );
}

export default App;
