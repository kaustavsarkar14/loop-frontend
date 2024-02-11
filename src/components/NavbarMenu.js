import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function NavbarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='cursor-pointer'
      >
        <MenuRoundedIcon/>
      </div>
      <Menu
      
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className='flex flex-col w-[5rem]' >
            <button>Profile</button>
            <hr className='opacity-20' />
            <button>Log out</button>
        </div>
      </Menu>
    </div>
  );
}