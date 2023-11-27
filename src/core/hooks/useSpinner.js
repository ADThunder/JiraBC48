import React from "react";
import { spinnerActions } from "../redux/slice/spinnerSlice";
import { useDispatch } from "react-redux";

const useSpinnerLoading = (isLoading) => {
  const dispatch = useDispatch();
  if (isLoading) {
    dispatch(spinnerActions.setLoadingOn());
  } else {
    dispatch(spinnerActions.setLoadingOff());
  }
};

export default useSpinnerLoading;
