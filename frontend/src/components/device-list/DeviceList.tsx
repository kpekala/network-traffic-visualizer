import { label } from 'framer-motion/client';
import { Link, NetworkDTO } from '../../data/dto';

export default function DeviceList({ network }: { network: NetworkDTO }) {
  return (
    <div className='z-10 h-full bg-gray-50 border-r'>
      <ul className='space-y-4' style={{ paddingTop: 8 }}>
        {network.nodes.map((node) => (
          <NodeItem name={node} key={node} />
        ))}
        {network.links.map((link) => (
          <LinkItem link={link} key={`${link.start}${link.end}`} />
        ))}
      </ul>
    </div>
  );
}

function NodeItem({ name }: { name: string }) {
  return <li className='pl-4 pr-4'>{name}</li>;
}

function LinkItem({ link }: { link: Link }) {
  return (
    <div className='w-48 pl-4 pr-4'>
      <h4 className='text-sm font-bold'>
        Link {link.start} &rarr; {link.end}
      </h4>
      <p>Load: {link.label}</p>
    </div>
  );
}
