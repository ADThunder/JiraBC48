import React, { useState, useRef } from "react";

// import redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// import custom Hooks
import projectHooks from "../../../../core/hooks/ProjectHooks/projectHooks";

// import local components
import SectionWrapper from "../../../../core/Components/SectionWrapper/SectionWrapper";
import ProjectActionButtons from "./ProjectActionButtons";
import ProjectMembers from "./ProjectMembers";
import ButtonLocal from "../../../../core/Components/Utils/ButtonLocal";

import { InputRef } from "antd";

// import antd components
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";

// import Highlighter component
import Highlighter from "react-highlight-words";

// import other library
import clsx from "clsx";

export default function ProjectManagementDesktop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projectList = useSelector((state) => state.projectReducer.projectList);

  projectHooks.useFetchProjectList(dispatch, null);

  const handleOpenCreateProject = () => {
    navigate("create-project");
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, projectIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(projectIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (projectIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${
            projectIndex === "projectName" ? "Project" : projectIndex
          }`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, projectIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, projectIndex)}
            icon={<SearchOutlined />}
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(projectIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <div className="flex justify-center items-center">
        <SearchOutlined
          style={{ color: filtered ? "#1890ff" : undefined }}
          className="text-base"
        />
      </div>
    ),
    onFilter: (value, record) =>
      record[projectIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === projectIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: <span className="text-lg">Name</span>,
      dataIndex: "projectName",
      key: "projectName",
      width: "20%",
      ...getColumnSearchProps("projectName"),
      sorter: (a, b) => b.projectName.localeCompare(a.projectName),
      sortDirections: ["descend", "ascend"],
      render: (projectName, project) => (
        <span
          className="projectName text-lg font-semibold cursor-pointer transition-colors duration-300"
          onClick={() => {
            window.location.href = `/project-detail/${project.id}`;
          }}
        >
          {projectName}
        </span>
      ),
    },
    {
      title: <span className="text-lg">Category</span>,
      dataIndex: "categoryName",
      key: "categoryName",
      width: "20%",
      render: (category) => <span className="text-base">{category}</span>,
    },
    {
      title: <span className="text-lg">Creator</span>,
      dataIndex: "creator",
      key: "creator",
      width: "20%",
      render: (creator) => (
        <Tag color="lime" className="text-base">
          {creator.name}
        </Tag>
      ),
    },
    {
      title: <span className="text-lg">Members</span>,
      dataIndex: "members",
      key: "members",
      width: "20%",
      render: (members, project) => (
        <ProjectMembers
          projectID={project.id}
          projectName={project.projectName}
          members={members}
        />
      ),
    },
    {
      title: <span className="text-lg">Edit</span>,
      key: "edit",
      render: (_, project) => <ProjectActionButtons project={project} />,
    },
  ];
  // console.log("rendered");
  return (
    <SectionWrapper
      content={
        <>
          <div className="mb-2 flex justify-between items-center">
            <h3
              className={clsx(
                "title",
                "uppercase text-[#172B4D] text-2xl font-extrabold tracking-wide"
              )}
            >
              PROJECT MANAGEMENT
            </h3>
            <ButtonLocal
              baseColor="red"
              handleOnClick={handleOpenCreateProject}
            >
              Create Project
            </ButtonLocal>
          </div>
          <Table
            columns={columns}
            dataSource={projectList}
            rowKey={(project) => project.id.toString()}
          />
        </>
      }
      sectionClass="projectManagement"
      contentClass="projectManagement__content"
    />
  );
}
