import { openDB } from 'idb';

const initdb = async () =>
// we crate a new database called Jate
  openDB('jate', 1, {
    //add our database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //create a new object store for the data and give it a key name of 'id' which needs to increament automatialy
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Create a connection to the database and version we want to use
  const jateDB = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges
  const tx = jateDB.transaction('jate', 'readwrite');
  // open up the desired object store
  const store = tx.objectStore('jate');
  // use the put method on the store and pass in the content
  const request = store.put({content: content});
  // get information of the request
  const result = await request;
  // if request is false send error code
  if(!result){console.error('putDb not implemented'); return;}
  // if success then console log that result as successful
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  // Create a connection to the database and version we want to use
  const jateDB = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges
  const tx = jateDB.transaction('jate', 'readonly');
  //open up the desired object store
  const store = tx.objectStore('jate');
  // use the getall method on the store and get all data on the database
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  // if request is false send error code
  if(!result){console.error('getDb not implemented'); return;}
  // if successs then console log the result and return result
  console.log('result value', result);
  return result;
};

initdb();
