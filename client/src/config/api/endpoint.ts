import { HEADERS } from "./header";

export const API_URLS = {
  Auth: {
    login: () => ({
      endPoint: "/authenticate",
      method: "POST",
      headers: HEADERS.header(),
    }),
    getAuthorities: () => ({
      endPoint: "/me/authorities",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    getProfile: () => ({
      endPoint: "/me",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    changeProfile: (id: string) => ({
      endPoint: `/me/${id}`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    changePassword: () => ({
      endPoint: `/me/change-pwd`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
  },
  Department: {
    getAll: () => ({
      endPoint: `/departments`,
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    create: () => ({
      endPoint: `/departments`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    update: (id: string) => ({
      endPoint: `/departments/${id}`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    delete: (id: string) => ({
      endPoint: `/departments/${id}/delete`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    getDetails: (id: string) => ({
      endPoint: `/departments/${id}`,
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    addUser: (id: string) => ({
      endPoint: `/departments/${id}/add-user`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    removeUser: (id: string, userId: string) => ({
      endPoint: `/departments/${id}/delete-user/?userId=${userId}`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
  },
  User: {
    getAll: () => ({
      endPoint: "/users",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    create: () => ({
      endPoint: `/register`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    getUserById: (id: string) => ({
      endPoint: `/users/${id}`,
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    updateUser: (id: string) => ({
      endPoint: `/users/${id}`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
  },
  Role: {
    getAll: () => ({
      endPoint: "/roles",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    create: () => ({
      endPoint: "/roles",
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    update: (id: string) => ({
      endPoint: `/roles/${id}`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    toggle: (id: string) => ({
      endPoint: `roles/${id}/toggle`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    delete: (id: string) => ({
      endPoint: `roles/${id}/delete`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    assignPermission: (id: string) => ({
      endPoint: `roles/${id}/assign-permission`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    getDetails: (id: string) => ({
      endPoint: `/roles/${id}`,
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    addUser: (id: string) => ({
      endPoint: `/roles/${id}/add-user`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    removeUser: (id: string, userId: string) => ({
      endPoint: `/roles/${id}/delete-user/?userId=${userId}`,
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
  },
  Permission: {
    getAll: () => ({
      endPoint: "/permissions",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
  },
  TimeOff: {
    request: () => ({
      endPoint: "/time-off/request",
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    getMyRequest: () => ({
      endPoint: "/time-off/my-request",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    getMyTimeoff: () => ({
      endPoint: "/time-off/my-timeoff",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    getBalanceHistory: () => ({
      endPoint: "/time-off/balance",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    getAllRequest: () => ({
      endPoint: "time-off",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
  },
  News: {
    createNews: () => ({
      endPoint: "/news",
      method: "POST",
      headers: HEADERS.authHeader(),
    }),
    getAllNews: () => ({
      endPoint: "/news",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
    getMyNews: () => ({
      endPoint: "/news/my-news",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
  },
  Events: {
    getAllEvents: () => ({
      endPoint: "/events",
      method: "GET",
      headers: HEADERS.authHeader(),
    }),
  },
};
