import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import "./Sidebar.scss";
import ListItemText from '@mui/material/ListItemText';
import questionData from "../../mock/questionData.json";

type SideBarProps = {

}

const SideBar = (props: SideBarProps) => {
  const listItems: any = questionData.data.leftPanel.categories
  const [noneSelectedVal, setNoneSelectedVal] = useState<boolean>(false);

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
