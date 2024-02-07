window.onload = function() {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    for (var i = 0; i < contacts.length; i++) {
        addContactToTable(contacts[i]);
    }

    // Ajustar a margem inferior do conteúdo de acordo com a altura do footer
    var footerHeight = document.querySelector('footer').offsetHeight;
    document.getElementById('content').style.marginBottom = footerHeight + 'px';
};

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;

    var contact = {
        name: name,
        phone: phone,
        email: email
    };

    addContactToTable(contact);

    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));

    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';

    // Exibir uma mensagem de sucesso
    showMessage('Contato cadastrado com sucesso!');
});

function addContactToTable(contact) {
    var table = document.getElementById('contacts-list');
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.textContent = contact.name;
    cell2.textContent = contact.phone;
    cell3.textContent = contact.email;

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.className = 'delete-btn';
    cell4.appendChild(deleteButton);

    deleteButton.onclick = function() {
        var row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);

        var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        var index = contacts.findIndex(function(c) {
            return c.name === contact.name && c.phone === contact.phone && c.email === contact.email;
        });
        if (index !== -1) {
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }

        // Exibir uma mensagem de sucesso
        showMessage('Contato excluído com sucesso!');
    };
}

// Função para exibir uma mensagem
function showMessage(message) {
    var messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';

    // Ocultar a mensagem após 3 segundos
    setTimeout(function() {
        messageDiv.style.display = 'none';
    }, 2000);
}