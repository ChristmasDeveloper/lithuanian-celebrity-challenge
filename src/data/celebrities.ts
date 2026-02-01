// Lithuanian Celebrities Data
// Automatically loads all images from public/images/public and public/images/hidden folders

export interface Celebrity {
  id: number;
  name: string;
  lastname: string;
  displayName: string;
  hiddenImageUrl: string;
  publicImageUrl: string;
  audioHintPath: string;
}

// Custom display name mapping - map image filename to custom display name
// If not in mapping, will use the filename as the display name
const displayNameMapping: Record<string, string> = {
  'Adomas Vyšniauskas': 'Adomas Vyšniauskas',
  'Airidas Janonis': 'Airidas Janonis',
  'Andrius Lobovas': 'Andrius Lobovas',
  'Antanas Kandrotas Celofanas': 'Antanas Kandrotas (Celofanas)',
  'Arūnas Valinskas': 'Arūnas Valinskas',
  'Aurimas Valujavičius': 'Aurimas Valujavičius',
  'Beata Nicholson': 'Beata Nicholson',
  'Dominykas Dirkstys': 'Dominykas Dirkstys',
  'Dominykas OG Version Ježerys': 'Dominykas Ježerys (OG Version)',
  'Donatas Montvydas Donny Montell': 'Donatas Montvydas (Donny Montell)',
  'Dovydas Rimkus Rimkenzo': 'Dovydas Rimkus (Rimkenzo)',
  'Džesika Šyvokaitė Jessica Shy': 'Džesika Šyvokaitė (Jessica Shy)',
  'Džiugas Siaurusaitis': 'Džiugas Siaurusaitis',
  'Džordana Butkutė': 'Džordana Butkutė',
  'Eglė Jurgaitytė': 'Eglė Jurgaitytė',
  'Eimantas Stanionis': 'Eimantas Stanionis',
  'Emilis Jokūbas Norkūnas': 'Emilis Jokūbas Norkūnas',
  'Gabrielius Vagelis': 'Gabrielius Vagelis',
  'Gitanas Nausėda': 'Gitanas Nausėda',
  'Ieva Zasimauskaitė': 'Ieva Zasimauskaitė',
  'Inga Meda Norkutė': 'Inga Meda Norkutė',
  'Jonas Jovani Nainys': 'Jonas Nainys (Jovani)',
  'Juozas Statkevičius': 'Juozas Statkevičius',
  'Kastytis Kerbedis': 'Kastytis Kerbedis',
  'Mantas Kalnietis': 'Mantas Kalnietis',
  'Mantas Katleris': 'Mantas Katleris',
  'Mantas Stonkus': 'Mantas Stonkus',
  'Marijonas Mikutavičius': 'Marijonas Mikutavičius',
  'Merūnas Vitulskis': 'Merūnas Vitulskis',
  'Monika Linkytė': 'Monika Linkytė',
  'Monika Liu Liubinaitė': 'Monika Liu',
  'Natalija Bunkė': 'Natalija Bunkė',
  'Nijolė Pareigytė': 'Nijolė Pareigytė',
  'Nombeko Augustė': 'Nombeko Augustė',
  'Orijus Gasanovas': 'Orijus Gasanovas',
  'Paulina Paukštaitytė': 'Paulina Paukštaitytė',
  'Pishius': 'Pishius',
  'Radži Radžis Aleksandrovičius': 'Radži Aleksandrovičius',
  'Remis Retro Remigijus Daškevičius': 'Remigijus Daškevičius (Remis Retro)',
  'Rokas Petkevičius': 'Rokas Petkevičius',
  'Rolandas Mackevičius': 'Rolandas Mackevičius',
  'Rytis Cicinas': 'Rytis Cicinas',
  'Rūta Janutienė': 'Rūta Janutienė',
  'Rūta Meilutytė': 'Rūta Meilutytė',
  'Rūta Ščiogolevaitė': 'Rūta Ščiogolevaitė',
  'Saulius Prūsaitis': 'Saulius Prūsaitis',
  'Sel Egidijus Dragūnas': 'Egidijus Dragūnas (Sel)',
  'Sergėjus Kuvalda Moslobojevas': 'Sergėjus Moslobojevas (Kuvalda)',
  'Skirmantas Malinauskas': 'Skirmantas Malinauskas',
  'Tadas Burgaila': 'Tadas Burgaila',
  'Vaidas Baumila': 'Vaidas Baumila',
  'Viktoras Viktor Balykov': 'Viktoras Balykov',
  'Visvaldas Matijošaitis': 'Visvaldas Matijošaitis',
  'Vytautas Medineckas Ironvytas': 'Vytautas Medineckas (Ironvytas)',
  'Žilvinas Žvagulis': 'Žilvinas Žvagulis',
  'Artūras Orlauskas': 'Artūras Orlauskas',
  'Laurynas Maybach Burovas': 'Laurynas Burovas (Maybach)',
  // Add more custom mappings here as needed
};

// Dynamically import all images from both folders
const hiddenImageModules = import.meta.glob('/public/images/hidden/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' });
const publicImageModules = import.meta.glob('/public/images/public/*.{png,jpg,jpeg,webp,gif}', { eager: true, as: 'url' });

// Dynamically import all MP3 files
const audioModules = import.meta.glob('/public/mp3/*.mp3', { eager: true, as: 'url' });

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
  
  // Check if audio file exists for this celebrity (case-insensitive match)
  const audioPath = `/public/mp3/${filename}.mp3`;
  const hasAudio = Object.keys(audioModules).some(path =>
    path === audioPath
  );

  // Only set audioHintPath if the file exists
  const audioHintPath = hasAudio ? `/mp3/${filename}.mp3` : '';

  return {
    id: index + 1,
    name: firstname,
    lastname: lastname,
    displayName: displayName,
    hiddenImageUrl: hiddenImageModules[hiddenPath] as string,
    publicImageUrl: publicPath ? (publicImageModules[publicPath] as string) : (hiddenImageModules[hiddenPath] as string),
    audioHintPath: audioHintPath
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
