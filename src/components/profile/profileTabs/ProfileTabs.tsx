import * as React from "react";
import { View, Dimensions, Text } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { primaryColour, lightGray, mediumGray } from "../../../styles/colours";

const Recordings = () => (
  <View
    style={{
      display: "flex",
      alignItems: "center",
      flex: 1,
      backgroundColor: lightGray,
      padding: 20
    }}
  >
    <Text style={{ color: mediumGray }}>You have not made any recordings</Text>
  </View>
);

const Following = () => (
  <View
    style={{
      display: "flex",
      alignItems: "center",
      flex: 1,
      backgroundColor: lightGray,
      padding: 20
    }}
  >
    <Text style={{ color: mediumGray }}>You are not following anyone</Text>
  </View>
);

const initialLayout = { width: Dimensions.get("window").width };

export default function ProfileTabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "recordings", title: "Recordings" },
    { key: "following", title: "Following" }
  ]);

  const renderScene = SceneMap({
    recordings: Recordings,
    following: Following
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={props => (
        <TabBar
          {...props}
          pressColor={primaryColour}
          pressOpacity={0.8}
          tabStyle={{
            backgroundColor: primaryColour
          }}
          indicatorStyle={{
            backgroundColor: primaryColour
          }}
          indicatorContainerStyle={{
            backgroundColor: "white"
          }}
        />
      )}
    />
  );
}
