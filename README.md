# Data Neuron Assignment

The Assignment is like a TODO which use can create,Edit/Update,delete the task .And also have the track for the count of these CRUD operations

#Getting Started

# 1.Installation

Clone the repository

     git clone <Clone using the web URL of the repository>

# 2. Install the dependencies

Install all the dependencies which are needed to the project run

          cd server
          npm install
          cd ..
          cd client
          npm install

# 3. Start Server Side

          cd server
          npm start

# 4. Start the Client Side

         cd ..
         cd client
         npm run dev

# API Cals

To Come over with CRUD operation here used different API calls

# Add Task

     URL: /addTask
     Method: POST
      Request Body:
    {"tasks": "Task Name",}

# Get All Task

     URL: /getAllTasks
     Method: GET


# Update Task

     URL: /updateTask
     Method: PUT
      Request Body:
    {"tasks": "Task Name",}

# Delete Task

     URL: /deleteTask
     Method: DELETE


# Get API Count

     URL: /getCount
     Method: GET

# Watch the Demo 
   
    https://youtu.be/XHuapcFDCB8