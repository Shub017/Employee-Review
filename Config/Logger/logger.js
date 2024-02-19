import winston from 'winston';
import colors from 'colors';

// Define your log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json()
);

// Create a console transport with colorized output
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    logFormat
  )
});

// Create separate file transports for Admin and Employee logs
const adminFileTransport = new winston.transports.File({ filename: 'logs/admin-logs.log', format: logFormat });
const employeeFileTransport = new winston.transports.File({ filename: 'logs/employee-logs.log', format: logFormat });
const ErrorFileTransport = new winston.transports.File({filename:'logs/Error-logs.log', format: logFormat});
const RollChangeTransport = new winston.transports.File({filename:'logs/Role-change.log', format: logFormat});

// Create separate loggers for new Admin Registeration 
export const adminLogger = winston.createLogger({
  transports: [consoleTransport, adminFileTransport]
});

// Create separate logger for new Employee Registration 
export const employeeLogger = winston.createLogger({
  transports: [consoleTransport, employeeFileTransport]
});

// Create logger for error loggging
export const ErrorLogger = winston.createLogger({
  transports: [consoleTransport, ErrorFileTransport]
});

// Create logger for Employee being promoted to Admin
export const EmployeetoAdminLogger = winston.createLogger({
  transports:[RollChangeTransport]
});


// Function to log user registration based on role
export const logUserRegistration = (userId, role, Name) => {
  const message = `New user registered - Name:${Name}, ID: ${userId}, Role: ${role}`;
  const errorMessage = `ID: ${userId} couldn't match with any specified Role`;

  // Log the message with the appropriate logger based on role
  if (role === 'Admin') {
    adminLogger.info(message.green);  // Apply .green directly to the string
  } else if (role === 'Employee') {
    employeeLogger.info(message.blue);  // Apply .blue directly to the string
  } else {
    // Handle other roles or log to a default logger
    // You can also throw an error or log to a default logger if the role is not recognized.
    ErrorLogger.info(errorMessage.red);  // Apply .red directly to the string
  }
};

// Function for loggin chnaging of Role
export const logChangeOfRole = (EmployeeId, Role, Name)=>{
  const message = `Employee ${Name} with email ${EmployeeId}, is now promoted to ${Role}`;

  EmployeetoAdminLogger.info(message.blue);
}
