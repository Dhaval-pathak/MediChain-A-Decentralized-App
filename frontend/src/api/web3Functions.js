import { initWeb3 } from '../web3config'; // Import the initWeb3 function from your web3 utility file
// Contract ABI and deployed contract address (you can get these from the Truffle migration output)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "billId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BillGenerated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "hospitalId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "hospitalAddress",
        "type": "address"
      }
    ],
    "name": "HospitalRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "insuranceCompany",
        "type": "address"
      }
    ],
    "name": "InsuranceCompanyAssigned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "insuranceCompanyId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "networkHospitals",
        "type": "uint256[]"
      }
    ],
    "name": "InsuranceCompanyRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      }
    ],
    "name": "PatientRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "policyId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "PolicyCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "preauthorizationId",
        "type": "uint256"
      }
    ],
    "name": "PreauthorizationApproved",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "preauthorizationId",
        "type": "uint256"
      }
    ],
    "name": "PreauthorizationRejected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "preauthorizationId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "policyId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "isCashless",
        "type": "uint256"
      }
    ],
    "name": "PreauthorizationRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "claimId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "billId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "claimAmount",
        "type": "uint256"
      }
    ],
    "name": "ReimbursementClaimSettled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "claimId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "patientId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "billId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "claimAmount",
        "type": "uint256"
      }
    ],
    "name": "ReimbursementClaimSubmitted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_preauthorizationId",
        "type": "uint256"
      }
    ],
    "name": "approvePreauthorization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "billId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_insuranceCompany",
        "type": "address"
      }
    ],
    "name": "assignInsuranceCompanyForMedicalBill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_insuranceCompany",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_policyId",
        "type": "uint256"
      }
    ],
    "name": "assignInsurancePolicy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "billCounters",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_details",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_hospitalId",
        "type": "uint256"
      }
    ],
    "name": "createMedicalBill",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_insuranceCompany",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_isPolicyCashless",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "_isPolicyReimbursement",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "_sumAssured",
        "type": "uint256"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "annual",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "perInstance",
            "type": "uint256"
          }
        ],
        "internalType": "struct MainStructure.Deductible",
        "name": "_deductible",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "fixedCharge",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "percentageCharge",
            "type": "uint256"
          }
        ],
        "internalType": "struct MainStructure.Copayment",
        "name": "_copayment",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "bool",
            "name": "facelift",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "hairTransplant",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "alternativeTherapy",
            "type": "bool"
          }
        ],
        "internalType": "struct MainStructure.NoncoveredExpense",
        "name": "_noncoveredExpense",
        "type": "tuple"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "roomRentLimit",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "surgeryLimit",
            "type": "uint256"
          }
        ],
        "internalType": "struct MainStructure.Sublimit",
        "name": "_sublimit",
        "type": "tuple"
      }
    ],
    "name": "createPolicy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      }
    ],
    "name": "getAllMedicalBillByPatientId",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "billId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "patientId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "assignedInsuranceCompany",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "details",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "treatmentDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct MainStructure.MedicalBill[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hospitalId",
        "type": "uint256"
      }
    ],
    "name": "getAllPatientsByHospital",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "patientId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "age",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "otherDetails",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "patientAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "hospitalId",
            "type": "uint256"
          },
          {
            "internalType": "uint256[]",
            "name": "billIds",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct MainStructure.Patient[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_insuranceCompanyAddress",
        "type": "address"
      }
    ],
    "name": "getPoliciesByInsuranceCompany",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "policyId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "insuranceCompany",
            "type": "address"
          },
          {
            "internalType": "enum MainStructure.PolicyType",
            "name": "policyType",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "sumAssured",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "annual",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "perInstance",
                "type": "uint256"
              }
            ],
            "internalType": "struct MainStructure.Deductible",
            "name": "deductible",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "fixedCharge",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "percentageCharge",
                "type": "uint256"
              }
            ],
            "internalType": "struct MainStructure.Copayment",
            "name": "copayment",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "bool",
                "name": "facelift",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "hairTransplant",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "alternativeTherapy",
                "type": "bool"
              }
            ],
            "internalType": "struct MainStructure.NoncoveredExpense",
            "name": "noncoveredExpense",
            "type": "tuple"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "roomRentLimit",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "surgeryLimit",
                "type": "uint256"
              }
            ],
            "internalType": "struct MainStructure.Sublimit",
            "name": "sublimit",
            "type": "tuple"
          }
        ],
        "internalType": "struct MainStructure.Policy[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_insuranceCompanyAddress",
        "type": "address"
      }
    ],
    "name": "getPreauthorizationRequestsByInsuranceCompany",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "patientId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "billId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "insuranceCompanyAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "policyId",
            "type": "uint256"
          },
          {
            "internalType": "enum Cashless.PreauthorizationStatus",
            "name": "isPreauthorized",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "requestTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "approvedTimestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Cashless.Preauthorization[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_billId",
        "type": "uint256"
      }
    ],
    "name": "getSingleMedicalBill",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "billId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "patientId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "assignedInsuranceCompany",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "details",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "treatmentDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct MainStructure.MedicalBill",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "hospitalCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "insuranceCompanyCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "patientCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "policyCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "preauthorizationCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_hospitalName",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "_doctorList",
        "type": "string[]"
      }
    ],
    "name": "registerHospital",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_networkHospitals",
        "type": "uint256[]"
      },
      {
        "internalType": "string",
        "name": "_details",
        "type": "string"
      }
    ],
    "name": "registerInsuranceCompany",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_hospitalId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_age",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_otherDetails",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_patientAddress",
        "type": "address"
      }
    ],
    "name": "registerPatient",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reimbursementClaimCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_preauthorizationId",
        "type": "uint256"
      }
    ],
    "name": "rejectPreauthorization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_billId",
        "type": "uint256"
      }
    ],
    "name": "requestPreauthorization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_claimId",
        "type": "uint256"
      }
    ],
    "name": "settleReimbursementClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_billId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_claimAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_insuranceCompanyAddress",
        "type": "address"
      }
    ],
    "name": "submitReimbursementClaim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_billId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_policyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_preauthorizationId",
        "type": "uint256"
      },
      {
        "internalType": "enum PatientManagementSystem.PaymentType",
        "name": "_paymentType",
        "type": "uint8"
      }
    ],
    "name": "calculateFinalAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_billId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_policyId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_preauthorizationId",
        "type": "uint256"
      }
    ],
    "name": "calculateFinalClaimAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_patientId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_billId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_policyId",
        "type": "uint256"
      }
    ],
    "name": "calculateFinalClaimAmountReimbursement",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const contractAddress = '0x45c2Dac0efF76aC67b16E761795ecd3B12f11465';


export async function createMedicalBillOnChain(patientId, details, amount, hospitalId) {
  const web3 = await initWeb3(); 
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  await contract.methods
    .createMedicalBill(patientId, details, amount, hospitalId)
    .send({ from: accounts[0] });
}


// Hospital Registration
export async function registerHospital(hospitalName, doctorList) {
  const web3 = await initWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const doctorListArray = Array.isArray(doctorList) ? doctorList : [doctorList];
  console.log(doctorListArray)

  await contract.methods.registerHospital(hospitalName, doctorListArray).send({ from: accounts[0] });
}

// Insurance Company Registration
export async function registerInsuranceCompany(networkHospitals, details) {
  const web3 = await initWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  await contract.methods.registerInsuranceCompany(networkHospitals, details).send({ from: accounts[0] });
}

// Policy Registration
export async function createPolicy(
  description,
  insuranceCompany,
  isPolicyCashless,
  isPolicyReimbursement,
  sumAssured,
  deductible,
  copayment,
  noncoveredExpense,
  sublimit
) {
  const web3 = await initWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  await contract.methods
    .createPolicy(
      description,
      insuranceCompany,
      isPolicyCashless,
      isPolicyReimbursement,
      sumAssured,
      deductible,
      copayment,
      noncoveredExpense,
      sublimit
    )
    .send({ from: accounts[0] });
}

// Patient Registration
export async function registerPatient(hospitalId, name, age, otherDetails, patientAddress) {
  const web3 = await initWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  await contract.methods.registerPatient(hospitalId, name, age, otherDetails, patientAddress).send({ from: accounts[0] });
}

// Assign Insurance Policy to Patient
export async function assignInsurancePolicy(patientId, insuranceCompany, policyId) {
  const web3 = await initWeb3();
  const accounts = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  await contract.methods.assignInsurancePolicy(patientId, insuranceCompany, policyId).send({ from: accounts[0] });
}


