import React from "react";
import { Table } from "antd";

const UserTable = ({ userList }) => {
  let headColumns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return <span className="text-red-500 font-medium">{text}</span>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Edit",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <Table rowKey={Math.random} columns={headColumns} dataSource={userList} />
  );
};

export default UserTable;
