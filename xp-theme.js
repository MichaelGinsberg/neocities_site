/* Windows XP Theme — shared behaviour */
document.addEventListener('DOMContentLoaded', function () {

  // ── TRAY VOLUME ICON ───────────────────────────────────────────────────────
  var volBtn = document.getElementById('tray-volume');
  if (volBtn) {
    var muted = false;
    volBtn.title = 'Volume — click to mute';

    volBtn.addEventListener('click', function () {
      muted = !muted;

      // Mute / unmute every <audio> and <video> on the page
      document.querySelectorAll('audio, video').forEach(function (el) {
        el.muted = muted;
      });

      // Keep in sync with the index.html WMP mute state if present
      if (typeof wmpMuted !== 'undefined') {
        wmpMuted = muted;
        var wmpBtn = document.getElementById('wmpMuteBtn');
        if (wmpBtn) wmpBtn.textContent = muted ? '🔇' : '🔊';
      }

      // Update icon and tooltip
      volBtn.textContent = muted ? '🔇' : '🔊';
      volBtn.title = muted ? 'Muted — click to unmute' : 'Volume — click to mute';
      volBtn.style.opacity = muted ? '0.55' : '1';
    });
  }


  // Minimize button — collapses window body, restores on second click
  document.querySelectorAll('.win-btn').forEach(function (btn) {
    if (btn.textContent.trim() === '─') {
      btn.title = 'Minimize';
      btn.addEventListener('click', function () {
        var win = btn.closest('.window');
        if (!win) return;
        var minimized = win.classList.toggle('minimized');
        btn.textContent = minimized ? '▭' : '─';
        btn.title       = minimized ? 'Restore' : 'Minimize';

        // Hide/show every direct child except the titlebar via inline style
        // (overrides any stylesheet including inline <style> blocks)
        Array.from(win.children).forEach(function (child) {
          if (!child.classList.contains('window-titlebar')) {
            child.style.setProperty('display', minimized ? 'none' : '', 'important');
          }
        });
      });
    }
  });

});
