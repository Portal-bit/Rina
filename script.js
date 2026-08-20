/* ==========================================================================
   PREMIUM ROMANTIC LDR WEBSITE - SCRIPT.JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. SET CURRENT YEAR IN FOOTER
       ---------------------------------------------------------------------- */
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------------
       2. NAVBAR SCROLL EFFECT & MOBILE MENU TOGGLE
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Navbar with Blur on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close Mobile Menu on Link Click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    /* ----------------------------------------------------------------------
       3. FLOATING BACKGROUND PARTICLES (STARS & HEARTS)
       ---------------------------------------------------------------------- */
    const starsContainer = document.getElementById('starsContainer');

    function createParticle() {
        if (!starsContainer) return;

        const particle = document.createElement('div');
        const isHeart = Math.random() > 0.7; // 30% chance to spawn a heart
        
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
        particle.style.pointerEvents = 'none';

        if (isHeart) {
            particle.innerHTML = '❤️';
            particle.style.fontSize = (Math.random() * 10 + 8) + 'px';
            particle.style.animation = `floatUp ${Math.random() * 6 + 4}s linear infinite`;
        } else {
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = '#f3a6bb';
            particle.style.borderRadius = '50%';
            particle.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
        }

        starsContainer.appendChild(particle);

        // Limit total particles to maintain smooth performance
        if (starsContainer.children.length > 40) {
            starsContainer.removeChild(starsContainer.firstChild);
        }
    }

    // Dynamic Keyframe Animations Injection
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.2; transform: scale(0.8); }
            100% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.6; }
            100% { transform: translateY(-100px) rotate(20deg); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // Generate Initial Particles
    for (let i = 0; i < 30; i++) {
        createParticle();
    }

   /* ----------------------------------------------------------------------
       4. LOVE LETTER MODAL (FIXED CLICK & ANIMATION)
       ---------------------------------------------------------------------- */
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const envelope = document.getElementById('envelope');
    const letterModal = document.getElementById('letterModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');

    if (envelopeWrapper && envelope && letterModal) {
        // Klik pada area amplop
        envelopeWrapper.addEventListener('click', () => {
            // 1. Jalankan animasi buka amplop & kertas terangkat
            envelope.classList.add('open');

            // 2. Tampilkan surat lengkap setelah 0.7 detik animasi selesai
            setTimeout(() => {
                letterModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 700);
        });
    }

    function closeLetterModal() {
        if (letterModal && envelope) {
            letterModal.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Reset kondisi amplop kembali tertutup
            setTimeout(() => {
                envelope.classList.remove('open');
            }, 400);
        }
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeLetterModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeLetterModal);
    }

    /* ----------------------------------------------------------------------
       5. COUNTDOWN TIMER LOGIC (YEARS, MONTHS, DAYS, HOURS, MINS, SECS)
       ---------------------------------------------------------------------- */
    // Tentukan tanggal target pertemuan di sini (Format: YYYY-MM-DDTHH:MM:SS)
    // Berdasarkan hitungan 2.518 hari dari sekarang (~6,89 tahun)
    const targetMeetDate = new Date('2033-07-09T00:00:00').getTime();

    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetMeetDate - now;

        if (difference > 0) {
            // Konversi total milliseconds ke satuan waktu masing-masing
            const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
            const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
            const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (yearsEl) yearsEl.textContent = years < 10 ? '0' + years : years;
            if (monthsEl) monthsEl.textContent = months < 10 ? '0' + months : months;
            if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
            if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        } else {
            if (yearsEl) yearsEl.textContent = '00';
            if (monthsEl) monthsEl.textContent = '00';
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }

    // Jalankan countdown setiap detik
    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* ----------------------------------------------------------------------
       6. FULLSCREEN SURPRISE OVERLAY LOGIC
       ---------------------------------------------------------------------- */
    const btnSurprise = document.getElementById('btnSurprise');
    const surpriseOverlay = document.getElementById('surpriseOverlay');
    const btnCloseSurprise = document.getElementById('btnCloseSurprise');

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');

    if (btnSurprise && surpriseOverlay) {
        btnSurprise.addEventListener('click', () => {
            surpriseOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Sequential Text Reveal Sequence
            setTimeout(() => { if (step1) step1.classList.add('visible'); }, 500);
            setTimeout(() => { if (step2) step2.classList.add('visible'); }, 2200);
            setTimeout(() => { if (step3) step3.classList.add('visible'); }, 3800);
            setTimeout(() => { if (step4) step4.classList.add('visible'); }, 5400);
            setTimeout(() => { if (btnCloseSurprise) btnCloseSurprise.classList.add('visible'); }, 7000);
        });
    }

    if (btnCloseSurprise && surpriseOverlay) {
        btnCloseSurprise.addEventListener('click', () => {
            surpriseOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Reset Surprise steps for future clicks
            [step1, step2, step3, step4, btnCloseSurprise].forEach(el => {
                if (el) el.classList.remove('visible');
            });
        });
    }

    /* ----------------------------------------------------------------------
       7. SMOOTH SCROLL REVEAL (SIMPLE OBSERVER)
       ---------------------------------------------------------------------- */
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply scroll reveal to section titles and cards
    const elementsToReveal = document.querySelectorAll('.section-title, .note-card, .timeline-item, .polaroid-card');
    elementsToReveal.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

});

/* =========================================================
   DAILY VIDEO JOURNAL
   ========================================================= */

/*
    DAFTAR VIDEO

    Cara menambahkan video baru:
    1. Masukkan video ke folder "videos"
    2. Tambahkan data video di bagian paling atas daftar ini

    Contoh:
    {
        date: "15 AGUSTUS 2026",
        video: "videos/15-agustus-2026.mp4",
        title: "Kabar aku hari ini ❤️",
        caption: "Hari ini aku mau cerita sesuatu..."
    }
*/

const dailyVideos = [
    {
        date: "19-20 AGUSTUS 2026",
        video: "videos/19-20-agustus-2026.mp4",
        title: "Kabar aku hari ini ❤️",
        caption: "Hari ini aku mau cerita sesuatu..."
    },
    {
        date: "17-18 AGUSTUS 2026",
        video: "videos/17-18-agustus-2026.mp4",
        title: "Kabar aku hari ini ❤️",
        caption: "Hari ini aku mau cerita sesuatu..."
    },
    {
        date: "16 AGUSTUS 2026",
        video: "videos/16-agustus-2026.mp4",
        title: "Kabar aku hari ini ❤️",
        caption: "Hari ini aku mau cerita sesuatu..."
    },

    {
        date: "15 AGUSTUS 2026",
        video: "videos/15-agustus-2026.mp4",
        title: "Kabar aku hari ini ❤️",
        caption: "Hari ini aku mau cerita sesuatu..."
    },

    {
        date: "14 AGUSTUS 2026",
        video: "videos/14-agustus-2026.mp4",
        title: "Kabar aku ❤️",
        caption: "Walaupun jauh, aku tetap mau kasih kabar."
    }


];


/* =========================================================
   ELEMENT HTML
   ========================================================= */

const dailyVideoElement = document.getElementById("dailyVideo");
const todayDateElement = document.getElementById("todayDate");
const todayQuoteElement = document.getElementById("todayQuote");
const videoArchiveElement = document.getElementById("videoArchive");


/* =========================================================
   MENAMPILKAN VIDEO HARI INI
   ========================================================= */

function showTodayVideo() {

    if (!dailyVideoElement || dailyVideos.length === 0) {
        return;
    }

    const todayVideo = dailyVideos[0];

    /* Mengubah tanggal */
    if (todayDateElement) {
        todayDateElement.textContent = todayVideo.date;
    }

    /* Mengubah quote */
    if (todayQuoteElement) {
        todayQuoteElement.textContent = `"${todayVideo.caption}"`;
    }

    /*
        Mengubah sumber video.

        Karena video dibuat menggunakan JavaScript,
        kita tidak perlu lagi menulis <source>
        satu per satu di HTML.
    */

    dailyVideoElement.src = todayVideo.video;

    dailyVideoElement.load();
}


/* =========================================================
   MEMBUAT VIDEO ARCHIVE
   ========================================================= */

function createVideoArchive() {

    if (!videoArchiveElement) {
        return;
    }

    /*
        Hapus isi archive sebelumnya
        agar tidak terjadi duplikasi.
    */

    videoArchiveElement.innerHTML = "";


    /*
        Kalau hanya ada satu video,
        berarti belum ada video sebelumnya.
    */

    if (dailyVideos.length <= 1) {

        const emptyMessage = document.createElement("div");

        emptyMessage.className = "video-archive-empty";

        emptyMessage.innerHTML = `
            <p>
                Belum ada kabar sebelumnya.
                <br>
                Tunggu ya sayang, nanti aku upload lagi ❤️
            </p>
        `;

        videoArchiveElement.appendChild(emptyMessage);

        return;
    }


    /*
        Mulai dari index 1.

        Index 0 = video hari ini.

        Index 1 dan seterusnya =
        video-video sebelumnya.
    */

    for (let i = 1; i < dailyVideos.length; i++) {

        const videoData = dailyVideos[i];

        const card = createVideoCard(videoData);

        videoArchiveElement.appendChild(card);
    }
}


/* =========================================================
   MEMBUAT CARD VIDEO
   ========================================================= */

function createVideoCard(videoData) {

    /* Card utama */
    const card = document.createElement("article");

    card.className = "video-archive-card";


    /* Wrapper video */
    const videoWrapper = document.createElement("div");

    videoWrapper.className = "archive-video-wrapper";


    /* Video */
    const video = document.createElement("video");

    video.controls = true;
    video.preload = "metadata";


    /*
        Sumber video diambil dari data
        yang kita tulis di dailyVideos.
    */

    video.src = videoData.video;


    /* Tambahkan video ke wrapper */
    videoWrapper.appendChild(video);


    /* Informasi video */
    const info = document.createElement("div");

    info.className = "video-archive-info";


    /* Tanggal */
    const date = document.createElement("span");

    date.className = "archive-date";

    date.textContent = videoData.date;


    /* Judul */
    const title = document.createElement("h4");

    title.className = "archive-video-title";

    title.textContent = videoData.title;


    /* Caption */
    const caption = document.createElement("p");

    caption.className = "archive-video-caption";

    caption.textContent = videoData.caption;


    /* Action */
    const actions = document.createElement("div");

    actions.className = "archive-actions";


    /* Download Button */
    const downloadButton = document.createElement("a");

    downloadButton.className = "archive-download-button";

    downloadButton.href = videoData.video;

    downloadButton.download = "";


    /*
        Teks tombol download
    */

    downloadButton.textContent = "⬇️ Download";


    /* Masukkan action */
    actions.appendChild(downloadButton);


    /* Masukkan informasi */
    info.appendChild(date);
    info.appendChild(title);
    info.appendChild(caption);
    info.appendChild(actions);


    /* Masukkan semuanya ke card */
    card.appendChild(videoWrapper);
    card.appendChild(info);


    return card;
}


/* =========================================================
   JALANKAN WEBSITE
   ========================================================= */

showTodayVideo();

createVideoArchive();

showTodayVideo();

createVideoArchive();


// =========================================
// LOVE COUNTER
// =========================================

const relationshipStart = new Date("2026-04-17T00:00:00");

function updateLoveCounter() {

    const now = new Date();

    let years = now.getFullYear() - relationshipStart.getFullYear();
    let months = now.getMonth() - relationshipStart.getMonth();
    let days = now.getDate() - relationshipStart.getDate();

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const totalDifference =
        now.getTime() - relationshipStart.getTime();

    const totalSeconds =
        Math.floor(totalDifference / 1000);

    const hours =
        Math.floor(totalSeconds / 3600) % 24;

    const minutes =
        Math.floor(totalSeconds / 60) % 60;

    const seconds =
        totalSeconds % 60;


    document.getElementById("loveYears").textContent =
        years;

    document.getElementById("loveMonths").textContent =
        months;

    document.getElementById("loveDays").textContent =
        days;

    document.getElementById("loveHours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("loveMinutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("loveSeconds").textContent =
        String(seconds).padStart(2, "0");
}

updateLoveCounter();

setInterval(updateLoveCounter, 1000);


// =========================================
// OPENING LOVE
// =========================================

const loveOpening = document.getElementById("loveOpening");
const bigLoveButton = document.getElementById("bigLoveButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const flowerContainer = document.getElementById("flowerContainer");

bigLoveButton.addEventListener("click", () => {

    // =========================
    // PUTAR MUSIK
    // =========================

    backgroundMusic.volume = 0.5;

    backgroundMusic.play().catch(error => {
        console.log("Musik tidak dapat diputar:", error);
    });


    // =========================
    // BUNGA / LOVE BERHAMBURAN
    // =========================

    const flowers = [
        "🌸",
        "🌷",
        "🌹",
        "💐",
        "🌺",
        "❤️",
        "💕",
        "✨"
    ];

    for (let i = 0; i < 35; i++) {

        const flower = document.createElement("span");

        flower.className = "floating-flower";

        flower.textContent =
            flowers[Math.floor(Math.random() * flowers.length)];

        const x =
            (Math.random() - 0.5) * 1000;

        const y =
            (Math.random() - 0.5) * 800;

        flower.style.setProperty(
            "--x",
            `${x}px`
        );

        flower.style.setProperty(
            "--y",
            `${y}px`
        );

        flower.style.fontSize =
            `${18 + Math.random() * 25}px`;

        flower.style.animationDelay =
            `${Math.random() * 0.3}s`;

        flowerContainer.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 2500);
    }


    // =========================
    // HILANGKAN OPENING
    // =========================

    setTimeout(() => {

        loveOpening.classList.add("hide");

    }, 1200);

});

// =========================================
// KLIK KALAU KANGEN
// =========================================

const missYouButton = document.getElementById("missYouButton");
const missYouMessage = document.getElementById("missYouMessage");
const missYouText = document.getElementById("missYouText");

const missYouMessages = [
    "Aku juga kangen kamu. Sabar ya sayang, kita pasti ketemu. ❤️",

    "Kalau kamu lagi kangen, ingat... ada aku yang juga lagi mikirin kamu dari jauh. 🥺❤️",

    "Coba lihat ke langit malam ini. Mungkin kita sedang melihat langit yang sama. 🌙❤️",

    "Jarak kita memang jauh, tapi rasa sayangku nggak ikut menjauh. ❤️",

    "Aku nggak bisa tiba-tiba muncul di depan kamu sekarang, tapi aku bisa selalu ada di sini buat kamu. 🫂❤️",

    "Jangan terlalu kangen ya... nanti aku ikut kangen dan malah nggak bisa tidur. 😭❤️",

    "Suatu hari nanti, tombol ini nggak perlu kamu pencet lagi. Kamu tinggal bilang: aku kangen. Karena aku akan ada di samping kamu. ❤️",

    "Kalau hari ini terasa berat, istirahat dulu ya. Kamu nggak sendirian. Ada aku. ❤️",

    "Aku mungkin cuma bisa kamu lihat lewat layar sekarang, tapi cintaku ke kamu nyata. ❤️",

    "Hei kamu... iya kamu. Aku sayang banget sama kamu. Jangan lupa itu. 🥺❤️"
];

let lastMissYouMessage = -1;

if (missYouButton && missYouMessage && missYouText) {

    missYouButton.addEventListener("click", () => {

        let randomIndex;

        // Hindari pesan yang sama muncul dua kali berturut-turut
        do {
            randomIndex =
                Math.floor(
                    Math.random() * missYouMessages.length
                );
        } while (
            randomIndex === lastMissYouMessage
        );

        lastMissYouMessage = randomIndex;

        missYouText.textContent =
            missYouMessages[randomIndex];

        missYouMessage.classList.remove("show");

        // Paksa animasi muncul kembali
        void missYouMessage.offsetWidth;

        missYouMessage.classList.add("show");
    });
}

// =========================================
// BUNGA INTERAKTIF
// =========================================

const flowerButton =
    document.getElementById("flowerButton");

const flowerMessage =
    document.getElementById("flowerMessage");

if (flowerButton && flowerMessage) {

    flowerButton.addEventListener("click", () => {

        flowerMessage.classList.remove("show");

        // Memicu ulang animasi
        void flowerMessage.offsetWidth;

        flowerMessage.classList.add("show");

    });

}

// =========================================
// MUSIC PLAYER
// =========================================

const musicToggle =
    document.getElementById("musicToggle");

const musicVolume =
    document.getElementById("musicVolume");

if (musicToggle && backgroundMusic) {

    // Play / Pause
    musicToggle.addEventListener("click", () => {

        if (backgroundMusic.paused) {

            backgroundMusic.play()
                .then(() => {
                    musicToggle.textContent = "🎵";
                })
                .catch(error => {
                    console.log(
                        "Musik tidak dapat diputar:",
                        error
                    );
                });

        } else {

            backgroundMusic.pause();

            musicToggle.textContent = "🔇";
        }

    });


    // Volume
    musicVolume.addEventListener("input", () => {

        backgroundMusic.volume =
            musicVolume.value;

    });

}

// =========================================
// NIGHT MODE - TEMANI AKU MALAM INI
// =========================================

const nightModeButton =
    document.getElementById("nightModeButton");

const nightSky =
    document.getElementById("nightSky");

if (nightModeButton && nightSky) {

    nightModeButton.addEventListener("click", () => {

        document.body.classList.toggle("night-mode");

        nightSky.classList.toggle("active");

        const icon =
            nightModeButton.querySelector(".night-mode-icon");

        const text =
            nightModeButton.querySelector(".night-mode-text");


        if (document.body.classList.contains("night-mode")) {

            icon.textContent = "🌙";
            text.textContent = "Temani aku malam ini";

        } else {

            icon.textContent = "☀️";
            text.textContent = "Kembali ke siang";
        }

    });

}

// =========================================
// PETA PERJALANAN CINTA
// ACEH -> JAKARTA -> BANDARA -> TEMBORO
// =========================================

const travelVehicle =
    document.getElementById("travelVehicle");

const travelStatusIcon =
    document.getElementById("travelStatusIcon");

const travelStatusTitle =
    document.getElementById("travelStatusTitle");

const travelStatusDescription =
    document.getElementById("travelStatusDescription");

const locationStory =
    document.getElementById("locationStory");

const storyIcon =
    document.getElementById("storyIcon");

const storyLabel =
    document.getElementById("storyLabel");

const storyTitle =
    document.getElementById("storyTitle");

const storyText =
    document.getElementById("storyText");

const mapLocations =
    document.querySelectorAll(".map-location");


if (
    travelVehicle &&
    travelStatusIcon &&
    travelStatusTitle &&
    travelStatusDescription
) {

    /*
    =========================================
    DATA PERJALANAN
    =========================================
    */

    const journeySteps = [

        {
            location: "aceh",

            position: 0,

            vehicle: "✈️",

            statusIcon: "✈️",

            title: "Berangkat dari Aceh",

            description:
                "Perjalanan menuju kamu akhirnya dimulai...",

            label: "TITIK AWAL",

            storyTitle: "ACEH",

            storyIcon: "❤️",

            story:
                "Dari sini aku mulai menunggu kamu. Tempat dimana perjalanan kecil kita dimulai."
        },


        {
            location: "jakarta",

            position: 32,

            vehicle: "✈️",

            statusIcon: "🛬",

            title: "Sampai di Jakarta",

            description:
                "Pesawat sudah sampai. Tapi perjalanan belum selesai...",

            label: "TRANSIT PERTAMA",

            storyTitle: "JAKARTA",

            storyIcon: "✈️",

            story:
                "Kita pernah dipisahkan oleh jarak sejauh ini. Tapi perjalanan ini tetap terus berjalan menuju kamu."
        },


        {
            location: "bandara",

            position: 55,

            vehicle: "✈️",

            statusIcon: "⏳",

            title: "Transit sebentar...",

            description:
                "Istirahat sebentar sebelum melanjutkan perjalanan.",

            label: "TRANSIT",

            storyTitle: "PERJALANAN BERLANJUT",

            storyIcon: "🛫",

            story:
                "Kadang perjalanan memang harus berhenti sebentar. Tapi berhenti bukan berarti menyerah."
        },


        {
            location: "temboro",

            position: 78,

            vehicle: "🚌",

            statusIcon: "🚌",

            title: "Menuju Temboro",

            description:
                "Sekarang perjalanan dilanjutkan dengan bus menuju kamu.",

            label: "PERJALANAN TERAKHIR",

            storyTitle: "TEMBORO",

            storyIcon: "🏡",

            story:
                "Akhirnya sampai di tempat kamu sedang berjuang. Tempat dimana aku selalu menunggu kabar kamu."
        },


        {
            location: "future",

            position: 100,

            vehicle: "💍",

            statusIcon: "❤️",

            title: "Tempat kita nanti",

            description:
                "Tidak ada lagi jarak. Tidak ada lagi perjalanan pulang.",

            label: "TUJUAN TERAKHIR",

            storyTitle: "TEMPAT KITA NANTI",

            storyIcon: "💍",

            story:
                "Suatu hari nanti, perjalanan ini bukan lagi tentang bagaimana caranya sampai kepadamu. Karena kita sudah berada di tempat yang sama."
        }

    ];


    /*
    =========================================
    UPDATE UI
    =========================================
    */

    function updateJourney(step) {

        travelVehicle.style.left =
            step.position + "%";

        travelVehicle.textContent =
            step.vehicle;


        travelStatusIcon.textContent =
            step.statusIcon;

        travelStatusTitle.textContent =
            step.title;

        travelStatusDescription.textContent =
            step.description;


        storyIcon.textContent =
            step.storyIcon;

        storyLabel.textContent =
            step.label;

        storyTitle.textContent =
            step.storyTitle;

        storyText.textContent =
            step.story;


        mapLocations.forEach(location => {

            location.classList.remove("active");

            if (
                location.dataset.location ===
                step.location
            ) {

                location.classList.add("active");

            }

        });

    }


    /*
    =========================================
    ANIMASI PERJALANAN
    =========================================
    */

    async function runJourney() {

        while (true) {

            // ACEH
            updateJourney(journeySteps[0]);

            await new Promise(
                resolve =>
                    setTimeout(resolve, 1800)
            );


            // TERBANG ACEH -> JAKARTA
            updateJourney(journeySteps[1]);

            await new Promise(
                resolve =>
                    setTimeout(resolve, 6000)
            );


            // TRANSIT JAKARTA
            updateJourney(journeySteps[1]);

            await new Promise(
                resolve =>
                    setTimeout(resolve, 3000)
            );


            // TERBANG JAKARTA -> BANDARA
            updateJourney(journeySteps[2]);

            await new Promise(
                resolve =>
                    setTimeout(resolve, 5000)
            );


            // TRANSIT BANDARA
            updateJourney(journeySteps[2]);

            await new Promise(
                resolve =>
                    setTimeout(resolve, 2500)
            );


            // BUS MENUJU TEMBORO
            updateJourney(journeySteps[3]);

            await new Promise(
                resolve =>
                    setTimeout(resolve, 7000)
            );


            // SAMPAI TEMBORO
            updateJourney(journeySteps[3]);

            await new Promise(
                resolve =>
                    setTimeout(resolve, 2500)
            );


            // TUJUAN AKHIR
            updateJourney(journeySteps[4]);

            await new Promise(
                resolve =>
                    setTimeout(resolve, 7000)
            );

        }

    }


    /*
    =========================================
    KLIK TITIK PERJALANAN
    =========================================
    */

    mapLocations.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const location =
                    button.dataset.location;

                const selectedStep =
                    journeySteps.find(
                        step =>
                            step.location ===
                            location
                    );

                if (selectedStep) {

                    updateJourney(
                        selectedStep
                    );

                }

            }
        );

    });


    /*
    =========================================
    MULAI
    =========================================
    */

    updateJourney(
        journeySteps[0]
    );

    runJourney();

}

// =========================================
// DETAK JANTUNG KITA
// =========================================

const heartbeatButton =
    document.getElementById("heartbeatButton");

const heartbeatSound =
    document.getElementById("heartbeatSound");

const heartbeatLive =
    document.getElementById("heartbeatLive");

const heartbeatFinal =
    document.getElementById("heartbeatFinal");

const heartbeatBPM =
    document.getElementById("heartbeatBPM");


if (
    heartbeatButton &&
    heartbeatSound &&
    heartbeatLive &&
    heartbeatFinal
) {

    let heartbeatStarted = false;


    heartbeatButton.addEventListener("click", () => {

        if (!heartbeatStarted) {

            heartbeatStarted = true;


            // =================================
            // MULAI SUARA DETAK
            // =================================

            heartbeatSound.currentTime = 0;

            heartbeatSound.volume = 0.7;

            heartbeatSound.play()
                .catch(error => {

                    console.log(
                        "Suara detak tidak dapat diputar:",
                        error
                    );

                });


            // =================================
            // TAMPILKAN ANIMASI
            // =================================

            heartbeatLive.classList.add("active");

            heartbeatButton.classList.add("active");

            heartbeatButton.innerHTML =
                `<span class="heartbeat-button-icon">❤️</span>
                 <span>Detaknya untuk kamu...</span>`;


            // =================================
            // BPM
            // =================================

            if (heartbeatBPM) {

                heartbeatBPM.textContent =
                    "72 BPM";

            }


            // =================================
            // SETELAH BEBERAPA DETIK
            // =================================

            setTimeout(() => {

                heartbeatFinal.classList.add("active");

            }, 7000);

        }

    });

}

// =========================================
// SEMESTA KITA
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const universeSection =
        document.getElementById("semesta");

    const starField =
        document.getElementById("universeStarField");

    const zoomOverlay =
        document.getElementById("universeZoom");

    const zoomTitle =
        document.getElementById("zoomTitle");

    const zoomIcon =
        document.getElementById("zoomIcon");


    // =====================================
    // BUAT BINTANG RANDOM
    // =====================================

    if (starField) {

        for (let i = 0; i < 100; i++) {

            const star =
                document.createElement("span");

            const size =
                Math.random() * 2 + 1;

            const duration =
                Math.random() * 3 + 2;

            star.style.left =
                Math.random() * 100 + "%";

            star.style.top =
                Math.random() * 100 + "%";

            star.style.width =
                size + "px";

            star.style.height =
                size + "px";

            star.style.setProperty(
                "--twinkle-time",
                duration + "s"
            );

            star.style.animationDelay =
                Math.random() * 4 + "s";

            starField.appendChild(star);
        }

    }


    // =====================================
    // PLANET CLICK
    // =====================================

    const planets =
        document.querySelectorAll(
            ".universe-planet"
        );


    planets.forEach(planet => {

        planet.addEventListener(
            "click",
            () => {

                const target =
                    planet.dataset.target;

                const title =
                    planet.dataset.title;


                const icon =
                    planet.querySelector(
                        ".planet-icon"
                    );


                // tampilkan zoom

                if (zoomOverlay) {

                    zoomOverlay.classList.add(
                        "active"
                    );

                }


                if (zoomTitle) {

                    zoomTitle.textContent =
                        title;

                }


                if (zoomIcon && icon) {

                    zoomIcon.textContent =
                        icon.textContent;

                }


                // =================================
                // ZOOM SELESAI
                // =================================

                setTimeout(() => {

                    if (zoomOverlay) {

                        zoomOverlay.classList.remove(
                            "active"
                        );

                    }


                    // masuk ke section

                    if (target) {

                        const destination =
                            document.querySelector(
                                target
                            );

                        if (destination) {

                            destination.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }

                }, 1700);

            }
        );

    });

});
