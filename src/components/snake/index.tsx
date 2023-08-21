import CanvasBoard from "./Canvas";
import GameTitle from "../common/GameTitle";

const Snake = () => {
  return (
    <div>
      <GameTitle title={'Snake'}/>
      <CanvasBoard height={600} width={1000} />
    </div>
  )
}

export default Snake