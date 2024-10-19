import { useEffect } from 'react';
import cytoscape, { ElementDefinition, ElementsDefinition } from 'cytoscape';
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
    },
  },
];

const simpleTopology: ElementDefinition[] = [
  {
    data: { id: 'h1' },
  },
  {
    data: { id: 'h2' },
  },
  { data: { id: 's1' } },
  {
    data: { id: 'h1s1', source: 'h1', target: 's1' },
  },
  {
    data: { id: 's1h1', source: 's1', target: 'h1' },
  },
  {
    data: { id: 's1h2', source: 's1', target: 'h2' },
  },
  {
    data: { id: 'h2s1', source: 'h2', target: 's1' },
  },
];

export default function Graph() {
  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById('graph'), // container to render in

      elements: simpleTopology,
      style,

      layout: {
        name: 'grid',
        rows: 1,
      },
    });
  }, []);

  return <div id='graph' className={styles.graph}></div>;
}
