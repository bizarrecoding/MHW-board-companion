import { useSelector } from "react-redux";

import { HunterLog } from "../../components/HunterLog";
import { RootState } from "../../util/redux/store";

export default function HunterLogScreen() {
  const huntLog = useSelector((state: RootState) => state.log.huntLog);
  return <HunterLog data={huntLog} />;
}
