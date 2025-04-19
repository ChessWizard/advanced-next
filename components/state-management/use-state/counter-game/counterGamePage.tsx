"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState, useCallback } from "react";

enum GameStage {
  SETUP = "SETUP",
  PENDING_PLAYING = "PLAYING_PENDING",
  PLAYING = "PLAYING",
  FINISHED = "FINISHED",
}

interface Scores {
  firstPlayer: number;
  secondPlayer: number;
}

interface Players {
  firstPlayer: string;
  secondPlayer: string;
}

const MIN_GAME_POINT = 5;
const COUNTDOWN_START = 3;

const CounterGamePage = () => {
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.SETUP);
  const [gamePoint, setGamePoint] = useState<number>(MIN_GAME_POINT);
  const [initialGameModalIsOpen, setInitialGameModalIsOpen] =
    useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_START);
  const [winner, setWinner] = useState<string>("");
  const [scores, setScores] = useState<Scores>({
    firstPlayer: 0,
    secondPlayer: 0,
  });
  const [players, setPlayers] = useState<Players>({
    firstPlayer: "",
    secondPlayer: "",
  });
  const [isStartButtonDisabled, setIsStartButtonDisabled] =
    useState<boolean>(true);

  const handlePlayerNameChange = useCallback(
    (player: keyof Players, value: string) => {
      setPlayers((prev) => ({
        ...prev,
        [player]: value,
      }));
    },
    []
  );

  const handleGamePointChange = useCallback((value: string) => {
    const numValue = parseInt(value, 10);
    setGamePoint(
      Math.max(MIN_GAME_POINT, isNaN(numValue) ? MIN_GAME_POINT : numValue)
    );
  }, []);

  const startGame = useCallback(() => {
    setInitialGameModalIsOpen(false);
    setGameStage(GameStage.PENDING_PLAYING);
  }, []);

  const resetGame = useCallback(() => {
    setGameStage(GameStage.SETUP);
    setScores({ firstPlayer: 0, secondPlayer: 0 });
    setWinner("");
    setInitialGameModalIsOpen(true);
    setCountdown(COUNTDOWN_START);
  }, []);

  const handleClick = useCallback(
    (player: keyof Scores) => {
      setScores((previousValue) => {
        const newScores = {
          firstPlayer:
            player === "firstPlayer"
              ? previousValue.firstPlayer + 1
              : Math.max(0, previousValue.firstPlayer - 1),
          secondPlayer:
            player === "secondPlayer"
              ? previousValue.secondPlayer + 1
              : Math.max(0, previousValue.secondPlayer - 1),
        };

        if (newScores.firstPlayer >= gamePoint) {
          setWinner(players.firstPlayer);
          setGameStage(GameStage.FINISHED);
        } else if (newScores.secondPlayer >= gamePoint) {
          setWinner(players.secondPlayer);
          setGameStage(GameStage.FINISHED);
        }

        return newScores;
      });
    },
    [gamePoint, players]
  );

  useEffect(() => {
    if (gameStage !== GameStage.PLAYING) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "q" || event.key === "Q") {
        handleClick("firstPlayer");
      } else if (event.key === "p" || event.key === "P") {
        handleClick("secondPlayer");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStage, handleClick]);

  useEffect(() => {
    const isButtonDisabled =
      !players.firstPlayer || !players.secondPlayer || !gamePoint;
    setIsStartButtonDisabled(isButtonDisabled);
  }, [players.firstPlayer, players.secondPlayer, gamePoint]);

  useEffect(() => {
    if (gameStage !== GameStage.PENDING_PLAYING) return;

    let timer: NodeJS.Timeout;
    if (gameStage === GameStage.PENDING_PLAYING && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setGameStage(GameStage.PLAYING);
    }
    return () => clearTimeout(timer);
  }, [gameStage, countdown]);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {gameStage === GameStage.SETUP && (
        <Dialog
          open={initialGameModalIsOpen}
          onOpenChange={setInitialGameModalIsOpen}
        >
          <DialogContent
            className="[&>button]:hidden !min-w-72 md:!min-w-[750px]"
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Welcome to the Counter Game!</DialogTitle>
              <DialogDescription>
                Please determine player names and at what number the game will
                end
              </DialogDescription>
              <div className="flex gap-3">
                <div className="w-full">
                  <label htmlFor="firstPlayerName" className="text-xs">
                    First Player Name
                  </label>
                  <input
                    id="firstPlayerName"
                    className="w-full border px-3 py-2 rounded mb-4"
                    type="text"
                    value={players.firstPlayer}
                    onChange={(e) =>
                      handlePlayerNameChange("firstPlayer", e.target.value)
                    }
                  />
                </div>

                <div className="w-full">
                  <label htmlFor="secondPlayerName" className="text-xs">
                    Second Player Name
                  </label>
                  <input
                    id="secondPlayerName"
                    className="w-full border px-3 py-2 rounded mb-4"
                    type="text"
                    value={players.secondPlayer}
                    onChange={(e) =>
                      handlePlayerNameChange("secondPlayer", e.target.value)
                    }
                  />
                </div>
              </div>
              <label htmlFor="gamePoint" className="text-xs">
                Game Point
              </label>
              <input
                id="gamePoint"
                className="w-full border px-3 py-2 rounded mb-4"
                type="number"
                min={MIN_GAME_POINT}
                value={gamePoint}
                onChange={(e) => handleGamePointChange(e.target.value)}
              />
              <Button
                className="cursor-pointer"
                onClick={startGame}
                disabled={isStartButtonDisabled}
              >
                LET&apos;S PLAY!
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      {gameStage === GameStage.PENDING_PLAYING && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black/80 z-50">
          <div className="text-8xl font-bold text-white animate-bounce">
            {countdown}
          </div>
        </div>
      )}

      {gameStage === GameStage.PLAYING && (
        <div className="flex flex-col items-center gap-8">
          <div className="text-2xl font-semibold bg-primary/10 px-6 py-2 rounded-full shadow-sm">
            Target Score: {gamePoint}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Card
              className="group relative overflow-hidden p-0 rotate-180
               w-[180px] h-[180px]
               md:w-[260px] md:h-[260px] 
               lg:w-[240px] lg:h-[240px] lg:rotate-0 cursor-pointer"
              onClick={() => handleClick("firstPlayer")}
            >
              <CardContent
                className="flex flex-col justify-center items-center w-[180px] h-[180px] p-0
               md:w-[260px] md:h-[260px] 
               lg:w-[240px] lg:h-[240px]"
              >
                <p className="text-xl font-bold">
                  {players.firstPlayer}: {scores.firstPlayer}
                </p>
                <p className="text-lg text-muted-foreground hidden lg:block">
                  Press Q
                </p>
              </CardContent>
            </Card>

            <Card
              className="group relative overflow-hidden p-0
               w-[180px] h-[180px]
               md:w-[260px] md:h-[260px] 
               lg:w-[240px] lg:h-[240px] cursor-pointer"
              onClick={() => handleClick("secondPlayer")}
            >
              <CardContent
                className="flex flex-col justify-center items-center w-[180px] h-[180px] p-0
               md:w-[260px] md:h-[260px] 
               lg:w-[240px] lg:h-[240px]"
              >
                <p className="text-xl font-bold">
                  {players.secondPlayer}: {scores.secondPlayer}
                </p>
                <p className="text-lg text-muted-foreground hidden lg:block">
                  Press P
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-2xl font-semibold bg-primary/10 px-6 py-2 rounded-full shadow-sm rotate-180 lg:hidden">
            Target Score: {gamePoint}
          </div>
        </div>
      )}

      {gameStage === GameStage.FINISHED && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4">
            <div className="text-5xl font-bold text-white mb-2">{winner}</div>
            <div className="text-4xl text-white/90 mb-8">Won! 🎉</div>
            <Button
              className="text-lg px-8 py-6 w-full cursor-pointer"
              onClick={resetGame}
            >
              Play Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CounterGamePage;
