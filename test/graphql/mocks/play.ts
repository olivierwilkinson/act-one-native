import { PlayFragment } from "../../../src/graphql/fragments/types/PlayFragment";
import createMockLookup from "./helpers/createMockLookup";

export const play: PlayFragment = {
  __typename: "Play",
  id: 1,
  title: "Mock Play",
  description: "A play no one will ever read",
  image: "image-url",
  imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/legalcode",
  imageLicenseCode: "CREATIVE_COMMONS_2"
};

export const otherPlay: PlayFragment = {
  __typename: "Play",
  id: 2,
  title: "Other Mock Play",
  description: "Another play no one will ever read",
  image: "other-image-url",
  imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/legalcode",
  imageLicenseCode: "CREATIVE_COMMONS_2"
};

export const playById = createMockLookup({
  play,
  otherPlay
});
