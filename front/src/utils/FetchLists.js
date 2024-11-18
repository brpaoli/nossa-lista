import { collection, query, where, getDocs } from 'firebase/firestore';

// Exemplo de como buscar as listas
export const fetchUserListsId = async (uid) => {
  const q = query(collection(db, 'listas'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);

  const lists = [];
  querySnapshot.forEach((doc) => {
    lists.push({ id: doc.id, ...doc.data() });
  });

  return lists;
};

export const fetchUserListsName = async (listName) => {
    const q = query(collection(db, 'listas'), where('name', '==', name));
    const querySnapshot = await getDocs(q);
  
    const lists = [];
    querySnapshot.forEach((doc) => {
      lists.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, doc.data());
    });
  
    return lists;
  };
