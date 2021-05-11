const newFormHandler = async (event) => {
  event.preventDefault();

  const billName = document.querySelector('#bill-name').value.trim();
  const billAmount = document.querySelector('#bill-amount').value.trim();
  const dueDate = document.querySelector('#due-date').value.trim();
  const billType = document.querySelector('#bill-type').value.trim();

  if (billName && billAmount && dueDate && billType) {
    const response = await fetch(`/api/bills`, {
      method: 'POST',
      body: JSON.stringify({ name:billName, bill_amount:billAmount, due_date:dueDate, bill_type:billType }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      console.log("Hello!")
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/bills/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-bill-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.bill-list')
  .addEventListener('click', delButtonHandler);
