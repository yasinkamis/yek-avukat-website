import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from './firebase';

// ============ SITE CONTENT ============

// Get single content document (hero, about, contact)
export const getContent = async (contentType) => {
  try {
    const docRef = doc(db, 'siteContent', contentType);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error('Error getting content:', error);
    throw error;
  }
};

// Update content document
export const updateContent = async (contentType, data) => {
  try {
    const docRef = doc(db, 'siteContent', contentType);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating content:', error);
    throw error;
  }
};

// ============ SERVICES/PRACTICE AREAS ============

// Get all services
export const getServices = async () => {
  try {
    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting services:', error);
    throw error;
  }
};

// Add new service
export const addService = async (data) => {
  try {
    const docRef = doc(collection(db, 'services'));
    await setDoc(docRef, { 
      ...data, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString() 
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding service:', error);
    throw error;
  }
};

// Update service
export const updateService = async (id, data) => {
  try {
    const docRef = doc(db, 'services', id);
    await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
    return true;
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

// Delete service
export const deleteService = async (id) => {
  try {
    await deleteDoc(doc(db, 'services', id));
    return true;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// ============ FILE UPLOAD (DISABLED) ============

// Upload image (Disabled - using local images)
export const uploadImage = async (file, path) => {
  console.log('Image upload disabled. Using local images.');
  return null;
};

// Delete image (Disabled)
export const deleteImage = async (path) => {
  console.log('Image deletion disabled.');
  return true;
};


// ============ MESSAGES ============

// Get all messages
export const getMessages = async () => {
  try {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
};

// Add new message
export const addMessage = async (data) => {
  try {
    const docRef = doc(collection(db, 'messages'));
    await setDoc(docRef, { 
      ...data, 
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

// Delete message
export const deleteMessage = async (id) => {
  try {
    await deleteDoc(doc(db, 'messages', id));
    return true;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

// ============ INITIALIZE DEFAULT DATA ============

// Initialize default content if not exists
// Initialize default content structure (Empty/Minimal)
export const initializeDefaultContent = async () => {
  const defaults = {
    hero: {
      title: '',
      subtitle: '',
      tagline: '',
      photoUrl: ''
    },
    about: {
      name: '',
      title: '',
      bio: '',
      education: '',
      experience: '',
      expertise: '',
      photoUrl: ''
    },
    contact: {
      phone: '',
      email: '',
      address: '',
      whatsapp: '',
      linkedin: '',
      instagram: ''
    }
  };

  for (const [key, value] of Object.entries(defaults)) {
    const existing = await getContent(key);
    if (!existing) {
      await updateContent(key, value);
    }
  }
};
// Initialize default services if empty
export const initializeDefaultServices = async () => {
  const defaultServices = [
    { icon: 'gavel', title: 'Ceza Hukuku', description: 'Ceza davalarında uzman savunma ve danışmanlık.', order: 1 },
    { icon: 'family', title: 'Aile Hukuku', description: 'Boşanma, velayet ve nafaka davalarında destek.', order: 2 },
    { icon: 'business', title: 'Ticaret Hukuku', description: 'Şirketler için hukuki danışmanlık ve dava takibi.', order: 3 },
    { icon: 'work', title: 'İş Hukuku', description: 'İşçi ve işveren hakları konusunda danışmanlık.', order: 4 },
    { icon: 'bank', title: 'İcra & İflas', description: 'Alacak takibi ve borç yapılandırma hizmetleri.', order: 5 },
    { icon: 'document', title: 'Sözleşme Hukuku', description: 'Sözleşme hazırlama ve inceleme hizmeti.', order: 6 }
  ];

  const services = await getServices();
  
  for (const defaultService of defaultServices) {
    const exists = services.some(s => s.title === defaultService.title);
    if (!exists) {
      await addService(defaultService);
    }
  }
};
