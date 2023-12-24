import { useEffect, useState } from 'react';
import { Buttons, Flex, Loader, Modal, Table } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_NAMES } from '../../../../constants';
import { Divider, Typography } from '@mui/material';
import { confirmOrder, getAllOrders, markCookedOrder } from '../../../../store/orders/duck';
import { ROLES } from '../../../../constants/common';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getLocaleDateWithoutTime } from '../../../../utils/helpers';

const ordersHeadCells = [
  {
    id: 'id',
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'total_cost',
    disablePadding: false,
    label: 'Total cost',
  },
  {
    id: 'table_id',
    disablePadding: false,
    label: 'Table',
  },
  {
    id: 'created_at',
    disablePadding: false,
    label: 'Creation time',
  },
];

const ordersTableCells = ordersHeadCells.map(cell => cell.id);

const toolbarTitles = {
  allOrders: 'All orders',
  filteredOrders: 'Filtered orders',
};

const transformDate = dateString => {
  const [date, time] = dateString.split('T');
  return `${date} ${time.split('.')[0]}`;
};

const convertData = data =>
  data.map(({ dishes, order: { created_at, ...order } }) => ({
    dishes,
    order: {
      created_at: transformDate(created_at),
      ...order,
    },
  }));

const Orders = () => {
  const dispatch = useDispatch();

  const { isPending } = useSelector(state => state[STORE_NAMES.ORDERS]);
  const { worker_info } = useSelector(store => store[STORE_NAMES.AUTH]);

  const [stats, setStats] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [ordersList, setOrdersList] = useState([]);
  const [toolbarTitle, setToolbarTitle] = useState(toolbarTitles.allOrders);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(ordersTableCells[0]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(16);

  const loadOrdersListFunction = async (dateFrom, dateTo) => {
    const res = await dispatch(getAllOrders({ dateFrom, dateTo }));
    setOrdersList(convertData(res.payload.orders));
    setStats(res.payload.stats);
    setToolbarTitle(dateFrom || dateTo ? toolbarTitles.filteredOrders : toolbarTitles.allOrders);
  };

  useEffect(() => {
    let dateToTransformed;
    let dateFromTransformed;
    if (dateFrom) {
      dateFromTransformed = getLocaleDateWithoutTime(dateFrom);
    }
    if (dateTo) {
      dateToTransformed = getLocaleDateWithoutTime(dateTo);
    }

    loadOrdersListFunction(dateFromTransformed, dateToTransformed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo]);

  const handleOrderClick = (event, orderId) => {
    if (event.target.closest('input[type="checkbox"]')) {
      return;
    }

    const order = ordersList.find(({ order }) => order.id === orderId);
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const selectedStateActions = workerRole => {
    if (workerRole === ROLES.CHEF) {
      const handleMarkCooked = async () => {
        await Promise.all(selected.map(id => dispatch(markCookedOrder(id))));
        await loadOrdersListFunction();
        setSelected([]);

        toast.success('Orders are marked as cooked successfully!');
      };
      return (
        <Buttons.PrimaryContainedBtn
          title="Mark as Cooked"
          sx={{ maxWidth: '200px' }}
          onClick={handleMarkCooked}
        />
      );
    }

    if (workerRole === ROLES.WAITER) {
      const handleConfirm = async () => {
        await Promise.all(selected.map(id => dispatch(confirmOrder(id))));
        await loadOrdersListFunction();
        setSelected([]);

        toast.success('Orders are confirmed successfully!');
      };
      return (
        <Buttons.PrimaryContainedBtn
          title="Confirm"
          sx={{ maxWidth: '200px' }}
          onClick={handleConfirm}
        />
      );
    }

    return <></>;
  };

  const handleDateToChange = newDate => {
    setDateTo(newDate);
    setStats([]);
  };

  const handleDateFromChange = newDate => {
    setDateFrom(newDate);
    setStats([]);
  };

  return (
    <>
      {worker_info && worker_info.role.title === ROLES.ADMIN && (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Flex margin="20px 0" padding="10px 20px">
            <Flex flexDirection="row" justifyContent="center" gap="20px">
              <DatePicker
                value={dateFrom}
                onChange={handleDateFromChange}
                label="Date From"
                disableFuture
              />
              <DatePicker
                value={dateTo}
                onChange={handleDateToChange}
                label="Date To"
                disableFuture
              />
            </Flex>
            <Typography variant="h5" mt="20px" textAlign="center">{`Total income: ${
              stats.length ? stats[0].totalIncome : '...'
            }`}</Typography>
          </Flex>
        </LocalizationProvider>
      )}
      {!isPending ? (
        <Table
          rows={ordersList.map(({ order }) => order)}
          headCells={ordersHeadCells}
          tableCells={ordersTableCells}
          toolbarTitle={toolbarTitle}
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
          selectedStateActions={selectedStateActions(worker_info?.role.title)}
          handleTableRowClick={handleOrderClick}
          notAllowToSelect={worker_info?.role.title === ROLES.ADMIN}
        />
      ) : (
        <Loader />
      )}
      <Modal open={isOrderModalOpen} setOpen={setIsOrderModalOpen}>
        <Typography variant="h4" textAlign="center">
          Dishes
        </Typography>
        <Flex>
          <Flex flexDirection="row" justifyContent="space-between">
            <Typography variant="h5">Name</Typography>
            <Typography variant="h5">Quantity</Typography>
          </Flex>
          <Divider />
          {selectedOrder &&
            selectedOrder.dishes.map(({ count, dish: { id, name } }) => (
              <Flex key={id} flexDirection="row" justifyContent="space-between">
                <Typography variant="h6">{name}</Typography>
                <Typography variant="h6">{count}</Typography>
              </Flex>
            ))}
        </Flex>
      </Modal>
    </>
  );
};

export default Orders;
