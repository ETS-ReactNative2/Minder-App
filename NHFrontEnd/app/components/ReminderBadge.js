import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Paragraph, Title, Divider } from 'react-native-paper';

import colors from '../config/colors';

const ReminderBadge = ({
  reminderTime,
  reminderContent,
  reminderType,
  reminderStatus,
}) => {
  const [icon, setIcon] = useState('');
  const [iconColor, setIconColor] = useState('');

  const iconDictionary = {
    medication: 'pill',
    appointment: 'calendar',
    exercise: 'walk',
    diet: 'food',
    alert: 'alert-circle-outline',
    complete: 'check-bold',
    missed: 'close-circle-outline',
    other: 'help-circle-outline',
  };

  useEffect(() => {
    if (reminderStatus === 'complete') {
      setIconColor(colors.accept);
      setIcon(iconDictionary.complete);
    } else if (reminderStatus === 'missed') {
      setIconColor(colors.reject);
      setIcon(iconDictionary.missed);
    } else {
      setIconColor(colors.caution);

      if (reminderType in iconDictionary) {
        setIcon(iconDictionary[reminderType]);
      } else {
        setIcon(iconDictionary.other);
      }
    }
  }, [reminderStatus, reminderType]);

  const handlePressIn = () => {
    // do something like re route to the actual card - maybe pop a modal?
    console.log('Pressed');
  };

  return (
    <Card onPress={handlePressIn}>
      <View style={styles.innerContainer}>
        <Avatar.Icon
          icon={icon}
          backgroundColor={iconColor}
          style={styles.iconCircle}
        />
        <Title
          style={{
            fontSize: 30,
          }}
        >
          {reminderTime}
        </Title>
      </View>
      <View>
        <Paragraph style={styles.content}>{reminderContent}</Paragraph>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    marginVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 65,
  },
});

export default ReminderBadge;
