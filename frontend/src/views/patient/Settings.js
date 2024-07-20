import { getAllMedicalBillByPatientId ,  assignInsuranceCompanyForMedicalBill,assignInsurancePolicy,requestPreauthorization} from "api/web3Functions";
import {React,useState, useEffect} from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import PropTypes from "prop-types";
import { getInsuranceCompanies } from "api/apiFunctions";


// components


export default function Settings({color}) {
  const [patientRecords, setPatientRecords] = useState([]);
  const [insuranceCompanies, setInsuranceCompanies] = useState([])
  const [selectedCompanies, setSelectedCompanies] = useState({});
  const id = 1;



  useEffect(() => {
    const fetchPatientRecords = async () => {
      try {
        const records = await getAllMedicalBillByPatientId(id);
        console.log(records)
        setPatientRecords(records);
      } catch (error) {
        console.error('Error fetching patient records:', error);
      }
    };

    const getInsuranceCompaniesFromDB= async ()=>{
      try {
        const companies = await getInsuranceCompanies();
      console.log(companies)
      setInsuranceCompanies(companies);
      } catch (error) {
        console.error('Error fetching comapanies:', error);
      }
    }

    fetchPatientRecords();
    getInsuranceCompaniesFromDB();
  }, []);

  const handleCompanyChange = (recordId, companyId) => {
    console.log(companyId)
    setSelectedCompanies((prevSelectedCompanies) => ({
      ...prevSelectedCompanies,
      [recordId]: companyId,
    }));
  };

  const handleConfirm = async (recordId) => {
    
    try {
      const selectedCompany = selectedCompanies[recordId];
      console.log(selectedCompany)
      await assignInsurancePolicy(1,"0x6af5c5113C004FB8D474939CB9D66C4c0CC5750f",1);
      await assignInsuranceCompanyForMedicalBill(id , 1, selectedCompany )
      await requestPreauthorization(1,1);
    } catch (error) {
      
    }
  };

  const checkDisable=(record)=>{
    if (record[2] == "0x0000000000000000000000000000000000000000") {
      return false;
    }else return true;
  }

  
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Bills
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Bill Id
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Description
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Amount
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Insurance Company
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Confirm
                </th>
              </tr>
            </thead>
            <tbody>
              {patientRecords.map((record, index) => (
                <tr key={index}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {Number(record[1])}
                  </td>
                  
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {record[3]}
                  </td>
                  
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {Number(record[6])}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <select
                      value={selectedCompanies[record[0]] || ""}
                      onChange={(e) =>
                        handleCompanyChange(record[0], e.target.value)
                      }
                      className="bg-white text-black"
                    >
                      <option value="" disabled>
                        Select Company
                      </option>
                      {insuranceCompanies.map((company) => (
                        <option key={company.id} value={company.blockaddress}>
                          {company.companyname}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <button
                      disabled = {checkDisable(record)}
                      onClick={() => handleConfirm(record[0])}
                      className="bg-white text-black px-3 py-1 rounded border-2"
                    >
                      {checkDisable(record)?"Already Register":"Confirm"} 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Settings.defaultProps = {
  color: "light",
};

Settings.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
