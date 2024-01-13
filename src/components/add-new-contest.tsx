import { useState } from "react";
import { addNewContests } from "../api-client";

const AddNewContest = ({ onSuccess }) => {
  const [isShowAddContestForm, setIsShowAddContestForm] =
    useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const newContestPayload = {
      contestName: form.contestName.value,
      categoryName: form.categoryName.value,
      description: form.description.value,
    };

    const newContest = await addNewContests(newContestPayload);
    if (newContest?.id) {
      form.reset();
      onSuccess(newContest);
    }
  };
  const showAddContestForm = () => {
    if (!isShowAddContestForm) {
      return (
        <div
          className="title link"
          onClick={() => {
            setIsShowAddContestForm(true);
          }}
        >
          Add New Contest
        </div>
      );
    } else {
      return (
        <div className="body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="contestName"
              placeholder="Contest Name"
            />
            <input
              type="text"
              name="categoryName"
              placeholder="Contest Category"
            />
            <textarea
              name="description"
              rows="5"
              cols="33"
              placeholder="Contest Description"
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  };
  return (
    <div className="add-new-contest">{showAddContestForm()}</div>
  );
};
export default AddNewContest;
