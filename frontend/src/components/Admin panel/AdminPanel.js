import React, { useContext, useEffect, useState } from "react";
import { fetchUsers} from "../../api/userApi";
import ViewUsers from "./components/ViewUser";
import AddUser from "./components/AddUser";
import ModifyUser from "./components/ModifyUser";
import DeleteUser from "./components/DeleteUser";
import { StoreContext } from "../../Context/Context";
import { useCallback } from "react";


const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState('view')
  const {currentUser} = useContext(StoreContext)


  const getUsers = useCallback(async () => {
    try {
      const data = await fetchUsers(currentUser.access_Token);
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, [currentUser.access_Token]);
  

  useEffect(() => {
    getUsers();
  }, [currentPage, getUsers]);
  

  const renderPage = () => {
    console.log(currentUser)
    switch (currentPage) {
      case 'add':
        return <AddUser />;
      case 'view':
        return <ViewUsers users={users} getUsers={getUsers} />;
      case 'update':
        return <ModifyUser />;
      case 'delete':
        return <DeleteUser users={users} getUsers={getUsers} />;
      case 'modify':
        return <ModifyUser users={users} getUsers={getUsers}/>
      default:
        return null;
    }
  };

  if(currentUser.role==='admin'){
    

    return (
      <div>
         <div className="container mx-auto py-6">
         <h1 className="text-4xl font-bold text-center mb-8">Welcome to Admin Dashboard</h1>
         <Navbar setCurrentPage={setCurrentPage} />
          
          <div className="container mx-auto py-6">{renderPage()}</div>
        </div>
        
       
      </div>
    );
    }else{
      return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">You do not have permission to view this page</h1>
        <p className="text-gray-500">Please contact the administrator for assistance.</p>
      </div>
      )
    }
};

const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-red-500 py-4 px-6 mb-6">
      
      <ul className="flex justify-center">
        <li>
          <button
            className="text-white hover:text-gray-300 ml-4"
            onClick={() => setCurrentPage("add")}
          >
            Add User
          </button>
        </li>
        <li>
          <button
            className="text-white hover:text-gray-300 mx-4"
            onClick={() => setCurrentPage("view")}
          >
            View Users
          </button>
        </li>
        <li>
          <button
            className="text-white hover:text-gray-300 mr-4"
            onClick={() => setCurrentPage("delete")}
          >
            Delete Users
          </button>
        </li>
        <li>
          <button
            className="text-white hover:text-gray-300 mr-4"
            onClick={() => setCurrentPage("modify")}
          >
            Update Users
          </button>
        </li>
      </ul>
    </nav>
  );
};



export default AdminPanel;
