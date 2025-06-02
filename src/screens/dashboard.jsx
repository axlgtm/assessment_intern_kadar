import React, { useEffect, useState } from "react";
import DataJson from "../assets/data.json"
import { dashboardService } from "../services";
import DataChart from "../components/dataChart";

const getDataDashboard = async () => {
  try {
    const res = await dashboardService.getDashboardData()
    console.log(res)
  } catch (error) {
    console.log('Something wrong')
  }
}

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationBooking, setPaginationBooking] = useState([]);
  const itemsPerPage = 20;

  // calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = DataJson.dataBooking.slice(indexOfFirstItem, indexOfLastItem);
  console.log(DataJson)

  useEffect(() => {
    // function below is not work for requesting data from server, CORS didnt enabled.
    // uncomment to see the output
    // getDataDashboard()

    setPaginationBooking(currentItems);

  }, [currentPage]) // update data whenever currentpage changed
  return (
    <div className="p-5 w-dvw flex flex-col">
      <DataChart />
      <div className="overflow-x-auto rounded-box border border-base-content/30 bg-base-100 h-[600px] mb-5">
        <table className="table table-sm table-zebra table-pin-rows">

          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Nama Pembeli</th>
              <th className="text-center">Cabang</th>
              <th className="text-center">Perumahan</th>
              <th className="text-center">Kavling</th>
              <th className="text-center">Tanggal Booking</th>
              <th className="text-center">Harga</th>
              <th className="text-center">UTJ</th>
              <th className="text-center">Asal Lead</th>
              <th className="text-center">Aktif SPR</th>
              <th className="text-center">Berkas UTJ</th>
            </tr>
          </thead>

          <tbody>
            {
              paginationBooking.length ? paginationBooking
              .map((item, index) => (
                <tr>
                  <th className="text-center">{indexOfFirstItem + index + 1}</th>
                  <td className="whitespace-nowrap">{item.fullname}</td>
                  <td className="whitespace-nowrap">{item.cabang}</td>
                  <td className="whitespace-nowrap">{item.perumahan}</td>
                  <td className="whitespace-nowrap">{item.kavling}</td>
                  <td className="whitespace-nowrap">{item.tanggal_booking}</td>
                  <td className="whitespace-nowrap">
                    {
                      new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR'
                      }).format(item.harga_perumahan)
                    }
                  </td>
                  <td className="whitespace-nowrap">{item.utj}</td>
                  <td className="whitespace-nowrap">{item.asallead}</td>
                  {item.status_aktif_spr == 1 ? <td className="whitespace-nowrap text-center"><div className="badge badge-success">Aktif</div></td> : <td className="whitespace-nowrap"><div className="badge badge-error">Tidak Aktif</div></td>}
                  {
                    item.berkas_utj != null ? <td className="text-center"><div className="badge badge-info"><a href={`${item.berkas_utj}`} target="_blank" className="whitespace-nowrap text-center">Berkas UTJ</a></div></td> : <td><div className="badge badge-error whitespace-nowrap text-center">Berkas Tidak Ada</div></td>
                  }
                </tr>
              )) : <></>
            }
          </tbody>
        </table>
      </div>
      <div className="join">
        <button className="join-item btn" onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage-1)
          } 
        }}>«</button>
        <button className="join-item btn">Page {currentPage}</button>
        <button className="join-item btn" onClick={() => {
          if (currentPage < 6) {
            setCurrentPage(currentPage+1)
          } 
        }}>»</button>
      </div>
    </div>
  )
}

export default Dashboard;