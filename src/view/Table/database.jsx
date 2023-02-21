import { userData } from "../../assets/data";
import { useRef, forwardRef, useImperativeHandle } from "react";

const Database = forwardRef((prop, ref) => {
    const DB = useRef(userData); //  纯粹 模拟的 database。

    useImperativeHandle(
        ref,
        () => ({
            fetchAllData,
            create,
            update,
            remove,
        }),
        []
    );

    function fetchAllData({ nickName, gender, role }) {
        // let { nickName, gender, role } = filterOption; // filter Option 里给出的 gender 肯定是 男/女 而不是 0,1,2
        // console.log(
        //     "nickName, gender, role: ",
        //     `-${nickName}-${gender}-${role}-`
        // );

        let res = DB.current.flatMap((e, idx) => {
            // console.log("e, idx: ", e, idx);
            e.key = idx; // 这里！需要加 key ！ 来保证array element unique？
            let G = e.gender == 1 ? "男" : "女";

            if (nickName && e.nickName != nickName) return [];
            if (gender && G != gender) return [];
            if (role && e.role != role) return [];

            return e;
        });
        console.log("res: ", res);
        return res;
        // return DB.current.filter((e) => {
        //     return true;
        // });
        // return [];
    }

    function create(userObject) {
        // { nickName, role, gender, city, province, country }  // 没有 id

        userObject.id = getRandomId();

        DB.current.push(userObject);
    }

    function update(userObject) {
        // console.log("update userObject: ", userObject);
        // { id, nickName, role, gender, city, province, country }
        // setAllData((arr) => {
        //     let all = arr.map((e) => {
        //         if (e.id != userObject.id) return e;
        //         return userObject;
        //     });
        //     return [...all];
        // });
        DB.current = DB.current.map((e) => {
            if (e.id != userObject.id) return e;
            return userObject;
        });
        console.log("db cu", DB.current);
    }

    function remove(userId) {
        console.log("userId: ", userId);
        DB.current = DB.current.filter((e) => e.id != userId);

        // setAllData(AllData);
    }

    function getRandomId() {
        let id = Math.random();
        return String(id);
    }

    return <div style={{ display: "hidden" }}></div>;
});

export default Database;
