import React, { useState, useEffect, useRef } from "react";
import MyButton from "./MyButton";
import MyText from "./MyText";
import MyTextInput from "./MyTextInput";

type EditableTextProps = {
  editable?: boolean;
  placeholder?: string;
  value: string;
  onChange?: (newText: string) => void;
  onCommit: (newText: string) => void;
};

const EditableText = (props: EditableTextProps) => {
  const {
    editable = true,
    placeholder = "",
    value,
    onChange = () => {},
    onCommit,
  } = props;

  // LOCAL STATE
  const [isEditing, setIsEditing] = useState(false);
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
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: string = e.target.value;

    // Prop
    onChange(newValue);

    // Local
    setLocalValue(newValue);
  };

  /**
   * Called on blur
   * Tells EditableText to commit localValue
   *    and to begin displaying prop value
   */
  const handleDoneEditing = () => {
    onCommit(localValue);
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        <MyButton onClick={handleStartEditing}>
          <MyText>{value}</MyText>
        </MyButton>
      ) : (
        <MyTextInput
          ref={ref}
          placeholder={placeholder}
          value={localValue}
          onChange={handleChangeValue}
          onBlur={handleDoneEditing}
        />
      )}
    </>
  );
};

export default EditableText;
