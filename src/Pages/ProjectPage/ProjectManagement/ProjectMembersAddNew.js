import React, { useState, useRef, useEffect } from "react";

import USER_SERVICE from "../../../core/services/userServ";

// import antd components
import { Avatar, Modal, Popconfirm } from "antd";
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  DesktopView,
  MobileView,
  TabletView,
} from "../../../core/HOC/Responsive";
import InnerSpinner from "../../../core/Components/Spinner/InnerSpinner";
import clsx from "clsx";

export default function ProjectMembersAddNew({
  isMobile = false,
  title,
  projectName,
  handleAssignUser,
  containerClassName = "w-64",
  userListClassName = "max-h-96",
}) {
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  }, []);

  const getUserList = (keyword) => {
    setIsLoading(true);
    USER_SERVICE.getUserByKeyword(keyword)
      .then((res) => {
        // console.log(res);
        setUserList(res.content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // ANTD Modal Control
  const { confirm } = Modal;
  const showAssignUserConfirm = (user) => {
    confirm({
      title: (
        <span className="text-lg">
          Are you sure you want to assign this member?
        </span>
      ),
      icon: <ExclamationCircleOutlined className="text-2xl" />,
      content: <span className="text-lg">{user.name}</span>,
      okText: "Yes",
      okButtonProps: { size: "large" },
      okType: "primary",
      cancelText: "No",
      cancelButtonProps: { size: "large" },
      onOk() {
        handleAssignUser(user.userId);
      },
    });
  };

  // render function
  const renderUser = (user, index, isMobileRendering) => (
    <div
      className="w-full px-3 py-2 flex justify-between items-center hover:bg-slate-100 cursor-pointer"
      key={user.userId.toString() + index}
      onClick={() => {
        if (isMobileRendering) showAssignUserConfirm(user);
      }}
    >
      <div className="flex-shrink-0">
        <Avatar src={user.avatar} />
      </div>
      <p className="ml-2 mb-0 align-middle text-lg break-all">{user.name}</p>
    </div>
  );

  const renderUserDesktop = (user, index) => (
    <Popconfirm
      title={
        <span className="text-lg pl-1">
          Adding <span className="font-semibold">{user.name}</span> to{" "}
          <span className="font-semibold">
            {projectName ? projectName : "Project"}
          </span>
          ?
        </span>
      }
      onConfirm={() => {
        handleAssignUser(user.userId);
        inputRef.current.focus();
      }}
      okText="Yes"
      okButtonProps={{ size: "large" }}
      cancelText="No"
      cancelButtonProps={{ size: "large" }}
      icon={
        <QuestionCircleOutlined className="top-1 text-yellow-500 text-xl" />
      }
    >
      {renderUser(user, index, false)}
    </Popconfirm>
  );

  const renderUsersList = (userList) => {
    if (!userList) return null;
    return (
      <div
        className={clsx(
          userListClassName,
          "flex-grow w-full overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full"
        )}
      >
        {userList.map((user, index) => (
          <>
            <DesktopView>{renderUserDesktop(user, index)}</DesktopView>
            <TabletView>{renderUser(user, index, true)}</TabletView>
            <MobileView>{renderUser(user, index, true)}</MobileView>
          </>
        ))}
      </div>
    );
  };

  return (
    <div className={clsx(containerClassName, "flex flex-col")}>
      {!title ? null : (
        <h4 className="flex-shrink-0 pb-2 text-base">{title}</h4>
      )}
      <input
        type="search"
        placeholder="Search users"
        className="block flex-shrink-0 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:border-orange-500 focus-visible:outline-none"
        ref={inputRef}
        onChange={(e) => {
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          searchRef.current = setTimeout(() => {
            // console.log(e.target.value);
            getUserList(e.target.value);
          }, 300);
        }}
      />
      {isLoading ? (
        <div className="flex-grow w-full">
          <InnerSpinner
            spinnerClass={isMobile ? "w-full h-full" : "w-full aspect-square"}
          />
        </div>
      ) : (
        renderUsersList(userList)
      )}
    </div>
  );
}
