// THIRD PARTY
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

// PAGE-SPECIFIC COMPONENTS
import JournalEntryThought from "./JournalEntryThought";

// TYPES
import {
    JournalEntry as JournalEntryType,
    Thought,
} from "../../../../db/api/types";
import { RootState } from "../../../../redux/store";

// UTILS
import useOnHover from "../../../../hooks/useOnHover";
import FlexCol from "../../../generic/Flex/FlexCol";
import { GET_THOUGHTS } from "../../../../graphql/gql/thoughts";
import { useQuery } from "@apollo/client";
import { getActiveJournal } from "../../../../graphql/apollo/local/state/activeJournal";
import { arrayToObj } from "../../../../utils/obj";

type JournalEntryProps = {
    journalEntry: JournalEntryType;
};
const JournalEntry = (props: JournalEntryProps) => {
    const { journalEntry } = props;

    // HOOKS
    const { isHovered, onMouseEnter, onMouseLeave } = useOnHover();

    const {
        loading,
        error,
        data: { thoughts = [] } = {},
        fetchMore,
    } = useQuery(GET_THOUGHTS, {
        variables: {
            journalId: getActiveJournal(),
        },
    });

    const thoughtDict = useMemo(() => {
        return arrayToObj<Thought>(thoughts, (t: Thought) => t.timeId);
    }, [thoughts]);

    return (
        <FlexCol
            style={{ width: "70%", border: "solid black" }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <p>World</p>
            {Object.keys(thoughtDict).length > 0 &&
                journalEntry.reflections.map(({ thoughtId, decision }) => (
                    <JournalEntryThought
                        key={thoughtId}
                        isHovered={isHovered}
                        thought={thoughtDict[thoughtId]}
                        reflectionDecision={decision}
                    />
                ))}
        </FlexCol>
    );
};

export default JournalEntry;
