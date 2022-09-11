import { CardData } from "./CardData";

export interface DetailedInfo extends CardData {
  nativeName: string;
  subregion: string;
  currencies: string[];
  languages: string[];
  domain: string;
  border: string[];
}
