import api from './api';

const formatTag = (tag) => tag.startsWith('#') ? tag : `#${tag}`;

export const getClan = async (clanTag) => {
  const encodedTag = encodeURIComponent(formatTag(clanTag));
  const response = await api.get(`/clans/${encodedTag}`);
  return response.data;
};

export const getClanMembers = async (clanTag) => {
  const encodedTag = encodeURIComponent(formatTag(clanTag));
  const response = await api.get(`/clans/${encodedTag}/members`);
  return response.data;
};

export const getCurrentWar = async (clanTag) => {
  const encodedTag = encodeURIComponent(formatTag(clanTag));
  const response = await api.get(`/clans/${encodedTag}/currentwar`);
  return response.data;
};

export const getWarLog = async (clanTag) => {
  const encodedTag = encodeURIComponent(formatTag(clanTag));
  const response = await api.get(`/clans/${encodedTag}/warlog`);
  return response.data;
};

export const getCapitalRaidSeasons = async (clanTag) => {
  const encodedTag = encodeURIComponent(formatTag(clanTag));
  const response = await api.get(`/clans/${encodedTag}/capitalraidseasons`);
  return response.data;
};
