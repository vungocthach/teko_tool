const information = document.getElementById('info');
const btn = document.getElementById('btn')
const filePathElement = document.getElementById('filePath')
information.innerText = `This app is using Chrome (v${electronAPI.versions.chrome()}), Node.js (v${electronAPI.versions.node()}), and Electron (v${electronAPI.versions.electron()})`;

// btn.addEventListener('click', async () => {
//     const filePath = await electronAPI.ping()
//     filePathElement.innerText = filePath
// })