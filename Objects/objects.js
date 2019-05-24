/**
 * Determine whether the json passed contains a name field
 * @param {Object} Arbitrary object
 * @returns {Boolean} True if the object contains a name, false otherwise
 */
function hasName(obj) {

}

/**
 * Returns a new JSON with the name first letter of
 * every part of the  name (however long) capitalized
 * Note: It is highly encouraged you use your previous function
 * to accomplish this.
 * @param {String} JSON representation of an object
 * @param {String} New JSON repreesentation with correctly cased name
 */
function nameCase(obj) {

}

/* ----------------------------------------------------------------- */
/*
 *  For the following exercises, assume that you are being passed
 *  an object (NOT A JSON) with the following fields:
 *
 *  - name {String}: Name of patient
 *  - age  {Number}: Age of patient
 *  - gender {String}: Gender of patient
 *  - lastPhysical {Number}: Number of days since last physical
 *  - lastVisit {Number}: Number of days since last visit to the office
 *  - allergies {Array}: Array listing Strings of allergies
 *  - medications {Object}: Object mapping medications the patient takes to
 *    the number of days they can go without a refill
 *
 *    ---
 *
 *    Example Object:
 *
 *    {
 *      name: "John  Doe",
 *      age: 42,
 *      gender: "Male",
 *      lastPhysical: 132,
 *      lastVisit: 25,
 *      allergies: ["Ibuprofen", "Nuts"],
 *      medications: {
 *        "Benazepril": 30,
 *        "Triamterene": 30
 *      }
 *    }
 *
 */
/* ----------------------------------------------------------------- */

/**
 * Determine whether a patient has not had a checkup in over 365 days
 * @param {Patient} Patient object as described above
 * @returns {Boolean} True if the patient has not been for a checkup
 * in over 365 days
 */
function dueForPhysical(patient) {

}

/**
 * Determine whether a patient needs a refill for any of their medications
 * A patient needs a refill if the number of days since their last visit
 * is greater than the number of days they may go without a refill for
 * any of their medications
 * @param {Patient} Patient object as defined above
 * @returns {Array} List of medications for which a refill is needed.
 * Should return an empty array given zero medications needing refill
 */
function neededRefills(patient) {

}

/* ----------------------------------------------------------------------------- */
/* BONUS: Do you see where this data model falls short given the above function? */
/* How could you tweak the data model in order to fix this problem?              */
/* ----------------------------------------------------------------------------- */

/**
 * Determine whether a patient is allergic to a particular substance
 * *NOTE* To answer the bonus question below, it will be helpful to implement
 * this logic by hand rather than using the built-in Array.prototype.includes method
 *
 * @param {Patient} Patient object as defined above
 * @param {String} Substance to check for
 * @returns {Boolean} True if patient is allergic to the substance
 */
function isAllergicTo(patient, substance) {

}

/* ----------------------------------------------------------------------------- */
/* BONUS: Do you see where this data model leads to a slower lookup algorithm?   */
/* How could you tweak the data model in order to fix this problem?              */
/* ----------------------------------------------------------------------------- */

/* ----------------------------------------------------------------- */
/*
 *  For the following exercises, we introduce two new objects.
 *
 *  Doctor:
 *    - patients {Array}: List of patient objects
 *    - name {String}: Name of doctor
 *    - maxNumberPatients {Number}: Maximum number of patients doctor will take on
 *    - appointments {Array}: Array of Date objects noting the start of booked appointments
 *      *NOTE* Assume all appointments last for one hour
 *
 *  Example:
 *  {
 *    name: "James Smith",
 *    patients: [
 *      {
 *        name: "John  Doe",
 *        age: 42,
 *        gender: "Male",
 *        lastPhysical: 132,
 *        lastVisit: 25,
 *        allergies: ["Ibuprofen", "Nuts"],
 *        medications: {
 *          "Benazepril": 30,
 *          "Triamterene": 30
 *        }
 *      },
 *      {
 *        name: "Jane  Doe",
 *        age: 30,
 *        gender: "Female",
 *        lastPhysical: 20,
 *        lastVisit: 20,
 *        allergies: [],
 *        medications: {}
 *      }
 *    ],
 *    maxNumberPatients: 10,
 *    appointments: [2019-05-28T07:00:00.000Z, 2019-05-28T4:00:00.000Z]
 *  }
 *
 *  Office:
 *    - doctors {Array}: List of Doctors
 *    - address {String}: Address of doctor's office
 *    - phoneNumber {String}: Phone number of doctor's office
 *
 *  Example:
 *  {
 *    address: "123 Example Lane, Town CA 00000",
 *    phoneNumber: "(555) 555-5555",
 *    doctors: [
 *      {
 *        name: "James Smith",
 *        patients: [
 *          {
 *            name: "John  Doe",
 *            age: 42,
 *            gender: "Male",
 *            lastPhysical: 132,
 *            lastVisit: 25,
 *            allergies: ["Ibuprofen", "Nuts"],
 *            medications: {
 *              "Benazepril": 30,
 *              "Triamterene": 30
 *            }
 *          },
 *          {
 *            name: "Jane  Doe",
 *            age: 30,
 *            gender: "Female",
 *            lastPhysical: 20,
 *            lastVisit: 20,
 *            allergies: [],
 *            medications: {}
 *          }
 *        ],
 *        maxNumberPatients: 10,
 *        appointments: [2019-05-28T07:00:00.000Z, 2019-05-28T4:00:00.000Z]
 *      }
 *    ]
 *  }
 */
/* ----------------------------------------------------------------- */

/*
 * Function ideas:
 *   - sanitize names for an entire office using name case
 */

/**
 * Return all of the patients that need an appointment in the form
 * { patient: <the patient>, refills: <medications>, physical: boolean }
 * refills should be the medications that need refilling
 * physical should be true if patient needs a phyical
 *
 * @param doctor {Doctor} Doctor object as defined above
 * @returns {Array} Array of Objects as defined above
 */
function dueForAppointment(doctor) {

}

/**
 * Determine if doctor is available at specified time
 *
 * @param doctor {Doctor} Doctor object as defined above
 * @param time {Date} Date object representing appointment day/time
 * *NOTE* It will be helpful to Google JavaScript Date to learn
 * how to work with Date objects. Hint: they're subtractable...
 * @returns {Boolean} True if doctor is available at time
 */
function doctorAvailable(doctor, time) {

}

/**
 * Schedule appointment for doctor at given time if available
 *
 * @param doctor {Doctor} Doctor object as defined above
 * @param time {Date} Date object representing appointment day/time
 * @returns {Boolean} True if appointment scheduled
 */
function scheduleAppointment(doctor, time) {

}

/**
 * Sanitize all the names in an office to be name case
 *
 * @param office {Office} Office object as defined above
 * @returns void
 */
function sanitizeNames(office) {

}

/**
 * This should serve as a wrapper around JSON parse for
 * an office string. This function should _always_ return
 * an office object
 * *NOTE* Traditionally there would be networking involved
 * to retrieve this object from a database. **This would
 * be received in JSON format.** You would want to work
 * with it as an object. This is a one line exercise
 * to get you used to the idea of abstracting this process
 * into the function that you would use for the networking.
 *
 * @param officeString {String} JSON representation of Office object
 * @returns {Office} Office object as defined above
 */
function getOffice(officeString) {

}

/**
 * This should serve as a wrapper around JSON stringify for
 * an Office object. This function should _always_ return
 * a stringified Office object
 * *NOTE* Traditionally there would be networking involved
 * to store this object into a database. **This would
 * be sent in JSON format.** This is a one line exercise
 * to get you used to the idea of abstracting this process
 * into the function that you would use for the networking.
 * As such, it would traditionally return void due to the
 * fact that the networking would store the result rather
 * than needing it documented on the client side.
 *
 * @param office {Office} Office object as defined above
 * @returns {String} JSON representation of Office object
 */
function storeOffice(office) {

}

module.exports = {
  hasName: hasName,
  nameCase: nameCase,
  dueForPhysical: dueForPhysical,
  neededRefills: neededRefills,
  isAllergicTo: isAllergicTo,
  dueForAppointment: dueForAppointment,
  doctorAvailable: doctorAvailable,
  scheduleAppointment: scheduleAppointment,
  sanitizeNames: sanitizeNames,
  getOffice: getOffice,
  storeOffice: storeOffice
}
