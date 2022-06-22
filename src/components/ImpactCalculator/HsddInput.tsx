import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import React, { useState, useEffect } from "react";

// interface InputProps {
// 	question: any;
// 	onChange: any;
// 	error: boolean
// }

type HsddInputProps = {
  question: any;
  onChange: any;
  error?: boolean;
};

const HsddInput = (props: HsddInputProps) => {
  const { error = false } = props;

  const {
    optionName,
    type,
    placeholder,
    description,
    questionId,
    selectedId,
    enableQuestionIds,
    options,
    onChange,
  } = props.question;

  return (
    <>
      <Grid
        container
        sx={{ alignItems: "center" }}
        xs={12}
        md={4}
        className="input-form-control"
      >
        <Grid item xs={12}>
          <p className="label-heading">{optionName}</p>
          <FormControl fullWidth>
            <Select
              sx={{ p: 0, borderRadius: 0, mb: 1 }}
              className="inputField cutom-input-field"
              defaultValue="none"
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <>{placeholder}</>;
                }
                return selected;
              }}
              value={selectedId}
              onChange={(e) => {
                props.onChange(e.target.value);
              }}
              error={error}
            >
              <MenuItem disabled value="none" className="selectItem">
                <>{placeholder}</>
              </MenuItem>
              {options?.map((option: any) => (
                <MenuItem value={option?.ddId} className="selectItem">
                  {option?.ddName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
export default HsddInput;
