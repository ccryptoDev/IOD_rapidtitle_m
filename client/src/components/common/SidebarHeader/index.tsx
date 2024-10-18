import styled from '@emotion/styled';
import React from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import { Typography } from '../Typography';
import logo_expanded from '../../../assets/img/wallet_logo.png'
import logo_collapsed from '../../../assets/img/logo_collapsed.png'
import { Link, useNavigate, useNavigation } from 'react-router-dom';


interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export const SidebarHeader = ({ children, collapsed, ...rest }: any) => {
  const { rtl, collapseSidebar } = useProSidebar();
  const navigate = useNavigate()
  return (
    <StyledSidebarHeader {...rest}>
        <div style={{ display: 'flex', alignItems: 'center' }} className='cursor-pointer' onClick={() => collapseSidebar() }>
          <img src={logo_expanded} className={collapsed ? 'hidden' : ''} alt="" />
          <img src={logo_collapsed} className={collapsed ? '' : 'hidden'} alt="" />
        </div>
    </StyledSidebarHeader>
  );
};