import qs from "qs";
import axios from "axios";

const CLIENT_ID = "16608b35e41777e";
const ROOT_URL = "https://api.imgur.com";

export default {
    login() {
        const querystring = {
            client_id: CLIENT_ID,
            response_type: "token"
        };

        window.location = `${ROOT_URL}/oauth2/authorize?${qs.stringify(querystring)}`
    },
    fetchImages(token) {
        return axios.get(`${ROOT_URL}/3/account/me/images`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    uploadImages(images, token) {
        const promises = Array.from(images).map(image => {
            const formData = new FormData();
            formData.append("image", image);

            return axios.post(`${ROOT_URL}/3/image`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        });

        return Promise.all(promises);
    },
    deleteImage(hash, token) {
        return axios.delete(`${ROOT_URL}/3/account/me/image/${hash}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    },
    search(token, query) {
        return axios.get(`${ROOT_URL}/3/gallery/search/?q=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}