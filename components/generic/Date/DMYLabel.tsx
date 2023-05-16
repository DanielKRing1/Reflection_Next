import React from "react";
import styled from "styled-components";
import MyText from "../Text/MyText";
import { getDate, getMonth, getYear } from "../../../utils/date";
import { padStart } from "../../../utils/string";

type Props = {
    date: Date;
    pretext?: string;
};

export default (props: Props) => {
    const { date, pretext } = props;

    return (
        <MyStyledText>
            {pretext}
            {pretext && <br />}
            {padStart(getMonth(date) + "", 2, "0")}/
            {padStart(getDate(date) + "", 2, "0")}/{getYear(date)}
        </MyStyledText>
    );
};

const MyStyledText = styled(MyText)`
    font-style: italic;
    text-align: right;
    padding: 10px;
`;
