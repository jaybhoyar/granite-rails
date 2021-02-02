import React, { useState, useEffect } from "react";
import { all, isNil, isEmpty, either } from "ramda";

import { setAuthHeaders } from "apis/axios";
import tasksApi from "apis/tasks";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Table from "components/Tasks/Table/index";

const Dashboard = ({ history }) => {
  const [tasks, setTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setAuthHeaders();
      const response = await tasksApi.list();
      const { pending, completed } = response.data.tasks;
      setPendingTasks(pending);
      setCompletedTasks(completed);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const destroyTask = async (id) => {
    try {
      await tasksApi.destroy(id);
      await fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleProgressToggle = async ({ id, progress }) => {
    try {
      await tasksApi.update({ id, payload: { task: { progress } } });
      await fetchTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const showTask = (id) => {
    history.push(`/tasks/${id}/show`);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  if (all(either(isNil, isEmpty), [pendingTasks, completedTasks])) {
    return (
      <Container>
        <h1 className="my-5 text-xl leading-5 text-center">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      {!either(isNil, isEmpty)(pendingTasks) && (
        <Table
          data={pendingTasks}
          destroyTask={destroyTask}
          showTask={showTask}
          handleProgressToggle={handleProgressToggle}
        />
      )}
      {!either(isNil, isEmpty)(completedTasks) && (
        <Table
          type="completed"
          data={completedTasks}
          destroyTask={destroyTask}
          handleProgressToggle={handleProgressToggle}
        />
      )}
    </Container>
  );
};

export default Dashboard;
