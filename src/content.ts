// Everything the site says: edit here, the pages only lay it out.

import camp from "./photos/camp-2048.webp";
import campThumb from "./photos/camp-800.webp";
import krakow from "./photos/krakow-2048.webp";
import krakowThumb from "./photos/krakow-800.webp";
import lake from "./photos/lake-2048.webp";
import lakeThumb from "./photos/lake-800.webp";
import malta from "./photos/malta-2048.webp";
import maltaThumb from "./photos/malta-800.webp";
import metro from "./photos/metro-2048.webp";
import metroThumb from "./photos/metro-800.webp";
import paris from "./photos/paris-2048.webp";
import parisThumb from "./photos/paris-800.webp";
import street from "./photos/street-2048.webp";
import streetThumb from "./photos/street-800.webp";
import train from "./photos/train-2048.webp";
import trainThumb from "./photos/train-800.webp";
import vienna from "./photos/vienna-2048.webp";
import viennaThumb from "./photos/vienna-800.webp";

export const owner = {
  name: "Guillaume Damiens",
  intro:
    "Je développe des applications, du serveur jusqu'au téléphone. En ce moment, une app de transports pour l'Île-de-France. À côté, je photographie et je filme.",
};

export const links = {
  github: "https://github.com/GuillaumeDmns",
  linkedin: "https://www.linkedin.com/in/guillaumedamiens/",
};

export interface Project {
  name: string;
  description: string;
  details: string[];
  url: string;
  urlLabel: string;
}

export const projects: Project[] = [
  {
    name: "Guillaume, l'app de mobilité",
    description:
      "Départs en temps réel autour de soi, itinéraires, info trafic et vélos en libre-service, sur les données ouvertes d'Île-de-France Mobilités.",
    details: ["Flutter : Android et web", "Spring Boot et PostgreSQL / PostGIS", "GTFS et temps réel PRIM"],
    url: "https://app.guillaumedamiens.com",
    urlLabel: "Ouvrir l'app web",
  },
];

export interface Photo {
  /** Full size (long edge 2048 px) */
  src: string;
  /** Grid size (long edge 800 px) */
  thumb: string;
  width: number;
  height: number;
  caption: string;
  /** What the photo shows, for screen readers */
  alt: string;
}

export const photos: Photo[] = [
  {
    src: street,
    thumb: streetThumb,
    width: 2048,
    height: 1166,
    caption: "Rue de nuit",
    alt: "Des maisons le long d'une rue éclairée par des lampadaires, la nuit, avec les lumières d'une ville au loin",
  },
  {
    src: lake,
    thumb: lakeThumb,
    width: 2048,
    height: 1319,
    caption: "Lac en Slovaquie",
    alt: "Des barques sur un lac de montagne, au pied de sommets enneigés",
  },
  {
    src: train,
    thumb: trainThumb,
    width: 2048,
    height: 1365,
    caption: "Coucher de soleil, Prague",
    alt: "Un petit train touristique sur des pavés, à contre-jour au coucher du soleil",
  },
  {
    src: metro,
    thumb: metroThumb,
    width: 2048,
    height: 1365,
    caption: "Métro de Prague",
    alt: "Une rame entre en station dans le métro de Prague, aux murs couverts de disques dorés",
  },
  {
    src: paris,
    thumb: parisThumb,
    width: 1365,
    height: 2048,
    caption: "Toits de Paris",
    alt: "Des immeubles parisiens vus d'en haut, au coucher du soleil",
  },
  {
    src: krakow,
    thumb: krakowThumb,
    width: 2048,
    height: 1365,
    caption: "La Vistule, Cracovie",
    alt: "La Vistule au coucher du soleil, avec ses berges et ses promeneurs",
  },
  {
    src: vienna,
    thumb: viennaThumb,
    width: 2048,
    height: 1365,
    caption: "Vienne",
    alt: "Un dôme surmonté du drapeau autrichien, la lune dans un ciel bleu",
  },
  {
    src: malta,
    thumb: maltaThumb,
    width: 1152,
    height: 2048,
    caption: "Malte",
    alt: "Une rue étroite aux balcons colorés, bordée de voitures garées",
  },
  {
    src: camp,
    thumb: campThumb,
    width: 2048,
    height: 1365,
    caption: "Auschwitz",
    alt: "Les baraquements de brique et les clôtures de barbelés du camp d'Auschwitz",
  },
];

export interface Video {
  title: string;
  year: number;
  provider: "youtube" | "vimeo";
  id: string;
}

export const videos: Video[] = [
  { title: "Aftermovie Imaginarium Festival", year: 2019, provider: "youtube", id: "4zPo35VufX0" },
  { title: "Aftermovie Gala ESCOM", year: 2018, provider: "youtube", id: "m9bQpUPdIl8" },
  { title: "Aftermovie Intégration UTC", year: 2017, provider: "vimeo", id: "255537990" },
];

export const legal = {
  publisher: "Guillaume Damiens, à titre personnel et non commercial. Contact : contact@guillaumedamiens.com",
  host: "ZAP-Hosting GmbH, Hafenweg 8, 48155 Münster, Allemagne, +49 251 149 811 80.",
  privacy: [
    "Ce site ne dépose aucun cookie et ne mesure pas l'audience. Le serveur garde 14 jours des journaux techniques (adresse IP, heure, page demandée), pour sa sécurité.",
    "Les vidéos ne sont chargées depuis YouTube ou Vimeo que lorsque vous lancez leur lecture : ces services s'appliquent alors (YouTube en mode sans cookie, Vimeo sans suivi).",
  ],
  app: { label: "Mentions légales et confidentialité de l'app", url: "https://app.guillaumedamiens.com/privacy" },
};
