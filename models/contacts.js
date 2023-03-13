const fs = require("fs").promises;
const path = require("path");
const uniqid = require("uniqid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove = contacts.filter(
    (contact) => contact.id !== contactId
  );
  if (!contactToRemove) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(contactToRemove));
  return contactToRemove;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { name, email, phone, id: uniqid() };
  if (!newContact) {
    return null;
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
