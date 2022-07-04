// @flow
import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";

import FormControl from "@mui/material/FormControl";
// type InputProps = {
//   id: any;
//   placeholder: string;
//   type: string;
//   onChange: any;
//   className: string;
//   onKeyUp?: any;
//   value?: string;
//   error: boolean;
// };

interface InputProps {
  id?: any;
  placeholder?: string;
  type?: string;
  onChange?: any;
  className?: string;
  onKeyUp?: any;
  value?: string;
  error?: boolean;
  onBlur?: any;
}

export function Inputbox(props: InputProps) {
  const {
    id,
    placeholder,
    type,
    onChange,
    className,
    onKeyUp,
    value,
    error = false,
    onBlur,
  } = props;
  return (
    <FormControl sx={{ width: "100%" }} variant="outlined">
      <OutlinedInput
        sx={{ p: 0, borderRadius: 0 }}
        placeholder={placeholder}
        id={id}
        type={type}
        onChange={onChange}
        className={className}
        onKeyUp={onKeyUp}
        value={value}
        error={error}
        onBlur={onBlur}
      />
    </FormControl>
  );
}
