import api from './api';

export const getPlayer = async (playerTag) => {
  const formattedTag = playerTag.startsWith('#') ? playerTag : `#${playerTag}`;
  const encodedTag = encodeURIComponent(formattedTag);
  const response = await api.get(`/players/${encodedTag}`);
  return response.data;
};
