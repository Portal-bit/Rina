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
       5. COUNTDOWN TIMER LOGIC
       ---------------------------------------------------------------------- */
    // Silakan sesuaikan tanggal target pertemuan kamu di sini (Format: YYYY-MM-DDTHH:MM:SS)
    const targetMeetDate = new Date('2026-12-31T00:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetMeetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
            if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            if (minutesEl) minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            if (secondsEl) secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        } else {
            // Jika tanggal target sudah lewat
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
        }
    }

    // Run Countdown every second
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
        date: "14 AGUSTUS 2026",
        video: "video",
        title: "Kabar aku hari ini ❤️",
        caption: "Hari ini aku mau cerita sesuatu..."
    },

    {
        date: "13 AGUSTUS 2026",
        video: "videos/13-agustus-2026.mp4",
        title: "Kabar aku kemarin ❤️",
        caption: "Sedikit cerita dari aku untuk kamu."
    },

    {
        date: "12 AGUSTUS 2026",
        video: "videos/12-agustus-2026.mp4",
        title: "Kabar aku ❤️",
        caption: "Semoga kamu suka lihat video ini."
    },

    {
        date: "11 AGUSTUS 2026",
        video: "videos/11-agustus-2026.mp4",
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
