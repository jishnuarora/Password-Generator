const passwordBox = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const history = document.getElementById("history");
const strengthBar = document.getElementById("strengthBar");

const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const nums = "0123456789";
const syms = "!@#$%^&*()_+{}[]<>?";

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword() {

    let chars = "";

    if(document.getElementById("uppercase").checked)
        chars += upper;

    if(document.getElementById("lowercase").checked)
        chars += lower;

    if(document.getElementById("numbers").checked)
        chars += nums;

    if(document.getElementById("symbols").checked)
        chars += syms;

    if(chars === ""){
        alert("Select at least one option");
        return;
    }

    let password = "";

    for(let i=0; i<lengthSlider.value; i++){

        password += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    passwordBox.value = password;

    addHistory(password);

    checkStrength(password);
}
copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(passwordBox.value);

    copyBtn.innerText = "Copied!";

    setTimeout(() => {
        copyBtn.innerText = "Copy";
    }, 1500);
});
function addHistory(password){

    const li = document.createElement("li");

    li.textContent = password;

    history.prepend(li);

    if(history.children.length > 5){
        history.removeChild(history.lastChild);
    }
}
function checkStrength(password){

    let strength = 0;

    if(password.length >= 8) strength++;
    if(/[A-Z]/.test(password)) strength++;
    if(/[0-9]/.test(password)) strength++;
    if(/[^A-Za-z0-9]/.test(password)) strength++;

    strengthBar.style.width = strength * 25 + "%";

    if(strength <= 1){
        strengthBar.style.background = "red";
    }
    else if(strength <= 2){
        strengthBar.style.background = "orange";
    }
    else if(strength <= 3){
        strengthBar.style.background = "gold";
    }
    else{
        strengthBar.style.background = "limegreen";
    }
}
document.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");
});
