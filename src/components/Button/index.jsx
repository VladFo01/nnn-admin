import { Button } from '@mui/material';

const PrimaryContainedBtn = ({
  title, onClick, isDisabled, sx, ...other
}) => (
  <Button color="primary" variant="contained" disabled={isDisabled} fullWidth onClick={onClick} sx={sx} {...other}>
    {title}
  </Button>
);

const PrimaryTextBtn = ({
  title, onClick, isDisabled, sx,
}) => (
  <Button color="primary" variant="text" isDisabled={isDisabled} fullWidth onClick={onClick} sx={sx}>
    {title}
  </Button>
);

const SecondaryContainedBtn = ({
  title, onClick, isDisabled, sx,
}) => (
  <Button
    variant="contained"
    color="secondary"
    sx={{
      backgroundColor: '#E8E8E8',
      color: 'rgba(0, 0, 0, 0.54)',
      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24)',
      '&:hover': {
        backgroundColor: '#bfbfbf',
      },
      ...sx,
    }}
    disabled={isDisabled}
    onClick={onClick}
  >
    {title}
  </Button>
);

const SecondaryOutlinedBtn = ({
  title, onClick, isDisabled, sx,
}) => (
  <Button
    variant="outlined"
    color="secondary"
    sx={sx}
    disabled={isDisabled}
    onClick={onClick}
  >
    {title}
  </Button>
);

const ErrorOutlinedButton = ({
  title, onClick, isDisabled, sx,
}) => (
  <Button color="error" variant="outlined" isDisabled={isDisabled} fullWidth onClick={onClick} sx={sx}>
    {title}
  </Button>
);

const Buttons = {
  PrimaryContainedBtn,
  PrimaryTextBtn,
  ErrorOutlinedButton,
  SecondaryContainedBtn,
  SecondaryOutlinedBtn,
};

export default Buttons;
