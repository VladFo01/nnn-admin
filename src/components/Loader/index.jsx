import { CircularProgress } from '@mui/material';
import Flex from '../Flex';

const Loader = ({ height, size }) => (
  <Flex alignItems="center" justifyContent="center" height={height}>
    <CircularProgress size={size} />
  </Flex>
);

export default Loader;
