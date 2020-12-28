const txtName = document.querySelector('#txtName');
const txtValue = document.querySelector('#txtValue');
const txtDueDate = document.querySelector('#txtDueDate');
const clientList = document.querySelector('.clientList');
const btnAdd = document.querySelector('#btnAdd');
let data = [];
btnAdd.addEventListener('click', addToList);

function addToList() {
  const dataObject = {};
  dataObject.name = txtName.value;
  dataObject.dueDate = txtDueDate.value;
  dataObject.amount = txtValue.value;
  createRow(dataObject);
  saveClient(dataObject);
}
function createRow(data) {
  const entriesClient = Object.entries(data);
  const tr = document.createElement('tr');
  entriesClient.forEach(([key, value]) => {
    const td = document.createElement('td');
    td.innerText = data[key];
    tr.appendChild(td);
  });
  clientList.appendChild(tr);
}
async function saveClient(client) {
  data.push(client);
  localStorage.setItem('clients', JSON.stringify(data));
}
function loadClients() {
  data.forEach((client) => {
    createRow(client);
  });
}
window.onload = function () {
  function getData() {
    data = JSON.parse(localStorage.getItem('clients'));
  }
  getData();
  loadClients();
};
