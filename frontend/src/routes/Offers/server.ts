import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
const VITE_SERVERURL = import.meta.env.VITE_SERVERURL;

const baseUrl = `${VITE_SERVERURL}/api/offers`;

export function getOfferUploadSign() {
  return axios.get(`${VITE_SERVERURL}/api/cloudinary/offers`, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function getAllOfferList() {
  return axios.get(baseUrl + "/get-all-offers");
}

export function getOfferById(id: string) {
  return axios.get(baseUrl + "/get-offer-by-id/" + id);
}

export function uploadOffer(formData: FormData) {
  return axios.post(baseUrl + "/upload-offer", formData, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}

export function deleteOffer(id: string) {
  //console.log(id);
  return axios.delete(baseUrl + "/delete/" + id, {
    headers: {
      "x-auth-token": sessionStorage.getItem("jwtToken"),
    },
  });
}
