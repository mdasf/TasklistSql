import { useDispatch } from "react-redux";
import { deleteGoal, updateGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <div className="task_action_button">
        {/* onClick={() => dispatch(updateGoal(goal._id))} */}
        <button
          onClick={() => dispatch(updateGoal(goal.id))}
          className={`status_btn ${goal.completed ? "completed" : ""}`}
        >
          Mark as completed
        </button>
        <button onClick={() => dispatch(deleteGoal(goal.id))} className="close">
          X
        </button>
      </div>
      {/* <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div> */}
      <h3 className="title">{goal?.title}</h3>
      <p className="text">{goal.text}</p>
    </div>
  );
}

export default GoalItem;
