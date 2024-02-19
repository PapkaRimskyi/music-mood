import Button from "./button/button.tsx";

function RepeatAndLoopController() {
  return (
    <div className="mt-4 flex justify-around">
      <div className="flex">
        <Button className="bg-loop-image" onClick={() => {}} isActive={true}/>
      </div>
      <div className="flex">
        <Button className="bg-shuffle-image" onClick={() => {}} isActive={false} />
      </div>
    </div>
  );
}

export default RepeatAndLoopController;
