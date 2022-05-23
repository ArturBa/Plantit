import React, { useEffect } from 'react';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

export interface LogoSvgProps {
  size?: number;
  fill?: string;
}

const LogoOuterPath = Animated.createAnimatedComponent(Path);

export const LogoSvg: React.FC<LogoSvgProps> = (props: LogoSvgProps) => {
  const { size, fill } = props;
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [progress]);
  // const widthValue = useSharedValue(size || 100);

  // const animatedOuterProps = useAnimatedProps(() => ({
  //   strokeDashoffset: widthValue.value,
  // }));

  const strokeDasharray = Math.floor(size! * 0.65);
  const logoOuterProps = useAnimatedProps(() => {
    return { strokeDashoffset: -progress.value * strokeDasharray * 2 };
  }, []);
  const logoInnerProps = useAnimatedProps(() => {
    return { strokeDashoffset: progress.value * strokeDasharray * 2 };
  }, []);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1024 1024"
      height={size}
      width={size}
    >
      <Path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={37.2364}
        stroke="#EEF1EF"
        d="M407.377 867.091S211.304 442.69 317.194 336.799c105.891-105.891 341.782-94.581 401.385-7.563 59.603 87.018-27.02 194.975-93.091 240.23-66.072 45.255-222.87 0-222.87 0"
      />
      <Path
        strokeLinecap="round"
        strokeWidth={37.2364}
        stroke="#EEF1EF"
        d="M619.843 372.845s-102.303 12.891-143.17 37.438c-40.866 24.547-102.029 109.845-102.029 109.845"
      />
      <LogoOuterPath
        animatedProps={logoOuterProps}
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth={37.2364}
        stroke={fill}
        strokeDasharray={strokeDasharray}
        d="M407.377 867.091S211.304 442.69 317.194 336.799c105.891-105.891 341.782-94.581 401.385-7.563 59.603 87.018-27.02 194.975-93.091 240.23-66.072 45.255-222.87 0-222.87 0"
      />
      <LogoOuterPath
        animatedProps={logoInnerProps}
        strokeLinecap="round"
        strokeWidth={37.2364}
        stroke={fill}
        strokeDasharray={strokeDasharray}
        d="M619.843 372.845s-102.303 12.891-143.17 37.438c-40.866 24.547-102.029 109.845-102.029 109.845"
      />
    </Svg>
  );
};

LogoSvg.defaultProps = {
  size: 200,
  fill: '#2A5B38',
};
