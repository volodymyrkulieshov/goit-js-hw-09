!function(){var t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};t.startBtn.addEventListener("click",a),t.stopBtn.addEventListener("click",(function(e){clearInterval(n),t.startBtn.disabled=!1,t.startBtn.addEventListener("click",a),t.stopBtn.disabled=!0}));var n=null;function a(a){n=setInterval(e,1e3),t.stopBtn.disabled=!1}function e(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.stopBtn.disabled=!0}();
//# sourceMappingURL=01-color-switcher.5f6a5802.js.map
