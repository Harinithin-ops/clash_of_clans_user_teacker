// Image Mapper Utility for Clash of Clans Assets
// This utility dynamically maps troop, hero, spell, and pet names to their respective images.

// Vite's import.meta.glob to dynamically load local assets from the src/assets folder.
const troopFiles = import.meta.glob('../assets/troops/*.{png,webp,jpg}', { eager: true, import: 'default' });
const heroFiles = import.meta.glob('../assets/heroes/*.{png,webp,jpg}', { eager: true, import: 'default' });
const spellFiles = import.meta.glob('../assets/spells/*.{png,webp,jpg}', { eager: true, import: 'default' });
const petFiles = import.meta.glob('../assets/pets/*.{png,webp,jpg}', { eager: true, import: 'default' });
const siegeFiles = import.meta.glob('../assets/siege/*.{png,webp,jpg}', { eager: true, import: 'default' });
const equipmentFiles = import.meta.glob('../assets/equipment/*.{png,webp,jpg}', { eager: true, import: 'default' });

// CDN Fallback URL (Statscell Clash Assets)
const CDN_BASE_URL = "https://raw.githubusercontent.com/Statscell/clash-assets/main/troops/icons/";

const getAssetFromGlob = (glob, name) => {
  const fileName = name.toLowerCase().replace(/\s+/g, '_');
  const entry = Object.entries(glob).find(([path]) => path.toLowerCase().includes(`${fileName}.`));
  
  if (entry) return entry[1];

  // Fallback to CDN if local asset not found
  // Note: CDN uses Capital_Case_With_Underscores.png
  const cdnFileName = name.replace(/\s+/g, '_') + '.png';
  return `${CDN_BASE_URL}${cdnFileName}`;
};

// Reusable Image Mapping System
export const getTroopImage = (name) => getAssetFromGlob(troopFiles, name);
export const getHeroImage = (name) => getAssetFromGlob(heroFiles, name);
export const getSpellImage = (name) => getAssetFromGlob(spellFiles, name);
export const getPetImage = (name) => getAssetFromGlob(petFiles, name);
export const getSiegeImage = (name) => getAssetFromGlob(siegeFiles, name);
export const getEquipmentImage = (name) => getAssetFromGlob(equipmentFiles, name);

export const petList = [
  "L.A.S.S.I", "Electro Owl", "Mighty Yak", "Unicorn", "Frosty", 
  "Diggy", "Poison Lizard", "Phoenix", "Spirit Fox", "Angry Jelly"
];

export const siegeList = [
  "Wall Wrecker", "Battle Blimp", "Stone Slammer", "Siege Barracks", 
  "Log Launcher", "Flame Flinger", "Battle Drill", "Troop Launcher"
];
