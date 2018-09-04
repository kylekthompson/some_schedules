import React from 'react';
import { Text } from 'components/style';
import { authenticated } from 'components/authentication';
import { colors } from 'models/style';

export function Marketing() {
  return <Text color={colors.eerieBlack()} size={16}>An eventual description of SomeSchedules</Text>;
}

export default authenticated(Marketing);
