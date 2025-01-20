import React, {useState} from "react";
import UserForm from "../../components/UserForm";
import UserList from "../../components/UserList";

function Chanho() {
    const [refreshUsers, setRefreshUsers] = useState(false);

    const handleUserCreated = () => {
        setRefreshUsers((prev) => !prev); // refreshUsers 상태 토글
    };

    return (
        <div>
            <UserForm onUserCreated={handleUserCreated} />
            <UserList refreshTrigger={refreshUsers} />
        </div>
    );
}

export default Chanho;
