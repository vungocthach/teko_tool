const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${window.electronAPI.versions.chrome()}), Node.js (v${window.electronAPI.versions.node()}), and Electron (v${window.electronAPI.versions.electron()})`;
