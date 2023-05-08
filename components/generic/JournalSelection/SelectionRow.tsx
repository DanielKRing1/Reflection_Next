import ClickContainer from "../Button/Base/ClickContainer";

type SelectionRowProps = {
    name: string;
    isSelected: boolean;
    onSelect: () => void;
};
export const SelectionRow = (props: SelectionRowProps) => {
    const { name, isSelected, onSelect } = props;

    return (
        <ClickContainer onClick={onSelect}>
            <p
                style={{
                    backgroundColor: isSelected ? "green" : "",
                }}
            >
                {name}
            </p>
        </ClickContainer>
    );
};
