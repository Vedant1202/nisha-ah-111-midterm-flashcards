export type Flashcard = {
  image: string;
  slideNumber: number;
  text: string;
};

export const flashcards: Flashcard[] = [
  {
    image: new URL("./resources/1.jpg", import.meta.url).href,
    slideNumber: 1,
    text: "Machu Picchu, Inca, c. 1450–1531, Peru.",
  },
  {
    image: new URL("./resources/2.jpg", import.meta.url).href,
    slideNumber: 1,
    text: "Machu Picchu, Inca, c. 1450–1531, Peru.",
  },
  {
    image: new URL("./resources/3.jpg", import.meta.url).href,
    slideNumber: 2,
    text: "Stradano, Print Workshop, 1590, engraving print, ink on paper.",
  },
  {
    image: new URL("./resources/4.jpg", import.meta.url).href,
    slideNumber: 3,
    text: "van den Berghe, Still Life with Flowers in a Vase, 1617, oil on canvas.",
  },
  {
    image: new URL("./resources/5.png", import.meta.url).href,
    slideNumber: 4,
    text: "Artemisia Gentileschi, Judith Beheading Holofernes, 1619-1620, Uffizi, oil painting.",
  },
  {
    image: new URL("./resources/6.png", import.meta.url).href,
    slideNumber: 5,
    text: "Antoine Watteau, Gersaint’s Shopsign, 1720",
  },
  {
    image: new URL("./resources/7.jpg", import.meta.url).href,
    slideNumber: 6,
    text: "Jacques-Louis David, Oath of the Horatii, 1784-5, oil on canvas.",
  },
  {
    image: new URL("./resources/8.png", import.meta.url).href,
    slideNumber: 7,
    text: "Miguel de Cabrera, Don Juan Xavier Joachín Gutiérrez Altamirano Velasco, Count of Santiago de Calimaya, 1750s",
  },
  {
    image: new URL("./resources/9.png", import.meta.url).href,
    slideNumber: 8,
    text: "San Francisco Acatepec, Puebla, Mexico, late 1700s",
  },
  {
    image: new URL("./resources/10.jpg", import.meta.url).href,
    slideNumber: 9,
    text: "Katsushika Hokusai, Under the Wave off Kanagawa, from Thirty-Six Views of Mount Fuji, ca. 1830-33, color woodblock print",
  },
  {
    image: new URL("./resources/11.png", import.meta.url).href,
    slideNumber: 10,
    text: "F.W. Stevens with Sitaram Khanderao and Madherao Janardhan, Chhatrapati Shivaji Terminus (formerly Victoria Terminus), begun 1878, Mumbai, India",
  },
  {
    image: new URL("./resources/12.png", import.meta.url).href,
    slideNumber: 11,
    text: "Raja Ravi Varma, There Comes Papa, 1893. Oil on canvas, 122 × 78 cm. Trivandrum: Private Collection",
  },
  {
    image: new URL("./resources/13.jpg", import.meta.url).href,
    slideNumber: 12,
    text: "Gustave Courbet, A Burial at Ornans, 1849, oil on canvas, 315 cm × 660 cm (124 in × 260 in). Musée d’Orsay, Paris.",
  },
  {
    image: new URL("./resources/14.jpg", import.meta.url).href,
    slideNumber: 13,
    text: "Édouard Manet, Olympia, 1863, oil on canvas, 130.5 cm × 190 cm (51.4 in × 74.8 in). Musée d’Orsay, Paris.",
  },
  {
    image: new URL("./resources/15.png", import.meta.url).href,
    slideNumber: 14,
    text: "Pablo Picasso, Les Demoiselles d’Avignon (The Young Ladies of Avignon), 1907, oil on canvas, 243.9 cm × 233.7 cm (96 in × 92 in). MoMA, NY.",
  },
  {
    image: new URL("./resources/16.png", import.meta.url).href,
    slideNumber: 15,
    text: "Tarsila do Amaral, Anthropophagy, 1929, oil on canvas, 126 × 142 cm. MoMA, NY.",
  },
  {
    image: new URL("./resources/17.png", import.meta.url).href,
    slideNumber: 16,
    text: "Liubov Popova, Set Design for The Magnanimous Cuckold, 1922.",
  },
  {
    image: new URL("./resources/18.jpg", import.meta.url).href,
    slideNumber: 16,
    text: "Liubov Popova, Set Design for The Magnanimous Cuckold, 1922.",
  },
  {
    image: new URL("./resources/19.png", import.meta.url).href,
    slideNumber: 17,
    text: "David Smith, Tanktotem III, 1953, welded steel. (3 views)",
  },
  {
    image: new URL("./resources/20.png", import.meta.url).href,
    slideNumber: 17,
    text: "David Smith, Tanktotem III, 1953, welded steel. (3 views)",
  },
  {
    image: new URL("./resources/21.jpg", import.meta.url).href,
    slideNumber: 17,
    text: "David Smith, Tanktotem III, 1953, welded steel. (3 views)",
  },
  {
    image: new URL("./resources/22.png", import.meta.url).href,
    slideNumber: 18,
    text: "Melvin Edwards, Mojo for 1404, 1964, welded steel. (3 views)",
  },
  {
    image: new URL("./resources/23.jpg", import.meta.url).href,
    slideNumber: 18,
    text: "Melvin Edwards, Mojo for 1404, 1964, welded steel. (3 views)",
  },
  {
    image: new URL("./resources/24.jpg", import.meta.url).href,
    slideNumber: 18,
    text: "Melvin Edwards, Mojo for 1404, 1964, welded steel. (3 views)",
  },
  {
    image: new URL("./resources/25.jpg", import.meta.url).href,
    slideNumber: 19,
    text: "Andy Warhol, Mao, 1973, silkscreen, acrylic.",
  },
  {
    image: new URL("./resources/26.png", import.meta.url).href,
    slideNumber: 20,
    text: "Paul Strand, Asenah Wara, Leader of the Women’s Party, Wa, 1964, photograph.",
  },
  {
    image: new URL("./resources/27.png", import.meta.url).href,
    slideNumber: 21,
    text: "Theaster Gates, Stony Island Arts Bank, 2015, Chicago.",
  },
];
