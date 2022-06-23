import React from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@mui/material/ListItemText';
import AppMenuItemComponent from './AppMenuComponent';

export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
};

type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>;
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, 'items'>;

// Improve child items declaration
type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
  items?: AppMenuItemProps[];
};

const AppMenuItem = (props: AppMenuItemProps) => {
  const { name, link, Icon, items = [] } = props;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const MenuItemRoot = (
    <AppMenuItemComponent link={link} onClick={handleClick}>
      <ListItemText primary={name} inset={!Icon} />
      <div>1/6 </div>
    </AppMenuItemComponent>
  );

  return <>{MenuItemRoot}</>;
};

export default AppMenuItem;
