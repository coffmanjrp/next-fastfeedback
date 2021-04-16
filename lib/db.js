import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  const site = firestore.collection('sites').doc();
  site.set(data);

  return site;
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: formData.get('price_1IgilHCeZ8zumQCW7J2EXxzM'),
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  checkoutSessionRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      const stripe = await getStripe();

      stripe.redirectToCheckout({ sessionId });
    }
  });
}
