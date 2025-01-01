import { label } from 'framer-motion/client';
import { Link, NetworkDTO, Node } from '../../data/dto';

export default function DeviceList({ network }: { network: NetworkDTO }) {
  return (
    <div className='z-10 h-full bg-gray-50 border-r'>
      <ul className='space-y-4' style={{ paddingTop: 8 }}>
        {network.nodes.map((node) => (
          <NodeItem node={node} key={node.name} />
        ))}
        {network.links.map((link) => (
          <LinkItem link={link} key={`${link.node1}${link.node2}`} />
        ))}
      </ul>
    </div>
  );
}

function NodeItem({ node }: { node: Node }) {
  return <li className='pl-4 pr-4'>{node.name}</li>;
}

function LinkItem({ link }: { link: Link }) {
  return (
    <div className='w-48 pl-4 pr-4'>
      <h4 className='text-sm font-bold'>
        Link {link.node1} &rarr; {link.node2}
      </h4>
      <p>Load: {link.label}</p>
    </div>
  );
}
