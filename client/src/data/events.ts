export type PogoEvent = {
  id: number;
  title: string;
  category: "community" | "raid" | "spotlight";
  bonus: string;
};

export const events: PogoEvent[] = [
  {
    id: 1,
    title: "Eevee Community Afternoon",
    category: "community",
    bonus: "Extra catch XP",
  },
  {
    id: 2,
    title: "Gengar Raid Evening",
    category: "raid",
    bonus: "Extra raid XP",
  },
  {
    id: 3,
    title: "Magikarp Spotlight",
    category: "spotlight",
    bonus: "Double catch Candy",
  },
];
