import httpRequest from "./api";

export const getDashboardData = async () => {
  return await httpRequest.get("/model/m_dashboard_direksi.php?action=intern_test");
}