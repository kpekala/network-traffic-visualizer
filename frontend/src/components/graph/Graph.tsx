import { useEffect, useRef, useState } from 'react';
import cytoscape, { ElementDefinition, ElementsDefinition } from 'cytoscape';
import styles from './Graph.module.css';
import fcose from 'cytoscape-fcose';
import { NetworkDTO } from '../../data/dto';
import { li } from 'framer-motion/client';

const style = [
  // the stylesheet for the graph
  {
    selector: 'node',
    style: {
      'background-color': '#666',
      label: 'data(id)',
    },
  },

  {
    selector: 'edge',
    style: {
      width: 3,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
    },
  },
];

const simpleTopology: NetworkDTO = {
  nodes: ['h1', 'h2', 's1'],
  links: [
    {
      start: 'h1',
      end: 's1',
      load: 50,
    },
    {
      start: 's1',
      end: 'h1',
      load: 123,
    },
    {
      start: 's1',
      end: 'h2',
      load: 2137,
    },
    {
      start: 'h2',
      end: 's1',
      load: 2137,
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

export default function Graph() {
  const [cy, setCy] = useState<null | cytoscape.Core>(null);

  useEffect(() => {
    cytoscape.use(fcose);
    const cy = cytoscape({
      container: document.getElementById('graph'),
      elements: [],
      style,
      layout: {
        name: 'fcose',
      },
    });
    setCy(cy);
  }, []);
  const isNetworkCreated = useRef(false);
  const networkDTO = useNetworkData();
  if (networkDTO.nodes.length !== 0 && !isNetworkCreated.current) {
    isNetworkCreated.current = true;
    networkDTO.nodes.forEach((node) => {
      cy?.add({ data: { id: node } });
    });
    networkDTO.links.forEach((link) => {
      cy?.add({
        data: {
          id: link.start + link.end,
          source: link.start,
          target: link.end,
        },
      });
    });
    cy?.layout({ name: 'fcose' }).run();
    cy?.forceRender();
  }

  return <div id='graph' className={styles.graph}></div>;
}
