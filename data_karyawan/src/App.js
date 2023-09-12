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

  const URL = `https://reqres.in/api/users?page=${currentPage}&per_page=5`; // represent currentPage dengan setCurrentPage

  const getData = async () => {
    try {
      const response = await axios.get(URL);
      setData(response.data.data);
      console.log(
        "🚀 ~ file: App.js:30 ~ response.data.data:",
        response.data.data
      );
      console.log("🚀 ~ file: App.js:30 ~ Response:", response);
      setTotalPages(response.data.total_pages); // set pages in TotalPages
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // by default ke atas
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Filter By Name
  const nameFilter = (event) => {
    setNameField(event.target.value);
  };

  // Filter By Email
  const emailFilter = (event) => {
    setEmailField(event.target.value);
  };

  // Cari data user based on stored states nameField and emailField
  const filteredData = data.filter((d) => {
    return nameField
      ? d.first_name.toLowerCase().includes(nameField.toLowerCase())
      : d.email.toLowerCase().includes(emailField.toLowerCase());
  });

  // Handle Previous Page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // set current page for handlePreviouspage
    }
  };

  // Handle Next Page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // set current page for handleNextpage
    }
  };

  // Handle Update
  // Represent single data using parameter: record
  const handleUpdate = (record) => {
    setSelectedUser(record); // set select user for update
    setIsUpdateModalVisible(true);
    setUpdatedUserData({
      firstName: record.first_name,
      lastName: record.last_name,
      email: record.email,
      avatar: record.avatar,
    });
  };

  // Handle Show Delete
  const showDeleteModal = (record) => {
    setSelectedUser(record); // set select user for deletion
    setIsDeleteModalVisible(true);
  };

  // Handle Show Detail
  const showDetailModal = (record) => {
    setUserDetails(record); // set user detail
    setIsDetailModalVisible(true);
  };

  // Function to handle user deletion
  const handleDelete = async () => {
    const userId = selectedUser.id;
    try {
      // Send a DELETE request to your API
      const response = await axios.delete(
        `https://reqres.in/api/users/${userId}`
      );

      if (response.status === 204) {
        // HTTP status code if delete is successful
        console.log("User deleted successfully.");
        getData(); // Refresh the data after deletion
      } else {
        console.error("Error deleting user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleteModalVisible(false);
    }
  };

  // Function to handle user data update
  const updateUserData = async () => {
    const userId = selectedUser.id;
    try {
      // Prepare the updated user data based on the input fields (payload)
      const updatedData = {
        first_name: updatedUserData.firstName,
        last_name: updatedUserData.lastName,
        email: updatedUserData.email,
        avatar: updatedUserData.avatar,
      };

      // Make an API request to update the user data
      const response = await axios.patch(
        `https://reqres.in/api/users/${userId}`,
        updatedData
      );

      if (response.status === 200) {
        console.log("User data updated successfully:", response.data);
        setIsUpdateModalVisible(false); // Close the modal on success
        getData(); // Refresh the data by calling getData() here
      } else {
        console.error("Error updating user data:", response.data);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      setIsUpdateModalVisible(false); // Make sure to close the modal even in case of errors
    }
  };

  // interate the column
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
    // Button action
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
        dataSource={filteredData} // tampilan based on filtered data on search bar
        columns={columns}
        pagination={false}
        rowKey="id"
        className="table"
      />
      <div className="pagination">
        {/* Disable button if already === 1 */}
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        {/* Disable button if already === totalPages */}
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
      {/* COMPONENT MODAL UPDATE */}
      <Modal
        title="Update User"
        visible={isUpdateModalVisible} // modal is visible when click
        onOk={updateUserData} // submit to update user
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
                value={updatedUserData.firstName} // set default value
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
                value={updatedUserData.lastName} // set default value
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
                value={updatedUserData.email} // set default value
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
                value={updatedUserData.avatar} // set default value
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
                accept="image/*" // limit ke image file only
                onChange={(e) => {
                  // Defines an event handler for when the input value changes.
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader(); // It reads the selected file as a data URL (using FileReader) javascript build in (instance)
                    console.log(
                      "🚀 ~ file: App.js:332 ~ App ~ reader:",
                      reader
                    );
                    reader.onload = (e) => {
                      setUpdatedUserData({
                        ...updatedUserData,
                        avatar: e.target.result,
                      });
                    };
                    reader.readAsDataURL(file); // jadi base 64
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
      {/* COMPONENT MODAL DELETE */}
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete" // write delete on text
        okType="danger"
        cancelText="Cancel" // write cancle on text
      >
        <p>
          Are you sure you want to delete the user:
          {selectedUser
            ? `${selectedUser.first_name} ${selectedUser.last_name}`
            : ""}
          ?
        </p>
      </Modal>
      {/* COMPONENT MODAL DETAIL */}
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
