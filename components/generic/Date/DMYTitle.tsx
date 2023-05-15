import React from "react";
import styled from "styled-components";
import MyText from "../Text/MyText";
import { getDate, getMonthName, getYear } from "../../../utils/date";
import { padStart } from "../../../utils/string";

type Props = {
    date: Date;
    pretext?: string;
};

export default (props: Props) => {
    const { date, pretext } = props;

    return (
        <MyStyledText>
            {pretext} {getMonthName(date)}{" "}
            {padStart(getDate(date) + "", 2, "0")}, {getYear(date)}
        </MyStyledText>
    );
};

const MyStyledText = styled(MyText)`
    font-style: italic;
    padding: 10px;
`;
