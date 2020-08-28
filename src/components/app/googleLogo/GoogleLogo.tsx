import React from "react";
import Svg, { Defs, Rect, G, Path } from "react-native-svg";

type LogoProps = {
  disabled: boolean;
};

export default function GoogleLogo({ disabled }: LogoProps) {
  if (disabled) {
    return (
      <Svg width={46} height={46} viewBox="0 0 46 46">
        <Defs>
          <Rect id="prefix__a" x={0} y={0} width={40} height={40} rx={2} />
        </Defs>
        <G fill="none" fillRule="evenodd">
          <Path
            d="M23.001 24.71v-3.348h8.424c.126.567.225 1.098.225 1.845 0 5.139-3.447 8.793-8.64 8.793-4.968 0-9-4.032-9-9s4.032-9 9-9c2.43 0 4.464.891 6.021 2.349l-2.556 2.484c-.648-.612-1.782-1.332-3.465-1.332-2.979 0-5.409 2.475-5.409 5.508s2.43 5.508 5.409 5.508c3.447 0 4.716-2.385 4.95-3.798h-4.959v-.009z"
            fill="rgba(0,0,0,0.4)"
          />
        </G>
      </Svg>
    );
  }

  return (
    <Svg width={46} height={46} viewBox="0 0 46 46">
      <Defs>
        <Rect id="prefix__b" x={0} y={0} width={40} height={40} />
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Path
          d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
          fill="#4285F4"
        />
        <Path
          d="M23 32c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0023 32z"
          fill="#34A853"
        />
        <Path
          d="M17.964 24.71a5.41 5.41 0 01-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0014 23c0 1.452.348 2.827.957 4.042l3.007-2.332z"
          fill="#FBBC05"
        />
        <Path
          d="M23 17.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.463 14.891 25.426 14 23 14a8.997 8.997 0 00-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z"
          fill="#EA4335"
        />
        <Path d="M14 14h18v18H14V14z" />
      </G>
    </Svg>
  );
}
