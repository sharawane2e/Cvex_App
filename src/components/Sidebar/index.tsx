import React from 'react'
import clsx from 'clsx'
import { Route, BrowserRouter, Routes } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import "./Sidebar.scss";
import ListItemText from '@mui/material/ListItemText';
import questionData from "../../mock/questionData.json";
const SideBar = () => {
  const listItems: any = questionData.data.leftPanel.categories
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
  ];
  const ListItemsHandle = () => {
    return listItems.map((listItem: any, index: any) => (

      <ListItem selected={listItem.selectedId == "true" ? true : false} className={"listitem-container"} button key={index}>
        <ListItemText className="listItem-option" primary={listItem.optionName} />
        <ListItemText className="listItem" primary={listItem.totalAnswered} />
        <ListItemText className="listItem" primary={listItem.outOfTxt} />
        <ListItemText className="listItem" primary={listItem.totalQues} />
      </ListItem>

    ))
  }
  return (
    <>
      <div className="sidebar">
        <List>
          <ListItemsHandle />
        </List>
      </div>
    </>
  )
}

export default SideBar;
