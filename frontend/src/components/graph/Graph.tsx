import { Box } from '@chakra-ui/react';
import cytoscape from 'cytoscape';
import fcose from 'cytoscape-fcose';
import { useEffect, useRef, useState } from 'react';
import { NetworkDTO } from '../../data/dto';
import styles from './Graph.module.css';

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
      label: 'data(label)',
      'font-size': '8px',
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
          label: link.label,
        },
      });
    });
    cy?.layout({ name: 'fcose' }).run();
    cy?.forceRender();
  }

  return <Box flexGrow={1} id='graph' className={styles.graph} />;
}
