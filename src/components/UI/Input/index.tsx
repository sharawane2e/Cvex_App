// @flow
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';

import FormControl from '@mui/material/FormControl';
type InputProps = {
  id: any;
  placeholder: string;
  type: string;
  onChange: any;
  className: string;
  onKeyUp?: any;
};
export function Inputbox(props: InputProps) {
  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <OutlinedInput
        sx={{ p: 0, borderRadius: 0 }}
        placeholder={props.placeholder}
        id={props.id}
        type={props.type}
        onChange={props.onChange}
        className={props.className}
        onKeyUp={props.onKeyUp}
      />
    </FormControl>
  );
}
