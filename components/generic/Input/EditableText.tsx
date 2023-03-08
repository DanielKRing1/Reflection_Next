// THIRD-PARTY
import React, { useState, useEffect, useRef } from "react";

// MY COMPONENTS
import MyButton from "../Button/Base/MyButton";
import MyText from "../Text/MyText";
import MyTextInput from "./MyTextInput";

export type EditableTextProps = {
  borderColor?: string;
  isFocused?: boolean;
  editable?: boolean;
  placeholder?: string;
  value: string;
  // Only provide this to 'listen' to the value change
  // Value will be stored locally in this component until it is 'committed' on blur/enter
  onChange?: (newText: string) => void;
  onCommit?: (newText: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

const EditableText = (props: EditableTextProps) => {
  const {
    borderColor = "",
    isFocused = false,
    editable = true,
    placeholder = "",
    value,
    onChange = () => {},
    onCommit = () => {},
    onFocus = () => {},
    onBlur = () => {},
  } = props;

  // LOCAL STATE
  const [isEditing, setIsEditing] = useState(isFocused);
  const [localValue, setLocalValue] = useState(value);

  const ref = useRef<HTMLInputElement>();

  // EFFECTS

  // Update local value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Focus input element
  useEffect(() => {
    if (isEditing && ref.current) ref.current.focus();
  }, [isEditing]);
  useEffect(() => {
    if (isFocused) setIsEditing(true);
    else {
      if (ref.current) ref.current.blur();
      setIsEditing(false);
    }
  }, [isFocused]);

  // HANDLERS

  /**
   * Called on focus,
   *    when EditableText clicked
   * Tells component to begin displaying local value
   */
  const handleStartEditing = () => {
    if (editable) setIsEditing(true);
  };

  /**
   * Called every keystroke
   * Updates local value
   */
  const handleChangeValue = (newValue: string) => {
    // Prop
    onChange(newValue);

    // Local
    setLocalValue(newValue);
  };

  const handleFocus = () => {
    // Props
    onFocus();
  };

  /**
   * Called on blur and on 'enter'
   * Tells EditableText to commit localValue
   *    and to begin displaying prop value
   */
  const handleBlur = () => {
    if (!isEditing) return;

    // Local
    setIsEditing(false);

    // Props
    onCommit(localValue);
    onBlur();
  };

  // const handleEnter = () => {
  //   if (ref.current) ref.current.blur();
  // };

  return (
    <>
      {!isEditing ? (
        <MyButton
          borderColor={borderColor}
          onClick={handleStartEditing}
          cursor="text"
        >
          <MyText>{value}</MyText>
        </MyButton>
      ) : (
        <MyTextInput
          ref={ref}
          // onEnter={handleEnter}
          borderColor={borderColor}
          placeholder={placeholder}
          value={localValue}
          onChange={handleChangeValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </>
  );
};

export default EditableText;
