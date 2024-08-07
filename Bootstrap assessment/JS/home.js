// import { PORT, URL } from "../constants";
export const PORT = 7060
export const API_URL = 'https://localhost'
const mock = [
  {
    CurrentAddress: 'Harda$$Harda$Madhya Pradesh$461331',
    PermanentAddress: 'Harda$$Harda$Madhya Pradesh$461331',
    CollegeId: 'IGEC',
    CollegeName: 'indira gandhi',
    Courses: {
      btech: 'CS, IT, MECH',
      'm tech': 'CS, IT, MECH',
    },
    registrationDate: '2024-08-04T18:15:55.256Z',
    EmailId: 'Parasharashi02@gmail.com',
    ContactNumber: '961 795 3882',
    DocumentNumber: '5546',
    DocumentType: 'Identity Card',
    Nationality: 'Indian',
    registrationId: 'inIG2024',
  },
  {
    CurrentAddress: 'Harda$$Harda$Madhya Pradesh$461331',
    PermanentAddress: 'Harda$$Harda$Madhya Pradesh$461331',
    CollegeId: 'IGEC',
    CollegeName: 'indira gandhi',
    Courses: {
      btech: 'CS, IT, MECH',
      'm tech': 'CS, IT, MECH',
    },
    RegistrationDate: '2024-08-04T18:15:55.256Z',
    EmailId: 'Parasharashi02@gmail.com',
    ContactNumber: '961 795 3882',
    DocumentNumber: '5546',
    DocumentType: 'Identity Card',
    Nationality: 'Indian',
    RegistrationId: 'inIG2024',
  },
]

const modal = document.getElementById('deleteModal')

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0]

// Get the confirm button
const confirmBtn = document.getElementById('confirmDeleteBtn')

// When the user clicks the button, open the modal
const openDeleteModal = function () {
  modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

// When the user clicks the confirm button, make the API call

const tableBody = document.querySelector('tbody')

const handleDelete = (collegeId) => {
  openDeleteModal()
  confirmBtn.onclick = async function () {
    try {
      const response = await fetch(
        `${API_URL}:${PORT}/api/College/${collegeId}`,
        {
          method: 'DELETE',
        }
      )
      if (response.ok) {
        alert('College record deleted successfully')
      } else {
        alert('Failed to delete college record')
      }
      window.location.href = 'index.html'
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while deleting the record')
    }
  }
}
const renderTable = (data) => {
  data.forEach((item, index) => {
    const row = document.createElement('tr')
    row.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${item.registrationId}</td>
      <td>${item.collegeName}</td>
      <td>${item.emailId}</td>
      <td>${item.contactNumber}</td>
      <td>${item.registrationDate}</td>
      <td>
        <a href="../HTML/register.html?id=${item.collegeId}">
          <button class="btn btn-secondary btn-sm me-2">
            <i class="bi bi-pencil-square me-1"></i>Edit
          </button>
        </a>
        <button class="btn btn-secondary btn-sm delete-btn" data-id="${
          item.collegeId
        }">
          <i class="bi bi-trash3-fill me-1"></i>Delete
        </button>
      </td>
    `
    tableBody.appendChild(row)
  })

  // Add event listeners to all delete buttons
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const collegeId = button.getAttribute('data-id')
      handleDelete(collegeId)
    })
  })
}

// Function to fetch college data and render the table
const fetchColleges = async () => {
  try {
    const response = await fetch(`${API_URL}:${PORT}/api/College`)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      renderTable(data)
    } else {
      console.error('Failed to fetch college data')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

// Fetch and render college data on page load
fetchColleges()
