import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="dashboard">
      <div className="form">
        {isError && <p>{message}</p>}
        <section className="heading">
          <p>Add/Edit Task</p>
        </section>
        <GoalForm />
      </div>

      <section className="content">
        {goals && goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>There are no tasks left to complete.</h3>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
