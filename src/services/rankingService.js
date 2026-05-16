import api from './api';

export const getPlayerRankings = async (locationId = 'global') => {
  const response = await api.get(`/locations/${locationId}/rankings/players`);
  return response.data;
};
