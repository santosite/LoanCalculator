// 
// 
document.getElementById("loader").style.display="none"
document.getElementById("results").style.display="none"


// listen for submit buton
submitBtn = document.getElementById("loan-form")

submitBtn.addEventListener("submit",function(e){
    document.getElementById("results").style.display = "none";
    document.getElementById("loader").style.display = "block"
    setTimeout(calculateResults,2000);
    e.preventDefault();
});

submitBtn.addEventListener("reset",function(e){
    location.reload();
});
function calculateResults(e){
    // Retrieve UI Values
    const loanAmountUI = document.getElementById("amount");
    const interestRateUI = document.getElementById("interest");
    const yearsUI = document.getElementById("years");

    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interests");

    console.log(loanAmountUI.value, interestRateUI.value, yearsUI.value);
    // Calculate Values
    const principal = parseFloat(loanAmountUI.value);
    const calculatedInterest = parseFloat(interestRateUI.value)/100/12;
    const calculatedPayments = parseFloat(yearsUI.value)*12

    // Compute Monthly payments
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    //Validate that the value is not infinite
    if(isFinite(monthly)){
        // console.log(monthly) 
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = (monthly*calculatedPayments - principal).toFixed(2);
    
    // Display results
        document.getElementById("loader").style.display = "none";
        document.getElementById("results").style.display = "block"
    }else{
       manageError("Please, review your input");
       document.getElementById("loader").style.display = "none";
        document.getElementById("results").style.display = "none"
    }
}
function manageError(errorMsg){
    // Get Node where the error windows will be displayed
    const card = document.querySelector(".card")
    const heading = document.querySelector(".heading")

    // Create division to show error
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger"
    errorDiv.id = "customAlert"
    // Create text node and append it to div
    const errorTextNode = document.createTextNode(errorMsg)
    errorDiv.appendChild(errorTextNode)
    
    // Insert error MSG above 
    card.insertBefore(errorDiv,heading)
    window.setTimeout(clearError,3000) //Ejecuta funcion despues de tms
    console.log(errorDiv);

}

function clearError(){
    document.getElementById("customAlert").remove(); //Remueve la alerta de la pantalla
}
