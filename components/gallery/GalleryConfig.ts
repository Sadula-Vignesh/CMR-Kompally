// Configuration for the Awwwards-style GSAP Pinned Scroll Gallery

export interface GalleryImage {
  url: string;
  title: string;
}

export const ASPECT_RATIOS = [
  "aspect-[3/4]",    // Tall portrait
  "aspect-square",   // Square
  "aspect-[4/3]",    // Wide landscape
  "aspect-[2/3]",    // Extra tall portrait
  "aspect-[16/10]",  // Landscape
  "aspect-[4/5]"     // Semi-tall portrait
];

export interface CardAnimationConfig {
  x: string;
  y: string;
  rotate: number;
}

// Staggered off-screen coordinates for the 15 choreographed slots
export const CARD_ANIMATION_CONFIGS: CardAnimationConfig[] = [
  { x: "-50vw", y: "0vh", rotate: -5 },   // Card 0: slides from left
  { x: "50vw", y: "0vh", rotate: 4 },     // Card 1: slides from right
  { x: "0vw", y: "-50vh", rotate: -6 },   // Card 2: comes from top
  { x: "0vw", y: "50vh", rotate: 5 },     // Card 3: comes from bottom
  { x: "-50vw", y: "-50vh", rotate: 7 },  // Card 4: left-top diagonal
  { x: "50vw", y: "50vh", rotate: -4 },   // Card 5: right-bottom diagonal
  { x: "-40vw", y: "15vh", rotate: -3 },  // Card 6: left
  { x: "40vw", y: "-15vh", rotate: 6 },   // Card 7: right
  { x: "-15vw", y: "-50vh", rotate: -5 }, // Card 8: top
  { x: "15vw", y: "50vh", rotate: 4 },    // Card 9: bottom
  { x: "-50vw", y: "30vh", rotate: -8 },  // Card 10: left-bottom diagonal
  { x: "50vw", y: "-30vh", rotate: 5 },   // Card 11: right-top diagonal
  { x: "0vw", y: "-50vh", rotate: -4 },   // Card 12: top
  { x: "0vw", y: "50vh", rotate: 6 },     // Card 13: bottom
  { x: "50vw", y: "0vh", rotate: -7 }     // Card 14: right
];
