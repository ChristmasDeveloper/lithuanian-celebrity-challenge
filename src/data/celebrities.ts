// Lithuanian Celebrities Data
// Automatically loads all images from public/images/public folder

export interface Celebrity {
  id: number;
  name: string;
  lastname: string;
  imageUrl: string;
}

// Dynamically import all images from the public folder
const imageModules = import.meta.glob('/public/images/public/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' });

// Extract celebrity names from filenames and create celebrity objects
const imagePaths = Object.keys(imageModules);

export const celebrities: Celebrity[] = imagePaths.map((path, index) => {
  // Extract filename without extension
  const filename = path.split('/').pop()?.replace(/\.(png|jpg|jpeg|webp|gif)$/i, '') || '';
  
  // Split filename to get first name and last name
  // Assumes format: "FirstName LastName.png" or similar
  const nameParts = filename.split(' ');
  const firstname = nameParts[0] || 'Unknown';
  const lastname = nameParts.slice(1).join(' ') || 'Celebrity';
  
  return {
    id: index + 1,
    name: firstname,
    lastname: lastname,
    imageUrl: imageModules[path] as string
  };
});

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
