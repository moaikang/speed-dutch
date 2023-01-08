import { BOTTOM_SHEET_ID } from '../../themes/BottomSheet';

export const calculateWindowHeightExceptBottomSheet = (): number | undefined => {
  const bottomSheetEl = document.getElementById(BOTTOM_SHEET_ID);

  return bottomSheetEl != null ? bottomSheetEl.getBoundingClientRect().top : undefined;
};
