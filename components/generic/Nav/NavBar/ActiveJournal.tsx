import React, { useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import { MyTextNoMargin } from "../../Text/MyText";
import ClickContainer from "../../Button/Base/ClickContainer";
import { useQuery, useReactiveVar } from "@apollo/client";
import {
    activeJournalVar,
    setActiveJournal,
} from "../../../../graphql/apollo/local/state/activeJournal";
import { arrayToObj } from "../../../../utils/obj";
import { GET_JOURNALS } from "../../../../graphql/gql/journal";
import { Journal } from "../../../../db/api/types";
import FlexCol from "../../Flex/FlexCol";
import useOutsideClick from "../../../../hooks/useOutsideClick";

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
    const activeJournal = useReactiveVar(activeJournalVar);
    const journalMap = useMemo(
        () => arrayToObj(journals, (journal: Journal) => journal.id),
        [journals]
    );

    // HANDLERS
    const selectionRef = useRef();
    useOutsideClick(selectionRef, () => {
        if (selecting) handleToggleSelect();
    });
    const handleToggleSelect = () => {
        setSelecting(!selecting);
    };
    const handleSelectJournal = (journalId: string) => {
        console.log(`selecting ${journalId}`);
        setActiveJournal(journalId);
        handleToggleSelect();
    };

    // THEME
    const theme = useTheme();

    return (
        <div
            ref={selectionRef}
            style={{
                position: "relative",
                width: "100%",
            }}
        >
            <ClickContainer onClick={handleToggleSelect}>
                <MyTextNoMargin>
                    {journalMap[activeJournal]
                        ? journalMap[activeJournal].name
                        : "----"}
                </MyTextNoMargin>
            </ClickContainer>

            {selecting && (
                <div
                    style={{
                        position: "absolute",
                        border: "1px solid",
                        borderRadius: "5px",
                        left: 0,
                        right: 0,
                        padding: "10px 5px",
                        backgroundColor: theme.body,
                    }}
                >
                    <FlexCol>
                        {journals.map((journal) => (
                            <ClickContainer
                                style={{
                                    width: "100%",
                                }}
                                onClick={() => handleSelectJournal(journal.id)}
                            >
                                <MyTextNoMargin
                                    style={{ fontSize: theme.fonts.sm }}
                                >
                                    {journal.name}
                                </MyTextNoMargin>
                            </ClickContainer>
                        ))}
                    </FlexCol>
                </div>
            )}
        </div>
    );
};
