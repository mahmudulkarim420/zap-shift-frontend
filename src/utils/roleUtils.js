/**
 * Normalizes a role string to lowercase and handles potential variations.
 * @param {string} role - The role to normalize.
 * @returns {string} The normalized role.
 */
export const normalizeRole = (role) => {
  if (!role) return 'user';
  const normalized = role.toLowerCase().trim();
  
  // Handle common variations
  if (normalized === 'administrator' || normalized === 'root') return 'admin';
  if (normalized === 'delivery' || normalized === 'driver') return 'rider';
  
  return normalized;
};
