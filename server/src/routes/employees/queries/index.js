export const getEmployeesByDeptQuery = `SELECT employees.emp_no, dept_emp.dept_no, employees.first_name, employees.last_name, employees.gender, titles.title, salaries.salary FROM employees
INNER JOIN titles ON titles.emp_no = employees.emp_no
INNER JOIN dept_emp ON dept_emp.emp_no = employees.emp_no
INNER JOIN salaries ON salaries.emp_no = employees.emp_no
WHERE titles.from_date < ? AND titles.to_date > ?
AND dept_emp.from_date < ? AND dept_emp.to_date > ?
AND salaries.from_date < ? AND salaries.to_date > ?
AND dept_emp.dept_no = ?
LIMIT 1000;`
