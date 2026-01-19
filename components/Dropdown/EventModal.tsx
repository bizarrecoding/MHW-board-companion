import React from "react";
import { Modal, StyleSheet, View } from "react-native";

import { Text, Button } from "../Themed";
import { useThemeColor } from "../themed/useThemeColor";
import { StoryOption } from "../../assets/data/types";

type EventModalProps = React.PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  content?: StoryOption;
}>;

const EventModal: React.FC<EventModalProps> = ({ visible, onClose, content, children }) => {
  const backgroundColor = useThemeColor(undefined, `card`);
  return (
    <Modal animationType="fade" transparent={true} visible={visible && !!content}>
      <View style={styles.modalView}>
        <View style={[styles.modalContent, { backgroundColor }]}>
          <Text variant="subtitle" style={{ textAlign: `center`, marginBottom: 10 }}>
            {content?.text}
          </Text>
          {content?.effect?.map((ef, index) => (
            <Text key={index} variant="caption">
              {ef}
            </Text>
          ))}
          <View style={styles.body}>{children}</View>
          <View style={styles.footer}>
            <Button title="Confirm" style={styles.controls} onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: `center`,
    backgroundColor: `rgba(0,0,0,0.5);`,
  },
  modalContent: {
    justifyContent: `center`,
    alignItems: `center`,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: `#000`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  body: {
    position: `relative`,
    justifyContent: `center`,
    alignItems: `center`,
    width: `100%`,
  },
  footer: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    width: `100%`,
  },
  controls: {
    flex: 1,
    borderRadius: 16,
    marginVertical: 16,
  },
});

export default EventModal;
