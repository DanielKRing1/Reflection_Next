import { ThoughtsDict, Thought } from "../../../../types/db";

export const getThought = (
    thoughtId: string,
    thoughtsDict: ThoughtsDict
): Thought | undefined => thoughtsDict[thoughtId];
