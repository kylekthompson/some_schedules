import React from 'react';
import { Text } from 'src/components/style';
import { authenticated } from 'src/components/authentication';
import { colors } from 'src/models/style';

export function Marketing() {
  return <Text color={colors.eerieBlack()} size={16}>An eventual description of SomeSchedules</Text>;
}

export default authenticated(Marketing);
