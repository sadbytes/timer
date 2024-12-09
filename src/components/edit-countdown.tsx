import { useState } from "react";
import NumberInput from "./number-input";
import { Button } from "./ui/button";

type Props = {
  time: number;
  setTime: (value: number) => void;
  setIsEditDialogOpen: (value: boolean) => void;
};

export default function EditAnnouncement({
  time,
  setTime,
  setIsEditDialogOpen,
}: Props) {
  const [seconds, setSeconds] = useState(time % 60);
  const [minutes, setMinutes] = useState(Math.floor((time % 3600) / 60));
  const [hours, setHours] = useState(Math.floor(time / 3600));

  function startTimer() {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    setTime(totalSeconds);
    console.log(totalSeconds);
    setIsEditDialogOpen(false);
  }

  return (
    <>
      <div className="flex space-x-4 justify-center">
        <NumberInput value={hours} onChange={setHours} />
        <NumberInput value={minutes} onChange={setMinutes} max={59} />
        <NumberInput value={seconds} onChange={setSeconds} max={59} />
      </div>
      <div className="flex justify-evenly">
        <Button className="bg-[#fc0] text-black" onClick={startTimer}>Done</Button>
      </div>
    </>
  );
}
