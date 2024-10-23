import { useEffect, useState } from 'react';
import styles from './App.module.css';
import DeviceList from './components/device-list/DeviceList';
import Graph from './components/graph/Graph';
import Navbar from './components/Navbar';
import { NetworkDTO } from './data/dto';

const simpleTopology: NetworkDTO = {
  nodes: ['h1', 'h2', 's1'],
  links: [
    {
      start: 'h1',
      end: 's1',
      label: '50 Mbit/s',
    },
    {
      start: 's1',
      end: 'h1',
      label: '123 Mbit/s',
    },
    {
      start: 's1',
      end: 'h2',
      label: '2137 Mbit/s',
    },
    {
      start: 'h2',
      end: 's1',
      label: '2137 Mbit/s',
    },
  ],
};

function useNetworkData() {
  const [network, setNetwork] = useState<NetworkDTO>({ links: [], nodes: [] });

  useEffect(() => {
    const interval = setInterval(() => {
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
