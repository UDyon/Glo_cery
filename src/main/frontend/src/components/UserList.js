// UserList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await axios.get("/api/users");
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();  // 컴포넌트가 로드될 때 사용자 목록을 불러옵니다.
    }, []);

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
