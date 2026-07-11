const adminTotalStories = document.querySelector("[data-admin-total-stories]");
const adminReportedStories = document.querySelector("[data-admin-reported-stories]");
const adminQuoteCount = document.querySelector("[data-admin-quote-count]");
const adminUserCount = document.querySelector("[data-admin-user-count]");
const adminSurveyCount = document.querySelector("[data-admin-survey-count]");
const adminCurrentQuote = document.querySelector("[data-admin-current-quote]");
const adminPreviewNext = document.querySelector("[data-admin-preview-next]");
const adminQuoteForm = document.querySelector("[data-admin-quote-form]");
const adminQuoteFormTitle = document.querySelector("[data-admin-quote-form-title]");
const adminQuoteList = document.querySelector("[data-admin-quote-list]");
const adminCancelQuote = document.querySelector("[data-admin-cancel-quote]");
const adminResetQuotes = document.querySelector("[data-admin-reset-quotes]");
const adminUsersList = document.querySelector("[data-admin-users-list]");
const adminReportsList = document.querySelector("[data-admin-reports-list]");
const adminReportStatus = document.querySelector("[data-admin-report-status]");
const adminSurveySummary = document.querySelector("[data-admin-survey-summary]");
const adminMain = document.querySelector(".admin-main");
const adminToast = document.querySelector("[data-toast]");

const ADMIN_MY_STORIES_KEY = "mochimind:myStories";
const ADMIN_ACCOUNT_KEY = "mochimind:account";
const ADMIN_REPORTED_STORIES_KEY = "mochimind:reportedStories";
const ADMIN_REPORTED_REPLIES_KEY = "mochimind:reportedReplies";
const ADMIN_PINNED_REPLIES_KEY = "mochimind:pinnedReplies";
const ADMIN_HIDDEN_STORIES_KEY = "mochimind:hiddenStories";
const ADMIN_HOPE_QUOTE_KEY = "mochimind:hopeQuote";
const ADMIN_HOPE_QUOTES_KEY = "mochimind:hopeQuotes";
const ADMIN_SURVEY_DATA_KEY = "mochimind:userSurveys";
const ADMIN_EMAILS = ["adminmochimind@gmail.com"];

const defaultAdminHopeQuotes = [
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

let adminQuoteIndex = 0;
let adminHopeQuotes = [];
let firebaseAdminReports = [];
let firebaseAdminQuoteDocs = [];
let adminFirebase = null;
let adminQuoteSubmitting = false;
let adminToastTimer = null;

function showAdminToast(message) {
  if (!adminToast) return;
  adminToast.textContent = message;
  adminToast.hidden = false;
  clearTimeout(adminToastTimer);
  adminToastTimer = setTimeout(() => {
    adminToast.hidden = true;
  }, 2400);
}

function isAdminEmail(email) {
  return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
}

function readAdminJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeAdminJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function millisFromFirestore(value) {
  if (value?.toMillis) return value.toMillis();
  return Number(value || Date.now());
}

function adminReportFromFirestore(docSnapshot) {
  const data = docSnapshot.data();
  const reportType = data.type === "reply" || data.targetType === "reply" ? "reply" : "story";
  return {
    ...data,
    id: docSnapshot.id,
    firebaseId: docSnapshot.id,
    reportType,
    status: data.status || "pending",
    reportedAt: millisFromFirestore(data.reportedAt),
    name: data.name || data.storyTitle || "Anonymous",
    text: data.text || data.storyText || data.replyText || "No details provided.",
  };
}

function dedupeReports(reports) {
  const seen = new Set();
  return reports.filter((report) => {
    const key = report.firebaseId || `${report.reportType}|${report.storyId || ""}|${report.replyId || ""}|${report.targetId || report.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function firebaseReportById(reportId) {
  return firebaseAdminReports.find((report) => report.id === reportId || report.firebaseId === reportId);
}

async function updateFirestoreReport(reportId, updates) {
  if (!adminFirebase) return false;
  await adminFirebase.updateDoc(
    adminFirebase.doc(adminFirebase.db, "reports", reportId),
    {
      ...updates,
      updatedAt: adminFirebase.serverTimestamp(),
    }
  );
  return true;
}

async function deleteFirestoreReport(reportId) {
  if (!adminFirebase) return false;
  await adminFirebase.deleteDoc(adminFirebase.doc(adminFirebase.db, "reports", reportId));
  return true;
}

async function updateFirestoreStory(storyId, updates) {
  if (!adminFirebase || !storyId) return false;
  await adminFirebase.updateDoc(adminFirebase.doc(adminFirebase.db, "stories", storyId), updates);
  return true;
}

async function updateFirestoreReply(replyId, updates) {
  if (!adminFirebase || !replyId) return false;
  await adminFirebase.updateDoc(adminFirebase.doc(adminFirebase.db, "replies", replyId), updates);
  return true;
}

function adminQuoteFromFirestore(docSnapshot, index) {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    text: (data.text || "").trim(),
    order: Number.isFinite(Number(data.order)) ? Number(data.order) : index,
  };
}

async function loadFirestoreAdminQuotes(firebase) {
  try {
    const quoteQuery = firebase.query(firebase.collection(firebase.db, "quotes"), firebase.orderBy("order", "asc"));
    const snapshot = await firebase.getDocs(quoteQuery);
    firebaseAdminQuoteDocs = snapshot.docs
      .map(adminQuoteFromFirestore)
      .filter((quote) => quote.text);

    if (!firebaseAdminQuoteDocs.length) return false;
    saveAdminQuotes(firebaseAdminQuoteDocs.map((quote) => quote.text));
    return true;
  } catch (error) {
    console.warn("Could not load Firestore quotes", error);
    return false;
  }
}

async function saveFirestoreAdminQuote(index, text) {
  if (!adminFirebase) return null;
  const quoteIndex = index === "" ? -1 : Number(index);
  const existingQuote = quoteIndex >= 0 ? firebaseAdminQuoteDocs[quoteIndex] : null;
  const payload = {
    text,
    active: true,
    order: index === "" ? adminHopeQuotes.length : quoteIndex,
    updatedAt: adminFirebase.serverTimestamp(),
  };

  if (existingQuote?.id) {
    await adminFirebase.updateDoc(adminFirebase.doc(adminFirebase.db, "quotes", existingQuote.id), payload);
    firebaseAdminQuoteDocs[quoteIndex] = {
      ...existingQuote,
      text,
      order: payload.order,
    };
    return existingQuote.id;
  }

  const docRef = await adminFirebase.addDoc(adminFirebase.collection(adminFirebase.db, "quotes"), {
    ...payload,
    createdAt: adminFirebase.serverTimestamp(),
    createdBy: adminFirebase.auth.currentUser?.email || "",
  });
  const savedQuote = {
    id: docRef.id,
    text,
    order: payload.order,
  };
  if (quoteIndex >= 0) {
    firebaseAdminQuoteDocs[quoteIndex] = savedQuote;
  } else {
    firebaseAdminQuoteDocs.push(savedQuote);
  }
  return docRef.id;
}

async function deleteFirestoreAdminQuote(index) {
  if (!adminFirebase) return false;
  const existingQuote = firebaseAdminQuoteDocs[index];
  if (!existingQuote?.id) return false;
  await adminFirebase.deleteDoc(adminFirebase.doc(adminFirebase.db, "quotes", existingQuote.id));
  firebaseAdminQuoteDocs.splice(index, 1);
  await Promise.all(
    firebaseAdminQuoteDocs.map((quote, order) => (
      adminFirebase.updateDoc(adminFirebase.doc(adminFirebase.db, "quotes", quote.id), {
        order,
        updatedAt: adminFirebase.serverTimestamp(),
      })
    ))
  );
  firebaseAdminQuoteDocs = firebaseAdminQuoteDocs.map((quote, order) => ({ ...quote, order }));
  return true;
}

async function resetFirestoreAdminQuotes() {
  if (!adminFirebase) return false;
  await Promise.all(
    firebaseAdminQuoteDocs.map((quote) => (
      adminFirebase.deleteDoc(adminFirebase.doc(adminFirebase.db, "quotes", quote.id))
    ))
  );
  const quoteCollection = adminFirebase.collection(adminFirebase.db, "quotes");
  await Promise.all(
    defaultAdminHopeQuotes.map((text, order) => (
      adminFirebase.addDoc(quoteCollection, {
        text,
        active: true,
        order,
        createdAt: adminFirebase.serverTimestamp(),
        updatedAt: adminFirebase.serverTimestamp(),
        createdBy: adminFirebase.auth.currentUser?.email || "",
      })
    ))
  );
  return true;
}

function savedAdminQuotes() {
  const quotes = readAdminJson(ADMIN_HOPE_QUOTES_KEY, defaultAdminHopeQuotes);
  return Array.isArray(quotes) && quotes.length ? quotes : defaultAdminHopeQuotes;
}

function savedAdminReports() {
  return readAdminJson(ADMIN_REPORTED_STORIES_KEY, []);
}

function savedAdminReplyReports() {
  return readAdminJson(ADMIN_REPORTED_REPLIES_KEY, []);
}

function saveAdminReports(reports) {
  writeAdminJson(ADMIN_REPORTED_STORIES_KEY, reports);
  renderAdminReports();
}

function saveAdminReplyReports(reports) {
  writeAdminJson(ADMIN_REPORTED_REPLIES_KEY, reports);
  renderAdminReports();
}

function savedPinnedReplies() {
  return readAdminJson(ADMIN_PINNED_REPLIES_KEY, []);
}

function savePinnedReplies(replies) {
  writeAdminJson(ADMIN_PINNED_REPLIES_KEY, replies);
}

function savedHiddenStories() {
  return readAdminJson(ADMIN_HIDDEN_STORIES_KEY, []);
}

function saveHiddenStories(stories) {
  writeAdminJson(ADMIN_HIDDEN_STORIES_KEY, stories);
}

function savedAdminSurveys() {
  const surveyMap = readAdminJson(ADMIN_SURVEY_DATA_KEY, {});
  return Object.values(surveyMap || {});
}

function countValues(items, getter) {
  return items.reduce((counts, item) => {
    const value = getter(item);
    if (Array.isArray(value)) {
      value.forEach((entry) => {
        if (entry) counts[entry] = (counts[entry] || 0) + 1;
      });
      return counts;
    }
    if (value) counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

function createSurveyGroup(title, counts) {
  const group = document.createElement("section");
  group.className = "admin-survey-group";
  const heading = document.createElement("h3");
  heading.textContent = title;
  group.append(heading);

  const entries = Object.entries(counts).sort((first, second) => second[1] - first[1]);
  if (!entries.length) {
    const empty = document.createElement("p");
    empty.innerHTML = "<span>No data yet</span><strong>0</strong>";
    group.append(empty);
    return group;
  }

  entries.forEach(([label, count]) => {
    const row = document.createElement("p");
    const name = document.createElement("span");
    const value = document.createElement("strong");
    name.textContent = label;
    value.textContent = String(count);
    row.append(name, value);
    group.append(row);
  });
  return group;
}

function renderAdminSurveySummary(surveys = savedAdminSurveys()) {
  if (!adminSurveySummary) return;
  adminSurveySummary.innerHTML = "";
  if (adminSurveyCount) adminSurveyCount.textContent = String(surveys.length);

  if (!surveys.length) {
    const empty = document.createElement("p");
    empty.className = "admin-empty";
    empty.textContent = "No survey responses yet.";
    adminSurveySummary.append(empty);
    return;
  }

  adminSurveySummary.append(
    createSurveyGroup("Age Groups", countValues(surveys, (survey) => survey.ageGroup)),
    createSurveyGroup("Gender", countValues(surveys, (survey) => survey.gender)),
    createSurveyGroup("Occupation", countValues(surveys, (survey) => survey.occupation)),
    createSurveyGroup("Challenges", countValues(surveys, (survey) => survey.experiencedChallenges)),
    createSurveyGroup("Problem Categories", countValues(surveys, (survey) => survey.problems || []))
  );
}

function renderAdminUsers(account) {
  if (!adminUsersList) return;
  adminUsersList.innerHTML = "";

  if (!account?.email) {
    const empty = document.createElement("p");
    empty.className = "admin-empty";
    empty.textContent = "No user account found yet.";
    adminUsersList.append(empty);
    return;
  }

  const item = document.createElement("article");
  item.className = "admin-list-item";
  item.innerHTML = `
    <img src="${account.avatar || "assets/cip_1.png"}" alt="">
    <span>
      <strong></strong>
      <small></small>
    </span>
  `;
  item.querySelector("strong").textContent = account.name || "MochiMind User";
  item.querySelector("small").textContent = account.email;
  adminUsersList.append(item);
}

function renderAdminReports() {
  if (!adminReportsList) return;
  const storyReports = savedAdminReports().map((report) => ({ ...report, reportType: "story" }));
  const replyReports = savedAdminReplyReports().map((report) => ({ ...report, reportType: "reply" }));
  const reports = dedupeReports([...firebaseAdminReports, ...storyReports, ...replyReports])
    .sort((first, second) => Number(second.reportedAt || 0) - Number(first.reportedAt || 0));
  const pinned = savedPinnedReplies();
  adminReportsList.innerHTML = "";
  if (adminReportedStories) adminReportedStories.textContent = String(reports.length);

  if (!reports.length) {
    const empty = document.createElement("p");
    empty.className = "admin-empty";
    empty.textContent = "No reported stories or replies yet.";
    adminReportsList.append(empty);
    if (adminReportStatus) adminReportStatus.textContent = "All clear";
    return;
  }

  const pendingCount = reports.filter((report) => report.status !== "reviewed").length;
  if (adminReportStatus) adminReportStatus.textContent = pendingCount ? `${pendingCount} pending` : "Reviewed";
  reports.forEach((report) => {
    const item = document.createElement("article");
    item.className = "admin-report-item";
    item.dataset.reportId = report.id;
    item.dataset.reportType = report.reportType;
    const title = document.createElement("strong");
    title.textContent = report.reportType === "reply"
      ? `Reply by ${report.replyAuthor || "Guest"}`
      : report.name || "Anonymous";
    const text = document.createElement("p");
    text.textContent = report.reportType === "reply"
      ? report.replyText || "No reply text provided."
      : report.text || "No details provided.";
    const meta = document.createElement("div");
    meta.className = "admin-report-meta";
    const type = document.createElement("span");
    type.textContent = report.reportType === "reply" ? "Reply report" : "Story report";
    const reason = document.createElement("span");
    reason.textContent = report.reason || "Needs admin review";
    const mood = document.createElement("span");
    mood.textContent = report.reportType === "reply"
      ? report.storyTitle || "Story reply"
      : report.mood || "Shared";
    const reporter = document.createElement("span");
    reporter.textContent = `By ${report.reporter || "Guest"}`;
    const time = document.createElement("span");
    time.textContent = report.reportedAt
      ? new Date(report.reportedAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
      : "Just now";
    const status = document.createElement("span");
    status.textContent = report.status === "reviewed" ? "Reviewed" : "Pending";
    meta.append(type, reason, mood, reporter, time, status);

    const actions = document.createElement("div");
    actions.className = "admin-report-actions";
    const review = document.createElement("button");
    review.type = "button";
    review.dataset.adminReviewReport = report.id;
    review.dataset.reportType = report.reportType;
    review.textContent = report.status === "reviewed" ? "Reviewed" : "Review";
    review.disabled = report.status === "reviewed";
    const dismiss = document.createElement("button");
    dismiss.type = "button";
    dismiss.dataset.adminDismissReport = report.id;
    dismiss.dataset.reportType = report.reportType;
    dismiss.textContent = "Dismiss Report";
    actions.append(review, dismiss);

    if (report.reportType === "reply") {
      const pin = document.createElement("button");
      const isPinned = pinned.some((item) => item.storyId === report.storyId && item.replyId === report.replyId);
      pin.type = "button";
      pin.dataset.adminPinReply = report.id;
      pin.textContent = isPinned ? "Unpin Reply" : "Pin Reply";
      pin.dataset.pinned = String(isPinned);
      actions.append(pin);
    } else {
      const hide = document.createElement("button");
      hide.type = "button";
      hide.dataset.adminHideStory = report.id;
      hide.textContent = "Hide Story";
      actions.append(hide);
    }

    item.append(title, text, meta, actions);
    adminReportsList.append(item);
  });
}

function renderAdminQuote(index) {
  if (!adminHopeQuotes.length) adminHopeQuotes = savedAdminQuotes();
  adminQuoteIndex = (index + adminHopeQuotes.length) % adminHopeQuotes.length;
  if (adminCurrentQuote) adminCurrentQuote.textContent = adminHopeQuotes[adminQuoteIndex];
}

function resetQuoteForm() {
  if (!adminQuoteForm) return;
  adminQuoteForm.reset();
  adminQuoteForm.elements.quoteIndex.value = "";
  if (adminQuoteFormTitle) adminQuoteFormTitle.textContent = "Add New Quote";
  if (adminCancelQuote) adminCancelQuote.hidden = true;
}

function renderAdminQuoteList() {
  if (!adminQuoteList) return;
  adminQuoteList.innerHTML = "";

  adminHopeQuotes.forEach((quote, index) => {
    const item = document.createElement("article");
    item.className = "admin-quote-item";
    const text = document.createElement("p");
    text.textContent = quote;

    const actions = document.createElement("div");
    actions.className = "admin-quote-actions";
    const edit = document.createElement("button");
    edit.type = "button";
    edit.dataset.adminEditQuote = String(index);
    edit.textContent = "Edit";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.dataset.adminDeleteQuote = String(index);
    remove.textContent = "Delete";
    remove.disabled = adminHopeQuotes.length <= 1;
    actions.append(edit, remove);

    item.append(text, actions);
    adminQuoteList.append(item);
  });
}

function saveAdminQuotes(quotes) {
  adminHopeQuotes = quotes.map((quote) => quote.trim()).filter(Boolean);
  if (!adminHopeQuotes.length) adminHopeQuotes = [...defaultAdminHopeQuotes];
  writeAdminJson(ADMIN_HOPE_QUOTES_KEY, adminHopeQuotes);
  if (adminQuoteCount) adminQuoteCount.textContent = String(adminHopeQuotes.length);
  if (adminQuoteIndex >= adminHopeQuotes.length) adminQuoteIndex = 0;
  writeAdminJson(ADMIN_HOPE_QUOTE_KEY, { index: adminQuoteIndex, updatedAt: Date.now() });
  renderAdminQuote(adminQuoteIndex);
  renderAdminQuoteList();
}

function initAdminDashboard() {
  const browserStories = readAdminJson(ADMIN_MY_STORIES_KEY, []);
  const reports = [...savedAdminReports(), ...savedAdminReplyReports()];
  const account = readAdminJson(ADMIN_ACCOUNT_KEY, null);
  const quoteState = readAdminJson(ADMIN_HOPE_QUOTE_KEY, { index: 0 });
  adminHopeQuotes = savedAdminQuotes();
  const publicStoryCount = document.querySelectorAll(".story-card").length || 9;

  if (adminTotalStories) adminTotalStories.textContent = String(publicStoryCount + browserStories.length);
  if (adminReportedStories) adminReportedStories.textContent = String(reports.length);
  if (adminQuoteCount) adminQuoteCount.textContent = String(adminHopeQuotes.length);
  if (adminUserCount) adminUserCount.textContent = account?.email ? "1" : "0";
  if (adminSurveyCount) adminSurveyCount.textContent = String(savedAdminSurveys().length);

  renderAdminUsers(account);
  renderAdminReports();
  renderAdminSurveySummary();
  renderAdminQuote(Number(quoteState?.index || 0));
  renderAdminQuoteList();
}

function showAdminBlocked(message) {
  if (adminMain) {
    adminMain.innerHTML = `
      <section class="admin-panel admin-access-panel">
        <div class="admin-panel-heading">
          <h2>Admin Access</h2>
          <span>Restricted</span>
        </div>
        <p class="admin-panel-note"></p>
      </section>
    `;
    adminMain.querySelector(".admin-panel-note").textContent = message;
  }
}

async function loadFirestoreAdminReports(firebase) {
  try {
    const reportQuery = firebase.query(firebase.collection(firebase.db, "reports"), firebase.orderBy("reportedAt", "desc"));
    const snapshot = await firebase.getDocs(reportQuery);
    firebaseAdminReports = snapshot.docs.map(adminReportFromFirestore);
    renderAdminReports();
  } catch (error) {
    console.warn("Could not load Firestore reports", error);
    if (adminReportsList) {
      const warning = document.createElement("p");
      warning.className = "admin-empty";
      warning.textContent = "Firestore reports could not load. Check admin Firestore rules.";
      adminReportsList.prepend(warning);
    }
  }
}

async function loadFirestoreAdminSurveys(firebase) {
  try {
    const snapshot = await firebase.getDocs(firebase.collection(firebase.db, "surveys"));
    const surveys = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));
    renderAdminSurveySummary(surveys);
  } catch (error) {
    console.warn("Could not load Firestore surveys", error);
    renderAdminSurveySummary();
  }
}

async function initFirebaseAdminDashboard() {
  try {
    const firebase = await import("./firebase-config.js?v=survey-home-2");
    adminFirebase = firebase;
    firebase.onAuthStateChanged(firebase.auth, async (user) => {
      if (!user) {
        showAdminBlocked("Please log in using the MochiMind admin account.");
        return;
      }
      if (!isAdminEmail(user.email || "")) {
        showAdminBlocked("This dashboard is only available for the MochiMind admin account.");
        return;
      }
      await loadFirestoreAdminReports(firebase);
      await loadFirestoreAdminQuotes(firebase);
      await loadFirestoreAdminSurveys(firebase);
    });
  } catch (error) {
    console.warn("Could not connect admin dashboard to Firebase", error);
    if (adminReportStatus) adminReportStatus.textContent = "Local only";
  }
}

adminPreviewNext?.addEventListener("click", () => renderAdminQuote(adminQuoteIndex + 1));

adminQuoteForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (adminQuoteSubmitting) return;
  const quoteText = adminQuoteForm.elements.quoteText.value.trim();
  const quoteIndex = adminQuoteForm.elements.quoteIndex.value;
  const submitButton = adminQuoteForm.querySelector("button[type='submit']");
  if (!quoteText) {
    adminQuoteForm.elements.quoteText.focus();
    showAdminToast("Please write a quote first.");
    return;
  }

  adminQuoteSubmitting = true;
  if (submitButton) submitButton.disabled = true;
  try {
    await saveFirestoreAdminQuote(quoteIndex, quoteText);
  } catch (error) {
    console.warn("Could not save Firestore quote", error);
    showAdminToast("Quote saved locally, but not online.");
  }

  const nextQuotes = [...adminHopeQuotes];
  if (quoteIndex === "") {
    nextQuotes.push(quoteText);
    adminQuoteIndex = nextQuotes.length - 1;
  } else {
    nextQuotes[Number(quoteIndex)] = quoteText;
    adminQuoteIndex = Number(quoteIndex);
  }

  saveAdminQuotes(nextQuotes);
  if (adminFirebase) {
    const refreshed = await loadFirestoreAdminQuotes(adminFirebase);
    if (!refreshed) renderAdminQuoteList();
  }
  resetQuoteForm();
  showAdminToast(quoteIndex === "" ? "Quote added." : "Quote updated.");
  adminQuoteSubmitting = false;
  if (submitButton) submitButton.disabled = false;
});

adminCancelQuote?.addEventListener("click", resetQuoteForm);

adminResetQuotes?.addEventListener("click", async () => {
  if (!window.confirm("Reset Pocket of Hope quotes?")) return;
  adminResetQuotes.disabled = true;
  try {
    await resetFirestoreAdminQuotes();
  } catch (error) {
    console.warn("Could not reset Firestore quotes", error);
    showAdminToast("Quotes reset locally, but not online.");
  }
  adminQuoteIndex = 0;
  saveAdminQuotes([...defaultAdminHopeQuotes]);
  if (adminFirebase) {
    const refreshed = await loadFirestoreAdminQuotes(adminFirebase);
    if (!refreshed) renderAdminQuoteList();
  }
  writeAdminJson(ADMIN_HOPE_QUOTE_KEY, { index: 0, updatedAt: Date.now() });
  renderAdminQuote(0);
  resetQuoteForm();
  adminResetQuotes.disabled = false;
  showAdminToast("Quotes reset.");
});

adminQuoteList?.addEventListener("click", async (event) => {
  const edit = event.target.closest("[data-admin-edit-quote]");
  if (edit && adminQuoteForm) {
    const index = Number(edit.dataset.adminEditQuote);
    adminQuoteForm.elements.quoteIndex.value = String(index);
    adminQuoteForm.elements.quoteText.value = adminHopeQuotes[index] || "";
    if (adminQuoteFormTitle) adminQuoteFormTitle.textContent = "Edit Quote";
    if (adminCancelQuote) adminCancelQuote.hidden = false;
    adminQuoteForm.scrollIntoView({ block: "nearest" });
    return;
  }

  const remove = event.target.closest("[data-admin-delete-quote]");
  if (remove) {
    const index = Number(remove.dataset.adminDeleteQuote);
    if (!window.confirm("Delete this quote?")) return;
    remove.disabled = true;
    let deletedOnline = false;
    try {
      deletedOnline = await deleteFirestoreAdminQuote(index);
    } catch (error) {
      console.warn("Could not delete Firestore quote", error);
      remove.disabled = false;
      showAdminToast("Quote could not be deleted online.");
      return;
    }
    if (adminFirebase && firebaseAdminQuoteDocs.length && !deletedOnline) {
      remove.disabled = false;
      showAdminToast("Quote could not be deleted online. Refresh and try again.");
      return;
    }
    if (adminQuoteIndex >= index) adminQuoteIndex = Math.max(0, adminQuoteIndex - 1);
    saveAdminQuotes(adminHopeQuotes.filter((_, quoteIndex) => quoteIndex !== index));
    if (adminFirebase) {
      const refreshed = await loadFirestoreAdminQuotes(adminFirebase);
      if (!refreshed) renderAdminQuoteList();
    }
    resetQuoteForm();
    showAdminToast("Quote deleted.");
  }
});

adminReportsList?.addEventListener("click", async (event) => {
  const review = event.target.closest("[data-admin-review-report]");
  if (review) {
    review.disabled = true;
    const firebaseReport = firebaseReportById(review.dataset.adminReviewReport);
    if (firebaseReport) {
      try {
        await updateFirestoreReport(firebaseReport.firebaseId || firebaseReport.id, {
          status: "reviewed",
          reviewedAt: adminFirebase.serverTimestamp(),
        });
        firebaseReport.status = "reviewed";
        firebaseReport.reviewedAt = Date.now();
        renderAdminReports();
        showAdminToast("Report reviewed.");
        return;
      } catch (error) {
        console.warn("Could not review Firestore report", error);
        review.disabled = false;
      }
    }

    const updater = (report) => (
      report.id === review.dataset.adminReviewReport
        ? { ...report, status: "reviewed", reviewedAt: Date.now() }
        : report
    );
    if (review.dataset.reportType === "reply") {
      saveAdminReplyReports(savedAdminReplyReports().map(updater));
    } else {
      saveAdminReports(savedAdminReports().map(updater));
    }
    showAdminToast("Report reviewed.");
    return;
  }

  const dismiss = event.target.closest("[data-admin-dismiss-report]");
  if (dismiss) {
    if (!window.confirm("Dismiss this report?")) return;
    dismiss.disabled = true;
    const firebaseReport = firebaseReportById(dismiss.dataset.adminDismissReport);
    if (firebaseReport) {
      try {
        await deleteFirestoreReport(firebaseReport.firebaseId || firebaseReport.id);
        firebaseAdminReports = firebaseAdminReports.filter((report) => report.id !== firebaseReport.id);
        renderAdminReports();
        showAdminToast("Report dismissed.");
        return;
      } catch (error) {
        console.warn("Could not dismiss Firestore report", error);
        dismiss.disabled = false;
      }
    }

    if (dismiss.dataset.reportType === "reply") {
      saveAdminReplyReports(savedAdminReplyReports().filter((report) => report.id !== dismiss.dataset.adminDismissReport));
    } else {
      saveAdminReports(savedAdminReports().filter((report) => report.id !== dismiss.dataset.adminDismissReport));
    }
    showAdminToast("Report dismissed.");
    return;
  }

  const pin = event.target.closest("[data-admin-pin-reply]");
  if (pin) {
    pin.disabled = true;
    const report = firebaseReportById(pin.dataset.adminPinReply) || savedAdminReplyReports().find((item) => item.id === pin.dataset.adminPinReply);
    if (!report) {
      pin.disabled = false;
      return;
    }
    const pinned = savedPinnedReplies();
    const isPinned = pinned.some((item) => item.storyId === report.storyId && item.replyId === report.replyId);
    if (isPinned) {
      try {
        await updateFirestoreReply(report.replyId, { pinned: false, pinnedAt: null });
      } catch (error) {
        console.warn("Could not unpin Firestore reply", error);
      }
      savePinnedReplies(pinned.filter((item) => item.storyId !== report.storyId || item.replyId !== report.replyId));
      renderAdminReports();
      showAdminToast("Reply unpinned.");
      return;
    }

    if (!isPinned) {
      try {
        await updateFirestoreReply(report.replyId, {
          pinned: true,
          pinnedAt: adminFirebase?.serverTimestamp ? adminFirebase.serverTimestamp() : Date.now(),
        });
        if (report.firebaseId) {
          await updateFirestoreReport(report.firebaseId, {
            status: "reviewed",
            reviewedAt: adminFirebase.serverTimestamp(),
            pinnedAt: adminFirebase.serverTimestamp(),
          });
          report.status = "reviewed";
        }
      } catch (error) {
        console.warn("Could not pin Firestore reply", error);
      }
      savePinnedReplies([
        {
          storyId: report.storyId,
          replyId: report.replyId,
          pinnedAt: Date.now(),
          pinnedFromReportId: report.id,
        },
        ...pinned,
      ]);
    }
    saveAdminReplyReports(savedAdminReplyReports().map((item) => (
      item.id === report.id
        ? { ...item, status: "reviewed", reviewedAt: Date.now(), pinnedAt: Date.now() }
        : item
    )));
    showAdminToast("Reply pinned.");
    return;
  }

  const hide = event.target.closest("[data-admin-hide-story]");
  if (hide) {
    if (!window.confirm("Hide this story from the community?")) return;
    hide.disabled = true;
    const firebaseReport = firebaseReportById(hide.dataset.adminHideStory);
    if (firebaseReport) {
      try {
        await updateFirestoreStory(firebaseReport.storyId || firebaseReport.targetId || firebaseReport.id, {
          hidden: true,
          hiddenAt: adminFirebase.serverTimestamp(),
        });
        await updateFirestoreReport(firebaseReport.firebaseId || firebaseReport.id, {
          status: "reviewed",
          reviewedAt: adminFirebase.serverTimestamp(),
          action: "hidden-story",
        });
        firebaseReport.status = "reviewed";
        renderAdminReports();
        showAdminToast("Story hidden.");
        return;
      } catch (error) {
        console.warn("Could not hide Firestore story", error);
        hide.disabled = false;
      }
    }

    const hidden = new Set(savedHiddenStories());
    hidden.add(hide.dataset.adminHideStory);
    saveHiddenStories([...hidden]);
    saveAdminReports(savedAdminReports().filter((report) => report.id !== hide.dataset.adminHideStory));
    showAdminToast("Story hidden.");
  }
});

initAdminDashboard();
initFirebaseAdminDashboard();
