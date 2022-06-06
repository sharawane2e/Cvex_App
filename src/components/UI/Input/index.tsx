// @flow
import * as React from "react";
import OutlinedInput from '@mui/material/OutlinedInput';

import FormControl from '@mui/material/FormControl';
type InputProps = {
  id: any;
  placeholder: string;
  type: string;
  onChange: any;
  className: string;
};
export function Inputbox(props: InputProps) {
  return (
    <div>
      <FormControl sx={{ width: "100%" }} variant="outlined">
        <OutlinedInput
          placeholder={props.placeholder}
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          className={props.className}
        />
      </FormControl>
    </div>
  );
}
