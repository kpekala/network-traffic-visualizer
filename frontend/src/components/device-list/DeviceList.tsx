import { Divider, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { Link, NetworkDTO } from '../../data/dto';

export default function DeviceList({ network }: { network: NetworkDTO }) {
  return (
    <List spacing={3} width={256} padding={4} backgroundColor={'teal.50'}>
      {network.nodes.map((node) => (
        <NodeItem name={node} />
      ))}
      {network.links.map((link) => (
        <LinkItem link={link} />
      ))}
    </List>
  );
}

function NodeItem({ name }: { name: string }) {
  return <ListItem>{name}</ListItem>;
}

function LinkItem({ link }: { link: Link }) {
  return (
    <ListItem>
      <Heading as='h4' size='sm'>
        Link {link.start} &rarr; {link.end}
      </Heading>
      <Text>Load: {link.load}</Text>
    </ListItem>
  );
}
