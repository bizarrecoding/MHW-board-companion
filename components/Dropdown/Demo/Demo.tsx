import React from 'react';

import { SelectDemo } from './SelectDemo';
import { View } from '../../Themed';

const dummyData = [
  { label: `test`, value: `0` },
  { label: `test1`, value: `1` },
  { label: `test2`, value: `2` },
  { label: `test3`, value: `3` },
  { label: `test4`, value: `4` },
  { label: `test5`, value: `5` },
];

const Demo = () => {
  const onDropdownSelect = (item: (typeof dummyData)[number]) => {
    console.log(`🚀 ~ onDropdownSelect ~ item:`, item);
  };

  return (
    <View>
      <SelectDemo
        title="Modal title"
        options={dummyData}
        onPressCancel={undefined}
        onPressConfirm={onDropdownSelect}
      />
    </View>
  );
};

export default Demo;
