import { createAction } from '@reduxjs/toolkit';

export const setRightPanelData = createAction<any>('SET_RIGHT_PANEL_DATA');

export const updateCapabilityDetails = createAction<any>(
  'UPDATE_CAPABILITY_DETAILS',
);
