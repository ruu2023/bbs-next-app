import { BBSData } from "../types/types";
import BBSCard from "./BBSCard";

interface bbsAllDataProps {
  bbsAllData: BBSData[];
}

const BBSCardList = ({ bbsAllData }: bbsAllDataProps) => {
  return (
    <div className="grid lg:grid-cols-3 py-4 px-4 gap-4">
      {bbsAllData.map((bbsData: BBSData) => (
        <BBSCard key={bbsData.id} bbsData={bbsData} />
      ))}
    </div>
  );
};

export default BBSCardList;
