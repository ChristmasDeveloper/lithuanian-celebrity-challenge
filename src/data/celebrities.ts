// Lithuanian Celebrities Data
// Automatically loads all images from public/images/public and public/images/hidden folders

export interface Celebrity {
  id: number;
  name: string;
  lastname: string;
  hiddenImageUrl: string;
  publicImageUrl: string;
}

// Dynamically import all images from both folders
const hiddenImageModules = import.meta.glob('/public/images/hidden/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' });
const publicImageModules = import.meta.glob('/public/images/public/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' });

// Extract celebrity names from filenames and create celebrity objects
const hiddenPaths = Object.keys(hiddenImageModules);

export const celebrities: Celebrity[] = hiddenPaths.map((hiddenPath, index) => {
  // Extract filename without extension
  const filename = hiddenPath.split('/').pop()?.replace(/\.(png|jpg|jpeg|webp|gif)$/i, '') || '';
  
  // Find matching public image by filename
  const publicPath = Object.keys(publicImageModules).find(path => {
    const publicFilename = path.split('/').pop()?.replace(/\.(png|jpg|jpeg|webp|gif)$/i, '') || '';
    return publicFilename === filename;
  });
  
  // Split filename to get first name and last name
  // Assumes format: "FirstName LastName.png" or similar
  const nameParts = filename.split(' ');
  const firstname = nameParts[0] || 'Unknown';
  const lastname = nameParts.slice(1).join(' ') || 'Celebrity';
  
  return {
    id: index + 1,
    name: firstname,
    lastname: lastname,
    hiddenImageUrl: hiddenImageModules[hiddenPath] as string,
    publicImageUrl: publicPath ? (publicImageModules[publicPath] as string) : (hiddenImageModules[hiddenPath] as string)
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
  
  // Check for exact full name match
  if (normalizedGuess === fullName || normalizedGuess === reverseName) {
    return true;
  }
  
  // Check if guess matches any individual word in the name
  const nameWords = `${celebrity.name} ${celebrity.lastname}`.split(' ').map(normalizeString);
  return nameWords.some(word => word === normalizedGuess);
};
