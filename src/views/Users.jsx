import Table from "react-bootstrap/Table";
import UserAPI from "../services/api/User";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
function Users({}){
    const [users, setUsers] = useState([])

    let {fetchUsers, deleteUser} = new UserAPI().repo();
    useEffect(() => {
        fetchUsers({}).then((response) => {
            setUsers(response.data.data)
        })
    }, []);

    let removeUser = (user_id)=>{
        deleteUser(user_id).then((response) => {
            if(response.status == 200){
                setUsers(
                    users.filter((user) => user.user_id != user_id)
                )
            }
        })
    }
        
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link to={`/users/${user.user_id}`}><Button variant="primary">Edit</Button></Link>
                                <Button variant="danger" onClick={()=> removeUser(user.user_id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default Users;