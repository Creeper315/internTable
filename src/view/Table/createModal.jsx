import { Modal, Input, Select } from "antd";
import { useRef } from "react";

const CreateModal = ({
    newUser,
    setdoCreate,
    createModalOpen,
    setcreateModalOpen,
}) => {
    return (
        <Modal
            open={createModalOpen}
            onOk={() => setdoCreate([])}
            onCancel={() => {
                setcreateModalOpen(false);
                newUser.current = {
                    nickName: "",
                    gender: "",
                    role: "",
                    city: "",
                };
            }}
        >
            昵称
            <Input
                onChange={(e) => {
                    newUser.current.nickName = e.target.value;
                }}
            />
            性别
            <Select
                options={[{ value: "男" }, { value: "女" }]}
                onChange={(e) => {
                    newUser.current.gender = e;
                }}
            />
            角色
            <Select
                options={[{ value: "dm" }, { value: "sm" }]}
                onChange={(e) => {
                    newUser.current.role = e;
                }}
            />
            城市
            <Input
                onChange={(e) => {
                    newUser.current.city = e.target.value;
                }}
            />
        </Modal>
    );
};

export default CreateModal;
