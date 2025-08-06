document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enquiry-form');
  if(form){
    form.onsubmit = async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      document.getElementById('form-result').textContent =
        res.ok ? "Thank you! We'll get back to you." : "Failed to send. Try again.";
      form.reset();
    };
  }

  const viewBtn = document.getElementById('view-contacts');
  if(viewBtn){
    viewBtn.onclick = async () => {
      const output = document.getElementById('contacts-display');
      output.textContent = 'Loading...';
      try {
        const res = await fetch('/api/contacts');
        if(!res.ok) throw new Error('Request failed');
        const contacts = await res.json();
        if(contacts.length === 0){
          output.textContent = 'No contacts found.';
          return;
        }
        output.textContent = contacts.map(c => `Name: ${c.name}\nEmail: ${c.email}\nMessage: ${c.message}\n`).join('\n');
      } catch (err) {
        output.textContent = 'Failed to load contacts.';
      }
    };
  }
});

