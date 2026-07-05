async function loadSharedModals() {
  const mount = document.querySelector("[data-shared-modals]");
  if (!mount || document.querySelector("[data-account-modal]")) return;

  try {
    const response = await fetch("modals.html");
    if (!response.ok) throw new Error("Could not load shared modals.");
    mount.innerHTML = await response.text();
  } catch {
    mount.innerHTML = "";
  }
}

(async () => {
await loadSharedModals();

const accountModal = document.querySelector("[data-account-modal]");
const repliesModal = document.querySelector("[data-replies-modal]");
const writeModal = document.querySelector("[data-write-modal]");
const otherProfileModal = document.querySelector("[data-other-profile-modal]");
const accountLabel = document.querySelector("[data-account-label]");
const authForm = document.querySelector("[data-auth-form]");
const authTitle = document.querySelector("#auth-title");
const authSubtitle = document.querySelector("[data-auth-subtitle]");
const authDemoNote = document.querySelector("[data-auth-demo-note]");
const authSubmit = document.querySelector("[data-auth-submit]");
const identifierInput = document.querySelector("input[name='identifier']");
const passwordInput = document.querySelector("input[name='password']");
const passwordToggle = document.querySelector("[data-toggle-password]");
const displayNameRow = document.querySelector("[data-display-name-row]");
const displayNameInput = document.querySelector("input[name='displayName']");
const authMessage = document.querySelector("[data-auth-message]");
const passwordRow = document.querySelector("[data-password-row]");
const toggleSignup = document.querySelector("[data-toggle-signup]");
const forgotButton = document.querySelector("[data-forgot]");
const confirmEmailButton = document.querySelector("[data-confirm-email]");
const authPanel = document.querySelector("[data-auth-panel]");
const signInView = document.querySelector(".auth-signin");
const profileView = document.querySelector("[data-profile-view]");
const profileName = document.querySelector("[data-profile-name]");
const profileEmail = document.querySelector("[data-profile-email]");
const profileAvatars = document.querySelectorAll("[data-profile-avatar]");
const profileStoryCount = document.querySelector("[data-profile-story-count]");
const profileLikeCount = document.querySelector("[data-profile-like-count]");
const profileFriendCount = document.querySelector("[data-profile-friend-count]");
const editProfileButton = document.querySelector("[data-show-edit-profile]");
const editProfilePanel = document.querySelector("[data-profile-edit-panel]");
const editProfileNameInput = document.querySelector("input[name='profileName']");
const otherProfileAvatar = document.querySelector("[data-other-profile-avatar]");
const otherProfileName = document.querySelector("[data-other-profile-name]");
const otherStoryCount = document.querySelector("[data-other-story-count]");
const otherLikeCount = document.querySelector("[data-other-like-count]");
const otherFriendCount = document.querySelector("[data-other-friend-count]");
const otherProfileStories = document.querySelector("[data-other-profile-stories]");
const likeOtherProfileButton = document.querySelector("[data-like-other-profile]");
const friendOtherProfileButton = document.querySelector("[data-friend-other-profile]");
const avatarPicker = document.querySelector("[data-avatar-picker]");
const signupAvatarPicker = document.querySelector("[data-signup-avatar-picker]");
const avatarPickerToggle = document.querySelector("[data-toggle-avatar-picker]");
const signOutButton = document.querySelector("[data-sign-out]");
const savedPanel = document.querySelector("[data-saved-panel]");
const savedList = document.querySelector("[data-saved-list]");
const showSavedButton = document.querySelector("[data-show-saved]");
const myStoriesPanel = document.querySelector("[data-my-stories-panel]");
const myStoriesList = document.querySelector("[data-my-stories-list]");
const showMyStoriesButton = document.querySelector("[data-show-my-stories]");
const friendsPanel = document.querySelector("[data-friends-panel]");
const friendsList = document.querySelector("[data-friends-list]");
const showFriendsButton = document.querySelector("[data-show-friends]");
const replyForm = document.querySelector("[data-reply-form]");
const replyList = document.querySelector("[data-reply-list]");
const writeForm = document.querySelector(".write-panel");
const moodSelect = writeForm?.querySelector("select[name='mood']");
const customMoodRow = writeForm?.querySelector("[data-custom-mood-row]");
const customMoodInput = writeForm?.querySelector("input[name='customMood']");
const storyGrid = document.querySelector("[data-story-grid]") || document.querySelector("#stories .story-grid");
const feelingsList = document.querySelector("[data-feelings]");
const feelingStatus = document.querySelector("[data-feeling-status]");
const hopeQuote = document.querySelector("[data-hope-quote]");
const hopeCount = document.querySelector("[data-hope-count]");
const toast = document.querySelector("[data-toast]");
const SAVED_STORIES_KEY = "mochimind:savedStories";
const MY_STORIES_KEY = "mochimind:myStories";
const STORY_REPLIES_KEY = "mochimind:storyReplies";
const STORY_LIKES_KEY = "mochimind:storyLikes";
const REPORTED_STORIES_KEY = "mochimind:reportedStories";
const REPORTED_REPLIES_KEY = "mochimind:reportedReplies";
const PINNED_REPLIES_KEY = "mochimind:pinnedReplies";
const HIDDEN_STORIES_KEY = "mochimind:hiddenStories";
const PROFILE_STATS_KEY = "mochimind:profileStats";
const LIKED_PROFILES_KEY = "mochimind:likedProfiles";
const FRIEND_PROFILES_KEY = "mochimind:friendProfiles";
const ACCOUNT_KEY = "mochimind:account";
const PROFILE_DATA_KEY = "mochimind:userProfiles";
const AUTH_SESSION_KEY = "mochimind:isSignedIn";
const PROFILE_AVATAR_KEY = "mochimind:profileAvatar";
const HOPE_QUOTE_KEY = "mochimind:hopeQuote";
const HOPE_QUOTES_KEY = "mochimind:hopeQuotes";
const DEFAULT_AVATAR = "assets/cip_1.png";
const ADMIN_EMAILS = ["adminmochimind@gmail.com"];
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

let authMode = "signin";
let pendingSignupAvatar = DEFAULT_AVATAR;
let pendingEditAvatar = DEFAULT_AVATAR;
let pendingVerificationEmail = "";
let activeFeeling = "All";
let activeOtherProfileId = "";
let activeReplyStoryId = "";
let activeReplyButton = null;
let editingReplyIndex = -1;
let editingStoryId = "";
let toastTimer = null;
let storyFormSubmitting = false;
let replyFormSubmitting = false;
let firebaseAuth = null;
let firebaseUser = null;
let firebaseAuthReady = null;
let firebaseStoriesLoaded = false;
let firebaseQuotesLoaded = false;
const STORY_PREVIEW_LIMIT = 220;
const REPLY_PREVIEW_LIMIT = 180;
const defaultHopeQuotes = [
  "Setiap langkah kecil hari ini membawa anda lebih dekat kepada impian esok.",
  "Jangan takut bermula dari bawah. Semua orang hebat pernah menjadi seorang pemula.",
  "Kejayaan bukan tentang siapa paling cepat, tetapi siapa yang tidak pernah berhenti.",
  "Kesusahan hari ini sedang membentuk kekuatan diri untuk masa hadapan.",
  "Percaya pada proses. Hasil yang baik memerlukan masa.",
  "Selagi anda masih berusaha, anda belum gagal.",
  "Jangan bandingkan perjalanan anda dengan orang lain. Setiap orang mempunyai waktunya sendiri.",
  "Mimpi hanya menjadi kenyataan apabila disertai dengan tindakan.",
  "Tidak mengapa bergerak perlahan, asalkan tidak berhenti.",
  "Setiap cabaran yang berjaya ditempuhi menjadikan anda lebih kuat daripada semalam.",
  "Orang yang berjaya bukan kerana mereka tidak pernah jatuh, tetapi kerana mereka sentiasa bangkit semula.",
  "Usaha yang konsisten akan mengalahkan bakat yang tidak berusaha.",
  "Jangan biarkan kegagalan semalam menentukan kejayaan hari esok.",
  "Fokus pada apa yang boleh anda lakukan hari ini, bukan pada apa yang anda belum capai.",
  "Hidup bukan perlumbaan. Nikmati perjalanan sambil terus berkembang.",
  "Setiap hari adalah peluang baharu untuk menjadi versi diri yang lebih baik.",
  "Rezeki tidak pernah salah alamat. Teruskan berusaha dan bersabar.",
  "Tiada jalan pintas menuju kejayaan. Disiplin dan usaha adalah kuncinya.",
  "Apabila penat, berehatlah seketika. Jangan sesekali berhenti mengejar impian.",
  "Suatu hari nanti, anda akan melihat ke belakang dan bersyukur kerana tidak pernah menyerah. 🌱✨",
];
let activeHopeQuote = 0;
let hopeQuotes = [];

function openModal(modal) {
  if (!modal) return;
  if (!modal.open) modal.showModal();
  document.body.classList.add("modal-open");
}

function closeModal(modal) {
  if (!modal) return;
  modal.close();
  document.body.classList.remove("modal-open");
}

function setAuthMessage(message, type = "error") {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.dataset.type = type;
}

function setPasswordVisibility(isVisible) {
  if (!passwordInput || !passwordToggle) return;
  passwordInput.type = isVisible ? "text" : "password";
  passwordToggle.setAttribute("aria-label", isVisible ? "Hide password" : "Show password");
  passwordToggle.setAttribute("aria-pressed", String(isVisible));
  passwordToggle.classList.toggle("is-visible", isVisible);
}

function firebaseAuthMessage(error, fallback) {
  const code = error?.code || "";
  if (code === "auth/email-already-in-use") return "User already exists. Please sign in";
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") return "Email or password is incorrect";
  if (code === "auth/weak-password") return "Password should be at least 6 characters.";
  if (code === "auth/invalid-email") return "Please enter a valid email address.";
  if (code === "auth/operation-not-allowed") return "Please enable Email/Password sign-in in Firebase Authentication.";
  if (code === "auth/unauthorized-domain") return "This website domain is not authorized in Firebase.";
  if (code === "auth/network-request-failed") return "Firebase cannot connect. Please check your internet connection.";
  return fallback;
}

function verificationMessage(email) {
  return `We have sent you a verification email to ${email}. Please verify it and log in.`;
}

async function saveFirebaseUserProfile(user, firebase) {
  if (!user || !firebase?.db) return;
  const account = savedAccount();
  await firebase.setDoc(firebase.doc(firebase.db, "users", user.uid), {
    uid: user.uid,
    email: user.email || "",
    emailVerified: Boolean(user.emailVerified),
    displayName: account?.name || (user.email ? user.email.split("@")[0] : "User"),
    avatar: account?.avatar || DEFAULT_AVATAR,
    createdAt: user.metadata?.creationTime || null,
    lastLoginAt: firebase.serverTimestamp(),
  }, { merge: true });
}

async function loadFirebaseUserProfile(user, firebase) {
  if (!user || !firebase?.db || !firebase.getDoc) return;
  const profileSnapshot = await firebase.getDoc(firebase.doc(firebase.db, "users", user.uid));
  if (!profileSnapshot.exists()) return;

  const data = profileSnapshot.data();
  storeAccount({
    uid: user.uid,
    email: user.email || data.email || "",
    name: data.displayName || data.name || (user.email ? user.email.split("@")[0] : "User"),
    avatar: data.avatar || DEFAULT_AVATAR,
    verified: Boolean(user.emailVerified),
  });
}

async function saveCurrentProfileToFirebase() {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !firebaseUser) return;
  const account = savedAccount();
  await firebase.setDoc(firebase.doc(firebase.db, "users", firebaseUser.uid), {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "",
    emailVerified: Boolean(firebaseUser.emailVerified),
    displayName: account?.name || "User",
    avatar: account?.avatar || DEFAULT_AVATAR,
    updatedAt: firebase.serverTimestamp(),
  }, { merge: true });
}

function firebaseStoryFromDoc(docSnapshot) {
  const data = docSnapshot.data();
  const createdAt = data.createdAt?.toMillis ? data.createdAt.toMillis() : Number(data.createdAt || Date.now());
  return {
    id: docSnapshot.id,
    firebaseId: docSnapshot.id,
    userId: data.userId || "",
    name: data.authorName || "Anonymous",
    avatar: data.avatar || DEFAULT_AVATAR,
    mood: data.mood || "Shared",
    text: data.text || "",
    time: "Just now",
    createdAt,
  };
}

function isOwnStoryData(story) {
  return Boolean(firebaseUser?.uid && story?.userId && story.userId === firebaseUser.uid);
}

function isOwnStoryCard(card) {
  return Boolean(card?.dataset.ownerStory === "true" && firebaseUser?.uid && card.dataset.ownerId === firebaseUser.uid);
}

async function saveFirebaseStory(story) {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !firebaseUser) return null;
  const docRef = await firebase.addDoc(firebase.collection(firebase.db, "stories"), {
    userId: firebaseUser.uid,
    authorEmail: firebaseUser.email || "",
    authorName: story.name,
    avatar: story.avatar,
    mood: story.mood,
    text: story.text,
    hidden: false,
    createdAt: firebase.serverTimestamp(),
    updatedAt: firebase.serverTimestamp(),
  });
  return docRef.id;
}

async function updateFirebaseStory(storyId, updates) {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !firebaseUser || !storyId) return false;
  await firebase.updateDoc(firebase.doc(firebase.db, "stories", storyId), {
    ...updates,
    updatedAt: firebase.serverTimestamp(),
  });
  return true;
}

async function deleteFirebaseStory(storyId) {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !firebaseUser || !storyId) return false;
  await firebase.deleteDoc(firebase.doc(firebase.db, "stories", storyId));
  return true;
}

async function loadFirebaseStories() {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !storyGrid || firebaseStoriesLoaded) return;
  try {
    const storyQuery = firebase.query(firebase.collection(firebase.db, "stories"), firebase.orderBy("createdAt", "desc"));
    const snapshot = await firebase.getDocs(storyQuery);
    snapshot.docs
      .map(firebaseStoryFromDoc)
      .reverse()
      .forEach((story) => {
        if ([...storyGrid.querySelectorAll(".story-card")].some((card) => storyIdFromCard(card) === story.id)) return;
        storyGrid.prepend(createStoryCard(story));
      });
    firebaseStoriesLoaded = true;
    setupExpandableText(storyGrid);
    syncSavedButtons();
    ensureReportButtons();
    syncLikeCounts();
    syncReplyCounts();
    updateRelativeTimes();
    filterStoriesByFeeling();
  } catch (error) {
    console.warn("Could not load Firestore stories", error);
    showToast("Could not load online stories.");
  }
}

function firebaseReplyFromDoc(docSnapshot) {
  const data = docSnapshot.data();
  const createdAt = data.createdAt?.toMillis ? data.createdAt.toMillis() : Number(data.createdAt || Date.now());
  return {
    id: docSnapshot.id,
    firebaseId: docSnapshot.id,
    ownerId: data.userId || "",
    userId: data.userId || "",
    name: data.authorName || "You",
    avatar: data.avatar || DEFAULT_AVATAR,
    text: data.text || "",
    createdAt,
    reactions: data.reactions || {
      heart: 0,
      relate: 0,
      thanks: 0,
    },
    reactedBy: data.reactedBy || {
      heart: [],
      relate: [],
      thanks: [],
    },
  };
}

async function saveFirebaseReply(storyId, reply) {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !firebaseUser) return null;
  const docRef = await firebase.addDoc(firebase.collection(firebase.db, "replies"), {
    storyId,
    userId: firebaseUser.uid,
    authorEmail: firebaseUser.email || "",
    authorName: reply.name || "You",
    avatar: reply.avatar || DEFAULT_AVATAR,
    text: reply.text,
    reactions: reply.reactions || {
      heart: 0,
      relate: 0,
      thanks: 0,
    },
    reactedBy: reply.reactedBy || {
      heart: [],
      relate: [],
      thanks: [],
    },
    createdAt: firebase.serverTimestamp(),
    updatedAt: firebase.serverTimestamp(),
  });
  return docRef.id;
}

async function loadFirebaseReplies(storyId) {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !storyId) return;
  try {
    const replyQuery = firebase.query(
      firebase.collection(firebase.db, "replies"),
      firebase.where("storyId", "==", storyId)
    );
    const snapshot = await firebase.getDocs(replyQuery);
    const onlineReplies = snapshot.docs
      .map(firebaseReplyFromDoc)
      .sort((first, second) => Number(first.createdAt || 0) - Number(second.createdAt || 0));
    if (!onlineReplies.length) return;

    const replies = storyReplies();
    const existing = replies[storyId] || [];
    const existingIds = new Set(existing.map((reply, index) => replyStableId(storyId, reply, index)));
    const merged = [...existing];
    onlineReplies.forEach((reply) => {
      if (!existingIds.has(reply.id)) merged.push(reply);
    });
    replies[storyId] = merged;
    storeStoryReplies(replies);
    if (activeReplyStoryId === storyId) renderReplies(storyId);
    syncReplyCounts();
  } catch (error) {
    console.warn("Could not load Firestore replies", error);
    showToast("Could not load online replies.");
  }
}

async function saveFirebaseReport(report) {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !firebaseUser) return null;
  const docRef = await firebase.addDoc(firebase.collection(firebase.db, "reports"), {
    ...report,
    reporterId: firebaseUser.uid,
    reporterEmail: firebaseUser.email || "",
    status: report.status || "pending",
    reportedAt: firebase.serverTimestamp(),
  });
  return docRef.id;
}

async function loadFirebaseHopeQuotes() {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase?.db || !firebaseUser || firebaseQuotesLoaded) return;
  firebaseQuotesLoaded = true;

  try {
    const quoteQuery = firebase.query(firebase.collection(firebase.db, "quotes"), firebase.orderBy("order", "asc"));
    const snapshot = await firebase.getDocs(quoteQuery);
    const onlineQuotes = snapshot.docs
      .map((quoteDoc) => (quoteDoc.data().text || "").trim())
      .filter(Boolean);

    if (!onlineQuotes.length) return;
    try {
      localStorage.setItem(HOPE_QUOTES_KEY, JSON.stringify(onlineQuotes));
    } catch {}
    hopeQuotes = onlineQuotes;
    initHopeQuote();
  } catch (error) {
    console.warn("Could not load Firestore quotes", error);
  }
}

async function initFirebaseAuth() {
  try {
    const firebase = await import("./firebase-config.js?v=button-behavior-1");
    firebaseAuth = firebase;
    firebase.onAuthStateChanged(firebase.auth, async (user) => {
      if (user && !user.emailVerified) {
        pendingVerificationEmail = user.email || pendingVerificationEmail;
        firebaseUser = null;
        try {
          await firebase.signOut(firebase.auth);
        } catch {}
        if (accountModal?.open) {
          setAuthMode("verify");
          setAuthMessage(verificationMessage(pendingVerificationEmail), "success");
        }
        return;
      }
      firebaseUser = user;
      updateAdminLinks();
      if (user) {
        try {
          await loadFirebaseUserProfile(user, firebase);
          await saveFirebaseUserProfile(user, firebase);
          await loadFirebaseStories();
          await loadFirebaseHopeQuotes();
        } catch (error) {
          console.warn("Could not save Firestore user profile", error);
          showToast("Signed in, but database profile was not saved.");
        }
      }
      updateAccountLabel();
      updateProfileAvatar();
      syncLikeCounts();
      if (user) {
        try {
          localStorage.setItem(AUTH_SESSION_KEY, "true");
        } catch {}
        showProfileView();
      } else {
        try {
          localStorage.removeItem(AUTH_SESSION_KEY);
        } catch {}
        updateAdminLinks();
        showProfileView();
      }
    });
    return firebase;
  } catch {
    setAuthMessage("Firebase authentication could not load. Please check your internet connection.");
    return null;
  }
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, 2400);
}

function showHopeQuote(index) {
  if (!hopeQuote) return;
  if (!hopeQuotes.length) hopeQuotes = savedHopeQuotes();
  activeHopeQuote = (index + hopeQuotes.length) % hopeQuotes.length;
  hopeQuote.textContent = hopeQuotes[activeHopeQuote];
  if (hopeCount) hopeCount.textContent = `${activeHopeQuote + 1} / ${hopeQuotes.length}`;
}

function savedHopeQuotes() {
  try {
    const quotes = JSON.parse(localStorage.getItem(HOPE_QUOTES_KEY) || "null");
    return Array.isArray(quotes) && quotes.length ? quotes : defaultHopeQuotes;
  } catch {
    return defaultHopeQuotes;
  }
}

function savedHopeQuoteState() {
  try {
    return JSON.parse(localStorage.getItem(HOPE_QUOTE_KEY) || "null");
  } catch {
    return null;
  }
}

function storeHopeQuoteState(state) {
  try {
    localStorage.setItem(HOPE_QUOTE_KEY, JSON.stringify(state));
  } catch {}
}

function initHopeQuote() {
  if (!hopeQuote) return;
  hopeQuotes = savedHopeQuotes();
  const now = Date.now();
  const savedState = savedHopeQuoteState();
  const savedIndex = Number(savedState?.index || 0);
  const savedUpdatedAt = Number(savedState?.updatedAt || 0);
  const nextIndex = savedUpdatedAt && now - savedUpdatedAt < ONE_DAY_MS
    ? savedIndex
    : savedUpdatedAt
      ? savedIndex + Math.max(1, Math.floor((now - savedUpdatedAt) / ONE_DAY_MS))
      : 0;

  const normalizedIndex = (nextIndex + hopeQuotes.length) % hopeQuotes.length;
  showHopeQuote(normalizedIndex);
  storeHopeQuoteState({ index: normalizedIndex, updatedAt: savedUpdatedAt && now - savedUpdatedAt < ONE_DAY_MS ? savedUpdatedAt : now });
}

function relativeTimeFrom(timestamp) {
  const time = Number(timestamp);
  if (!time) return "";
  const seconds = Math.max(0, Math.floor((Date.now() - time) / 1000));
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
  return new Date(time).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function updateRelativeTimes() {
  document.querySelectorAll("[data-created-at]").forEach((item) => {
    item.textContent = relativeTimeFrom(item.dataset.createdAt);
  });
}

function savedAccount() {
  if (!firebaseUser) return null;
  const email = firebaseUser.email || "";
  const fallbackName = email ? email.split("@")[0] : "User";
  let profile = {};
  try {
    const profiles = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY) || "{}");
    profile = profiles[firebaseUser.uid] || {};
  } catch {}

  return {
    uid: firebaseUser.uid,
    email,
    name: profile.name || fallbackName,
    avatar: profile.avatar || DEFAULT_AVATAR,
    verified: true,
  };
}

function storeAccount(account) {
  if (!firebaseUser || !account) return account;
  try {
    const profiles = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY) || "{}");
    profiles[firebaseUser.uid] = {
      ...profiles[firebaseUser.uid],
      uid: firebaseUser.uid,
      email: account.email || firebaseUser.email || "",
      name: account.name || savedUserName() || "User",
      avatar: account.avatar || savedProfileAvatar(),
      verified: Boolean(account.verified ?? firebaseUser.emailVerified),
    };
    localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(profiles));
    localStorage.setItem(ACCOUNT_KEY, JSON.stringify(profiles[firebaseUser.uid]));
  } catch {}
  return savedAccount();
}

function isSignedIn() {
  return Boolean(firebaseUser);
}

function isAdminUser() {
  return Boolean(firebaseUser?.email && ADMIN_EMAILS.includes(firebaseUser.email.toLowerCase()));
}

function updateAdminLinks() {
  document.querySelectorAll('a[href="admin.html"]').forEach((link) => {
    link.hidden = !isAdminUser();
  });
}

function setAuthMode(nextMode) {
  authMode = nextMode;
  setAuthMessage("");
  setPasswordVisibility(false);
  if (authSubmit) authSubmit.hidden = false;
  if (confirmEmailButton) confirmEmailButton.hidden = true;

  if (nextMode === "signup") {
    authTitle.textContent = "Join MochiMind";
    authSubtitle.textContent = "Create your MochiMind account.";
    if (authDemoNote) authDemoNote.textContent = "Use a valid email address and password to register.";
    authSubmit.textContent = "Create Account";
    toggleSignup.textContent = "Already have an account? Sign in";
    forgotButton.hidden = true;
    passwordRow.hidden = false;
    displayNameRow.hidden = true;
    signupAvatarPicker.hidden = true;
    identifierInput.placeholder = "Email";
    identifierInput.autocomplete = "email";
    passwordInput.autocomplete = "new-password";
    passwordInput.required = true;
    displayNameInput.required = false;
    return;
  }

  if (nextMode === "verify") {
    authTitle.textContent = "Check Your Email";
    authSubtitle.textContent = pendingVerificationEmail
      ? verificationMessage(pendingVerificationEmail)
      : "Please verify your email and log in.";
    if (authDemoNote) authDemoNote.textContent = "Please check your inbox before signing in.";
    authSubmit.hidden = true;
    toggleSignup.textContent = "Create New Account";
    forgotButton.hidden = true;
    passwordRow.hidden = true;
    displayNameRow.hidden = true;
    signupAvatarPicker.hidden = true;
    identifierInput.placeholder = "Email";
    identifierInput.autocomplete = "email";
    passwordInput.required = false;
    displayNameInput.required = false;
    if (confirmEmailButton) {
      confirmEmailButton.hidden = false;
      confirmEmailButton.textContent = "Login";
    }
    return;
  }

  if (nextMode === "forgot") {
    authTitle.textContent = "Forgot password?";
    authSubtitle.textContent = "Password reset is not available in this version yet.";
    if (authDemoNote) authDemoNote.textContent = "Please create a new account or ask the admin for help during testing.";
    authSubmit.textContent = "Back to Sign In";
    toggleSignup.textContent = "Back to sign in";
    forgotButton.hidden = true;
    passwordRow.hidden = true;
    displayNameRow.hidden = true;
    signupAvatarPicker.hidden = true;
    identifierInput.placeholder = "Email";
    identifierInput.autocomplete = "email";
    passwordInput.autocomplete = "current-password";
    passwordInput.required = false;
    displayNameInput.required = false;
    return;
  }

  authTitle.textContent = "Welcome!";
  authSubtitle.textContent = "Sign in to continue your journey.";
  if (authDemoNote) authDemoNote.textContent = "Use your verified email and password.";
  authSubmit.textContent = "Sign In";
  toggleSignup.textContent = "Create New Account";
  forgotButton.hidden = false;
  passwordRow.hidden = false;
  displayNameRow.hidden = true;
  signupAvatarPicker.hidden = true;
  identifierInput.placeholder = "Email";
  identifierInput.autocomplete = "email";
  passwordInput.autocomplete = "current-password";
  passwordInput.required = true;
  displayNameInput.required = false;
}

function savedUserName() {
  const account = savedAccount();
  if (isSignedIn() && account?.name) return account.name;
  return "";
}

function savedUserEmail() {
  const account = savedAccount();
  if (isSignedIn() && account?.email) return account.email;
  return "";
}

function savedProfileAvatar() {
  const account = savedAccount();
  if (isSignedIn() && account?.avatar) return account.avatar;
  return DEFAULT_AVATAR;
}

function updateAccountLabel() {
  const name = savedUserName();
  accountLabel.textContent = name ? `Hi, ${name}`.slice(0, 16) : "Menu";
}

function updateProfileAvatar() {
  const avatar = savedProfileAvatar();
  profileAvatars.forEach((image) => {
    image.src = avatar;
  });
  document.querySelectorAll("[data-avatar-option]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.avatarOption === avatar);
  });
  document.querySelectorAll("[data-signup-avatar-option]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.signupAvatarOption === pendingSignupAvatar);
  });
  document.querySelectorAll("[data-edit-avatar-option]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.editAvatarOption === pendingEditAvatar);
  });
}

function storyIdFromCard(card) {
  if (card?.dataset.storyId) return card.dataset.storyId;
  const name = card.querySelector(".author strong")?.textContent.trim() || "Anonymous";
  const text = card.querySelector("p")?.textContent.trim() || "";
  return `${name}|${text}`.toLowerCase();
}

function storyDataFromCard(card) {
  return {
    id: storyIdFromCard(card),
    name: card.querySelector(".author strong")?.textContent.trim() || "Anonymous",
    avatar: card.querySelector(".author img")?.getAttribute("src") || DEFAULT_AVATAR,
    time: card.querySelector(".author small")?.textContent.trim() || "",
    createdAt: Number(card.querySelector(".author small")?.dataset.createdAt || 0) || undefined,
    text: card.querySelector("p")?.textContent.trim() || "",
    mood: card.querySelector(".tags span")?.textContent.trim() || "Shared",
  };
}

function savedStories() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_STORIES_KEY) || "[]");
  } catch {
    return [];
  }
}

function storeSavedStories(stories) {
  try {
    localStorage.setItem(SAVED_STORIES_KEY, JSON.stringify(stories));
  } catch {}
}

function reportedStories() {
  try {
    return JSON.parse(localStorage.getItem(REPORTED_STORIES_KEY) || "[]");
  } catch {
    return [];
  }
}

function storeReportedStories(reports) {
  try {
    localStorage.setItem(REPORTED_STORIES_KEY, JSON.stringify(reports));
  } catch {}
}

function reportedReplies() {
  try {
    return JSON.parse(localStorage.getItem(REPORTED_REPLIES_KEY) || "[]");
  } catch {
    return [];
  }
}

function storeReportedReplies(reports) {
  try {
    localStorage.setItem(REPORTED_REPLIES_KEY, JSON.stringify(reports));
  } catch {}
}

function pinnedReplies() {
  try {
    return JSON.parse(localStorage.getItem(PINNED_REPLIES_KEY) || "[]");
  } catch {
    return [];
  }
}

function replyStableId(storyId, reply, index) {
  if (reply.id) return reply.id;
  const textKey = (reply.text || "").trim().slice(0, 40).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${storyId || "story"}-reply-${index}-${textKey || "comment"}`;
}

function hiddenStories() {
  try {
    return JSON.parse(localStorage.getItem(HIDDEN_STORIES_KEY) || "[]");
  } catch {
    return [];
  }
}

function myStories() {
  try {
    const stories = JSON.parse(localStorage.getItem(MY_STORIES_KEY) || "[]");
    let changed = false;
    const normalizedStories = stories.map((story) => ({
      ...story,
      createdAt: story.createdAt || (changed = true, Date.now()),
    }));
    if (changed) {
      localStorage.setItem(MY_STORIES_KEY, JSON.stringify(normalizedStories));
    }
    return normalizedStories;
  } catch {
    return [];
  }
}

function storeMyStories(stories) {
  try {
    localStorage.setItem(MY_STORIES_KEY, JSON.stringify(stories));
  } catch {}
}

function profileIdFromName(name) {
  return String(name || "anonymous").trim().toLowerCase();
}

function ownProfileId() {
  const name = savedUserName();
  return name ? profileIdFromName(name) : "";
}

function profileStats() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_STATS_KEY) || "{}");
  } catch {
    return {};
  }
}

function storeProfileStats(stats) {
  try {
    localStorage.setItem(PROFILE_STATS_KEY, JSON.stringify(stats));
  } catch {}
}

function profileStatFor(profileId) {
  const stats = profileStats()[profileId] || {};
  return {
    likes: Number(stats.likes || 0),
    friends: Number(stats.friends || 0),
  };
}

function likedProfiles() {
  try {
    return JSON.parse(localStorage.getItem(LIKED_PROFILES_KEY) || "{}");
  } catch {
    return {};
  }
}

function storeLikedProfiles(profiles) {
  try {
    localStorage.setItem(LIKED_PROFILES_KEY, JSON.stringify(profiles));
  } catch {}
}

function friendProfiles() {
  try {
    return JSON.parse(localStorage.getItem(FRIEND_PROFILES_KEY) || "{}");
  } catch {
    return {};
  }
}

function storeFriendProfiles(profiles) {
  try {
    localStorage.setItem(FRIEND_PROFILES_KEY, JSON.stringify(profiles));
  } catch {}
}

function storyReplies() {
  try {
    return JSON.parse(localStorage.getItem(STORY_REPLIES_KEY) || "{}");
  } catch {
    return {};
  }
}

function storeStoryReplies(replies) {
  try {
    localStorage.setItem(STORY_REPLIES_KEY, JSON.stringify(replies));
  } catch {}
}

function replyCountForStory(storyId) {
  return storyReplies()[storyId]?.length || 0;
}

function storyLikes() {
  try {
    return JSON.parse(localStorage.getItem(STORY_LIKES_KEY) || "{}");
  } catch {
    return {};
  }
}

function storeStoryLikes(likes) {
  try {
    localStorage.setItem(STORY_LIKES_KEY, JSON.stringify(likes));
  } catch {}
}

function likeStateForStory(storyId) {
  const state = storyLikes()[storyId];
  return {
    count: Number(state?.count || 0),
    liked: Boolean(state?.liked),
  };
}

function renderStoryList(list, stories, emptyText) {
  if (!list) return;
  list.innerHTML = "";

  if (!stories.length) {
    const empty = document.createElement("p");
    empty.className = "saved-empty";
    empty.textContent = emptyText;
    list.append(empty);
    return;
  }

  stories.forEach((story) => {
    const item = document.createElement("article");
    item.className = "saved-story-item";
    const title = document.createElement("strong");
    title.textContent = story.name;
    const text = document.createElement("p");
    text.textContent = story.text;
    item.append(title, text);
    list.append(item);
  });
}

function renderSavedStories() {
  renderStoryList(savedList, savedStories(), "No saved stories yet.");
}

function renderMyStories() {
  renderStoryList(myStoriesList, myStories(), "No stories shared yet.");
  updateProfileStats();
}

function renderFriends() {
  if (!friendsList) return;
  const friends = Object.entries(friendProfiles());
  friendsList.innerHTML = "";

  if (!friends.length) {
    const empty = document.createElement("p");
    empty.className = "saved-empty";
    empty.textContent = "No friends yet.";
    friendsList.append(empty);
    return;
  }

  friends.forEach(([id, friend]) => {
    const button = document.createElement("button");
    button.className = "friend-item";
    button.type = "button";
    button.dataset.openFriendProfile = id;
    button.dataset.friendName = friend.name || id;
    button.dataset.friendAvatar = friend.avatar || DEFAULT_AVATAR;
    button.innerHTML = `
      <img src="${friend.avatar || DEFAULT_AVATAR}" alt="">
      <span><strong></strong><small>View profile</small></span>
    `;
    button.querySelector("strong").textContent = friend.name || id;
    friendsList.append(button);
  });
}

function updateProfileStats() {
  const storiesCount = myStories().length;
  const ownStats = profileStatFor(ownProfileId());
  const friendCount = Object.keys(friendProfiles()).length;

  if (profileStoryCount) profileStoryCount.textContent = String(storiesCount);
  if (profileLikeCount) profileLikeCount.textContent = String(ownStats.likes);
  if (profileFriendCount) profileFriendCount.textContent = String(friendCount);
  renderFriends();
}

function storiesForProfile(profileId) {
  const cards = [...document.querySelectorAll(".story-card")];
  return cards
    .filter((card) => profileIdFromName(card.querySelector(".author strong")?.textContent) === profileId)
    .map((card) => storyDataFromCard(card));
}

function authorDataFromCard(card) {
  return {
    id: profileIdFromName(card.querySelector(".author strong")?.textContent),
    name: card.querySelector(".author strong")?.textContent.trim() || "Anonymous",
    avatar: card.querySelector(".author img")?.getAttribute("src") || DEFAULT_AVATAR,
  };
}

function renderOtherProfile(profile) {
  if (!otherProfileModal || !profile?.id) return;
  activeOtherProfileId = profile.id;
  const stats = profileStatFor(profile.id);
  const isOwnProfile = profile.id === ownProfileId();
  const likes = likedProfiles();
  const friends = friendProfiles();
  const stories = storiesForProfile(profile.id);

  if (otherProfileAvatar) otherProfileAvatar.src = profile.avatar || DEFAULT_AVATAR;
  if (otherProfileName) otherProfileName.textContent = profile.name || "Anonymous";
  if (otherStoryCount) otherStoryCount.textContent = String(stories.length);
  if (otherLikeCount) otherLikeCount.textContent = String(stats.likes);
  if (otherFriendCount) otherFriendCount.textContent = String(stats.friends);

  if (likeOtherProfileButton) {
    const alreadyLiked = Boolean(likes[profile.id]);
    likeOtherProfileButton.disabled = isOwnProfile || alreadyLiked;
    likeOtherProfileButton.classList.toggle("is-liked", alreadyLiked);
    likeOtherProfileButton.innerHTML = alreadyLiked
      ? '<span aria-hidden="true">&#128150;</span> Liked'
      : '<span aria-hidden="true">&#128150;</span> Like Profile';
  }

  if (friendOtherProfileButton) {
    const isFriend = Boolean(friends[profile.id]);
    friendOtherProfileButton.disabled = isOwnProfile;
    friendOtherProfileButton.classList.toggle("is-friend", isFriend);
    friendOtherProfileButton.innerHTML = isFriend
      ? '<span aria-hidden="true">&#128101;</span> Unfriend'
      : '<span aria-hidden="true">&#128101;</span> Friend';
  }

  renderStoryList(otherProfileStories, stories, "No stories yet.");
  openModal(otherProfileModal);
}

function syncSavedButtons() {
  const savedIds = new Set(savedStories().map((story) => story.id));
  document.querySelectorAll("[data-save-story]").forEach((button) => {
    const card = button.closest(".story-card");
    const isSaved = card && savedIds.has(storyIdFromCard(card));
    button.classList.toggle("is-saved", Boolean(isSaved));
    button.innerHTML = isSaved
      ? '<span aria-hidden="true">&#10003;</span> Saved'
      : '<span aria-hidden="true">&#128278;</span> Save';
  });
}

function syncReportButtons() {
  const reportedIds = new Set(reportedStories().map((story) => story.id));
  document.querySelectorAll("[data-report-story]").forEach((button) => {
    const card = button.closest(".story-card");
    const isReported = card && reportedIds.has(storyIdFromCard(card));
    button.classList.toggle("is-reported", Boolean(isReported));
    button.disabled = Boolean(isReported);
    button.innerHTML = isReported
      ? '<span aria-hidden="true">&#10003;</span> Reported'
      : '<span aria-hidden="true">&#9873;</span> Report';
  });
}

function ensureReportButtons() {
  document.querySelectorAll(".story-card footer").forEach((footer) => {
    if (footer.querySelector("[data-report-story]")) return;
    const button = document.createElement("button");
    button.className = "report-story-button";
    button.type = "button";
    button.dataset.reportStory = "";
    button.setAttribute("aria-label", "Report story");
    button.innerHTML = '<span aria-hidden="true">&#9873;</span> Report';
    footer.append(button);
  });
  syncReportButtons();
}

function updateLikeButton(button, state, isOwnStory = false) {
  if (!button) return;
  button.classList.toggle("is-liked", Boolean(state.liked));
  button.disabled = Boolean(isOwnStory);
  button.innerHTML = `<span aria-hidden="true">&#9829;</span> <b>${state.count}</b> Like`;
}

function storyMoodTags(card) {
  return [...card.querySelectorAll(".tags span")].map((tag) => tag.textContent.trim().toLowerCase());
}

function moodMatches(tags, mood) {
  const selected = mood.toLowerCase();
  if (selected === "all") return true;

  const moodGroups = {
    happy: ["happy", "motivated", "success", "grateful", "progress", "kindness", "growth"],
    sad: ["sad", "healing", "support", "need support", "vent", "honest"],
    tired: ["tired", "self care", "self-care", "burnout", "rest"],
    lonely: ["lonely", "need support", "community"],
  };

  return tags.some((tag) => tag === selected || (moodGroups[selected] || []).includes(tag));
}

function toggleCustomMoodField() {
  if (!moodSelect || !customMoodRow || !customMoodInput) return;
  const isCustom = moodSelect.value === "Other";
  customMoodRow.hidden = !isCustom;
  customMoodInput.required = isCustom;
  if (!isCustom) customMoodInput.value = "";
}

function selectedStoryMood() {
  if (!moodSelect) return "Shared";
  if (moodSelect.value !== "Other") return moodSelect.value || "Shared";
  return customMoodInput?.value.trim() || "";
}

function updateWriteMood(mood) {
  if (!moodSelect || mood === "All") return;

  const option = [...moodSelect.options].find((item) => item.value === mood || item.textContent === mood);
  if (option) {
    moodSelect.value = option.value;
    toggleCustomMoodField();
  }
}

function filterStoriesByFeeling(mood = activeFeeling) {
  if (!feelingsList || !storyGrid) return;
  activeFeeling = mood;
  let visibleCount = 0;
  const hiddenIds = new Set(hiddenStories());

  storyGrid.querySelectorAll(".story-card").forEach((card) => {
    const storyIsHidden = hiddenIds.has(storyIdFromCard(card));
    const shouldShow = !storyIsHidden && moodMatches(storyMoodTags(card), mood);
    card.hidden = !shouldShow;
    if (shouldShow) visibleCount += 1;
  });

  updateWriteMood(mood);
  if (feelingStatus) {
    feelingStatus.textContent =
      mood === "All"
        ? "Showing all stories."
        : `${visibleCount} ${mood} ${visibleCount === 1 ? "story" : "stories"} shown.`;
  }
}

function syncLikeCounts() {
  document.querySelectorAll("[data-like-story]").forEach((button) => {
    const card = button.closest(".story-card");
    if (!card) return;
    const authorId = profileIdFromName(card.querySelector(".author strong")?.textContent);
    const isOwnStory = Boolean(ownProfileId() && authorId === ownProfileId());
    updateLikeButton(button, likeStateForStory(storyIdFromCard(card)), isOwnStory);
  });
}

function setupExpandableText(root = document) {
  const targets = [
    ...root.querySelectorAll(".story-card > p"),
    ...root.querySelectorAll(".reply-message-row > p"),
  ];

  targets.forEach((textBlock) => {
    if (textBlock.dataset.expandReady === "true") return;
    const limit = textBlock.closest(".reply") ? REPLY_PREVIEW_LIMIT : STORY_PREVIEW_LIMIT;
    if (textBlock.textContent.trim().length <= limit) return;

    textBlock.dataset.expandReady = "true";
    textBlock.classList.add("expandable-text", "is-collapsed");

    const button = document.createElement("button");
    button.className = "see-more-text-button";
    button.type = "button";
    button.dataset.toggleText = "";
    button.textContent = "See more";
    const replyMessageRow = textBlock.closest(".reply-message-row");
    if (replyMessageRow) {
      replyMessageRow.insertAdjacentElement("afterend", button);
    } else {
      textBlock.insertAdjacentElement("afterend", button);
    }
  });
}

function replyReactions(reply) {
  const reactedBy = replyReactedBy(reply);
  return {
    heart: reactedBy.heart.length,
    relate: reactedBy.relate.length,
    thanks: reactedBy.thanks.length,
  };
}

function replyReactedBy(reply) {
  return {
    heart: Array.isArray(reply.reactedBy?.heart) ? reply.reactedBy.heart : [],
    relate: Array.isArray(reply.reactedBy?.relate) ? reply.reactedBy.relate : [],
    thanks: Array.isArray(reply.reactedBy?.thanks) ? reply.reactedBy.thanks : [],
  };
}

function replyReactionUserId() {
  return savedUserEmail() || savedUserName() || "guest";
}

function currentReplyOwnerId() {
  if (firebaseUser?.uid) return firebaseUser.uid;
  return savedUserEmail() || savedUserName() || "guest";
}

function canManageReply(reply) {
  const ownerId = currentReplyOwnerId();
  if (reply.ownerId) return reply.ownerId === ownerId;
  if (!isSignedIn()) return !reply.name || reply.name === "You" || reply.name === "Guest";
  return reply.name === savedUserName() || reply.avatar === savedProfileAvatar();
}

function createReplyElement(reply, index = 0, options = {}) {
  const reactions = replyReactions(reply);
  const reactedBy = replyReactedBy(reply);
  const reactionUserId = replyReactionUserId();
  const showOwnerActions = canManageReply(reply);
  const article = document.createElement("article");
  article.className = `reply reply-own${options.isPinned ? " is-pinned-reply" : ""}`;
  article.dataset.replyIndex = String(index);
  article.innerHTML = `
    <img class="reply-avatar" src="${reply.avatar || DEFAULT_AVATAR}" alt="">
    <div class="reply-content">
      <strong></strong>
      <small class="reply-pinned-label" ${options.isPinned ? "" : "hidden"}>Pinned support</small>
      <div class="reply-message-row">
        <p></p>
        <div class="reply-owner-actions">
          <button class="reply-menu-toggle" type="button" data-toggle-reply-menu aria-label="Reply options" aria-expanded="false">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
          <div class="reply-action-menu" data-reply-action-menu hidden>
            <button type="button" data-edit-reply ${showOwnerActions ? "" : "hidden"}>Edit</button>
            <button type="button" data-delete-reply ${showOwnerActions ? "" : "hidden"}>Delete</button>
            <button type="button" data-report-reply>Report Reply</button>
          </div>
        </div>
      </div>
      <div class="reply-reactions" aria-label="Reply reactions">
        <button type="button" data-reply-reaction="heart" aria-label="Heart reaction"><span aria-hidden="true">💗</span><b>${reactions.heart}</b></button>
        <button type="button" data-reply-reaction="relate" aria-label="I relate reaction"><span aria-hidden="true">🤝</span><b>${reactions.relate}</b></button>
        <button type="button" data-reply-reaction="thanks" aria-label="Thank you reaction"><span aria-hidden="true">🙏</span><b>${reactions.thanks}</b></button>
      </div>
    </div>
  `;
  article.querySelector("strong").textContent = reply.name || "You";
  article.querySelector("p").textContent = reply.text || "";
  article.querySelectorAll("[data-reply-reaction]").forEach((button) => {
    const type = button.dataset.replyReaction;
    button.classList.toggle("is-reacted", reactedBy[type]?.includes(reactionUserId));
  });
  setupExpandableText(article);
  return article;
}

function renderReplies(storyId) {
  if (!replyList) return;
  editingReplyIndex = -1;
  const replyInput = replyForm?.querySelector("[name='reply']");
  const replySubmit = replyForm?.querySelector("button[type='submit']");
  if (replyInput) replyInput.value = "";
  if (replySubmit) replySubmit.setAttribute("aria-label", "Send");
  replyList.innerHTML = "";
  const pinnedIds = new Set(pinnedReplies().filter((pin) => pin.storyId === storyId).map((pin) => pin.replyId));
  const repliesForStory = storyReplies()[storyId] || [];
  repliesForStory
    .map((reply, index) => ({
      reply,
      index,
      isPinned: pinnedIds.has(replyStableId(storyId, reply, index)),
    }))
    .sort((first, second) => Number(second.isPinned) - Number(first.isPinned))
    .forEach((item) => {
      replyList.append(createReplyElement(item.reply, item.index, { isPinned: item.isPinned }));
    });
}

function updateReplyButton(button, count) {
  if (!button) return;
  button.innerHTML = `<span aria-hidden="true">&#9635;</span> ${count}`;
}

function resetWriteFormState() {
  editingStoryId = "";
  writeForm?.reset();
  toggleCustomMoodField();
  writeForm?.querySelector("#write-title")?.replaceChildren(document.createTextNode("Write Your Story"));
  writeForm?.querySelector("button[type='submit']")?.replaceChildren(document.createTextNode("Share Story"));
}

function resetReplyFormState() {
  editingReplyIndex = -1;
  replyForm?.reset();
  replyForm?.querySelector("button[type='submit']")?.setAttribute("aria-label", "Send");
}

function syncReplyCounts() {
  document.querySelectorAll("[data-open-replies]").forEach((button) => {
    const card = button.closest(".story-card");
    if (!card) return;
    updateReplyButton(button, replyCountForStory(storyIdFromCard(card)));
  });
}

function showProfileView() {
  if (!isSignedIn()) {
    profileView?.classList.remove("is-active");
    signInView?.classList.add("is-active");
    authPanel?.classList.remove("is-profile");
    setAuthMode("signin");
    return;
  }

  const name = savedUserName();
  const email = savedUserEmail();

  profileName.textContent = name;
  profileEmail.textContent = email;
  updateProfileAvatar();
  if (avatarPicker) avatarPicker.hidden = true;
  avatarPickerToggle?.setAttribute("aria-expanded", "false");
  if (editProfilePanel) editProfilePanel.hidden = true;
  signInView?.classList.remove("is-active");
  profileView?.classList.add("is-active");
  authPanel?.classList.add("is-profile");
  renderSavedStories();
  renderMyStories();
  renderFriends();
  syncLikeCounts();
}

document.querySelectorAll("[data-open-account]").forEach((button) => {
  button.addEventListener("click", () => {
    showProfileView();
    openModal(accountModal);
  });
});

document.querySelectorAll("[data-open-write]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!isSignedIn()) {
      setAuthMode("signin");
      setAuthMessage("Please log in with a verified email before sharing a story.");
      openModal(accountModal);
      return;
    }
    editingStoryId = "";
    writeForm?.querySelector("#write-title")?.replaceChildren(document.createTextNode("Write Your Story"));
    writeForm?.querySelector("button[type='submit']")?.replaceChildren(document.createTextNode("Share Story"));
    updateWriteMood(activeFeeling);
    toggleCustomMoodField();
    openModal(writeModal);
  });
});

moodSelect?.addEventListener("change", toggleCustomMoodField);

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => closeModal(button.closest("dialog")));
});

document.querySelectorAll("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeModal(dialog);
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    if (dialog === writeModal) resetWriteFormState();
    if (dialog === repliesModal) resetReplyFormState();
  });
});

feelingsList?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  document.querySelectorAll("[data-feelings] button").forEach((item) => item.classList.remove("is-selected"));
  button.classList.add("is-selected");
  filterStoriesByFeeling(button.dataset.feeling || "All");
});

document.addEventListener("click", async (event) => {
  const replyMenuButton = event.target.closest("[data-toggle-reply-menu]");
  if (replyMenuButton) {
    const ownerActions = replyMenuButton.closest(".reply-owner-actions");
    const menu = ownerActions?.querySelector("[data-reply-action-menu]");
    if (!menu) return;
    const willOpen = menu.hidden;
    document.querySelectorAll("[data-reply-action-menu]").forEach((otherMenu) => {
      if (otherMenu !== menu) {
        otherMenu.hidden = true;
        otherMenu.closest(".reply-owner-actions")?.querySelector("[data-toggle-reply-menu]")?.setAttribute("aria-expanded", "false");
      }
    });
    menu.hidden = !willOpen;
    replyMenuButton.setAttribute("aria-expanded", String(willOpen));
    return;
  }

  if (!event.target.closest(".reply-owner-actions")) {
    document.querySelectorAll("[data-reply-action-menu]").forEach((menu) => {
      menu.hidden = true;
      menu.closest(".reply-owner-actions")?.querySelector("[data-toggle-reply-menu]")?.setAttribute("aria-expanded", "false");
    });
  }

  const storyMenuButton = event.target.closest("[data-story-menu]");
  if (storyMenuButton) {
    const menu = storyMenuButton.closest(".story-owner-menu")?.querySelector(".story-menu-popover");
    const isOpen = menu && !menu.hidden;
    document.querySelectorAll(".story-menu-popover").forEach((item) => {
      item.hidden = true;
    });
    document.querySelectorAll("[data-story-menu]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
    if (menu) {
      menu.hidden = Boolean(isOpen);
      storyMenuButton.setAttribute("aria-expanded", String(!isOpen));
    }
    return;
  }

  if (!event.target.closest(".story-owner-menu")) {
    document.querySelectorAll(".story-menu-popover").forEach((item) => {
      item.hidden = true;
    });
    document.querySelectorAll("[data-story-menu]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
    });
  }

  const authorTarget = event.target.closest(".story-card .author img, .story-card .author strong");
  if (authorTarget) {
    const card = authorTarget.closest(".story-card");
    const profile = authorDataFromCard(card);
    if (profile.id === ownProfileId()) {
      showProfileView();
      openModal(accountModal);
      return;
    }
    renderOtherProfile(profile);
    return;
  }

  const repliesButton = event.target.closest("[data-open-replies]");
  if (repliesButton) {
    const card = repliesButton.closest(".story-card");
    activeReplyStoryId = card ? storyIdFromCard(card) : "";
    activeReplyButton = repliesButton;
    renderReplies(activeReplyStoryId);
    loadFirebaseReplies(activeReplyStoryId);
    openModal(repliesModal);
    return;
  }

  const likeButton = event.target.closest("[data-like-story]");
  if (likeButton) {
    if (!isSignedIn()) {
      showProfileView();
      openModal(accountModal);
      return;
    }
    const card = likeButton.closest(".story-card");
    if (!card) return;
    const authorId = profileIdFromName(card.querySelector(".author strong")?.textContent);
    if (authorId === ownProfileId()) return;
    const storyId = storyIdFromCard(card);
    const likes = storyLikes();
    const current = likeStateForStory(storyId);
    if (current.liked) return;
    likes[storyId] = { count: current.count + 1, liked: true };
    storeStoryLikes(likes);
    updateLikeButton(likeButton, likes[storyId]);
    showToast("Story liked.");
    return;
  }

  const profileLike = event.target.closest("[data-like-other-profile]");
  if (profileLike) {
    if (!isSignedIn()) {
      showProfileView();
      openModal(accountModal);
      return;
    }
    if (!activeOtherProfileId || activeOtherProfileId === ownProfileId()) return;
    const liked = likedProfiles();
    if (liked[activeOtherProfileId]) return;
    const stats = profileStats();
    const current = profileStatFor(activeOtherProfileId);
    stats[activeOtherProfileId] = { ...current, likes: current.likes + 1 };
    liked[activeOtherProfileId] = true;
    storeProfileStats(stats);
    storeLikedProfiles(liked);
    renderOtherProfile({
      id: activeOtherProfileId,
      name: otherProfileName?.textContent || "Anonymous",
      avatar: otherProfileAvatar?.getAttribute("src") || DEFAULT_AVATAR,
    });
    updateProfileStats();
    showToast("Profile liked.");
    return;
  }

  const friendButton = event.target.closest("[data-friend-other-profile]");
  if (friendButton) {
    if (!isSignedIn()) {
      showProfileView();
      openModal(accountModal);
      return;
    }
    if (!activeOtherProfileId || activeOtherProfileId === ownProfileId()) return;
    const friends = friendProfiles();
    const stats = profileStats();
    const current = profileStatFor(activeOtherProfileId);
    if (friends[activeOtherProfileId]) {
      delete friends[activeOtherProfileId];
      stats[activeOtherProfileId] = { ...current, friends: Math.max(0, current.friends - 1) };
    } else {
      friends[activeOtherProfileId] = {
        name: otherProfileName?.textContent || "Anonymous",
        avatar: otherProfileAvatar?.getAttribute("src") || DEFAULT_AVATAR,
      };
      stats[activeOtherProfileId] = { ...current, friends: current.friends + 1 };
    }
    storeFriendProfiles(friends);
    storeProfileStats(stats);
    renderOtherProfile({
      id: activeOtherProfileId,
      name: otherProfileName?.textContent || "Anonymous",
      avatar: otherProfileAvatar?.getAttribute("src") || DEFAULT_AVATAR,
    });
    updateProfileStats();
    showToast(friends[activeOtherProfileId] ? "Friend added." : "Friend removed.");
    return;
  }

  const saveButton = event.target.closest("[data-save-story]");
  if (saveButton) {
    if (!isSignedIn()) {
      setAuthMode("signin");
      setAuthMessage("Please log in with a verified email before saving a story.");
      openModal(accountModal);
      return;
    }
    const card = saveButton.closest(".story-card");
    if (!card) return;
    const story = storyDataFromCard(card);
    const stories = savedStories();
    const exists = stories.some((item) => item.id === story.id);
    const nextStories = exists ? stories.filter((item) => item.id !== story.id) : [story, ...stories];
    storeSavedStories(nextStories);
    syncSavedButtons();
    renderSavedStories();
    showToast(exists ? "Story removed from saved." : "Story saved.");
    return;
  }

  const reportButton = event.target.closest("[data-report-story]");
  if (reportButton) {
    if (!isSignedIn()) {
      setAuthMode("signin");
      setAuthMessage("Please log in with a verified email before reporting a story.");
      openModal(accountModal);
      return;
    }
    const card = reportButton.closest(".story-card");
    if (!card) return;
    const story = storyDataFromCard(card);
    const reports = reportedStories();
    if (reports.some((item) => item.id === story.id)) {
      showToast("Story already reported.");
      return;
    }

    reportButton.disabled = true;
    const report = {
      id: story.id,
      type: "story",
      storyId: story.id,
      targetType: "story",
      targetId: story.id,
      ...story,
      reason: "Needs admin review",
      reportedAt: Date.now(),
      reporter: savedUserName() || "Guest",
    };
    try {
      const firebaseReportId = await saveFirebaseReport(report);
      if (firebaseReportId) report.firebaseId = firebaseReportId;
    } catch (error) {
      console.warn("Could not save Firestore report", error);
      const code = error?.code ? ` (${error.code})` : "";
      showToast(`Report saved locally, but not online${code}.`);
    }
    reports.unshift(report);
    storeReportedStories(reports);
    syncReportButtons();
    showToast("Story reported for admin review.");
    return;
  }

  const replyReactionButton = event.target.closest("[data-reply-reaction]");
  if (replyReactionButton) {
    if (!activeReplyStoryId) return;
    const reply = replyReactionButton.closest(".reply");
    const replyIndex = Number(reply?.dataset.replyIndex || -1);
    if (replyIndex < 0) return;

    const reactionType = replyReactionButton.dataset.replyReaction;
    const replies = storyReplies();
    const storyReplyList = replies[activeReplyStoryId] || [];
    const currentReply = storyReplyList[replyIndex];
    if (!currentReply) return;

    const reactionUserId = replyReactionUserId();
    currentReply.reactions = replyReactions(currentReply);
    currentReply.reactedBy = replyReactedBy(currentReply);
    const hasReacted = currentReply.reactedBy[reactionType].includes(reactionUserId);

    Object.keys(currentReply.reactedBy).forEach((type) => {
      if (type !== reactionType && currentReply.reactedBy[type].includes(reactionUserId)) {
        currentReply.reactedBy[type] = currentReply.reactedBy[type].filter((id) => id !== reactionUserId);
        currentReply.reactions[type] = Math.max(0, Number(currentReply.reactions[type] || 0) - 1);
      }
    });

    if (hasReacted) {
      currentReply.reactedBy[reactionType] = currentReply.reactedBy[reactionType].filter((id) => id !== reactionUserId);
      currentReply.reactions[reactionType] = Math.max(0, Number(currentReply.reactions[reactionType] || 0) - 1);
    } else {
      currentReply.reactedBy[reactionType] = [...currentReply.reactedBy[reactionType], reactionUserId];
      currentReply.reactions[reactionType] = Number(currentReply.reactions[reactionType] || 0) + 1;
    }
    storyReplyList[replyIndex] = currentReply;
    replies[activeReplyStoryId] = storyReplyList;
    storeStoryReplies(replies);

    const count = replyReactionButton.querySelector("b");
    if (count) count.textContent = String(currentReply.reactions[reactionType]);
    reply.querySelectorAll("[data-reply-reaction]").forEach((button) => {
      const type = button.dataset.replyReaction;
      const reactionCount = button.querySelector("b");
      if (reactionCount) reactionCount.textContent = String(currentReply.reactions[type]);
      button.classList.toggle("is-reacted", currentReply.reactedBy[type].includes(reactionUserId));
    });
    showToast(hasReacted ? "Reaction removed." : "Reaction added.");
    return;
  }

  const reportReplyButton = event.target.closest("[data-report-reply]");
  if (reportReplyButton) {
    if (!isSignedIn()) {
      closeModal(repliesModal);
      setAuthMode("signin");
      setAuthMessage("Please log in with a verified email before reporting a reply.");
      openModal(accountModal);
      return;
    }
    if (!activeReplyStoryId) return;
    const reply = reportReplyButton.closest(".reply");
    const replyIndex = Number(reply?.dataset.replyIndex || -1);
    if (replyIndex < 0) return;
    const replies = storyReplies();
    const storyReplyList = replies[activeReplyStoryId] || [];
    const currentReply = storyReplyList[replyIndex];
    if (!currentReply) return;
    const replyId = replyStableId(activeReplyStoryId, currentReply, replyIndex);
    currentReply.id = replyId;
    storyReplyList[replyIndex] = currentReply;
    replies[activeReplyStoryId] = storyReplyList;
    storeStoryReplies(replies);

    const reports = reportedReplies();
    if (reports.some((report) => report.replyId === replyId && report.storyId === activeReplyStoryId)) {
      showToast("Reply already reported.");
      return;
    }

    reportReplyButton.disabled = true;
    const storyCard = activeReplyButton?.closest(".story-card");
    const story = storyCard ? storyDataFromCard(storyCard) : { id: activeReplyStoryId, name: "Story", mood: "Shared" };
    const report = {
      id: `${activeReplyStoryId}-${replyId}`,
      type: "reply",
      targetType: "reply",
      targetId: replyId,
      storyId: activeReplyStoryId,
      storyTitle: story.name || "Story",
      storyMood: story.mood || "Shared",
      replyId,
      replyIndex,
      replyText: currentReply.text || "",
      replyAuthor: currentReply.name || "Guest",
      reason: "Harmful or unkind reply",
      reportedAt: Date.now(),
      reporter: savedUserName() || "Guest",
    };
    try {
      const firebaseReportId = await saveFirebaseReport(report);
      if (firebaseReportId) report.firebaseId = firebaseReportId;
    } catch (error) {
      console.warn("Could not save Firestore reply report", error);
      const code = error?.code ? ` (${error.code})` : "";
      showToast(`Report saved locally, but not online${code}.`);
    }
    reports.unshift(report);
    storeReportedReplies(reports);
    document.querySelectorAll("[data-reply-action-menu]").forEach((menu) => {
      menu.hidden = true;
      menu.closest(".reply-owner-actions")?.querySelector("[data-toggle-reply-menu]")?.setAttribute("aria-expanded", "false");
    });
    showToast("Reply reported for admin review.");
    return;
  }

  const editReplyButton = event.target.closest("[data-edit-reply]");
  if (editReplyButton) {
    if (!activeReplyStoryId) return;
    const reply = editReplyButton.closest(".reply");
    const replyIndex = Number(reply?.dataset.replyIndex || -1);
    const currentReply = (storyReplies()[activeReplyStoryId] || [])[replyIndex];
    const input = replyForm?.querySelector("[name='reply']");
    const submit = replyForm?.querySelector("button[type='submit']");
    if (!currentReply || !input) return;
    if (!canManageReply(currentReply)) {
      showToast("You can edit only your own reply.");
      return;
    }
    editingReplyIndex = replyIndex;
    currentReply.id = replyStableId(activeReplyStoryId, currentReply, replyIndex);
    const replies = storyReplies();
    const storyReplyList = replies[activeReplyStoryId] || [];
    storyReplyList[replyIndex] = currentReply;
    replies[activeReplyStoryId] = storyReplyList;
    storeStoryReplies(replies);
    input.value = currentReply.text || "";
    input.focus();
    if (submit) submit.setAttribute("aria-label", "Save reply");
    showToast("Editing reply.");
    return;
  }

  const deleteReplyButton = event.target.closest("[data-delete-reply]");
  if (deleteReplyButton) {
    if (!activeReplyStoryId) return;
    const reply = deleteReplyButton.closest(".reply");
    const replyIndex = Number(reply?.dataset.replyIndex || -1);
    if (replyIndex < 0) return;
    const replies = storyReplies();
    const storyReplyList = replies[activeReplyStoryId] || [];
    const currentReply = storyReplyList[replyIndex];
    if (!currentReply || !canManageReply(currentReply)) {
      showToast("You can delete only your own reply.");
      return;
    }
    if (!window.confirm("Delete this reply?")) return;
    const replyId = replyStableId(activeReplyStoryId, currentReply, replyIndex);
    const nextReplies = storyReplyList.filter((_, index) => index !== replyIndex);
    replies[activeReplyStoryId] = nextReplies;
    storeStoryReplies(replies);
    storeReportedReplies(reportedReplies().filter((report) => report.replyId !== replyId || report.storyId !== activeReplyStoryId));
    try {
      localStorage.setItem(PINNED_REPLIES_KEY, JSON.stringify(pinnedReplies().filter((pin) => pin.replyId !== replyId || pin.storyId !== activeReplyStoryId)));
    } catch {}
    renderReplies(activeReplyStoryId);
    updateReplyButton(activeReplyButton, nextReplies.length);
    syncReplyCounts();
    showToast("Reply deleted.");
    return;
  }

  const textToggle = event.target.closest("[data-toggle-text]");
  if (textToggle) {
    const previous = textToggle.previousElementSibling;
    const textBlock = previous?.classList.contains("reply-message-row")
      ? previous.querySelector(".expandable-text")
      : previous;
    if (!textBlock?.classList.contains("expandable-text")) return;
    const isCollapsed = textBlock.classList.toggle("is-collapsed");
    textToggle.textContent = isCollapsed ? "See more" : "See less";
    return;
  }

  const editStoryButton = event.target.closest("[data-edit-story]");
  if (editStoryButton) {
    const card = editStoryButton.closest(".story-card");
    if (!isOwnStoryCard(card)) {
      showToast("You can only edit your own story.");
      return;
    }
    editingStoryId = storyIdFromCard(card);
    const mood = card.querySelector(".tags span")?.textContent.trim() || "Happy";
    const text = card.querySelector("p")?.textContent.trim() || "";
    const textarea = writeForm?.querySelector("textarea[name='story']");
    if (moodSelect) {
      const option = [...moodSelect.options].find((item) => item.value === mood || item.textContent === mood);
      moodSelect.value = option ? option.value : "Other";
      if (!option && customMoodInput) customMoodInput.value = mood;
      toggleCustomMoodField();
    }
    if (textarea) textarea.value = text;
    writeForm?.querySelector("#write-title")?.replaceChildren(document.createTextNode("Edit Your Story"));
    writeForm?.querySelector("button[type='submit']")?.replaceChildren(document.createTextNode("Save Story"));
    openModal(writeModal);
    return;
  }

  const deleteStoryButton = event.target.closest("[data-delete-story]");
  if (deleteStoryButton) {
    const card = deleteStoryButton.closest(".story-card");
    if (!isOwnStoryCard(card)) {
      showToast("You can only delete your own story.");
      return;
    }
    const storyId = storyIdFromCard(card);
    if (!window.confirm("Delete this story?")) return;
    if (card.dataset.firebaseStoryId) {
      try {
        await deleteFirebaseStory(card.dataset.firebaseStoryId);
      } catch (error) {
        console.warn("Could not delete Firestore story", error);
        showToast("Could not delete online story.");
        return;
      }
    }
    storeMyStories(myStories().filter((story) => story.id !== storyId));
    storeSavedStories(savedStories().filter((story) => story.id !== storyId));
    const replies = storyReplies();
    delete replies[storyId];
    storeStoryReplies(replies);
    const likes = storyLikes();
    delete likes[storyId];
    storeStoryLikes(likes);
    card.remove();
    renderMyStories();
    syncSavedButtons();
    syncLikeCounts();
    syncReplyCounts();
    filterStoriesByFeeling();
    showToast("Story deleted.");
    return;
  }

  const avatarButton = event.target.closest("[data-avatar-option]");
  if (avatarButton) {
    const account = savedAccount();
    if (account) {
      account.avatar = avatarButton.dataset.avatarOption;
      storeAccount(account);
    }
    try {
      localStorage.setItem(PROFILE_AVATAR_KEY, avatarButton.dataset.avatarOption);
    } catch {}
    updateProfileAvatar();
    try {
      await saveCurrentProfileToFirebase();
    } catch (error) {
      console.warn("Could not save profile avatar", error);
    }
    if (avatarPicker) avatarPicker.hidden = true;
    avatarPickerToggle?.setAttribute("aria-expanded", "false");
  }

  const signupAvatarButton = event.target.closest("[data-signup-avatar-option]");
  if (signupAvatarButton) {
    pendingSignupAvatar = signupAvatarButton.dataset.signupAvatarOption;
    updateProfileAvatar();
  }

  const editAvatarButton = event.target.closest("[data-edit-avatar-option]");
  if (editAvatarButton) {
    pendingEditAvatar = editAvatarButton.dataset.editAvatarOption;
    updateProfileAvatar();
  }

  const friendItem = event.target.closest("[data-open-friend-profile]");
  if (friendItem) {
    closeModal(accountModal);
    renderOtherProfile({
      id: friendItem.dataset.openFriendProfile,
      name: friendItem.dataset.friendName,
      avatar: friendItem.dataset.friendAvatar,
    });
  }
});

avatarPickerToggle?.addEventListener("click", () => {
  if (!avatarPicker) return;
  avatarPicker.hidden = !avatarPicker.hidden;
  avatarPickerToggle.setAttribute("aria-expanded", String(!avatarPicker.hidden));
  if (!avatarPicker.hidden) {
    avatarPicker.scrollIntoView({ block: "nearest" });
  }
});

showSavedButton?.addEventListener("click", () => {
  if (!savedPanel) return;
  savedPanel.hidden = !savedPanel.hidden;
  if (!savedPanel.hidden) {
    renderSavedStories();
    savedPanel.scrollIntoView({ block: "nearest" });
  }
});

showMyStoriesButton?.addEventListener("click", () => {
  if (!myStoriesPanel) return;
  myStoriesPanel.hidden = !myStoriesPanel.hidden;
  if (!myStoriesPanel.hidden) {
    renderMyStories();
    myStoriesPanel.scrollIntoView({ block: "nearest" });
  }
});

showFriendsButton?.addEventListener("click", () => {
  if (!friendsPanel) return;
  friendsPanel.hidden = !friendsPanel.hidden;
  if (!friendsPanel.hidden) {
    renderFriends();
    friendsPanel.scrollIntoView({ block: "nearest" });
  }
});

editProfileButton?.addEventListener("click", () => {
  if (!editProfilePanel) return;
  const account = savedAccount();
  pendingEditAvatar = account?.avatar || savedProfileAvatar();
  if (editProfileNameInput) editProfileNameInput.value = account?.name || savedUserName();
  editProfilePanel.hidden = !editProfilePanel.hidden;
  updateProfileAvatar();
  if (!editProfilePanel.hidden) {
    editProfilePanel.scrollIntoView({ block: "nearest" });
  }
});

toggleSignup?.addEventListener("click", () => {
  setAuthMode(authMode === "signin" ? "signup" : "signin");
});

forgotButton?.addEventListener("click", () => setAuthMode("forgot"));

passwordToggle?.addEventListener("click", () => {
  setPasswordVisibility(passwordInput?.type === "password");
});

confirmEmailButton?.addEventListener("click", () => {
  pendingVerificationEmail = "";
  setAuthMode("signin");
  setAuthMessage("");
});

authForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(authForm);
  const identifier = String(formData.get("identifier") || "").trim();
  const password = String(formData.get("password") || "");
  if (!identifier) return;

  if (authMode === "forgot") {
    setAuthMode("signin");
    setAuthMessage("Please sign in or create a new account.", "success");
    return;
  }

  if (!password.trim()) {
    setAuthMessage("Please enter your password.");
    return;
  }

  const firebase = firebaseAuth || await firebaseAuthReady;
  if (!firebase) {
    setAuthMessage("Firebase authentication could not load. Please check your internet connection.");
    return;
  }

  if (!identifier.includes("@")) {
    setAuthMessage("Please use your email address.");
    return;
  }

  if (authSubmit) authSubmit.disabled = true;

  if (authMode === "signup") {
    try {
      const userCredential = await firebase.createUserWithEmailAndPassword(firebase.auth, identifier.toLowerCase(), password);
      await firebase.sendEmailVerification(userCredential.user);
      pendingVerificationEmail = userCredential.user.email || identifier.toLowerCase();
      await firebase.signOut(firebase.auth);
      authForm.reset();
      setAuthMode("verify");
      setAuthMessage(verificationMessage(pendingVerificationEmail), "success");
      showToast("Verification email sent.");
    } catch (error) {
      setAuthMessage(firebaseAuthMessage(error, "Sign up could not be completed."));
    } finally {
      if (authSubmit) authSubmit.disabled = false;
    }
    return;
  }

  try {
    const userCredential = await firebase.signInWithEmailAndPassword(firebase.auth, identifier.toLowerCase(), password);
    if (!userCredential.user.emailVerified) {
      pendingVerificationEmail = userCredential.user.email || identifier.toLowerCase();
      await firebase.signOut(firebase.auth);
      authForm.reset();
      setAuthMode("verify");
      setAuthMessage(verificationMessage(pendingVerificationEmail), "success");
      showToast("Please verify your email first.");
      return;
    }
    await loadFirebaseUserProfile(userCredential.user, firebase);
    await saveFirebaseUserProfile(userCredential.user, firebase);
    authForm.reset();
    updateAccountLabel();
    setAuthMode("signin");
    showProfileView();
    showToast("Signed in.");
  } catch (error) {
    setAuthMessage(firebaseAuthMessage(error, "Email or password is incorrect"));
  } finally {
    if (authSubmit) authSubmit.disabled = false;
  }
});

signOutButton?.addEventListener("click", async () => {
  const firebase = firebaseAuth || await firebaseAuthReady;
  if (firebase) {
    try {
      await firebase.signOut(firebase.auth);
    } catch {
      showToast("Could not sign out.");
      return;
    }
  }
  try {
    localStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem("mochimind:userName");
    localStorage.removeItem("mochimind:userEmail");
  } catch {}
  updateAccountLabel();
  updateProfileAvatar();
  showProfileView();
  syncLikeCounts();
  showToast("Signed out.");
});

editProfilePanel?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const nextName = editProfileNameInput?.value.trim() || savedUserName() || "User";
  const nextAvatar = pendingEditAvatar || savedProfileAvatar();
  storeAccount({
    ...savedAccount(),
    name: nextName,
    avatar: nextAvatar,
  });
  try {
    localStorage.setItem(PROFILE_AVATAR_KEY, nextAvatar);
  } catch {}
  updateAccountLabel();
  updateProfileAvatar();
  showProfileView();
  syncLikeCounts();
  editProfilePanel.hidden = true;
  try {
    await saveCurrentProfileToFirebase();
    showToast("Profile updated.");
  } catch (error) {
    console.warn("Could not save profile to Firestore", error);
    showToast("Profile updated on this device.");
  }
});

function createStoryCard({ id, firebaseId, userId, name, avatar, mood, text, time = "Just now", createdAt }) {
  const article = document.createElement("article");
  article.className = "story-card";
  const isOwner = isOwnStoryData({ userId });
  article.dataset.ownerStory = String(isOwner);
  if (userId) article.dataset.ownerId = userId;
  if (firebaseId || id) article.dataset.firebaseStoryId = firebaseId || id;
  article.dataset.storyId = id || `${name}|${text}`.toLowerCase();

  const header = document.createElement("header");
  header.className = "author";
  header.innerHTML = `
    <img src="${avatar}" alt="">
    <span><strong></strong><small></small></span>
  `;
  if (isOwner) {
    const menu = document.createElement("div");
    menu.className = "story-owner-menu";
    menu.innerHTML = `
      <button class="story-menu-toggle" type="button" data-story-menu aria-expanded="false" aria-label="Story options"><span aria-hidden="true">&#9776;</span></button>
      <div class="story-menu-popover" hidden>
        <button type="button" data-edit-story><span aria-hidden="true">&#9998;</span> Edit</button>
        <button type="button" data-delete-story><span aria-hidden="true">&#10005;</span> Delete</button>
      </div>
    `;
    header.append(menu);
  }
  header.querySelector("strong").textContent = name;
  const timeLabel = header.querySelector("small");
  if (createdAt) {
    timeLabel.dataset.createdAt = String(createdAt);
    timeLabel.textContent = relativeTimeFrom(createdAt);
  } else {
    timeLabel.textContent = time;
  }

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  const tags = document.createElement("div");
  tags.className = "tags";
  const moodTag = document.createElement("span");
  moodTag.textContent = mood;
  tags.append(moodTag);

  const footer = document.createElement("footer");
  footer.innerHTML = `
    <button type="button" data-like-story><span aria-hidden="true">&#9829;</span> <b>0</b> Like</button>
    <button type="button" data-open-replies><span aria-hidden="true">&#9635;</span> 0</button>
    <button class="save-story-button" type="button" data-save-story aria-label="Save story"><span aria-hidden="true">&#128278;</span> Save</button>
    <button class="report-story-button" type="button" data-report-story aria-label="Report story"><span aria-hidden="true">&#9873;</span> Report</button>
  `;

  article.append(header, paragraph, tags, footer);
  setupExpandableText(article);
  return article;
}

function renderPublicMyStories() {
  if (!storyGrid) return;
  const stories = myStories();
  stories.slice().reverse().forEach((story) => {
    if ([...storyGrid.querySelectorAll(".story-card")].some((card) => storyIdFromCard(card) === story.id)) return;
    storyGrid.prepend(createStoryCard({ ...story, userId: story.userId || firebaseUser?.uid || "" }));
  });
  setupExpandableText(storyGrid);
  syncSavedButtons();
  ensureReportButtons();
  syncLikeCounts();
  updateRelativeTimes();
  filterStoriesByFeeling();
}

writeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (storyFormSubmitting) return;
  const storyText = writeForm.querySelector("textarea[name='story']")?.value.trim();
  const submitButton = writeForm.querySelector("button[type='submit']");
  const mood = selectedStoryMood();
  if (!mood) {
    customMoodInput?.focus();
    showToast("Please write your feeling.");
    return;
  }
  if (!isSignedIn()) {
    closeModal(writeModal);
    setAuthMode("signin");
    setAuthMessage("Please log in with a verified email before sharing a story.");
    openModal(accountModal);
    return;
  }
  if (!storyText) {
    showToast("Please write your story.");
    return;
  }
  storyFormSubmitting = true;
  if (submitButton) submitButton.disabled = true;
  try {
  if (storyText && storyGrid) {
    if (editingStoryId) {
      const stories = myStories();
      const storyIndex = stories.findIndex((story) => story.id === editingStoryId);
      const card = [...storyGrid.querySelectorAll(".story-card")].find((item) => storyIdFromCard(item) === editingStoryId);
      if (!isOwnStoryCard(card)) {
        editingStoryId = "";
        closeModal(writeModal);
        showToast("You can only edit your own story.");
        return;
      }
      if (storyIndex < 0 && card?.dataset.firebaseStoryId) {
        try {
          await updateFirebaseStory(card.dataset.firebaseStoryId, {
            mood,
            text: storyText,
          });
        } catch (error) {
          console.warn("Could not update Firestore story", error);
          showToast("Could not update online story.");
          return;
        }
        const updatedStory = {
          ...storyDataFromCard(card),
          id: card.dataset.firebaseStoryId,
          firebaseId: card.dataset.firebaseStoryId,
          userId: firebaseUser.uid,
          mood,
          text: storyText,
        };
        card.replaceWith(createStoryCard(updatedStory));
        editingStoryId = "";
        syncSavedButtons();
        syncLikeCounts();
        syncReplyCounts();
        filterStoriesByFeeling();
        showToast("Story updated.");
        closeModal(writeModal);
        return;
      }
      if (storyIndex >= 0) {
        const updatedStory = {
          ...stories[storyIndex],
          mood,
          text: storyText,
        };
        updatedStory.id = `${updatedStory.name}|${updatedStory.text}`.toLowerCase();
        if (card?.dataset.firebaseStoryId) {
          try {
            await updateFirebaseStory(card.dataset.firebaseStoryId, {
              mood,
              text: storyText,
            });
            updatedStory.id = card.dataset.firebaseStoryId;
            updatedStory.firebaseId = card.dataset.firebaseStoryId;
          } catch (error) {
            console.warn("Could not update Firestore story", error);
            showToast("Could not update online story.");
            return;
          }
        }
        stories[storyIndex] = updatedStory;
        storeMyStories(stories);

        const replies = storyReplies();
        if (replies[editingStoryId]) {
          replies[updatedStory.id] = replies[editingStoryId];
          delete replies[editingStoryId];
          storeStoryReplies(replies);
        }

        const likes = storyLikes();
        if (likes[editingStoryId]) {
          likes[updatedStory.id] = likes[editingStoryId];
          delete likes[editingStoryId];
          storeStoryLikes(likes);
        }

        const saved = savedStories();
        if (saved.some((story) => story.id === editingStoryId)) {
          storeSavedStories(saved.map((story) => (story.id === editingStoryId ? { ...story, ...updatedStory } : story)));
        }

        if (card) {
          const updatedCard = createStoryCard(updatedStory);
          card.replaceWith(updatedCard);
        }
        editingStoryId = "";
        renderMyStories();
        syncSavedButtons();
        syncLikeCounts();
        syncReplyCounts();
        filterStoriesByFeeling();
        showToast("Story updated.");
      }
      closeModal(writeModal);
      return;
    }

    const name = savedUserName() || "Anonymous";
    const story = {
      userId: firebaseUser.uid,
      name,
      avatar: savedProfileAvatar(),
      mood,
      text: storyText,
      time: "Just now",
      createdAt: Date.now(),
    };
    story.id = `${story.name}|${story.text}`.toLowerCase();
    try {
      const firebaseStoryId = await saveFirebaseStory(story);
      if (firebaseStoryId) {
        story.id = firebaseStoryId;
        story.firebaseId = firebaseStoryId;
      }
    } catch (error) {
      console.warn("Could not save Firestore story", error);
      const code = error?.code ? ` (${error.code})` : "";
      showToast(`Story saved locally, but not online${code}.`);
    }
    storeMyStories([story, ...myStories()]);
    storyGrid.prepend(createStoryCard(story));
    renderMyStories();
    syncSavedButtons();
    setupExpandableText(storyGrid);
    syncLikeCounts();
    filterStoriesByFeeling();
    updateRelativeTimes();
    showToast("Story shared.");
    storyGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  closeModal(writeModal);
  } finally {
    storyFormSubmitting = false;
    if (submitButton) submitButton.disabled = false;
  }
});

replyForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (replyFormSubmitting) return;
  const input = replyForm.querySelector("[name='reply']");
  const text = input.value.trim();
  const submitButton = replyForm.querySelector("button[type='submit']");
  if (!text || !replyList || !activeReplyStoryId) return;
  if (!isSignedIn()) {
    closeModal(repliesModal);
    setAuthMode("signin");
    setAuthMessage("Please log in with a verified email before replying.");
    openModal(accountModal);
    return;
  }

  replyFormSubmitting = true;
  if (submitButton) submitButton.disabled = true;
  try {
  const replies = storyReplies();
  if (editingReplyIndex >= 0) {
    const storyReplyList = replies[activeReplyStoryId] || [];
    const currentReply = storyReplyList[editingReplyIndex];
    if (!currentReply) {
      editingReplyIndex = -1;
      return;
    }

    storyReplyList[editingReplyIndex] = {
      ...currentReply,
      id: currentReply.id || replyStableId(activeReplyStoryId, currentReply, editingReplyIndex),
      text,
      ownerId: currentReply.ownerId || currentReplyOwnerId(),
      editedAt: Date.now(),
    };
    replies[activeReplyStoryId] = storyReplyList;
    storeStoryReplies(replies);
    renderReplies(activeReplyStoryId);
    input.value = "";
    editingReplyIndex = -1;
    replyForm.querySelector("button[type='submit']")?.setAttribute("aria-label", "Send");
    showToast("Reply updated.");
    return;
  }

  const reply = {
    id: `${activeReplyStoryId}-reply-${Date.now()}`,
    ownerId: currentReplyOwnerId(),
    userId: firebaseUser?.uid || "",
    name: savedUserName() || "You",
    avatar: savedProfileAvatar(),
    text,
    reactions: {
      heart: 0,
      relate: 0,
      thanks: 0,
    },
    reactedBy: {
      heart: [],
      relate: [],
      thanks: [],
    },
  };
  try {
    const firebaseReplyId = await saveFirebaseReply(activeReplyStoryId, reply);
    if (firebaseReplyId) {
      reply.id = firebaseReplyId;
      reply.firebaseId = firebaseReplyId;
    }
  } catch (error) {
    console.warn("Could not save Firestore reply", error);
    const code = error?.code ? ` (${error.code})` : "";
    showToast(`Reply saved locally, but not online${code}.`);
  }
  replies[activeReplyStoryId] = [...(replies[activeReplyStoryId] || []), reply];
  storeStoryReplies(replies);
  replyList.append(createReplyElement(reply, replies[activeReplyStoryId].length - 1));
  updateReplyButton(activeReplyButton, replies[activeReplyStoryId].length);
  syncReplyCounts();
  input.value = "";
  replyList.scrollTop = replyList.scrollHeight;
  showToast("Reply sent.");
  } finally {
    replyFormSubmitting = false;
    if (submitButton) submitButton.disabled = false;
  }
});

firebaseAuthReady = initFirebaseAuth();
updateAdminLinks();
updateAccountLabel();
updateProfileAvatar();
renderPublicMyStories();
renderMyStories();
syncSavedButtons();
ensureReportButtons();
setupExpandableText();
syncLikeCounts();
syncReplyCounts();
updateProfileStats();
filterStoriesByFeeling();
updateRelativeTimes();
initHopeQuote();
setInterval(updateRelativeTimes, 60000);
})();
