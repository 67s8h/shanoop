// --- Glitter Mouse Effect ---
const canvas = document.getElementById('glitter-canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

let sparkles = [];

window.addEventListener('mousemove', function(e) {
    for(let i=0; i<2; i++) {
        sparkles.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2 + 0.5,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.01,
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? 255 : 200
        });
    }
});

function animate() {
    ctx.clearRect(0, 0, width, height);

    for(let i = sparkles.length - 1; i >= 0; i--) {
        let s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
            sparkles.splice(i, 1);
            continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${s.color}, ${s.color}, ${s.alpha})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
    }
    requestAnimationFrame(animate);
}
animate();

// --- Scroll Reveal Animation ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
