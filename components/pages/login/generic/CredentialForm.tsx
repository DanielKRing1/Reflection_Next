import MyButton from "../../../generic/Button/Base/MyButton";
import FlexCol from "../../../generic/Flex/FlexCol";
import MyTextInput from "../../../generic/Input/MyTextInput";

export type CredentialFormProps = {
    username: string;
    onChangeUsername: (newText: string) => void;
    password: string;
    onChangePassword: (newText: string) => void;

    submitButtonText: string;
    onSubmit: () => void;
};

export default (props: CredentialFormProps) => {
    const {
        username,
        onChangeUsername,
        password,
        onChangePassword,
        submitButtonText,
        onSubmit,
    } = props;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "Enter":
                onSubmit();
        }
    };

    return (
        <FlexCol>
            <MyTextInput
                placeholder={"Username..."}
                value={username}
                onChange={onChangeUsername}
                onKeyDown={handleKeyDown}
            />
            <MyTextInput
                placeholder={"Password..."}
                value={password}
                onChange={onChangePassword}
                onKeyDown={handleKeyDown}
            />

            <MyButton onClick={onSubmit}>{submitButtonText}</MyButton>
        </FlexCol>
    );
};
