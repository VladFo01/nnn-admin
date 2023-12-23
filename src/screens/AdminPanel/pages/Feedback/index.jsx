import { useEffect, useState } from 'react';
import { Loader, Table } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFeedbackById, getAllFeedback } from '../../../../store/feedback/duck';
import { STORE_NAMES } from '../../../../constants';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const feedbackHeadCells = [
  {
    id: 'phoneNumber',
    disablePadding: false,
    label: 'Phone number',
  },
  {
    id: 'rating',
    disablePadding: false,
    label: 'Rating',
  },
  {
    id: 'text',
    disablePadding: false,
    label: 'Text',
  },
];

const feedbackTableCells = feedbackHeadCells.map(cell => cell.id);

const convertData = data =>
  data.map(({ _id, ...data }) => ({
    id: _id,
    ...data,
  }));

const Feedback = () => {
  const dispatch = useDispatch();

  const { isPending } = useSelector(state => state[STORE_NAMES.FEEDBACK]);

  const [feedbackList, setFeedbackList] = useState([]);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(feedbackTableCells[0]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(16);

  const loadListFunction = async () => {
    const res = await dispatch(getAllFeedback());
    setFeedbackList(convertData(res.payload));
  };

  const deleteItemFunction = async itemId => {
    await dispatch(deleteFeedbackById(itemId));
  };

  useEffect(() => {
    loadListFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteButtonClick = async () => {
    await Promise.all(selected.map(id => deleteItemFunction(id)));
    await loadListFunction();
    setSelected([]);
  };

  const selectedStateActions = (
    <Tooltip title="Delete">
      <IconButton onClick={handleDeleteButtonClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );

  if (isPending) return <Loader />;

  return (
    <Table
      rows={feedbackList}
      headCells={feedbackHeadCells}
      tableCells={feedbackTableCells}
      toolbarTitle="All data"
      order={order}
      setOrder={setOrder}
      page={page}
      setPage={setPage}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      selected={selected}
      setSelected={setSelected}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
      selectedStateActions={selectedStateActions}
    />
  );
};

export default Feedback;
