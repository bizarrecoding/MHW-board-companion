import React from "react";
import { StoryEntry, StoryOption } from "../../assets/data/types";
import Colors from "../../constants/Colors";
import Button from "../themed/ThemedButton";

type EntryOptionsProps = {
  story: StoryEntry[];
  options: StoryEntry[`options`];
  setOption: React.Dispatch<React.SetStateAction<StoryOption | undefined>>;
  setNext: React.Dispatch<React.SetStateAction<StoryEntry>>;
};

const EntryOptions: React.FC<EntryOptionsProps> = ({ story, options, setNext, setOption }) => {
  if (!options?.length) return null;
  const onPress = (option: StoryOption) => {
    if (option.effect) return setOption(option);
    const nextEntry = story.find((entry) => entry.entry === option.next);
    if (nextEntry) setNext(nextEntry);
  };

  return (
    <>
      {options.map((option, index) => {
        return (
          <Button
            key={index}
            darkColor={Colors.dark.onPrimaryFixedVariant}
            style={{ width: "100%", borderRadius: 16 }}
            title={option.text}
            onPress={() => onPress(option)}
          />
        );
      })}
    </>
  );
};

export default EntryOptions;
