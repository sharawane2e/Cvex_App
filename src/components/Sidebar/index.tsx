import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import { updateLeftPanelCategories } from '../../redux/actions/LeftPanelActions';

const SideBar = () => {
  const { leftPanel, rightPanel } = useSelector((state: any) => state);
  const { dispatch } = store;

  useEffect(() => {
    updatedTotalAnswereda();
  }, [rightPanel?.questionsData?.capabilityDetails]);

  const currentSelectedItem: any = leftPanel?.currentSelectedId;

  const listItems: any = leftPanel?.categories;

  const updatedTotalAnswereda = () => {
    let updatedTotalAnswered = 0;

    rightPanel?.questionsData?.capabilityDetails?.forEach(
      (capabilityDetail: any) => {
        capabilityDetail.subTitleDetails.forEach((subTitleDetail: any) => {
          if (subTitleDetail.sliderOptions.selectedInputId != '') {
            updatedTotalAnswered++;
          }
        });

        const categories = JSON.parse(JSON.stringify(leftPanel.categories));

        categories.forEach((category: any) => {
          if (category.selectedId === leftPanel.currentSelectedId) {
            category.totalAnswered = updatedTotalAnswered;
            console.log(typeof category.totalAnswered);
            console.log(typeof updatedTotalAnswered);
            // @ts-ignore
            document.getElementById('ttl-attmpt').value =
              category.totalAnswered;
          }
        });

        dispatch(updateLeftPanelCategories(categories));
      },
    );
  };

  const handleClick = (selectedId: any) => {
    // @ts-ignore
    document.getElementById('navText').value = selectedId;
    // @ts-ignore
    document.getElementById('forwardbutton').disabled = false;
    // @ts-ignore
    document.getElementById('forwardbutton').click();
  };

  const ListItemsHandle = () => {
    return listItems?.map((listItem: any, index: any) => (
      <ListItem
        onClick={() => {
          handleClick(listItem.selectedId);
        }}
        id={listItem.selectedId}
        selected={listItem.selectedId == currentSelectedItem ? true : false}
        className={'listitem-container'}
        button
        key={index}
      >
        <ListItemText
          className="listItem-option"
          primary={listItem.optionName}
        />
        <ListItemText className="listItem" primary={listItem.totalAnswered} />
        <ListItemText className="listItem" primary={listItem.outOfTxt} />
        <ListItemText className="listItem" primary={listItem.totalQues} />
      </ListItem>
    ));
  };
  return (
    <>
      <div className="sidebar">
        <List>
          <ListItemsHandle />
        </List>
      </div>
    </>
  );
};

export default SideBar;
