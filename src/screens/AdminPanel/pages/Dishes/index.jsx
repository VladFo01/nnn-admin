import { useEffect, useState } from 'react';
import { Flex, Loader, Table } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  createMenu,
  getActiveMenu,
  getAllDishes,
  setMenuActive,
} from '../../../../store/dishes/duck';
import { STORE_NAMES } from '../../../../constants';
import { IconButton, Tooltip } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import FilterListIcon from '@mui/icons-material/FilterList';
import { toast } from 'react-toastify';

const dishesHeadCells = [
  {
    id: 'name',
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'type_',
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'price',
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'approx_cook_time_s',
    disablePadding: false,
    label: 'Cooking time(s)',
  },
  {
    id: 'portion_weight_g',
    disablePadding: false,
    label: 'Portion weight(g)',
  },
];

const dishesTableCells = dishesHeadCells.map(cell => cell.id);

const toolbarTitles = {
  allDishes: 'All dishes',
  menuDishes: 'Active menu dishes',
};

const Dishes = () => {
  const dispatch = useDispatch();

  const { isPending } = useSelector(state => state[STORE_NAMES.DISHES]);

  const [dishesList, setDishesList] = useState([]);
  const [toolbarTitle, setToolbarTitle] = useState(toolbarTitles.allDishes);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(dishesTableCells[0]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(16);

  const loadAllDishesListFunction = async () => {
    const res = await dispatch(getAllDishes());
    setDishesList(res.payload);
    setToolbarTitle(toolbarTitles.allDishes);
  };

  const loadMenuDishesListFunction = async () => {
    const res = await dispatch(getActiveMenu());
    setDishesList(res.payload);
    setToolbarTitle(toolbarTitles.menuDishes);
  };

  const setMenuWithSelectedDishes = async () => {
    const todaysDate = new Date().toISOString().substring(0, 10);

    await dispatch(
      createMenu({
        dishes: selected,
        date: todaysDate,
      }),
    );
    await dispatch(setMenuActive(todaysDate));
    await loadMenuDishesListFunction();

    setSelected([]);

    toast.success('New menu was set!');
  };

  useEffect(() => {
    loadAllDishesListFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nonSelectedStateActions = (
    <Flex flexDirection="row" gap="10px">
      <Tooltip title="Show all dishes">
        <IconButton onClick={loadAllDishesListFunction}>
          <BrunchDiningIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show dishes from menu">
        <IconButton onClick={loadMenuDishesListFunction}>
          <MenuBookIcon />
        </IconButton>
      </Tooltip>
    </Flex>
  );

  const selectedStateActions = (
    <Tooltip title="Set menu with selected dishes">
      <IconButton onClick={setMenuWithSelectedDishes}>
        <FilterListIcon />
      </IconButton>
    </Tooltip>
  );

  if (isPending) return <Loader />;

  return (
    <Table
      rows={dishesList}
      headCells={dishesHeadCells}
      tableCells={dishesTableCells}
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
      nonSelectedStateActions={nonSelectedStateActions}
      selectedStateActions={selectedStateActions}
    />
  );
};

export default Dishes;
