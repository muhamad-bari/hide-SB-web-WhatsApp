(function() {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `
        /* SELECTOR KUNCI: div:has(> #side)
           Artinya: Cari DIV bapak yang punya anak langsung #side.
           Ini akan menargetkan wrapper "_aigw..." yang bikin blank space itu.
        */
        body.wa-fullscreen-mode div:has(> #side) {
            display: none !important;
            width: 0 !important;
        }

        body.wa-fullscreen-mode #main {
            width: 100% !important;
            flex: 1 1 100% !important;
            min-width: 0 !important; /* Mencegah overflow flex */
        }
        
        /* Tombol Toggle tetap sama */
        #custom-wa-toggle {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 99999;
            background-color: #00a884;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s;
        }
        
        #custom-wa-toggle:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    function toggleFullscreen() {
        document.body.classList.toggle('wa-fullscreen-mode');
        
        const btn = document.getElementById('custom-wa-toggle');
        const isHidden = document.body.classList.contains('wa-fullscreen-mode');
        
        // Ganti ikon
        btn.innerHTML = isHidden ? '☰' : '✕';
        btn.title = isHidden ? "Show Sidebar" : "Hide Sidebar";
    }

    function createToggleButton() {
        if (document.getElementById('custom-wa-toggle')) return;

        const btn = document.createElement('button');
        btn.id = 'custom-wa-toggle';
        btn.innerHTML = '✕'; 
        btn.onclick = toggleFullscreen;
        
        document.body.appendChild(btn);

        // Auto-run saat pertama kali di-inject
        toggleFullscreen();
    }

    setTimeout(createToggleButton, 500);

})();
