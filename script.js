const correctPassword = "Ferdinand";

// Validation du mot de passe
document.getElementById("submitPassword").addEventListener("click", () => {
  const input = document.getElementById("passwordInput").value.trim();

  if (input === correctPassword) {
    // Masque l'écran mot de passe
    document.getElementById("passwordScreen").classList.add("hidden");

    // Affiche la page principale
    document.getElementById("mainContent").classList.remove("hidden");

    // Lance les emojis romantiques qui tombent
    startRomanticEmojis();
  } else {
    document.getElementById("errorMsg").classList.remove("hidden");
  }
});

function startRomanticEmojis() {
  setInterval(() => {
    const emojiDiv = document.createElement("div");
    emojiDiv.className = "romantic-emoji";

    const emojis = ["❤️", "💖", "💕", "🌸", "🌹", "🌺", "💐", "🥰", "😍", "✨"];
    emojiDiv.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Position aléatoire très large (évite les bugs de bord)
    const leftPos = Math.random() * 120 - 10; // de -10% à 110% pour circulation naturelle
    emojiDiv.style.setProperty("--left-pos", leftPos + "vw");

    // Vitesse plus lente : entre 18 et 30 secondes de chute
    const duration = Math.random() * 12 + 18;
    emojiDiv.style.animationDuration = duration + "s";

    // Taille un peu plus variée et douce
    emojiDiv.style.fontSize = (Math.random() * 1.6 + 1.6) + "rem"; // 1.6rem → 3.2rem

    // Opacité et rotation pour fluidité
    emojiDiv.style.opacity = Math.random() * 0.3 + 0.7;
    emojiDiv.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;

    document.querySelector(".hearts-container").appendChild(emojiDiv);

    // Supprime après la fin de l'animation + marge de sécurité
    setTimeout(() => emojiDiv.remove(), (duration + 3) * 1000);
  }, 500); // 0.5 seconde → dense mais fluide, pas trop lourd pour mobile
}

// Boutons Oui / Non + affichage questions
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesMessage = document.getElementById("yesMessage");
const noMessage = document.getElementById("noMessage");
const question = document.querySelector(".question");
const questionsSection = document.getElementById("questionsSection");

yesBtn.addEventListener("click", () => {
  question.style.display = "none";
  yesMessage.classList.remove("hidden");
  document.getElementById("questionsOui").classList.remove("hidden");
  questionsSection.classList.remove("hidden");
});

noBtn.addEventListener("click", () => {
  question.style.display = "none";
  noMessage.classList.remove("hidden");
  document.getElementById("questionsNon").classList.remove("hidden");
  questionsSection.classList.remove("hidden");
});

// Effet fuite sur NON
noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 60 - 30 + "vw";
  const y = Math.random() * 60 - 30 + "vh";
  noBtn.style.transform = `translate(${x}, ${y})`;
});
noBtn.addEventListener("mouseout", () => noBtn.style.transform = "translate(0,0)");

// (Optionnel) Si tu veux relancer les autres animations plus tard, garde-les ici
// Pour l'instant, on se concentre sur les emojis qui tombent après mot de passe

function showThanksMessage() {
  // Cacher les questions et le formulaire
  document.getElementById("questionsSection").classList.add("hidden");

  // Cacher aussi les messages Oui/Non si visibles
  if (document.getElementById("yesMessage")) {
    document.getElementById("yesMessage").classList.add("hidden");
  }
  if (document.getElementById("noMessage")) {
    document.getElementById("noMessage").classList.add("hidden");
  }

  // Afficher le merci
  document.getElementById("thanksForm").classList.remove("hidden");

  // Scroll doux vers le message merci (très utile sur mobile)
  document.getElementById("thanksForm").scrollIntoView({ behavior: "smooth" });
}

// Gestion fiable de l'envoi du formulaire (marche sur mobile + ordinateur)
document.getElementById("myForm").addEventListener("submit", function(event) {
  // IMPORTANT : NE PAS mettre event.preventDefault() ici !
  // On laisse le formulaire partir normalement vers FormSubmit.co

  console.log("Bouton Envoyer cliqué – envoi en cours...");

  // Petit délai pour laisser le navigateur envoyer le formulaire avant de changer l’affichage
  setTimeout(() => {
    // Cacher les questions et messages Oui/Non
    document.getElementById("questionsSection").classList.add("hidden");
    
    const yesMsg = document.getElementById("yesMessage");
    const noMsg = document.getElementById("noMessage");
    if (yesMsg) yesMsg.classList.add("hidden");
    if (noMsg) noMsg.classList.add("hidden");

    // Afficher le message de remerciement
    const thanks = document.getElementById("thanksForm");
    thanks.classList.remove("hidden");

    // Scroll vers le merci (très important sur mobile)
    thanks.scrollIntoView({ behavior: "smooth" });

    console.log("Merci affiché !");
  }, 800); // 800 ms = délai sûr sur mobile
});
