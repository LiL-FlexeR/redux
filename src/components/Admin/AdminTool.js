import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/usersSlice";
import { DataGrid, getRowEl } from "@material-ui/data-grid";

const AdminTool = () => {
  const initialUserState = {
    name: "",
    email: "",
    id: "",
  };

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      editable: true,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      width: 300,
      editable: true,
    },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div style={{ marginTop: "5rem" }}>
      <DataGrid
        pageSize={10}
        getRowId={(row) => row._id}
        rows={users}
        columns={columns}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

export default AdminTool;
