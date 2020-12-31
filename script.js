const txtName = document.querySelector('#txtName');
const txtValue = document.querySelector('#txtValue');
const txtDueDate = document.querySelector('#txtDueDate');
const clientList = document.querySelector('.clientList');
const btnAdd = document.querySelector('#btnAdd');
const ckPaid = document.querySelector('.paid');
let data = [];
btnAdd.addEventListener('click', addToList);
clientList.addEventListener('click', deleteItem);
clientList.addEventListener('click', filter);
clientList.addEventListener('click', checkPaid);

function checkPaid(e) {
  if (e.target.classList.contains('paid')) {
    if (e.target.checked === true) {
      alert('Ativou o checkBox!');
    }
  }
}

function filter(e) {
  if (e.target.classList.contains('fa-sort')) {
    sortData(e.target.parentElement.innerText);
  }
}
function sortData(element) {
  console.log(typeof element, element);
  let property = null;
  if (element === 'Cliente') {
    property = 'name';
  }
  if (element === 'Data de Vencimento') {
    property = 'dueDate';
  }
  while (clientList.rows.length > 1) {
    clientList.deleteRow(1);
  }
  data
    .sort((a, b) => {
      return a[property] > b[property] ? 1 : b[property] > a[property] ? -1 : 0;
    })
    .forEach((client) => createRow(client));
}
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
  console.log(txtDueDate.value);
  dataObject.amount = txtValue.value;
  dataObject.actions =
    '<i class="fas fa-trash-alt"></i> <input type="checkbox" class="paid">';
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
