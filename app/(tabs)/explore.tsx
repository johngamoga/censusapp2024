import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
    style={styles.scrollView} 
    headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={ <Image source={require("@/assets/images/censuspilot.jpg")} style={styles.headerImage} resizeMode="cover" />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Census in Papua New Guinea</ThemedText>
      </ThemedView>
      <ThemedText>
      To date, PNG has conducted four (4) censuses since 1980, 1990, 2000 and 2011. The next census is scheduled for 2024.
      The Census was unable to be conducted back in 2021 as planned, due to the COVID-19 pandemic.
      </ThemedText>
      <ThemedText>
        If you wish to view the Census Form, expand here to download
      </ThemedText>
      <Collapsible title="Census Form">
        <ThemedText>
          Attached is the{" "}
          <ThemedText type="defaultSemiBold">The Papua New Guinea 2024 Self Administered 
            Questionnaires (SAQ) for Private Dwellings</ThemedText>{" "}
          and issued to conduct the National Census.
        </ThemedText>
        <ExternalLink href="https://drive.google.com/file/d/1E0j9YcIZrGxvi5ymqEhF-ty5ThhoGu_g/view?usp=drive_link">
          <ThemedText type="link">Download</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="National Statistics Office">
        <ThemedText>
        The NSO is responsible for collecting and publishing statistics related to the economy, population and society at national, 
        regional and local levels. They also conduct the{" "}
          <ThemedText type="defaultSemiBold">census</ThemedText> in Papua New Guinea{" "}every
          <ThemedText type="defaultSemiBold"> 10 years.</ThemedText>
        </ThemedText>
        <Image
          source={require("@/assets/images/Picture1.png")}
          style={{ alignSelf: "center" }}
        />
        <ExternalLink href="https://www.nso.gov.pg/">
          <ThemedText type="link">More about the NSO</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Feedback">
        <ThemedText>
          If you wish to contact the <ThemedText type="defaultSemiBold">National Statistics Office</ThemedText>{" "}
          regarding the functionality of this app or the queries in general, then click the link below
          to contact them.{" "}
        </ThemedText>
        <ExternalLink href="https://www.nso.gov.pg/about-us/contact/">
          <ThemedText type="link">Contact Us</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#4CAF50', // Set the background color here
  },
  headerImage: {
    width: '100%', // Set to full width
    height: 300,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
