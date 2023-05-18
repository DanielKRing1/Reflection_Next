import { FaPlus } from "react-icons/fa";
import useProtectedRouter from "../../../../../hooks/useProtectedRouter";
import { CREATE_JOURNAL_PATH } from "../../../../../routing/paths";
import AddButton from "../../../Button/AddButton";
import MyButton from "../../../Button/Base/MyButton";
import styled from "styled-components";

type Props = {};
export default (props: Props) => {
    // ROUTER
    const router = useProtectedRouter();

    // HANDLERS
    const handleRoute = () => {
        router.push(CREATE_JOURNAL_PATH);
    };

    return (
        <MyStyledButton onClick={handleRoute}>
            <FaPlus />
        </MyStyledButton>
    );
};

const MyStyledButton = styled(MyButton)`
    border: none;
    padding: 10px 0;
    margin: 0;
    width: 100%;
`;
