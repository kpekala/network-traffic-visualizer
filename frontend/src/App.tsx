import { useEffect, useState } from 'react';
import styles from './App.module.css';
import DeviceList from './components/device-list/DeviceList';
import Graph from './components/graph/Graph';
import Navbar from './components/Navbar';
import { NetworkDTO } from './data/dto';

const simpleTopology: NetworkDTO = {
  nodes: [{ name: 'h1' }, { name: 'h2' }, { name: 's1' }],
  links: [
    {
      node1: 'h1',
      node2: 's1',
      label: '50 Mbit/s',
    },
    {
      node1: 's1',
      node2: 'h1',
      label: '123 Mbit/s',
    },
    {
      node1: 's1',
      node2: 'h2',
      label: '2137 Mbit/s',
    },
    {
      node1: 'h2',
      node2: 's1',
      label: '2137 Mbit/s',
    },
  ],
};

function useNetworkData() {
  const [network, setNetwork] = useState<NetworkDTO>({ links: [], nodes: [] });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://192.168.100.116:8080/backend/data')
        .then(async (result) => result.json())
        .then((data) => {
          console.log(data);
        });
      setNetwork(simpleTopology);
    }, 2000);
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
