import React from "react";

// import antd components
import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { generalActions } from "../../redux/slice/generalSlice";

export default function GeneralDrawer() {
  let dispatch = useDispatch();

  let { isDrawerOpen, DrawerContent } = useSelector(
    (state) => state.generalReducer
  );

  const onClose = () => {
    dispatch(generalActions.closeDrawer());
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={onClose}
      open={isDrawerOpen}
      key="right"
      size="large"
    >
      {DrawerContent}
    </Drawer>
  );
}
