import { Modal } from "antd";
import { FormInstance } from "antd/es/form/Form";
import React, { useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../redux/slice/modalSlice";

const ModalComponent = () => {
  let dispatch = useDispatch();
  let { open, modalContent, headerContent, width, form } = useSelector(
    (state) => state.modalReducer.modalProps
  );
  const onCancel = () => {
    dispatch(modalActions.closeModal());
  };

  return (
    <Modal
      title={headerContent || "Modal"}
      centered
      closable={true}
      open={open}
      onOk={() => {
        console.log("Ok");
      }}
      onCancel={onCancel}
      width={width}
      footer={null}
      maskClosable={false}
      destroyOnClose={true}
    >
      {modalContent}
    </Modal>
  );
};

export default ModalComponent;
