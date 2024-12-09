import Countdown from "./components/countdown";
import EditAnnouncement from "./components/edit-countdown";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import tickSound from "./assets/tick.mp3";

function App() {
  const [defaultTime, setDefaultTime] = useState(0);
  const [countdownTime, setCountdownTime] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const tickTimer = new Audio(tickSound);

  const handleReset = () => {
    setIsRunning(false);
    setCountdownTime(defaultTime);
  };

  function startNewTimer(totalSeconds: number) {
    setIsRunning(false);
    setDefaultTime(totalSeconds);
    setCountdownTime(totalSeconds);
  }

  useEffect(() => {
    if (!isRunning || countdownTime <= 0) return;
    if (countdownTime <= 10) tickTimer.play();

    const timer = setInterval(() => {
      setCountdownTime((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, countdownTime]);

  return (
    <>
      <div className="flex flex-col justify-evenly items-center bg-black w-screen h-screen">
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTrigger asChild>
            <div className="flex cursor-pointer">
              <Countdown seconds={countdownTime} />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Timer</DialogTitle>
            </DialogHeader>
            <EditAnnouncement
              time={defaultTime}
              setTime={startNewTimer}
              setIsEditDialogOpen={setIsEditDialogOpen}
            />
          </DialogContent>
        </Dialog>

        <div className="space-x-3 p-3 mx-auto">
          <Button
          className="bg-[#fc0] text-black disabled:opacity-100 hover:bg-[#fc0]"
            disabled={countdownTime == 0}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </>
  );
}

export default App;
