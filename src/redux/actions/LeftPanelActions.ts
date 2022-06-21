import { createAction } from '@reduxjs/toolkit';

export const setLeftPanelData = createAction<any>('SET_LEFT_PANEL_DATA');

export const setLeftPanelOpenClose = createAction<any>(
  'SET_LEFT_PANEL_OPEN_CLOSE',
);

export const updateLeftPanelCategories = createAction<any>(
  'UPDATE_LEFT_PANEL_CATEGORIES',
);
