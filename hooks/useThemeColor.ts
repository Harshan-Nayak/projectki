/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light
) {
  const colorFromProps = props.light;
  const defaultColors = Colors.light;

  if (colorFromProps) {
    return colorFromProps;
  } else if (defaultColors && typeof defaultColors === 'object' && colorName in defaultColors) {
    return defaultColors[colorName];
  } else {
    return '#FFFFFF'; // Fallback color if the property doesn't exist
  }
}
