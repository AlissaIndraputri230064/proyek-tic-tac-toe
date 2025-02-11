//alert set
document.addEventListener("DOMContentLoaded", function () {
    const alertBox = document.getElementById('formAlert');
    const alertContent = document.querySelector('.alertContent'); 
    const okButton = document.getElementById('okButton');

    function showAlert() {
        alertBox.style.display = 'flex';
    }

    function hideAlert() {
        alertBox.style.display = 'none';
    }

    okButton.addEventListener("click", hideAlert);

    // Validasi Form
    function validateForm() {
        let formX = document.getElementById('inputX').value;
        let formO = document.getElementById('inputO').value;

        if (formX.trim() === '' || formO.trim() === '') {
            showAlert();
            return false; 
        }
        return true;
    }
    window.validateForm = validateForm;
});
