import React, { forwardRef, HTMLProps } from "react";
import styled from "styled-components";

type MyTextInputProps = {
    onChange: (newText: string) => void;
    onEnter?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

    borderColor?: string;
    color?: string;
} & Omit<HTMLProps<HTMLInputElement>, "onChange">;
const MyTextInput = forwardRef<HTMLInputElement, MyTextInputProps>(
    (props, ref) => {
        const {
            onChange,
            onEnter = () => {},
            onKeyDown = () => {},
            onKeyUp = () => {},
        } = props;

        /**
         * Called every keystroke
         * Updates local value
         */
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue: string = e.target.value;

            // Prop
            onChange(newValue);
        };

        // KEY HANDLERS
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            _handleEnter(e);
            _preventKeyLoseFocus(e);

            onKeyDown(e);
        };
        const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
            _preventKeyLoseFocus(e);

            onKeyUp(e);
        };
        /**
         * If pressed 'Enter' key, call handleDoneEditing
         */
        const _handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key == "Enter") onEnter();
        };
        /**
         * Prevent losing text input focus when pressing 'alt' or 'tab' keys
         */
        const _preventKeyLoseFocus = (
            e: React.KeyboardEvent<HTMLInputElement>
        ) => {
            // if (e.key === "Alt" || e.key === "Tab") e.preventDefault();
        };

        const { onEnter: _1, onChange: _2, ...drillProps } = props;
        return (
            <StyledInput
                {...drillProps}
                as={StyledInput}
                ref={ref}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
            />
        );
    }
);
const StyledInput = styled.input<
    React.HTMLProps<HTMLInputElement> & { borderColor?: string }
>`
    box-sizing: border-box;
    max-width: 100%;

    background-color: ${({ theme, color }) => color || theme.colors.main};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ borderColor }) => borderColor};
    font-size: ${({ theme }) => theme.fonts.md};
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
`;

export default MyTextInput;
