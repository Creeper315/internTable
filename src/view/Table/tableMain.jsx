import axios from "axios";
import "../../scss/TopNav/topNav.scss";
import { useEffect, useState, forwardRef, useRef } from "react";
import { userData } from "../../assets/data";
import TableData from "./tableData";
import CreateModal from "./createModal";
import {
    Layout,
    Form,
    Input,
    Select,
    Button,
    Space,
    // Pagination,
    Table,
    Modal,
} from "antd";

const TableMain = () => {
    const [doSearch, setdoSearch] = useState();
    const [FilterOption, setFilterOption] = useState({
        nickName: "",
        gender: "",
        role: "",
    });

    const [createModalOpen, setcreateModalOpen] = useState(false);
    const [doCreate, setdoCreate] = useState([]);
    const newUser = useRef({
        nickName: "",
        gender: "",
        role: "",
        city: "",
    });

    const [doUpdate, setdoUpdate] = useState();
    const [UpdateInfo, setUpdateInfo] = useState({});

    const [MyColumn, setMyColumn] = useState([]);
    const [MyData, setMyData] = useState([]);
    window.myd = MyData;
    window.upi = UpdateInfo;

    const [ModalOpen, setModalOpen] = useState(false);

    const [Test, setTest] = useState({ k: 1 });
    const [Test2, setTest2] = useState({});

    useEffect(() => {
        // let k = userData.map((e) => e.role);
        // console.log("k: ", k);
        // axios({
        //     method: "post",
        //     url: "http://localhost:3033/api/v1/user",
        // }).then(({ data }) => {
        //     console.log("data: ", data);
        // });
    }, []);

    function reset() {
        setFilterOption({ nickName: "", gender: "", role: "" });
    }
    function copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    function g(gender) {
        if (gender == 1) return "男";
        if (gender == 2 || gender == 0) return "女";
        return gender;
    }
    function onChangeUpdate(val, key) {
        if (key == "gender") val = val == "男" ? 1 : 2;
        UpdateInfo[key] = val;
        // console.log("UpdateInfo: ", UpdateInfo);
        setUpdateInfo(copy(UpdateInfo));
    }

    return (
        <div className="wrap">
            <Layout
                style={{
                    border: "2px dashed blue",
                }}
                className="search-layout"
            >
                <Form
                    name="basic"
                    // labelCol={{ span: 13 }}
                    // wrapperCol={{ span: 23 }}
                    style={{ display: "flex", gap: 10, padding: 10 }}
                >
                    <Space
                        direction="horizontal"
                        style={{ border: "1px solid red", alignSelf: "center" }}
                    >
                        <Form.Item label="昵称">
                            <Input
                                placeholder="请选择昵称"
                                value={FilterOption.nickName}
                                onChange={({ target: { value: e } }) => {
                                    FilterOption.nickName = e;
                                    setFilterOption(copy(FilterOption));
                                }}
                            />
                        </Form.Item>

                        <Form.Item label="性别">
                            <Select
                                style={{ width: 200 }}
                                placeholder="请选择性别"
                                value={FilterOption.gender}
                                onChange={(e) => {
                                    FilterOption.gender = e;
                                    setFilterOption(copy(FilterOption));
                                }}
                                options={[{ value: "男" }, { value: "女" }]}
                            />
                        </Form.Item>

                        <Form.Item label="角色">
                            <Select
                                style={{ width: 200 }}
                                placeholder="请选择角色"
                                value={FilterOption.role}
                                onChange={(e) => {
                                    FilterOption.role = e;
                                    setFilterOption(copy(FilterOption));
                                }}
                                options={[{ value: "dm" }, { value: "sm" }]}
                            />
                        </Form.Item>
                        <Button type="primary" size="small" onClick={reset}>
                            重置
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => setdoSearch([])}
                        >
                            搜索
                        </Button>
                    </Space>
                </Form>
            </Layout>
            <Layout
                style={{
                    border: "2px dashed blue",
                }}
            >
                <Button type="primary" onClick={() => setcreateModalOpen(true)}>
                    新建
                </Button>
                <Table
                    columns={MyColumn}
                    dataSource={MyData}
                    showSizeChanger
                    pagination={{
                        // pageSize: 7,
                        showQuickJumper: 1,
                        showSizeChanger: 1,
                        // showTotal: 1,
                        pageSizeOptions: [5, 10, 15, 20, 30],
                        locale: {
                            items_per_page: "条/页",
                            page: "页",
                            jump_to: "前往",
                            prev_page: "上一页",
                            next_page: "下一页",
                            // position: "bottomCenter",
                        },
                    }}
                ></Table>
            </Layout>
            <TableData
                {...{
                    setMyColumn,
                    setMyData,
                    FilterOption,
                    UpdateInfo,
                    doSearch,
                    doUpdate,
                    doCreate,
                    newUser,
                    setModalOpen,
                    setUpdateInfo,
                    g,
                }}
            />
            <Input
                value={Test.v1}
                onChange={({ target: { value: e } }) => {
                    Test.v1 = e;
                    setTest(...Test);
                }}
            />
            <Input
                value={Test2.v2}
                onChange={({ target: { value: e } }) => {
                    Test2.v2 = e;
                    setTest2(...Test2);
                }}
            />
            <button
                onClick={() => {
                    console.log("Test1 2: ", Test, Test2);
                    Test2.v2 = Test.v1;
                    setTest2(copy(Test2));
                }}
            >
                Bthh
            </button>

            <Modal
                open={ModalOpen}
                onOk={() => {
                    setdoUpdate([]);
                    setModalOpen(false);
                }}
                onCancel={() => {
                    // setUpdateInfo({});
                    setModalOpen(false);
                }}
            >
                昵称{" "}
                <Input
                    value={UpdateInfo.nickName}
                    onChange={({ target: { value: e } }) =>
                        onChangeUpdate(e, "nickName")
                    }
                />
                性别{" "}
                <Select
                    value={g(UpdateInfo.gender)}
                    onChange={(e) => onChangeUpdate(e, "gender")}
                    options={[{ value: "男" }, { value: "女" }]}
                />
                角色{" "}
                <Select
                    value={UpdateInfo.role}
                    onChange={(e) => onChangeUpdate(e, "role")}
                    options={[{ value: "sm" }, { value: "dm" }]}
                />
                城市{" "}
                <Input
                    value={UpdateInfo.city}
                    onChange={({ target: { value: e } }) =>
                        onChangeUpdate(e, "city")
                    }
                />
            </Modal>
            <CreateModal
                {...{
                    createModalOpen,
                    setcreateModalOpen,
                    newUser,
                    setdoCreate,
                }}
            />
        </div>
    );
};

export default TableMain;

// 前端方案设计：负责内部管理系统中几十个列表页面开发，包括搜索、数据展示、分页等功能。
// 前端开发：将列表页面分离为逻辑层与UI层，将api接口和table组件封装。以低代码实现功能，提升开发效率。
