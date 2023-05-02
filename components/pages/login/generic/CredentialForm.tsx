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

    return (
        <FlexCol>
            <MyTextInput
                placeholder={"Username..."}
                value={username}
                onChange={onChangeUsername}
            />
            <MyTextInput
                placeholder={"Password..."}
                value={password}
                onChange={onChangePassword}
            />

            <MyButton onSubmit={onSubmit}>{submitButtonText}</MyButton>
        </FlexCol>
    );
};
