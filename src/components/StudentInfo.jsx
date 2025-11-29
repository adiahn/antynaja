import './StudentInfo.css'

const students = [
  { name: "Najaatu Haruna Dalhatu", regNo: "U2/23/CSC/3347" },
  { name: "Usman Rabiu", regNo: "U2/23/CSC/4447" },
  { name: "Maryam Gambo Abdurrahman", regNo: "U2/23/CSC/3404" },
  { name: "Asma'u Aliyu Albaba", regNo: "U2/23/CSC/3590" },
  { name: "Abubakar Sulaiman", regNo: "U2/23/CSC/3495" },
  { name: "Hassan Nuhu", regNo: "U2/23/CSC/3497" },
  { name: "Abdulkarim Aliyu", regNo: "U2/23/CSC/4546" },
  { name: "Jamilu Hafiz", regNo: "U2/23/CSC/4550" },
  { name: "Khadija Muhammad Sani", regNo: "U2/23/CSC/4486" }
]

function StudentInfo({ onProceed }) {
  return (
    <div className="student-info">
      <header className="student-header">
        <h1>Welcome</h1>
        <p className="subtitle">Student Project - Team Members</p>
      </header>
      <div className="student-list">
        {students.map((student, index) => (
          <div key={index} className="student-card">
            <div className="student-number">{index + 1}</div>
            <div className="student-details">
              <h2 className="student-name">{student.name}</h2>
              <p className="student-reg">{student.regNo}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="proceed-section">
        <button onClick={onProceed} className="proceed-button">
          Proceed to Posts Feed
        </button>
      </div>
    </div>
  )
}

export default StudentInfo

