document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['content.js']
    }, (results) => {
      if (results && results[0] && results[0].result) {
        document.getElementById('csvOutput').value = results[0].result;
      } else {
        document.getElementById('csvOutput').value = "Error: Could not scrape page or no data found.";
      }
    });
  });

  document.getElementById('copyBtn').addEventListener('click', () => {
    const textarea = document.getElementById('csvOutput');
    textarea.select();
    document.execCommand('copy');
    const btn = document.getElementById('copyBtn');
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = "Copy to Clipboard"; }, 2000);
  });
});
