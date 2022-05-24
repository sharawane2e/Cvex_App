import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { render } from "@testing-library/react";

type SelectProps = {
  id: any;
  placeholder: string;
  type: string;
  onChange: any;
};

// const [personName, setPersonName] = useState(<string[]>([]));
// const handleChange = (event: SelectChangeEvent<typeof personName>) => {
//   const {
//     target: { value },
//   } = event;
//   setPersonName(
//     // On autofill we get a stringified value.
//     typeof value === "string" ? value.split(",") : value
//   );
// }
// const MultipleSelectPlaceholder=(props:SelectProps) =>{
//     render(){

//         return(

//         );
//     }
// }
