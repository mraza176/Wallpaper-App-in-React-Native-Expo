import axios from "axios";

const apiUrl = `https://pixabay.com/api/?key=${process.env.EXPO_PUBLIC_API_KEY}`;

const formatUrl = (params) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  return url;
};

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};
