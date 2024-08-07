//import { PORT, URL } from "../constants";
export const PORT = 7060
export const API_URL = 'https://localhost'
const coursesContainer = document.getElementById('coursesContainer')
const addCourseBtn = document.querySelector('.add-course-btn')
const successModal = document.getElementById('successModal')
const failureModal = document.getElementById('failureModal')
const closeSuccess = document.getElementsByClassName('close')[0]
const closeFailed = document.getElementsByClassName('close-failed')[0]
const okButton = document.getElementById('okButton')
const okButtonFailed = document.getElementById('okButtonFailed')
const registrationId = document.getElementById('registrationId')

const openSuccessModal = (id) => {
  successModal.style.display = 'block'
  registrationId.value = id
}
const openFailedModal = (id) => {
  failureModal.style.display = 'block'
}

// Function to close the success modal
closeSuccess.onclick = function () {
  successModal.style.display = 'none'
}

// Function to close the failure modal
closeFailed.onclick = function () {
  failureModal.style.display = 'none'
}

// Function to close the modal if the user clicks outside of it
window.onclick = function (event) {
  if (event.target == successModal) {
    successModal.style.display = 'none'
  }
  if (event.target == failureModal) {
    failureModal.style.display = 'none'
  }
}

// Function to redirect to index.html when OK button is clicked
okButton.onclick = function () {
  window.location.href = 'index.html'
}

// Function to redirect to index.html when OK button is clicked in failure modal
okButtonFailed.onclick = function () {
  window.location.href = 'index.html'
}

function getQueryParameter() {
  var url = window.location.href
  var urlObj = new URL(url)
  var params = new URLSearchParams(urlObj.search)
  return params.get('id')
}

const fetchDetailsFromId = async (id) => {
  try {
    const response = await fetch(`${API_URL}:${PORT}/api/College/${id}`)
    const data = await response.json()
    return data
  } catch (error) {
    openFailedModal()
  }
}

const collegeId = getQueryParameter()

if (collegeId) {
  // fetch details and show them
  const data = await fetchDetailsFromId(collegeId)

  document.getElementById('collegeId').value = data.collegeId
  document.getElementById('name').value = data.collegeName
  document.getElementById('email').value = data.emailId
  document.getElementById('contact').value = data.contactNumber
  document.getElementById('nationality').value = data.nationality
  document.getElementById('documentType').value = data.documentType
  document.getElementById('documentNumber').value = data.documentNumber
  document.getElementById('currentstreetaddress').value =
    data.currentAddress.split('$')[0]
  document.getElementById('currentstreetaddressline2').value =
    data.currentAddress.split('$')[1]
  document.getElementById('currentcity').value =
    data.currentAddress.split('$')[2]
  document.getElementById('currentstate').value =
    data.currentAddress.split('$')[3]
  document.getElementById('currentpostal').value =
    data.currentAddress.split('$')[4]
  document.getElementById('permanentstreetaddress').value =
    data.PermanentAddress.split('$')[0]
  document.getElementById('permanentstreetaddressline2').value =
    data.PermanentAddress.split('$')[1]
  document.getElementById('permanentcity').value =
    data.PermanentAddress.split('$')[2]
  document.getElementById('permanentstate').value =
    data.PermanentAddress.split('$')[3]
  document.getElementById('permanentpostal').value =
    data.PermanentAddress.split('$')[4]

  const container = document.getElementById('coursesContainer')
  let firstItr = true
  for (const c in data.courses) {
    if (firstItr) {
      firstItr = false
      container.innerHTML = `
        <div class="row" id="course">
            <div class="col-md-6">
              <label for="courses">Courses</label>
              <div class="input-group">
                <select class="form-control" id="courses" name="coursesType" value=${c} required>
                  <option>btech</option>
                  <option>m tech</option>
                  <option>bca</option>
                  <option>mca</option>
                </select>
                <div class="input-group-append">
                  <button class="btn btn-xs add-course-btn text-bold text-light">+</button>
                </div>
              </div>
            </div>


            <div class="col-md-6">
              <label for="branch">Branch</label>
              <input name="branchType" type="text" value=${data.courses[c]} class="form-control" id="branch" placeholder="Enter your branch"
                required />
            </div>
          </div>
      `
    } else {
      const newCourseRow = document.createElement('div')
      newCourseRow.classList.add('row')

      newCourseRow.innerHTML = `
              <div class="col-md-6">
                <label for="courses">Courses</label>
                <div class="input-group">
                  <select class="form-control" id="courses" name="coursesType" value=${c} required>
                    <option>btech</option>
                    <option>m tech</option>
                    <option>bca</option>
                    <option>mca</option>
                  </select>
                  <div class="input-group-append">
                    <button class="btn remove-course-btn btn-danger text-bold text-light">-</button>
                  </div>
                </div>
              </div>
  
  
              <div class="col-md-6">
                <label for="branch">Branch</label>
                <input name="branchType" value="${data.courses[c]}" type="text" class="form-control" id="branch" placeholder="Enter your branch"
                  required />
              </div> 
              `
      container.appendChild(newCourseRow)
    }
  }
}

addCourseBtn.addEventListener('click', function () {
  const newCourseRow = document.createElement('div')

  newCourseRow.classList.add('row')

  newCourseRow.innerHTML = `
            <div class="col-md-6">
              <label for="courses">Courses</label>
              <div class="input-group">
                <select class="form-control" id="courses" name="coursesType" required>
                  <option>btech</option>
                  <option>m tech</option>
                  <option>bca</option>
                  <option>mca</option>
                </select>
                <div class="input-group-append">
                  <button class="btn remove-course-btn btn-danger text-bold text-light">-</button>
                </div>
              </div>
            </div>


            <div class="col-md-6">
              <label for="branch">Branch</label>
              <input name="branchType" type="text" class="form-control" id="branch" placeholder="Enter your branch"
                required />
            </div> 
            `

  coursesContainer.appendChild(newCourseRow)

  newCourseRow
    .querySelector('.remove-course-btn')
    .addEventListener('click', function () {
      newCourseRow.remove()
    })
})

const handleSubmit = async (event) => {
  event.preventDefault()
  const data = new FormData(event.target)
  const collegeDetails = JSON.stringify(getCollegeDetails(data))

  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  const request = new Request(`${API_URL}:${PORT}/api/College`, {
    method: 'POST',
    headers: headers,
    body: collegeDetails,
  })
  const updateRequest = new Request(
    `${API_URL}:${PORT}/api/College/${collegeId}`,
    {
      method: 'PUT',
      headers: headers,
      body: collegeDetails,
    }
  )
  try {
    let response
    if (collegeId) {
      response = await fetch(updateRequest)
    } else {
      response = await fetch(request)
    }
    const result = await response.json()
    alert(
      `College details added successfully and registration id : ${result.registrationId}`
    )
    openSuccessModal(response.registrationId)
  } catch (error) {
    alert('Failed to add college details')
    openFailedModal()
  }
}

const handleCheckbox = (event) => {
  const checked = event.target.checked
  console.log(document.getElementById('currentstreetaddress').value)
  if (checked) {
    document.getElementById('permanentstreetaddress').value =
      document.getElementById('currentstreetaddress').value
    document.getElementById('permanentstreetaddressline2').value =
      document.getElementById('currentstreetaddressline2').value
    document.getElementById('permanentcity').value =
      document.getElementById('currentcity').value
    document.getElementById('permanentstate').value =
      document.getElementById('currentstate').value
    document.getElementById('permanentpostal').value =
      document.getElementById('currentpostal').value
  } else {
    document.getElementById('permanentstreetaddress').value = ''
    document.getElementById('permanentstreetaddressline2').value = ''
    document.getElementById('permanentcity').value = ''
    document.getElementById('permanentstate').value = ''
    document.getElementById('permanentpostal').value = ''
  }
}

const getCollegeDetails = (data) => {
  const CurrentAddress = getCurrentAddress(data)
  const PermanentAddress = getPermanentAddress(data)
  const CollegeId = data.get('collegeId')
  const CollegeName = data.get('collegename')
  const Courses = JSON.stringify(getCoursesDetails())
  const RegistrationDate = new Date()
  const EmailId = data.get('email')
  const ContactNumber = data.get('contact')
  const DocumentType = data.get('documenttype')
  const DocumentNumber = data.get('documentnumber')
  const Nationality = data.get('nationality')
  const RegistrationId = `${CollegeName.substring(0, 2)}${CollegeId.substring(
    0,
    2
  )}${new Date(RegistrationDate).getFullYear()}`

  return {
    CurrentAddress,
    PermanentAddress,
    CollegeId,
    CollegeName,
    Courses,
    RegistrationDate,
    EmailId,
    ContactNumber,
    DocumentNumber,
    DocumentType,
    Nationality,
    RegistrationId,
  }
}

const getPermanentAddress = (data) => {
  const PermanentStreetAddress = data.get('permanentstreetaddress')
  const PermanentStreetAddressLine2 = data.get('permanentstreetaddressline2')
  const PermanentCity = data.get('permanentcity')
  const PermanentState = data.get('permanentstate')
  const PermanentPostal = data.get('permanentpostal')
  return `${PermanentStreetAddress}$${PermanentStreetAddressLine2}$${PermanentCity}$${PermanentState}$${PermanentPostal}`
}
const getCurrentAddress = (data) => {
  const CurrentStreetAddress = data.get('currentstreetaddress')
  const CurrentStreetAddressLine2 = data.get('currentstreetaddressline2')
  const CurrentCity = data.get('currentcity')
  const CurrentState = data.get('currentstate')
  const CurrentPostal = data.get('currentpostal')

  return `${CurrentStreetAddress}$${CurrentStreetAddressLine2}$${CurrentCity}$${CurrentState}$${CurrentPostal}`
}

const getCoursesDetails = () => {
  const courses = document.getElementsByName('coursesType')
  const branches = document.getElementsByName('branchType')

  const coursesData = {}
  for (let i = 0; i < courses.length; i++) {
    coursesData[courses[i].options[courses[i].selectedIndex].value] =
      branches[i].value
  }
  return coursesData
}

document.querySelector('form').addEventListener('submit', handleSubmit)
document
  .getElementById('addressCheck')
  .addEventListener('change', handleCheckbox)
