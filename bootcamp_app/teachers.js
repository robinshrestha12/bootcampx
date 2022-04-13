const { Pool } = require ('pg');

const pool = new Pool({
  user: 'robinshrestha',
  password: "123",
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

pool.query(`SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
GROUP BY teachers.name, cohorts.name
ORDER BY teacher; `, values)
.then (res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort} :  ${row.teacher} `);
  })
}).catch(err => console.error('query error', err.stack));
