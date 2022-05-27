
import {Button} from '@mui/material';


type Props = {
  children: any;
  className: any;
  onClick: any;
};
export default function CustomButton(props: Props) {
  return (
    <>
      <Button
        className={props.className}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </>
  );
}
