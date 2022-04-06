import axios from "axios";

const baseUrl = "http://localhost:5050";

axios.defaults.baseURL = baseUrl;

export async function sendSMS(data) {
    try {
      return await axios({
        method: "post",
        url: "/api/sendMessage",
        data: {
          message: data.message,
          patientPhone: data.phone,
        },
        timeout: 10000, // only wait for 2s
      }).then(
        (response) => {
          return response.data;
        },
        (error) => {
          console.error(error);
          return false;
        }
      );
    } catch (err) {
      //console.log(new Date().toUTCString());
      console.error(err);
      return false;
    }
  }