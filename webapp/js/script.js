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
});

