import $ from 'jquery';
import { BASE_URL } from './constants';

$(document).ready(() => {
  $.ajax({ url: `${BASE_URL}/departments` })
    .done(data => data && data.map(appendDepartment));
});

const appendDepartment = (item) => {
  const $dept = $(`<div class="col-4 department-col">${item.dept_name}</div>`);

  $dept.on('click', item, deptClickHandler);

  $('#departments-list').append($dept);

  return item;
};

const deptClickHandler = (e) => {
  const { data } = e;

  $('#loading-indicator').addClass('loader');
  $.ajax({ url: `${BASE_URL}/employees?dept=${data.dept_no}` })
    .done((result) => {
      displayEmployeesByDept(data, result);
    });
};

const displayEmployeesByDept = (dept, employees) => {
  const employeeHeadings = getEmployeeHeadings();

  const employeesRows = getEmployeeRows(employees);

  $('#employees-by-dept-grid').empty();
  $('#employees-by-dept-grid').append(`<h2>${dept.dept_name}</h2>`);
  $('#employees-by-dept-grid').append(employeeHeadings);
  $('#employees-by-dept-grid').append(employeesRows.join(''));

  $('#loading-indicator').removeClass('loader');
};

const getEmployeeHeadings = () => {
  const nameHeading = `<div class="col-4 employee-heading">Last Name, First Name</div>`;
  const titleHeading = `<div class="col-4 employee-heading">Title</div>`;
  const salaryHeading = `<div class="col-4 employee-heading">Salary</div>`;
  const employeeHeadings = `<div class="row m-1">${nameHeading}${titleHeading}${salaryHeading}</div>`;

  return employeeHeadings;
};

const getEmployeeRows = (employees) => {
  const employeeRows = (employees || {}).map((item) => {
    const nameCol = `<div class="col-4">${item.last_name}, ${item.first_name}</div>`;

    const titleCol = `<div class="col-4">${item.title}</div>`;

    const options = { style: 'currency', currency: 'USD' };
    const salaryCol = `<div class="col-4">${item.salary.toLocaleString('en-US', options)}</div>`;
    return `<div class="card m-1"><div class="row employee-row">${nameCol} ${titleCol}${salaryCol}</div></div>`;
  });

  return employeeRows;
};

module.exports = {};
