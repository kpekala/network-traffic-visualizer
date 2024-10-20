import { useEffect, useRef, useState } from 'react';
import cytoscape, { ElementDefinition, ElementsDefinition } from 'cytoscape';
import styles from './Graph.module.css';
import fcose from 'cytoscape-fcose';
import { NetworkDTO } from '../../data/dto';
import { li } from 'framer-motion/client';
import { Box } from '@chakra-ui/react';

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

export default function Graph({ network }: { network: NetworkDTO }) {
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
  if (network.nodes.length !== 0 && !isNetworkCreated.current) {
    isNetworkCreated.current = true;
    network.nodes.forEach((node) => {
      cy?.add({ data: { id: node } });
    });
    network.links.forEach((link) => {
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

  return <Box flexGrow={1} id='graph' className={styles.graph} />;
}
