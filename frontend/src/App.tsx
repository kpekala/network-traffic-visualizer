import { useEffect, useState } from 'react';
import styles from './App.module.css';
import DeviceList from './components/device-list/DeviceList';
import Graph from './components/graph/Graph';
import Navbar from './components/Navbar';
import { NetworkDTO } from './data/dto';

function useNetworkData() {
  const [network, setNetwork] = useState<NetworkDTO>({ links: [], nodes: [] });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://192.168.0.107:8080/backend/data')
        .then(async (result) => result.json())
        .then((data) => {
          setNetwork(data);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return network;
}

function App() {
  const network = useNetworkData();

  return (
    <div className={styles.container}>
      <Navbar />
      <div className='h-full flex'>
        <DeviceList network={network} />
        <Graph network={network} />
      </div>
    </div>
  );
}

export default App;
