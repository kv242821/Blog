export const HEADERS = {
  header: () => ({
    accept: "*/*",
    "Content-Type": "application/json",
  }),
  fileHeader: () => ({
    "Content-Type": "multipart/form-data",
  }),
  authHeader: () => ({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }),
};
