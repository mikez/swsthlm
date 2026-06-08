(function() {
  function escapeCsv(str) {
    if (!str) return '';
    str = str.replace(/"/g, '""');
    if (str.search(/("|,|\n|\r)/g) >= 0) {
      str = `"${str}"`;
    }
    return str;
  }

  // 1. id
  let id = Math.floor(Math.random() * 1000000000);

  // 2. title
  let titleEl = document.querySelector('h1');
  let title = titleEl ? titleEl.innerText.trim() : '';

  // 3. status
  let status = 'live';

  // 4. date
  let dateText = '';
  document.querySelectorAll('.blogpost5_author-wrapper').forEach(wrapper => {
    let label = wrapper.querySelector('.text-weight-semibold-3');
    if (label && label.innerText.trim() === 'Datum') {
      let val = wrapper.querySelector('.text-size-small');
      if (val) dateText = val.innerText.trim();
    }
  });

  let dateObj = new Date();
  let currentYear = dateObj.getFullYear();
  let dateFormatted = '';
  if (dateText) {
    let parts = dateText.split(' ');
    let datePart = parts[parts.length - 1]; // "13/6"
    let dm = datePart.split('/');
    if (dm.length === 2) {
      let d = dm[0].padStart(2, '0');
      let m = dm[1].padStart(2, '0');
      dateFormatted = `${currentYear}-${m}-${d}`;
    }
  }

  // 5. start, 6. end
  let start = '';
  let end = '';
  document.querySelectorAll('.blogpost5_author-wrapper').forEach(wrapper => {
    let label = wrapper.querySelector('.text-weight-semibold-3');
    if (label && label.innerText.trim() === 'Tid') {
      let val = wrapper.querySelector('.text-size-small');
      if (val) {
        let tidText = val.innerText.trim(); // "20:00 – 23:00"
        let parts = tidText.split(/[-–]/).map(p => p.trim());
        if (parts.length >= 2) {
          start = parts[0];
          end = parts[1];
        }
      }
    }
  });

  // 7. venue, 8. address
  let venue = 'Chicago Swing Dance Studio';
  let address = 'Hornsgatan 75';

  // 9. style
  let style = 'all'; 
  
  let bodyText = '';
  let bodyEl = document.querySelector('.text-rich-text.w-richtext');
  if (bodyEl) {
    let pTags = Array.from(bodyEl.querySelectorAll('p')).map(p => p.innerText.trim()).filter(t => t);
    bodyText = pTags.join('\n\n');
  }

  let lbody = bodyText.toLowerCase();
  if (lbody.includes('balboa')) style = 'balboa';
  else if (lbody.includes('shag')) style = 'shag';
  else if (lbody.includes('lindy') || lbody.includes('lindy hop')) style = 'lindy hop';

  // 10. organizer
  let organizer = 'Chicago Swing Dance Studio';

  // 11. band, 12. dj
  let band = '';
  let dj = '';
  let djMatch = bodyText.match(/DJ:?\s*([A-Za-zåäöÅÄÖ"'\s]+)/i);
  if (djMatch && djMatch[1]) {
    dj = djMatch[1].split('\n')[0].trim();
  }
  
  // 13. ticket
  let ticket = window.location.href; 
  let ticketBtn = document.querySelector('a.button.is-small.is-standard');
  if (ticketBtn && ticketBtn.href) {
    if (!ticketBtn.href.endsWith('#') && !ticketBtn.href.endsWith('/#')) {
      ticket = ticketBtn.href;
    }
  }

  // Combine to row
  // To prevent newlines in the body from breaking spreadsheet pasting, 
  // we replace them with a space.
  bodyText = bodyText.replace(/\r?\n|\r/g, '  ');

  let row = [
    id, title, status, dateFormatted, start, end, venue, address, style, organizer, band, dj, ticket, bodyText
  ];

  let rowCsv = row.map(escapeCsv).join(',');

  // Using a temporary textarea to run execCommand copy
  const textArea = document.createElement('textarea');
  textArea.value = rowCsv;
  // Make it hidden to avoid page reflow
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    alert('✅ Event data copied to clipboard!\n\nYou can now paste it into your spreadsheet.');
  } catch (err) {
    alert('❌ Failed to copy to clipboard.');
    console.error('Copy failed', err);
  }
  
  document.body.removeChild(textArea);
})();
