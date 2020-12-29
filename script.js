const txtName = document.querySelector('#txtName');
const txtValue = document.querySelector('#txtValue');
const txtDueDate = document.querySelector('#txtDueDate');
const clientList = document.querySelector('.clientList');
const btnAdd = document.querySelector('#btnAdd');
let data = [];
btnAdd.addEventListener('click', addToList);
clientList.addEventListener('click', deleteItem);

function deleteItem(e) {
  btnAdd.addEventListener('click', addToList);
  if (e.target.classList.contains('fa-trash-alt')) {
    if (confirm('Você quer realmente excluir esse cliente?') === true) {
      e.target.parentElement.parentElement.remove();
      const newData = data.reduce((acc, client) => {
        if (
          client.name !==
          e.target.parentElement.parentElement.firstChild.innerText
        ) {
          acc.push(client);
        }
        return acc;
      }, []);
      localStorage.setItem('clients', JSON.stringify(newData));
    }
  }
}

function addToList() {
  const dataObject = {};
  dataObject.name = txtName.value;
  dataObject.dueDate = txtDueDate.value;
  dataObject.amount = txtValue.value;
  dataObject.actions = '<i class="fas fa-trash-alt"></i>';
  createRow(dataObject);
  saveClient(dataObject);
}
function createRow(data) {
  const entriesClient = Object.entries(data);
  const tr = document.createElement('tr');
  entriesClient.forEach(([key, value]) => {
    const td = document.createElement('td');
    td.innerHTML = data[key];
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
function getData() {
  if (localStorage.getItem('clients')) {
    data = JSON.parse(localStorage.getItem('clients'));
  } else {
    data = [];
  }
}
window.onload = function () {
  getData();
  loadClients();
};
