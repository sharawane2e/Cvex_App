import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import "./Sidebar.scss";
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

type SideBarProps = {

}

const SideBar = (props: SideBarProps) => {
  const [jsonData, setJSONData] = useState<any>("");
  useEffect(() => {
    // @ts-ignore
    document.getElementById("forwardbutton").disabled = true;
    setJSONData(
      // @ts-ignore
      JSON.parse(document.getElementById("jsonData")?.innerText)
    );
  }, []);

  const currentSelectedItem: any = jsonData?.data?.leftPanel?.currentSelectedId;

  const listItems: any = jsonData?.data?.leftPanel?.categories
  const [noneSelectedVal, setNoneSelectedVal] = useState<boolean>(false);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [currentItem, setcurrentItem] = useState(0);
  const updateTotalAnswered = () => {
    // setTotalAnswered
  }
  const updateTotalQuestions = () => {

  }

  const handleClick = (selectedId: any) => {
    // @ts-ignore
    document.getElementById("navText").value = selectedId;
    // @ts-ignore
    document.getElementById("forwardbutton").disabled = false;
    // @ts-ignore
    document.getElementById("forwardbutton").click();
  }

  const ListItemsHandle = () => {
    return listItems?.map((listItem: any, index: any) => (

      <ListItem onClick={() => { handleClick(listItem.selectedId) }} id={listItem.selectedId} selected={listItem.selectedId == currentSelectedItem ? true : false} className={"listitem-container"} button key={index}>
        <ListItemText className="listItem-option" primary={listItem.optionName} />
        {/* <ListItemText className="listItem" primary={listItem.totalAnswered} />
        <ListItemText className="listItem" primary={listItem.outOfTxt} />
        <ListItemText className="listItem" primary={listItem.totalQues} /> */}
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
