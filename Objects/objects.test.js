const path                = require("path");

const objects_file_name   = process.env.OBJECTS_FILE || 'objects.js';
const objects_file        = path.resolve(__dirname + "/" + objects_file_name);
const objects_module      = require(objects_file);

const hasName             = objects_module.hasName;
const nameCase            = objects_module.nameCase;
const dueForPhysical      = objects_module.dueForPhysical;
const neededRefills       = objects_module.neededRefills;
const isAllergicTo        = objects_module.isAllergicTo;
const dueForAppointment   = objects_module.dueForAppointment;
const doctorAvailable     = objects_module.doctorAvailable;
const scheduleAppointment = objects_module.scheduleAppointment;
const sanitizeNames       = objects_module.sanitizeNames;
const getOffice           = objects_module.getOffice;
const storeOffice         = objects_module.storeOffice;

test("[hasName]: Returns true if object has name", function(){
  const obj = {"name": 1, "otherField": 2};
  expect(hasName(obj)).toBe(true);
})

test("[hasName]: Returns false if object does not have name", function(){
  const obj = {"otherField": 2};
  expect(hasName(obj)).toBe(false);
})

test("[hasName]: Returns false if object is empty", function(){
  const obj = {};
  expect(hasName(obj)).toBe(false);
})

test("[nameCase]: Capitalizes first letter of singular name", function(){
  const obj = {name: "test"};
  expect(nameCase(obj).name).toBe("Test");
})

test("[nameCase]: Capitalizes first letter of multiple-word name", function(){
  const obj = {name: "bradford william bonanno is a name"};
  expect(nameCase(obj).name).toBe("Bradford William Bonanno Is A Name");
})

test("[nameCase]: Returns the original object if name does not exist", function(){
  const obj = {notName: 123};
  expect(nameCase(obj).name).toBe(undefined);
  expect(nameCase(obj).notName).toBe(123);
})

test("[dueForPhysical]: Returns true if days since last physical are over 365", function() {
  const patient = {lastPhysical: 366};
  expect(dueForPhysical(patient)).toBe(true);
})

test("[dueForPhysical]: Returns false if days since last physical equal 365", function() {
  const patient = {lastPhysical: 365};
  expect(dueForPhysical(patient)).toBe(false);
})

test("[dueForPhysical]: Returns false if days since last physical less than 365", function() {
  const patient = {lastPhysical: 3};
  expect(dueForPhysical(patient)).toBe(false);
})

test("[neededRefills]: Returns empty array if patient has no medications", function(){
  const patient = {medications: {}, lastVisit: 20}
  expect(neededRefills(patient).length).toBe(0);
})

test("[neededRefills]: Returns empty array if patient medications aren't expired", function(){
  const patient = {
    medications: {"med1": 30, "med2": 30},
    lastVisit: 20
  }

  expect(neededRefills(patient).length).toBe(0);
})

test("[neededRefills]: Returns correct meds if patient medications are expired", function(){
  const patient = {
    medications: {"med1": 30, "med2": 60, "med3": 30},
    lastVisit: 35
  }

  const refills = neededRefills(patient);
  expect(refills.length).toBe(2);
  expect(refills.includes("med1")).toBe(true);
  expect(refills.includes("med2")).toBe(false);
  expect(refills.includes("med3")).toBe(true);
})

test("[isAllergicTo]: Returns false if patient has no allergies", function(){
  const patient = {
    allergies: []
  }

  expect(isAllergicTo(patient, "substance")).toBe(false);
})

test("[isAllergicTo]: Returns false if patient is not allergic to substance", function(){
  const patient = {
    allergies: ["substance1", "substance2"]
  }

  expect(isAllergicTo(patient, "substance3")).toBe(false);
})

test("[isAllergicTo]: Returns true if patient is allergic to substance", function(){
  const patient = {
    allergies: ["substance1", "substance2"]
  }

  expect(isAllergicTo(patient, "substance1")).toBe(true);
})

test("[dueForAppointment]: Returns empty list if no patients exist", function() {
  const doctor = {
    patients: []
  }

  expect(dueForAppointment(doctor).length).toBe(0);
})

test("[dueForAppointment]: Returns empty list if no patient is due for appointment", function() {
  const doctor = {
    patients: [
      {
        lastPhysical: 0,
        medications: {}
      },
      {
        lastPhysical: 360,
        medications: {}
      },
      {
        lastPhysical: 0,
        lastVisit: 20,
        medications: { "Medication": 30 }
      }
    ]
  }

  expect(dueForAppointment(doctor).length).toBe(0);
})

test("[dueForAppointment]: Returns empty list if no patient is due for appointment", function() {
  const doctor = {
    patients: [
      {
        lastPhysical: 0,
        medications: {}
      },
      {
        lastPhysical: 460,
        medications: {}
      },
      {
        lastPhysical: 0,
        lastVisit: 35,
        medications: { "Medication": 30 }
      }
    ]
  }

  const appointmentsNeeded = dueForAppointment(doctor);
  expect(appointmentsNeeded.length).toBe(2);

  expect(appointmentsNeeded[0].refills.length).toBe(0);
  expect(appointmentsNeeded[0].physical).toBe(true);

  expect(appointmentsNeeded[1].refills.length).toBe(1);
  expect(appointmentsNeeded[1].physical).toBe(false);
})

test("[doctorAvailable]: Returns false if doctor has same appointment", function() {
  const doctor = {
    appointments: [new Date('May 28, 2019 03:00:00')]
  }

  expect(doctorAvailable(doctor, new Date('May 28, 2019 03:00:00'))).toBe(false);
})

test("[doctorAvailable]: Returns false if doctor has appointment within hour", function() {
  var doctor = {
    appointments: [new Date('May 28, 2019 03:00:00')]
  }

  expect(doctorAvailable(doctor, new Date('May 28, 2019 03:59:59'))).toBe(false);

  var doctor = {
    appointments: [new Date('May 28, 2019 04:30:00')]
  }

  expect(doctorAvailable(doctor, new Date('May 28, 2019 03:59:59'))).toBe(false);
})

test("[doctorAvailable]: Returns true if doctor does not have appointment within hour", function() {
  const doctor = {
    appointments: [
      new Date('May 28, 2019 03:00:00'),
      new Date('May 28, 2019 05:00:00')
    ]
  }

  expect(doctorAvailable(doctor, new Date('May 28, 2019 04:00:00'))).toBe(true);
})

test("[scheduleAppointment]: Returns false and does not  append appointment if doctor is busy", function() {
  const doctor = {
    appointments: [
      new Date('May 28, 2019 03:00:00'),
      new Date('May 28, 2019 05:00:00')
    ]
  }

  expect(scheduleAppointment(doctor, new Date('May 28, 2019 04:30:00'))).toBe(false);
  expect(doctor.appointments.length).toBe(2);
})

test("[scheduleAppointment]: Returns true and appends appointment if doctor is available", function() {
  const doctor = {
    appointments: [
      new Date('May 28, 2019 03:00:00'),
      new Date('May 28, 2019 05:00:00')
    ]
  }

  expect(scheduleAppointment(doctor, new Date('May 28, 2019 04:00:00'))).toBe(true);
  expect(doctor.appointments.length).toBe(3);
})

test("[sanitizeNames]: Correctly name cases doctors", function() {
  const office = {
    doctors: [{name: "JoHn DOE", patients: []}, {name: "JaNe doe", patients: []}]
  }

  sanitizeNames(office);
  expect(office.doctors[0].name).toBe("John Doe");
  expect(office.doctors[1].name).toBe("Jane Doe");
})

test("[sanitizeNames]: Correctly name cases patients", function() {
  const office = {
    doctors: [
      {name: "JoHn DOE", patients: [{name: "Jon snow"}]},
      {name: "JaNe doe", patients: [{name: "dAenerYs Targaryen"}]}
    ]
  }

  sanitizeNames(office);
  expect(office.doctors[0].patients[0].name).toBe("Jon Snow");
  expect(office.doctors[1].patients[0].name).toBe("Daenerys Targaryen");
})

test("[getOffice]: Gets office object from JSON representation", function() {
  const office = {
    address: "123 Example Lane, Town CA 00000",
    phoneNumber: "(555) 555-5555",
    doctors: [
      {
        name: "James Smith",
        patients: [
          {
            name: "John  Doe",
            age: 42,
            gender: "Male",
            lastPhysical: 132,
            lastVisit: 25,
            allergies: ["Ibuprofen", "Nuts"],
            medications: {
              "Benazepril": 30,
              "Triamterene": 30
            }
          },
          {
            name: "Jane  Doe",
            age: 30,
            gender: "Female",
            lastPhysical: 20,
            lastVisit: 20,
            allergies: [],
            medications: {}
          }
        ],
        maxNumberPatients: 10,
        appointments: []
      }
    ]
  }

  const parsedOffice = getOffice(JSON.stringify(office));
  expect(parsedOffice.address).toBe(office.address);
  expect(parsedOffice.phoneNumber).toBe(office.phoneNumber);
  expect(parsedOffice.doctors.length).toBe(office.doctors.length);
})

test("[storeOffice]: Returns office object as a JSON string", function() {
  const office = {
    address: "123 Example Lane, Town CA 00000",
    phoneNumber: "(555) 555-5555",
    doctors: [
      {
        name: "James Smith",
        patients: [
          {
            name: "John  Doe",
            age: 42,
            gender: "Male",
            lastPhysical: 132,
            lastVisit: 25,
            allergies: ["Ibuprofen", "Nuts"],
            medications: {
              "Benazepril": 30,
              "Triamterene": 30
            }
          },
          {
            name: "Jane  Doe",
            age: 30,
            gender: "Female",
            lastPhysical: 20,
            lastVisit: 20,
            allergies: [],
            medications: {}
          }
        ],
        maxNumberPatients: 10,
        appointments: []
      }
    ]
  }

  expect(storeOffice(office)).toBe(JSON.stringify(office));
})
