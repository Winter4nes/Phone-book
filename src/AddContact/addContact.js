import ContactsBook from "../Module.js"
import * as constants from "../constants";

export default class NewContact {
    constructor() {
    }

    onload() {
        const book = new ContactsBook();
        const addContactFunc = this;
        const addButton = document.querySelector('.ls-inner__add-contact__wrapper');

        addButton.addEventListener('click', () => {
            book.clearMainBlock();
            fetch('./AddContact/AddContact.html')
                .then(response => {
                    return response.text().then(function (text) {
                        constants.MAIN_RSIDE_BLOCK.innerHTML = text;
                    })
                })
                .then(function () {
                    book.mobileOpen();
                    addContactFunc.saveContact();
                    addContactFunc.cancelSavingInfo();
                })
        })
    }

    saveContact() {
        const saveButton = document.querySelector('.add-contact__buttons__save');

        let nameVal = document.querySelector('#addContact-name');
        let surNameVal = document.querySelector('#addContact-surname');
        let descVal = document.querySelector('#addContact-desc');
        let phoneVal = document.querySelector('#addContact-phone');
        let emailVal = document.querySelector('#addContact-email');
        let birthdayVal = document.querySelector('#addContact-birthday');
        let infoVal = document.querySelector('#addContact-information');
        let facebookVal = document.querySelector('#addContact-facebook');
        let instagrammVal = document.querySelector('#addContact-instagramm');

        let dataArray = [nameVal, surNameVal, descVal, phoneVal, emailVal, birthdayVal, infoVal];
        let newContact = {};

        saveButton.addEventListener('click', function save() {
            dataArray.forEach(elem => {
                elem.classList.remove('wrong-info');

                if (elem.value.length != 0) {
                    newContact.name = nameVal.value;
                    newContact.surname = surNameVal.value;
                    newContact.position = descVal.value;
                    newContact.email = [`${emailVal.value}`];
                    newContact.phone = [{
                        category: "mobile",
                        value: phoneVal.value
                    }];
                    newContact.bornDate = `${birthdayVal.value}`;
                    newContact.information = `${infoVal.value}`;


                } else {
                    elem.classList.add('wrong-info');
                }


            });

            let JSONcontact = JSON.stringify(newContact);
            console.log(JSONcontact.length);

            if (JSONcontact.length != 0) {
                fetch('http://phonebook.hillel.it/api/phonebook', {
                    method: 'POST',
                    body: JSONcontact,
                    credentials: "include",
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log(response)
                        console.log(response.text())
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }

    cancelSavingInfo() {
        const cancelButton = document.querySelector('.add-contact__buttons__cancel');
        const book = new ContactsBook();
        let mainLeftBlock = document.querySelector('.main__left-side');

        cancelButton.addEventListener('click', () => {
            book.clearMainBlock();
            if (document.documentElement.clientWidth <= 720) {
                mainLeftBlock.style.display = 'block';
            }
        });
    }
}