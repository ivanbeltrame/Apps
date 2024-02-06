if (localStorage.getItem('apiKey')) {
    document.getElementById('apiKey').value = localStorage.getItem('apiKey');
}
if (localStorage.getItem('phone')) {
    document.getElementById('phone').value = localStorage.getItem('phone');
}

function send() {
    let phone = document.getElementById('phone').value.replace(" ", "");
    let message = encodeURI(document.getElementById('message').value);
    let apikey = document.getElementById('apiKey').value;
    let rememberCredentials = document.getElementById('rememberCredentials').checked;
    let htmlConsole = document.getElementById('console');

    if (!/^\+[\d ]{12}$/.test(phone)) {
        htmlConsole.value += "Invalid phone number; Must be in international format\n";
        htmlConsole.scrollTop = htmlConsole.scrollHeight;
        return;
    }

    if (apikey == "") {
        htmlConsole.value += "API Key is required\n";
        htmlConsole.scrollTop = htmlConsole.scrollHeight;
        return;
    }
    if (rememberCredentials) {
        localStorage.setItem('apiKey', apikey);
        localStorage.setItem('phone', phone);
    } else {
        localStorage.removeItem('apiKey');
        localStorage.removeItem('phone');
    }

    if (message == "") {
        htmlConsole.value += "Message is required\n";
        htmlConsole.scrollTop = htmlConsole.scrollHeight;
        return;
    }

    let url = "https://api.callmebot.com/whatsapp.php?phone=" + phone + "&text=" + message + "&apikey=" + apikey;

    fetch(url)
    .then(response => {
        console.log(response.body);
        htmlConsole.value += response.body + "\n";
        htmlConsole.scrollTop = htmlConsole.scrollHeight;
    }).catch(error => {
        console.log(error);
        // htmlConsole.value += error + "\n";
        // htmlConsole.scrollTop = htmlConsole.scrollHeight;
    })
    .finally(() => {
       htmlConsole.value += "Message sent\n";
       htmlConsole.scrollTop = htmlConsole.scrollHeight;
    });
}