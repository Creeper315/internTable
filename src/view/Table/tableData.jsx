import { useEffect, useRef } from "react";
import Database from "./database";

const TableData = ({
    setMyColumn,
    setMyData,
    FilterOption,
    UpdateInfo,
    setUpdateInfo,
    doSearch,
    doUpdate,
    doCreate,
    newUser,
    setModalOpen,
    g,
}) => {
    const dbComp = useRef();
    // const DB = dbComp.current;

    function onDelete(uId) {
        let sure = confirm("Sure to delete ?");
        if (!sure) return;
        dbComp.current.remove(uId);
        let data = dbComp.current.fetchAllData(FilterOption);
        setMyData(data);
    }

    useEffect(() => {
        const columns = [
            {
                title: "昵称",
                dataIndex: "nickName",
                // key: "name",
                render: (text) => <a>{text}</a>,
                width: "15%",
            },
            {
                title: "性别",
                dataIndex: "gender",
                // key: "gender",
                render: (e) => <div>{g(e)}</div>,
                width: "13%",
            },
            {
                title: "角色",
                dataIndex: "role",
                // key: "character",
                render: (e) => <div>{e}</div>,
                width: "13%",
            },
            { title: "城市", dataIndex: "city", render: (e) => <div>{e}</div> },
            {
                title: "操作",
                dataIndex: "info",
                // key: "info",
                width: "30%",
                render: (_, ee, idx) => {
                    // console.log("colum e: ", _, ee, idx);
                    return (
                        <div style={{ display: "flex" }}>
                            <button
                                onClick={() => {
                                    setModalOpen(true);
                                    setUpdateInfo(ee);
                                }}
                            >
                                编辑
                            </button>
                            <button onClick={() => onDelete(ee.id)}>
                                删除
                            </button>
                        </div>
                    );
                },
            },
        ];
        setMyColumn(columns);
    }, []);

    function getData() {
        let data = dbComp.current.fetchAllData(FilterOption);
        setMyData(data);
    }

    useEffect(() => {
        getData();
    }, [doSearch]);

    useEffect(() => {
        dbComp.current.update(UpdateInfo);
        getData();
    }, [doUpdate]);

    useEffect(() => {
        dbComp.current.create(newUser.current);
        getData();
    }, [doCreate]);

    return (
        <div style={{ display: "hidden" }}>
            <Database ref={dbComp} />
        </div>
    );
};

export default TableData;
