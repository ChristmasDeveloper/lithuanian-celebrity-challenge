// Lithuanian Celebrities Data
// Easy to update image URLs later - just replace the imageUrl values

export interface Celebrity {
  id: number;
  name: string;
  lastname: string;
  imageUrl: string;
}

export const celebrities: Celebrity[] = [
  {
    id: 1,
    name: "Arvydas",
    lastname: "Sabonis",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Arvydas_Sabonis.jpg/440px-Arvydas_Sabonis.jpg"
  },
  {
    id: 2,
    name: "Rūta",
    lastname: "Meilutytė",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ruta_Meilutyte_2019.jpg/440px-Ruta_Meilutyte_2019.jpg"
  },
  {
    id: 3,
    name: "Žydrūnas",
    lastname: "Savickas",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Zydrunas_Savickas_2012.jpg/440px-Zydrunas_Savickas_2012.jpg"
  },
  {
    id: 4,
    name: "Ingeborga",
    lastname: "Dapkūnaitė",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Ingeborga_Dapkunaite.jpg/440px-Ingeborga_Dapkunaite.jpg"
  },
  {
    id: 5,
    name: "Donatas",
    lastname: "Montvydas",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Donny_Montell_ESC2016.jpg/440px-Donny_Montell_ESC2016.jpg"
  },
  {
    id: 6,
    name: "Jurga",
    lastname: "Šeduikytė",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    id: 7,
    name: "Andrius",
    lastname: "Mamontovas",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Andrius_Mamontovas_2018.jpg/440px-Andrius_Mamontovas_2018.jpg"
  },
  {
    id: 8,
    name: "Šarūnas",
    lastname: "Jasikevičius",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Sarunas_Jasikevicius.jpg/440px-Sarunas_Jasikevicius.jpg"
  },
  {
    id: 9,
    name: "Violeta",
    lastname: "Urmana",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    id: 10,
    name: "Jonas",
    lastname: "Valančiūnas",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Jonas_Valanciunas.jpg/440px-Jonas_Valanciunas.jpg"
  },
];

// Helper to normalize strings for comparison
export const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // remove diacritics for forgiving matching
};

// Check if guess matches celebrity
export const checkGuess = (guess: string, celebrity: Celebrity): boolean => {
  const normalizedGuess = normalizeString(guess);
  const fullName = normalizeString(`${celebrity.name} ${celebrity.lastname}`);
  const reverseName = normalizeString(`${celebrity.lastname} ${celebrity.name}`);
  
  return normalizedGuess === fullName || normalizedGuess === reverseName;
};
