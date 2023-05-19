// THIRD PARTY
import React, { useMemo } from "react";

// PAGE-SPECIFIC COMPONENTS
import JournalEntryThought from "./JournalEntryThought";

// TYPES
import {
    JournalEntry as JournalEntryType,
    Reflection,
    Thought,
} from "../../../../db/api/types";

// UTILS
import useOnHover from "../../../../hooks/useOnHover";
import FlexCol from "../../../generic/Flex/FlexCol";
import { Dict } from "../../../../types/data";
import DMYTitle from "../../../generic/Date/DMYTitle";
import BoxShadow from "../../../generic/BoxShadow";
import styled from "styled-components";
import Spacer from "../../../generic/Spacing/Spacer";

type JournalEntryProps = {
    journalEntry: JournalEntryType;
    thoughtDict: Dict<Thought>;
};
const JournalEntry = (props: JournalEntryProps) => {
    const { journalEntry, thoughtDict } = props;

    console.log(journalEntry.reflections);

    // LOCAL STATE
    const [thoughtReflections, inklingReflections] = useMemo(() => {
        const [thoughtReflections, inklingReflections] =
            journalEntry.reflections.reduce<Reflection[][]>(
                (acc, cur) => {
                    if (cur.decision < 2) acc[0].push(cur);
                    else acc[1].push(cur);

                    return acc;
                },
                [[], []]
            );

        return [
            thoughtReflections.sort((a, b) => a.decision - b.decision),
            inklingReflections.sort((a, b) => a.decision - b.decision),
        ];
    }, [journalEntry]);

    // HOOKS
    const { isHovered, onMouseEnter, onMouseLeave } = useOnHover();

    return (
        <FramingDiv>
            <BoxShadow>
                <ContentDiv
                    width="100%"
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <DMYTitle
                        date={new Date(journalEntry.timeId)}
                        pretext={"Entry"}
                    />

                    <Spacer y={10} />

                    {thoughtReflections.map(({ thoughtId, decision }) => (
                        <JournalEntryThought
                            key={thoughtId}
                            thought={thoughtDict[thoughtId]}
                            reflectionDecision={decision}
                        />
                    ))}

                    <Spacer y={40} />

                    {inklingReflections.map(({ thoughtId, decision }) => (
                        <JournalEntryThought
                            key={thoughtId}
                            thought={thoughtDict[thoughtId]}
                            reflectionDecision={decision}
                        />
                    ))}
                </ContentDiv>
            </BoxShadow>
        </FramingDiv>
    );
};

export default JournalEntry;

const FramingDiv = styled.div`
    padding: 20px 0;
    background: transparent;
`;

const ContentDiv = styled(FlexCol)`
    border: solid black;
    border-radius: 0.4rem;
    padding: 20px;
`;
