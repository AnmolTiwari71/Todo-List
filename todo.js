// Utility function to get stored projects from localStorage
function getStoredProjects() {
    return JSON.parse(localStorage.getItem("TodoProjects")) || [];
  }
  
  // Utility function to update localStorage with a new project list
  function updateStoredProjects(lst) {
    localStorage.setItem("TodoProjects", JSON.stringify(lst));
  }
  
  // Function to allow adding a new project
  function allowToAdd() {
    document.getElementById("add").style.backgroundColor = "rgb(50, 28, 253)";
    document.getElementById("show").style.backgroundColor = "rgb(106, 90, 248)";
    const elements = document.getElementById("change").children;
    elements[0].className = "add";
    elements[1].className = "remove";
  }
  
  // Function to display the list of projects
  function getList() {
    document.getElementById("show").style.backgroundColor = "rgb(50, 28, 253)";
    document.getElementById("add").style.backgroundColor = "rgb(106, 90, 248)";
    const elements = document.getElementById("change").children;
    elements[0].className = "remove";
    elements[1].className = "add";
    document.getElementById("append").innerHTML = generateProjectListHTML();
  }
  
  // Function to add a project to the list
  function addToList() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    
    // Ensure title and description are not empty
    if (title && desc) {
      let date = new Date();
      const formattedDate = `Date: ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      
      const lst = getStoredProjects();
      lst.push({
        id: lst.length,
        title: title,
        description: desc,
        status: 2,  // Default status is "Todo"
        date: formattedDate,
      });
  
      updateStoredProjects(lst);
      getList();
      clearFields();
    }
  }
  
  // Function to remove a project from the list
  function removeFromList(id) {
    const lst = getStoredProjects().filter((element) => element.id !== Number(id));
    updateStoredProjects(lst);
    getList();
  }
  
  // Function to update project status
  function updateStatus(params) {
    const { id, status } = JSON.parse(params);
    const lst = getStoredProjects();
  
    lst.forEach((element) => {
      if (element.id === Number(id)) {
        element.status = status;
      }
    });
  
    updateStoredProjects(lst);
    getList();
  }
  
  // Function to clear the input fields
  function clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
  }
  
  // Event listeners
  document.getElementById("add").addEventListener("click", allowToAdd);
  document.getElementById("show").addEventListener("click", getList);
  document.getElementById("addtodatabase").addEventListener("click", addToList);
  document.getElementById("clear").addEventListener("click", clearFields);
  
  // Function to generate project list HTML
  function generateProjectListHTML() {
    const lst = getStoredProjects();
    if (lst.length === 0) {
      return `
        <p class="l" style="margin-top:10px;text-align:center;">Not Found</p>
        <p class="l" style="margin-top:4px;text-align:center;">Go to add project page to add Projects</p>`;
    }
  
    return lst.map((element) => `
      <div class="red">
        <div class="onChange">
          <h3 class="h" style="color:rgb(71, 71, 71);">${element.title}</h3>
          <div style="margin-right:2%;display:flex;">
            ${getStatusIcon(element.status)}
            <button style="background-color:white;border:none;" value="${element.id}" onclick="removeFromList(this.value)" aria-label="Update">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(252, 113, 113)" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          </div>
        </div>
        <p class="l" style="font-size:small;">${element.date}</p>
        <p class="l">${element.description}</p>
        <div style="flex">
          ${getStatusButtons(element.id, element.status)}
        </div>
      </div>`).join('');
  }
  
  // Function to get the status icon based on the project status
  function getStatusIcon(status) {
    if (status === 0) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" viewBox="0 0 16 16">
                <path d="M0.5 3l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7a2 2 0 0 0 1.974 1.789H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2z"/>
                <path d="M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.707 0l-1.5-1.5a.5.5 0 0 1 .707-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z"/>
              </svg>`;
    }
    if (status === 1) {
      return `<svg height="20" width="20" version="1.1" fill="blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M19.945,22l6.008-8L32,22h-4v2c0,3.309-2.691,6-6,6H10c-3.309,0-6-2.691-6-6v-2h4v2
                  c0,1.102,0.898,2,2,2h12c1.102,0,2-0.898,2-2v-2H19.945z"/>
                <path d="M10.002,12.999L16,4l5.997,7.999H16h-5.998H10.002z"/>
              </svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 16 16">
              <path d="M11.536 14.01a1.773 1.773 0 0 1-.86-1.12l-.24-.972H5.563l-.24.972c-.123.5-.42.922-.86 1.12a1.73 1.73 0 0 1-2.364-2.134l1.563-6.345A2.751 2.751 0 0 1 6.376 4h3.248c1.26 0 2.37.86 2.713 2.065l1.563 6.344a1.73 1.73 0 0 1-2.364 2.134z"/>
            </svg>`;
  }
  
  // Function to get status update buttons based on current project status
  function getStatusButtons(id, currentStatus) {
    const statuses = [
      { status: 2, label: "Todo" },
      { status: 1, label: "Pending" },
      { status: 0, label: "Completed" },
    ];
    
    return statuses.map(({ status, label }) => `
      <button class="btn-${label.toLowerCase()}" onclick='updateStatus("${JSON.stringify({ id, status })}")'>
        ${label}
      </button>`).join('');
  }
  