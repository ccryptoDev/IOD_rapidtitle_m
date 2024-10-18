import React, { BaseSyntheticEvent, useState } from 'react';
import './index.view.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  menuClasses,
  MenuItemStyles,
} from 'react-pro-sidebar';
import { Typography } from '../Typography';
import { SidebarHeader } from '../SidebarHeader';
import { Plus } from 'components/Plus';
import { KeyIcon } from 'components/Key';
import { Message } from 'components/Message';
import { Book } from 'components/Book';
import { Setting } from 'components/Setting';
import { Badge } from '../Badge';
import dayIcon from '../../../assets/img/day.png';
import { useDispatch } from 'react-redux';

type Theme = 'light' | 'dark';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: '#0b2948',
      color: '#8ba1b7',
    },
    menu: {
      menuContent: '#082440',
      icon: '#59d0ff',
      hover: {
        backgroundColor: '#00458b',
        color: '#b6c8d9',
      },
      disabled: {
        color: '#3e5e7e',
      },
    },
  },
};

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


function SideBar() {
  const navigate = useNavigate();
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();
  const [isRTL, setIsRTL] = React.useState<boolean>(false);
  const [hasImage, setHasImage] = React.useState<boolean>(false);
  const [theme, setTheme] = React.useState<Theme>('light');
  const [activeMenu, setActiveMenu] = React.useState('title_vault');

  const dispatch = useDispatch()

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };

  const createTitle = () => {
    navigate('/createtitle');
  }

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '18px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div className="">
      <Sidebar
        image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        rtl={isRTL}
        defaultCollapsed={true}
        breakPoint="lg"
        backgroundColor={hexToRgba(
          themes[theme].sidebar.backgroundColor,
          hasImage ? 0.9 : 1
        )}
        rootStyles={{
          color: themes[theme].sidebar.color,
          // borderRight: '1px solid grey',
          height: '85vh',
          position: 'relative',
        }}
      >
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <SidebarHeader collapsed={collapsed} style={{ marginBottom: '24px', marginTop: '16px' }} />
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <Menu menuItemStyles={menuItemStyles}>
              <MenuItem
                icon={<Plus />}
                onClick={() => {createTitle();dispatch({ type: 'SET_ACTIVE_MENU', payload:'create_title' })}}
              >
                Create New Title
              </MenuItem>
              <MenuItem
                icon={<KeyIcon/>}
                onClick={() => {navigate('/home');dispatch({ type: 'SET_ACTIVE_MENU', payload:'title_vault' })}}
              >
                TitleVault
              </MenuItem>
              <MenuItem
                icon={<Message/>}
                suffix={<Badge variant="success">New</Badge>}
                onClick={() => {navigate('/community');dispatch({ type: 'SET_ACTIVE_MENU', payload:'message' })}}
              >
                Community
              </MenuItem>
              {/* <SubMenu label="Community" icon={<Message/>}>
                <MenuItem onClick={() => {navigate('/community');dispatch({ type: 'SET_ACTIVE_MENU', payload:'message' })}}> Chat </MenuItem>
                <MenuItem onClick={() => {navigate('/community/digital_identity');dispatch({ type: 'SET_ACTIVE_MENU', payload:'message' })}}> Manage Accociates</MenuItem>
              </SubMenu> */}
              <MenuItem
                icon={<Book/>}
                onClick={() => {}}
              >
                Reports
              </MenuItem>
              <MenuItem
                icon={<Setting/>}
                onClick={() => {navigate('/integrations');dispatch({ type: 'SET_ACTIVE_MENU', payload:'integrations' })}}
              >
                Integrations
              </MenuItem>
              <MenuItem
                onClick={() => {}}
                style={{marginTop:200}}
              >
                <img src={dayIcon} alt="" width={47} height={47} style={{maxWidth:'unset'}}/>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default SideBar;
