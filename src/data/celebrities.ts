// Lithuanian Celebrities Data
// Automatically loads all images from public/images/public and public/images/hidden folders

export interface Celebrity {
  id: number;
  name: string;
  lastname: string;
  displayName: string;
  hiddenImageUrl: string;
  publicImageUrl: string;
}

// Custom display name mapping - map image filename to custom display name
// If not in mapping, will use the filename as the display name
const displayNameMapping: Record<string, string> = {
  'Adomas Vyšniauskas': 'Adomas Vyšniauskas',
  'Andrius Lobovas': 'Andrius Lobovas',
  'Antanas Kandrotas Celofanas': 'Celofanas (Antanas Kandrotas)',
  'Beata Nicholson': 'Beata Nicholson',
  'Dominykas Dirkstys': 'Dominykas Dirkstys',
  'Donatas Montvydas Donny Montello': 'Donny Montello (Donatas Montvydas)',
  'Džesika Šyvokaitė Jessica Shy': 'Jessica Shy (Džesika Šyvokaitė)',
  'Džordana Butkutė': 'Džordana Butkutė',
  'Gabrielius Vagelis': 'Vagelis (Gabrielius)',
  'Mantas Katleris': 'Mantas Katleris',
  'Mantas Stonkujs': 'Mantas Stonkus',
  'Marijonas Mikutavičius': 'Marijonas Mikutavičius',
  'Monika Liu Liubinaitė': 'Monika Liu',
  'Natalija Bunkė': 'Natalija Bunkė',
  'Nijolė Pareigytė': 'Nijolė Pareigytė',
  'Pishius': 'Pishius',
  'Radži Radžis Aleksandrovičius': 'Radži Aleksandrovičius',
  'Rytis Cicinas': 'Rytis Cicinas',
  'Rūta Ščiogolevaitė': 'Rūta Ščiogolevaitė',
  'Saulius Prūsaitis': 'Saulius Prūsaitis',
  'Sel Egidijus Dragūnas': 'Sel (Egidijus Dragūnas)',
  'Tadas Burgaila': 'Tadas Burgaila',
  'Vaidas Baumila': 'Vaidas Baumila',
  'Viktoras Viktor Balykov': 'Viktoras Balykov',
  'Visvaldas Matijošaitis': 'Visvaldas Matijošaitis',
  'Vytautas Medineckas Ironvytas': 'Ironvytas (Vytautas Medineckas)',
  // Add more custom mappings here as needed
};

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
  
  // Get custom display name from mapping, or use filename
  const displayName = displayNameMapping[filename] || filename;
  
  return {
    id: index + 1,
    name: firstname,
    lastname: lastname,
    displayName: displayName,
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
