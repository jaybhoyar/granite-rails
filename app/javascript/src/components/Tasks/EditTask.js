import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import TaskForm from "./Form/TaskForm";
import tasksApi from "apis/tasks";
import PageLoader from "components/PageLoader";
import usersApi from "apis/users";

const EditTask = ({ history }) => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await tasksApi.update({
        id,
        payload: { task: { title, user_id: userId } },
      });
      Toastr.success("Successfully updated task.");
      history.push("/");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await usersApi.list();
      setUsers(response.data.users);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await tasksApi.show(id);
      setTitle(response.data.task.title);
      setAssignedUser(response.data.assigned_user);
      setUserId(response.data.assigned_user.id);
    } catch (error) {
      logger.error(error);
    }
  };

  const loadData = async () => {
    await fetchTaskDetails();
    await fetchUserDetails();
  };

  useEffect(() => {
    loadData();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <TaskForm
        type="update"
        title={title}
        users={users}
        assignedUser={assignedUser}
        setTitle={setTitle}
        setUserId={setUserId}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default EditTask;
