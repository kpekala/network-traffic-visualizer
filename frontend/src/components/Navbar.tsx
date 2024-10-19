import { Box } from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Box bg='gray.100' px={4}>
      <Box
        h={16}
        fontSize='1.5rem'
        display='flex'
        flexDirection='column'
        justifyContent={'center'}
      >
        Network Traffic Visualizer
      </Box>
    </Box>
  );
}
