import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://www.erp.kadargroup.web.id"
});

export default httpRequest;