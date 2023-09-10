import { Button, Input, Modal, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [nameField, setNameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  const URL = `https://reqres.in/api/users?page=${currentPage}&per_page=5`;

  const getData = async () => {
    try {
      const response = await axios.get(URL);
      setData(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const nameFilter = (event) => {
    setNameField(event.target.value);
  };

  const emailFilter = (event) => {
    setEmailField(event.target.value);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleUpdate = (record) => {
    setSelectedUser(record);
    setIsUpdateModalVisible(true);
    setUpdatedUserData({
      firstName: record.first_name,
      lastName: record.last_name,
      email: record.email,
      avatar: record.avatar,
    });
  };

  const showDeleteModal = (record) => {
    setSelectedUser(record);
    setIsDeleteModalVisible(true);
  };

  const showDetailModal = (record) => {
    setUserDetails(record);
    setIsDetailModalVisible(true);
  };

  const handleDelete = () => {
    const userId = selectedUser.id;
    // Perform the delete action here, e.g., send a DELETE request to your API
    axios
      .delete(`https://reqres.in/api/users/${userId}`)
      .then((response) => {
        if (response.status === 204) {
          console.log("User deleted successfully.");
          getData(); // Refresh the data after deletion
        } else {
          console.error("Error deleting user.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      })
      .finally(() => {
        setIsDeleteModalVisible(false);
      });
  };

  const updateUserData = async () => {
    try {
      // Prepare the updated user data based on the input fields
      const updatedData = {
        first_name: updatedUserData.firstName,
        last_name: updatedUserData.lastName,
        email: updatedUserData.email,
        avatar: updatedUserData.avatar,
      };

      // Make an API request to update the user data
      const response = await axios.put(
        `https://reqres.in/api/users/${selectedUser.id}`,
        updatedData
      );

      // Check the response status and handle success or error
      if (response.status === 200) {
        console.log("User data updated successfully:", response.data);
        setIsUpdateModalVisible(false);
        getData(); // Refresh the data by calling getData() here
      } else {
        console.error("Error updating user data:", response.data);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => (
        <img src={text} alt={`Avatar for ${record.first_name}`} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <Space size="middle">
          <Button onClick={() => handleUpdate(record)}>Update</Button>
          <Button onClick={() => showDeleteModal(record)} danger>
            Delete
          </Button>
          <Button onClick={() => showDetailModal(record)}>Detail</Button>
        </Space>
      ),
    },
  ];

  const filteredData = data.filter((d) => {
    return nameField
      ? d.first_name.toLowerCase().includes(nameField.toLowerCase())
      : d.email.toLowerCase().includes(emailField.toLowerCase());
  });

  return (
    <div className="App">
      <h1 id="title">DATA KARYAWAN</h1>
      <div className="search-input-container">
        <Input
          type="search"
          onChange={nameFilter}
          className="input"
          placeholder="Search by Name"
        />
        <Input
          type="search"
          onChange={emailFilter}
          className="input"
          placeholder="Search by Email"
        />
      </div>
      <Table
        dataSource={filteredData}
        columns={columns}
        pagination={false}
        rowKey="id"
        className="table"
      />
      <div className="pagination">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
      <Modal
        title="Update User"
        visible={isUpdateModalVisible}
        onOk={updateUserData}
        onCancel={() => setIsUpdateModalVisible(false)}
        className="custom-modal"
      >
        {selectedUser && (
          <div className="update-modal-content">
            <div className="input-group">
              <label htmlFor="firstName" className="label-margin">
                First Name:
              </label>
              <Input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={updatedUserData.firstName}
                onChange={(e) =>
                  setUpdatedUserData({
                    ...updatedUserData,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastName" className="label-margin">
                Last Name:
              </label>
              <Input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={updatedUserData.lastName}
                onChange={(e) =>
                  setUpdatedUserData({
                    ...updatedUserData,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="label-margin">
                Email:
              </label>
              <Input
                type="text"
                id="email"
                placeholder="Email"
                value={updatedUserData.email}
                onChange={(e) =>
                  setUpdatedUserData({
                    ...updatedUserData,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-group">
              <label htmlFor="avatar" className="label-margin">
                Avatar URL:
              </label>
              <Input
                type="text"
                id="avatar"
                placeholder="Avatar URL"
                value={updatedUserData.avatar}
                onChange={(e) =>
                  setUpdatedUserData({
                    ...updatedUserData,
                    avatar: e.target.value,
                  })
                }
              />
            </div>
            <div className="image-preview">
              <label className="label-margin">Avatar Preview:</label>
              <img
                src={updatedUserData.avatar}
                alt={`Avatar for ${updatedUserData.firstName}`}
                className="avatar-image"
              />
            </div>
            <div className="input-group">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setUpdatedUserData({
                        ...updatedUserData,
                        avatar: e.target.result,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <div className="center-button">
                <label htmlFor="fileInput" className="custom-file-upload">
                  Choose File
                </label>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete the user:{" "}
          {selectedUser
            ? `${selectedUser.first_name} ${selectedUser.last_name}`
            : ""}
          ?
        </p>
      </Modal>
      <Modal
        title="User Details"
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        className="custom-modal"
      >
        {userDetails && (
          <div className="update-modal-content">
            <div className="input-group">
              <label className="label-margin">
                First Name: {userDetails.first_name}
              </label>
            </div>
            <div className="input-group">
              <label className="label-margin">
                Last Name: {userDetails.last_name}
              </label>
            </div>
            <div className="input-group">
              <label className="label-margin">Email: {userDetails.email}</label>
            </div>
            <div className="input-group">
              <label className="label-margin">
                Avatar URL: {userDetails.email}
              </label>
            </div>
            <div className="avatar-detail">
              <img
                src={userDetails.avatar}
                alt={`Avatar for ${userDetails.first_name}`}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
