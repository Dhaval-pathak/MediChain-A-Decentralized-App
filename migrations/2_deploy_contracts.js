const MainStructure = artifacts.require("./MainStructure.sol");
const Cashless = artifacts.require("./Cashless.sol");
const Reimbursement = artifacts.require("./Reimbursement.sol");
const PatientManagementSystem = artifacts.require("./PatientManagementSystem.sol");

module.exports = function(deployer) {
  deployer.deploy(MainStructure)
    .then(() => deployer.deploy(Cashless))
    .then(() => deployer.deploy(Reimbursement))
    .then(() => deployer.deploy(PatientManagementSystem));
};