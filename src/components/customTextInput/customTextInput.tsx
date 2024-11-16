import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Keyboard,
  Platform,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {gs} from '../../theme/globalStyles';
import {ThemeContext} from '../../contexts/themeContext';

interface Props {
  placeHolder: string;
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  containerStyle?: ViewStyle;
  textInputStyle?: ViewStyle;
  textInputProps?: TextInputProps;
  leadingIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const CustomTextInput = forwardRef<TextInput, Props>(
  (
    {
      placeHolder,
      value,
      setValue,
      containerStyle,
      textInputStyle,
      textInputProps,
      leadingIcon,
      endIcon,
    },
    ref,
  ) => {
    const {theme} = React.useContext(ThemeContext);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const textInputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => textInputRef.current!);

    useEffect(() => {
      Keyboard.addListener('keyboardDidHide', () => {
        textInputRef.current?.blur();
      });

      return () => {
        Keyboard.removeAllListeners('keyboardDidHide');
      };
    }, []);

    return (
      <View
        style={{
          ...gs.row,
          backgroundColor: theme.backgroungColor,
          paddingHorizontal: scale(16),
          paddingVertical:
            Platform.OS === 'android' ? verticalScale(0) : verticalScale(10),
          borderRadius: 10,
          borderWidth: 1,
          borderColor: isFocused ? theme.secondaryColor : theme.borderColor,
          ...containerStyle,
        }}>
        {leadingIcon ?? null}
        <TextInput
          ref={textInputRef}
          placeholder={placeHolder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.secondaryContainer}
          value={value}
          onChangeText={setValue || textInputProps?.onChangeText}
          {...textInputProps}
          style={{flex: 1, color: theme.secondaryColor, ...textInputStyle}}
        />
        {endIcon ?? null}
      </View>
    );
  },
);

export default CustomTextInput;
