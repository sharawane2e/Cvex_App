import React from 'react'
import clsx from 'clsx'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import "./Sidebar.scss";


const SideBar = () => {
  const appMenuItems = [
    {
      name: 'Value strategy',
      link: '/',
      value: '1/6',
    },
    {
      name: 'Customer touchpoint design',
      link: '/orders',
      value: '0/6',
    },
    {
      name: 'Governance & Steering',
      link: '/customers',
      value: '1/6'
    },
    {
      name: 'Proposition and Campaigning',
      link: '/reports',
      value: '4/6'
    },
    {
      name: 'Contact management',

      items: [
        {
          name: 'Level 2',
        },
        {
          name: 'Level 2',
          items: [
            {
              name: 'Level 3',
            },
            {
              name: 'Level 3',
            },
          ],
        },
      ],
    },
  ]
  return (
    <>
      <List component="nav" className={'appMenu'} disablePadding>
        {/* <AppMenuItem {...appMenuItems[0]} /> */}
        {/* {appMenuItems.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))} */}
      </List>
    </>
  )
}

export default SideBar;
