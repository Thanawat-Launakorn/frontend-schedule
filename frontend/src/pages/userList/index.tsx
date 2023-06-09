import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import "./userList.css";
import { UserDeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { columns } from "../../data/columns";
import { Row, Col, Avatar, Tag, Empty } from "antd";
import * as Api from "../../service/API/Api";
import { IUser, IUserTable } from "../../models/IUser";
import { PlusOutlined, CloudDownloadOutlined } from "@ant-design/icons";

import CardUserList from "../../components/card/cardUserList";
import TableComponent from "../../components/tablecomponent";
import { wait } from "../../utils/wait";
import { keys } from "@mui/system";
import InfiniteScroll from "../../components/layouts/infiniteScroll";
import CardTable from "../../components/card/cardTable";

export default function UserList() {
  const [initialUsers, setUsers] = React.useState([] as Array<IUser>);
  const [colors, setColors] = React.useState<string[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Are you sure to delete?");
  const [selected, setSelected] = useState({} as Partial<IUser>);
  const BASE_URL = Api.BASE_URL_USER;

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async (idx?: string | number) => {
    try {
      setModalText("The modal will be closed after two seconds");
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      await Api.Delete<IUser>(Number(idx), BASE_URL);
    } catch (err) {
      alert(err);
    } finally {
      setTimeout(async () => {
        const { data } = await Api.Get<IUser>(BASE_URL);
        console.log(data);

        setUsers(data);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleEditUser = (idx?: string | number) => {
    navigate(`${idx}/EditUser`);
  };

  const handleAddUser = () => {
    navigate("/createUser");
  };
  const dataTable = initialUsers.map((item: IUserTable) => {
    return {
      ...item,
      columnName: { name: item.name, image: item.image, email: item.email },

      social: {
        tel: item.tel,
        idline: item.idline,
      },
      action: {
        edit: (
          <button className="bg-transparent border-0 text-lg cursor-pointer text-blue-500">
            <EditOutlined />
          </button>
        ),
        delete: (
          <>
            <button className="bg-transparent border-0 text-lg cursor-pointer text-red-500">
              <UserDeleteOutlined />
            </button>
          </>
        ),
      },
    };
  });

  const frontendDeverloper = dataTable.filter((fd: Pick<IUser, "position">) => {
    return fd.position === "frontend developer";
  });
  const backendDeverloper = dataTable.filter((bd: Pick<IUser, "position">) => {
    return bd.position === "backend developer";
  });

  React.useEffect(() => {
    (async () => {
      const { data } = await Api.Get<IUser>(BASE_URL);
      data.sort((a: any, b: any) => (a.id > b.id ? 1 : -1)); //sort id
      setUsers(data);
    })();
  }, []);
  return (
    <div className="max-w-sm px-4 lg:max-w-5xl lg:px-0 mx-auto mt-10 ">
      <div className="flex justify-between">
        <span className="text-3xl tracking-wide font-bold fontImport uppercase text-gray-900">
          Users
        </span>
        <div>
          <Button onClick={() => {}} size="middle">
            <CloudDownloadOutlined />
            Import
          </Button>
          <span className="mx-1 lg:mx-2"></span>
          <Button
            onClick={handleAddUser}
            type="primary"
            className=""
            size="middle"
          >
            <PlusOutlined /> Add user
          </Button>
        </div>
      </div>
      {/* card layout grid-cols-3 */}
      <div className="grid lg:grid-cols-3 lg:gap-6 gap-5 mx-auto my-5">
        <CardUserList
          description={dataTable.length.toString()}
          position=""
          title="Members"
          className="card-bottom rounded-lg text-center lg:text-start py-5 px-7 cursor-pointer transition-all delay-75 hover:shadow-lg"
        />
        <CardUserList
          description={frontendDeverloper.length.toString()}
          position=""
          title="Frontend Developer"
          className="card-bottom rounded-lg text-center lg:text-start py-5 px-7 cursor-pointer transition-all delay-75 hover:shadow-lg"
        />
        <CardUserList
          description={backendDeverloper.length.toString()}
          position=""
          title="Backend Developer"
          className="card-bottom rounded-lg text-center lg:text-start py-5 px-7 cursor-pointer transition-all delay-75 hover:shadow-lg"
        />
      </div>
      {/* SearchUser */}
      <div className="text-end">
        <Input.Search
          placeholder="Search here..."
          className="lg:w-1/3 w-full"
          onSearch={(value) => setSearchText(value)}
        />
      </div>

      {/* desktop display */}
      <TableComponent
        className="container mx-auto text-center shadow-md my-10 lg:block hidden"
        columns={[
          {
            title: "Name",
            dataIndex: "columnName",
            key: "columnName",
            align: "center",
            filteredValue: [searchText],
            onFilter: (value: any, rc: IUser) => {
              return String(rc.name)
                .toLowerCase()
                .includes(value.toLowerCase());
            },

            render: (_, rc: Partial<IUserTable>) => {
              return (
                <div className="ms-10">
                  <Row className="flex align-middle justify-start relative left-10">
                    <Col className="">
                      <Avatar
                        src={rc.columnName?.image}
                        className=""
                        size={50}
                      />
                    </Col>
                    <Col className="ms-3 text-start">
                      <p className="text-black tracking-wider capitalize text-md font-bold">
                        {rc.columnName?.name}
                      </p>
                      <p className="text-gray-600 tracking-wide lowercase text-sm font-thin">
                        {rc.columnName?.email}
                      </p>
                    </Col>
                  </Row>
                </div>
              );
            },
          },
          {
            title: "Position",
            dataIndex: "position",
            key: "position",
            align: "center",
            className:
              "text-gray-600 tracking-wide lowercase text-sm font-normal capitalize",
          },
          {
            title: "Social",
            dataIndex: "social",
            key: "social",
            align: "center",
            render: (_, rc: Partial<IUserTable>) => {
              //
              const Colors: Array<string> = [
                "geekblue",
                "green",
                "volcano",
                "skyblue",
                "gray",
                "orange",
                "pink",
                "purple",
                "black",
                "red",
                "yellow",
              ];
              const randomColorTag1: string =
                Colors[Math.floor(Math.random() * Colors.length)];

              const randomColorTag2: string =
                Colors[Math.floor(Math.random() * Colors.length)];

              return (
                <div className="flex justify-center align-middle ">
                  <Tag color={randomColorTag1} key={rc.social.tel}>
                    <p>{rc.social.tel}</p>
                  </Tag>
                  <Tag color={randomColorTag2} key={rc.social.idline}>
                    <p>{rc.social.idline}</p>
                  </Tag>
                </div>
              );
            },
          },
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (_, rc: Partial<IUserTable>) => {
              return (
                <div className="flex justify-center align-middle">
                  <span onClick={() => handleEditUser(rc.id)}>
                    {rc.action.edit}
                  </span>
                  <span className="mx-2"></span>
                  <span
                    onClick={() => {
                      showModal();
                      setSelected(rc);
                    }}
                  >
                    {rc.action.delete}
                  </span>
                </div>
              );
            },
          },
        ]}
        dataSource={dataTable}
      />
      <Modal
        title={`Delete User ${selected?.name}`}
        open={open}
        onOk={() => handleOk(selected?.id)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        {selected?.name}
      </Modal>

      {/* mobile display */}
      <div className="lg:hidden">
        {" "}
        <InfiniteScroll
          className="mt-10 overflow-auto infinite-scroll h-96 bg-gray-100 rounded-lg shadow-md px-5 py-7"
          items={initialUsers}
          renderItem={({
            item,
            key,
          }: {
            item: IUser;
            key: string | number;
          }) => {
            return (
              <CardTable
                email={item.email}
                image={item.image}
                name={item.name}
                position={item.position}
                className="w-full flex justify-between  p-3 mb-4 cursor-pointer shadow-md hover:shadow-lg bg-white"
              />
            );
          }}
          emptyList={<Empty />}
        />
      </div>
    </div>
  );
}
