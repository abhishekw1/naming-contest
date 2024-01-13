import { useEffect, useState } from "react";
import ContestPreview from "./contest-preview";
import { fecthContests } from "../api-client";
import Header from "./header";

const ContestList = ({ initialContests, onContestClick }) => {
  const [contests, setContests] = useState(
    initialContests ?? [],
  );

  useEffect(() => {
    if (!initialContests) {
      fecthContests().then((contests) => {
        setContests(contests);
      });
    }
  }, [initialContests]);

  return (
    <>
      <Header message="Naming Contest"></Header>
      <div className="contest-list">
        {contests.map((contest) => {
          return (
            <ContestPreview
              key={contest.id}
              contest={contest}
              onClick={onContestClick}
            ></ContestPreview>
          );
        })}
      </div>
    </>
  );
};
export default ContestList;
