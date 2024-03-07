const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let i = interestRate / 12 / 100;

let myChart;

const displayChart = (totalInterestPayableValue) => {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
        type: "pie",
        data: {
        labels: ["Estimated Return", "Invested Amount"],
        datasets: [
            {

                data: [totalInterestPayableValue, loanAmount],
                backgroundColor: ["#008080", "#f85b75"],
                borderWidth: 0,
            },

        ],
    },
});
};

const updateChart = (totalInterestPayableValue) => {
    myChart.data.datasets[0].data[0] = totalInterestPayableValue;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();

};

const calculateEmi = () => {
    let emi = loanAmount * i * (Math.pow(1 + i, loanTenure) / (Math.pow(1 + i, loanTenure) - 1));

    return emi;
};


const updateData = (emi) => {
    loanEMIValue.innerHTML = Math.round(emi);

    let ta = Math.round(loanTenure * emi);
    totalAmountValue.innerHTML = ta;

    let tip = Math.round(ta - loanAmount);
    totalInterestValue.innerHTML = tip;

    if (myChart) {
        updateChart(tip);
      } else {
        displayChart(tip);
      }

};

const init = () => {
    let emi = calculateEmi();
    updateData(emi);
};

init();

const refreshInputValues = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    i = interestRate / 12 / 100;
}

calculateBtn.addEventListener("click", () => {
    refreshInputValues();
    let emi = calculateEmi();
    updateData(emi);
})
