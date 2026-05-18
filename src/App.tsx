import { useMemo, useState } from "react";
import { flashcards } from "./cards";
import completionImage from "./resources/Image bicep.jpeg";

type CardStatus = "unseen" | "done" | "revision";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(count: number): number[] {
  return shuffle(Array.from({ length: count }, (_, i) => i));
}

function App() {
  const cards = useMemo(() => flashcards, []);

  const [deck, setDeck] = useState<number[]>(() => buildDeck(cards.length));
  const [position, setPosition] = useState(0);
  const [statuses, setStatuses] = useState<CardStatus[]>(() =>
    Array(cards.length).fill("unseen")
  );
  const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>(() =>
    Array(cards.length).fill(false)
  );
  const [isComplete, setIsComplete] = useState(false);

  const currentCardIndex = deck[position];
  const currentCard = cards[currentCardIndex];
  const queuedTotal = deck.length;
  const totalCards = cards.length;
  const doneCount = statuses.filter((s) => s === "done").length;
  const revisionCount = statuses.filter((s) => s === "revision").length;
  const unseenCount = statuses.filter((s) => s === "unseen").length;
  const progressPercent = Math.round((doneCount / totalCards) * 100);

  const canGoPrev = position > 0;
  const canGoNext = position < queuedTotal - 1;

  const handlePrev = () => {
    if (canGoPrev) setPosition((p) => p - 1);
  };

  const handleNext = () => {
    if (canGoNext) setPosition((p) => p + 1);
  };

  const markStatus = (status: CardStatus) => {
    const nextStatuses = [...statuses];
    nextStatuses[currentCardIndex] = status;
    setStatuses(nextStatuses);
    setRevealedAnswers((prev) => {
      const next = [...prev];
      next[currentCardIndex] = false;
      return next;
    });

    if (canGoNext) {
      setPosition((p) => p + 1);
      return;
    }

    const revisionIndexes = nextStatuses
      .map((cardStatus, index) => (cardStatus === "revision" ? index : -1))
      .filter((index) => index !== -1);
    const unfinishedIndexes = nextStatuses
      .map((cardStatus, index) => (cardStatus !== "done" ? index : -1))
      .filter((index) => index !== -1);

    if (revisionIndexes.length > 0) {
      setDeck((prev) => [...prev, ...shuffle(revisionIndexes)]);
      setPosition((p) => p + 1);
      return;
    }

    if (unfinishedIndexes.length > 0) {
      setDeck((prev) => [...prev, ...shuffle(unfinishedIndexes)]);
      setPosition((p) => p + 1);
      return;
    }

    setIsComplete(true);
  };

  const handleRestart = () => {
    setDeck(buildDeck(cards.length));
    setPosition(0);
    setStatuses(Array(cards.length).fill("unseen"));
    setRevealedAnswers(Array(cards.length).fill(false));
    setIsComplete(false);
  };

  const toggleAnswer = () => {
    setRevealedAnswers((prev) => {
      const next = [...prev];
      next[currentCardIndex] = !next[currentCardIndex];
      return next;
    });
  };

  const currentStatus = statuses[currentCardIndex];
  const isAnswerRevealed = revealedAnswers[currentCardIndex];

  return (
    <div
      data-theme="light"
      className="min-h-screen bg-base-200 flex flex-col items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-lg flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-base-content tracking-tight">
            Flashcard Practice
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            Queue {position + 1} of {queuedTotal}
          </p>
        </div>

        {/* Progress bar */}
        <div className="bg-base-100 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-base-content/60">Progress</span>
            <span className="text-primary font-semibold">
              {progressPercent}% done
            </span>
          </div>
          <progress
            className="progress progress-primary w-full h-3 rounded-full"
            value={doneCount}
            max={totalCards}
          />
          <div className="flex justify-between gap-2 text-xs text-center">
            <div className="flex-1 bg-base-200 rounded-xl py-1.5 px-2">
              <p className="font-bold text-base-content">{unseenCount}</p>
              <p className="text-base-content/50">Unseen</p>
            </div>
            <div className="flex-1 bg-success/10 rounded-xl py-1.5 px-2">
              <p className="font-bold text-success">{doneCount}</p>
              <p className="text-success/70">Done</p>
            </div>
            <div className="flex-1 bg-orange-100 rounded-xl py-1.5 px-2">
              <p className="font-bold text-orange-600">{revisionCount}</p>
              <p className="text-orange-400">Revision</p>
            </div>
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-base-100 rounded-3xl shadow-lg overflow-hidden">
          {/* Status badge */}
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <span className="text-xs text-base-content/40 font-medium uppercase tracking-wide">
              Card #{position + 1} · Slide {currentCard.slideNumber}
            </span>
            {currentStatus !== "unseen" && (
              <span
                className={`badge badge-sm font-semibold ${
                  currentStatus === "done"
                    ? "badge-success"
                    : "badge-warning text-orange-700"
                }`}
              >
                {currentStatus === "done" ? "✓ Done" : "↻ Needs Revision"}
              </span>
            )}
          </div>

          {/* Image */}
          <div className="px-5 pb-5">
            <div className="bg-base-200 rounded-2xl overflow-hidden flex items-center justify-center min-h-[260px]">
              <img
                key={currentCardIndex}
                src={currentCard.image}
                alt={`Flashcard ${position + 1} from slide ${currentCard.slideNumber}`}
                className="w-full h-auto max-h-[55vh] object-contain p-2"
              />
            </div>
            <div className="mt-4">
              <button
                className="btn btn-outline btn-sm rounded-xl w-full"
                onClick={toggleAnswer}
                aria-expanded={isAnswerRevealed}
              >
                {isAnswerRevealed ? "Hide Answer" : "Show Answer"}
              </button>
              {isAnswerRevealed && (
                <div className="mt-3 rounded-2xl bg-base-200 p-4 text-left">
                  <p className="text-xs font-semibold uppercase tracking-wide text-base-content/50">
                    Answer
                  </p>
                  <p className="mt-1 text-sm leading-6 text-base-content">
                    {currentCard.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mark buttons */}
        {!isComplete ? (
          <div className="flex gap-3">
            <button
              className="btn btn-success flex-1 rounded-2xl gap-2 shadow-sm"
              onClick={() => markStatus("done")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Mark as Done
            </button>
            <button
              className="btn flex-1 rounded-2xl gap-2 shadow-sm bg-orange-500 hover:bg-orange-600 text-white border-none"
              onClick={() => markStatus("revision")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Needs Revision
            </button>
          </div>
        ) : null}

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            className="btn btn-outline rounded-2xl flex-1 shadow-sm"
            onClick={handlePrev}
            disabled={!canGoPrev}
          >
            ← Previous
          </button>
          <button
            className="btn btn-primary rounded-2xl flex-1 shadow-sm"
            onClick={handleNext}
            disabled={!canGoNext}
          >
            Next →
          </button>
        </div>

        {/* Restart */}
        <div className="flex justify-center">
          <button
            className="btn btn-ghost btn-sm text-base-content/40 hover:text-error hover:bg-error/10 rounded-xl gap-2 transition-colors"
            onClick={handleRestart}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            Restart Progress & Reshuffle Flashcards
          </button>
        </div>
      </div>

      {isComplete && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl relative overflow-hidden rounded-3xl text-center p-6 sm:p-8">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-50 text-base-content/60 hover:text-base-content"
              onClick={() => setIsComplete(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="confetti" aria-hidden="true">
              {Array.from({ length: 28 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-base-content px-6 sm:px-0">
              All done! 👸💅🐀👑
            </h2>
            <p className="mt-2 text-sm text-base-content/60 px-2 sm:px-0">
              Every flashcard is marked done and no revision cards remain, my eepy princess.
            </p>
            <div className="mx-auto mt-5 w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden blue-glow-shadow shiny-container border border-blue-500/20">
              <img
                src={completionImage}
                alt="Completion placeholder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="modal-action justify-center mt-6">
              <button
                className="btn btn-primary rounded-2xl px-8"
                onClick={handleRestart}
              >
                Restart Flashcards
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-base-content/30 cursor-pointer"
            onClick={() => setIsComplete(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
