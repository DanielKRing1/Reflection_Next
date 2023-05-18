import React, { useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import { MyTextNoMargin } from "../../../Text/MyText";
import ClickContainer from "../../../Button/Base/ClickContainer";
import { useQuery, useReactiveVar } from "@apollo/client";
import {
    activeJournalVar,
    setActiveJournal,
} from "../../../../../graphql/apollo/local/state/activeJournal";
import { arrayToObj } from "../../../../../utils/obj";
import { GET_JOURNALS } from "../../../../../graphql/gql/journal";
import { Journal } from "../../../../../db/api/types";
import FlexCol from "../../../Flex/FlexCol";
import useOutsideClick from "../../../../../hooks/useOutsideClick";
import JournalRow from "./JournalRow";
import DropdownContainer from "./DropdownContainer";
import CreateJournalButton from "./CreateJournalButton";

type Props = {};

export default (props: Props) => {
    // LOCAL STATE
    const [selecting, setSelecting] = useState(false);

    // GQL
    const {
        loading: loading_journals,
        error: error_journals,
        data: { journals = [] } = {},
    } = useQuery(GET_JOURNALS, {
        fetchPolicy: "cache-only",
    });
    // Local memo
    const journalMap = useMemo(
        () => arrayToObj(journals, (journal: Journal) => journal.id),
        [journals]
    );
    const activeJournal = useReactiveVar(activeJournalVar);

    // HANDLERS
    const selectionRef = useRef();
    useOutsideClick(selectionRef, () => {
        if (selecting) setSelecting(false);
    });
    const handleToggleSelect = () => {
        setSelecting(!selecting);
    };
    const handleSelectJournal = (journalId: string) => {
        console.log(`selecting ${journalId}`);
        setActiveJournal(journalId);
        setSelecting(false);
    };

    const journalName = useMemo(() => {
        if (journalMap[activeJournal] === undefined) return undefined;

        return journalMap[activeJournal].name.length > 12
            ? `${journalMap[activeJournal].name.slice(0, 12)}...`
            : journalMap[activeJournal].name;
    }, [activeJournal, journalMap]);

    return (
        // Clicking outside of this 'SelectionContainer'
        // will toggle off the selection process
        <SelectionContainer ref={selectionRef}>
            {/* Toggle Button */}
            <ClickContainer onClick={handleToggleSelect}>
                <MyTextNoMargin>{journalName || "____"}</MyTextNoMargin>
            </ClickContainer>

            {/* Dropdown Absolute Container */}
            {selecting && (
                <DropdownContainer>
                    {/* Dropdown */}
                    <FlexCol alignItems="flex-start">
                        {/* Move active journal to front of list */}
                        {(journalName !== undefined
                            ? [
                                  journalMap[activeJournal],
                                  ...journals.filter(
                                      (j) => j.id !== activeJournal
                                  ),
                              ]
                            : journals
                        ).map((journal) => (
                            <JournalRow
                                key={journal.id}
                                journal={journal}
                                onSelect={() => handleSelectJournal(journal.id)}
                            />
                        ))}
                    </FlexCol>

                    <CreateJournalButton />
                </DropdownContainer>
            )}
        </SelectionContainer>
    );
};

const SelectionContainer = styled.div`
    position: relative;
    width: 100%;
`;
