import { useState, useEffect } from "react";
import {
  addNewNameToContest,
  fecthContest,
} from "../api-client";
import Header from "./header";

const Contest = ({ initialContest, onContestListClick }) => {
  const [contest, setContest] = useState(initialContest);

  useEffect(() => {
    fecthContest(contest.id).then((contest) => {
      setContest(contest);
    });
  }, [contest.id]);

  const handleClickContestList = (event) => {
    event.preventDefault();
    onContestListClick();
  };

  const handleNewNameSubmit = async (event) => {
    event.preventDefault();
    const newNameInput = event.target.newName;
    const updatedContest = await addNewNameToContest({
      contestId: contest.id,
      newNameValue: newNameInput.value,
    });
    setContest(updatedContest);
    event.target.reset();
  };

  return (
    <>
      <Header message={contest.id}></Header>
      <div className="contest">
        <div className="title">Contest Description</div>
        <div className="description">{contest.description}</div>

        <div className="title">Proposed Names</div>
        <div className="body">
          {contest.names?.length > 0 ? (
            <div className="List">
              {contest.names.map((proposedName) => (
                <div className="list" key={proposedName.id}>
                  {proposedName.name}
                </div>
              ))}
            </div>
          ) : (
            <div>No names proposed yet</div>
          )}
        </div>
        <div className="title">Propose a New Name</div>
        <div className="body">
          <form onSubmit={handleNewNameSubmit}>
            <input
              type="text"
              name="newName"
              placeholder="New Name Here...."
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <a
          href="/"
          className="link"
          onClick={handleClickContestList}
        >
          Contest List
        </a>
      </div>
    </>
  );
};

export default Contest;
