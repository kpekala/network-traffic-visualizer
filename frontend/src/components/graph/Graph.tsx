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
      'background-color': '#a78bfa',
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
  if (network.nodes.length !== 0) {
    if (!isNetworkCreated.current) {
      isNetworkCreated.current = true;
      network.nodes.forEach((node) => {
        cy?.add({ data: { id: node.name } });
      });
      network.links.forEach((link) => {
        cy?.add({
          data: {
            id: link.node1 + link.node2,
            source: link.node1,
            target: link.node2,
            label: link.label,
          },
        });
      });
      cy?.layout({ name: 'fcose' }).run();
      cy?.forceRender();
    } else {
      network.links.forEach((link) => {
        const edge = cy?.getElementById(link.node1 + link.node2);
        if (link.timestamp > 5000) {
          console.log(
            `removing ${link.node1 + link.node2} because timestamp diff is ${
              link.timestamp
            }`
          );
          edge?.remove();
        } else if (edge?.length === 0) {
          console.log('adding link ' + link.node1 + link.node2);
          cy?.add({
            data: {
              id: link.node1 + link.node2,
              source: link.node1,
              target: link.node2,
              label: link.label,
            },
          });
        } else {
          console.log('updating label');
          edge?.data('label', link.label);
        }
      });
    }
  }
  return <div id='graph' className={`${styles.graph} grow`} />;
}
