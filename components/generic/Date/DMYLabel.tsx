import React from "react";
import styled from "styled-components";
import MyText from "../Text/MyText";
import { getDate, getMonth, getYear } from "../../../utils/date";
import { padStart } from "../../../utils/string";

type Props = {
    date: Date;
};

export default (props: Props) => {
    const { date } = props;

    return (
        <MyStyledText>
            {padStart(getMonth(date) + "", 2, "0")}/
            {padStart(getDate(date) + "", 2, "0")}/{getYear(date)}
        </MyStyledText>
    );
};

const MyStyledText = styled(MyText)`
    font-style: italic;
    padding: 10px;
`;
