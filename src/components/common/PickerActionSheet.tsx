import React, { useState } from "react";
import { Picker } from "react-native";

import CustomActionSheet from "./CustomActionSheet";
import { primaryColour } from "../../styles/colours";

export type Props = {
  visible: boolean;
  onCancel: () => void;
  onDone: (player: string) => void;
  options: string[];
  initialValue?: string;
};

export default ({
  visible,
  onCancel,
  onDone,
  options,
  initialValue = ""
}: Props) => {
  const [value, setValue] = useState(initialValue);

  return (
    <CustomActionSheet
      visible={visible}
      onCancel={() => {
        setValue(initialValue);
        onCancel();
      }}
      onDone={() => onDone(value)}
    >
      <Picker
        testID="action-sheet-picker"
        selectedValue={value}
        onValueChange={setValue}
      >
        {options.map(option => (
          <Picker.Item
            color={option === value ? primaryColour : undefined}
            label={option}
            value={option}
            key={option}
          />
        ))}
      </Picker>
    </CustomActionSheet>
  );
};
