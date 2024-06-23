import React, { useState } from "react";
import "../App.css";
import calculateSalary from "../calculations";

function HomePage() {
  const [basicSalary, setBasicSalary] = useState(0);
  const [earnings, setEarnings] = useState([
    { type: "earning", name: "", amount: 0, epf: false },
  ]);
  const [deductions, setDeductions] = useState([
    { type: "deduction", name: "", amount: 0, epf: false },
  ]);

  const handleBasicSalaryChange = (event) => {
    setBasicSalary(parseInt(event.target.value, 10));
  };

  const addEarning = () => {
    setEarnings([
      ...earnings,
      { type: "earning", name: "", amount: 0, epf: false },
    ]);
  };

  const handleEarningChange = (index, field, value) => {
    setEarnings(
      earnings.map((earning, i) => {
        if (i === index) {
          return { ...earning, [field]: value };
        } else {
          return earning;
        }
      })
    );
  };

  const deleteEarning = (index) => {
    setEarnings(earnings.filter((_, i) => i !== index));
  };

  const addDeduction = () => {
    setDeductions([
      ...deductions,
      { type: "deduction", name: "", amount: 0, epf: false },
    ]);
  };

  const handleDeductionChange = (index, field, value) => {
    setDeductions(
      deductions.map((deduction, i) => {
        if (i === index) {
          return { ...deduction, [field]: value };
        } else {
          return deduction;
        }
      })
    );
  };

  const deleteDeduction = (index) => {
    setDeductions(deductions.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setBasicSalary(0);
    setEarnings([{ type: "earning", name: "", amount: 0, epf: false }]);
    setDeductions([{ type: "deduction", name: "", amount: 0, epf: false }]);
  };

  const {
    grossEarnings,
    grossDeductions,
    netSalary,
    employerEPF,
    employerETF,
    grossSalaryForEPF,
  } = calculateSalary(basicSalary, earnings, deductions);

  return (
    <div className="salary-calculator-container">
      <div className="salary-calculator-card">
        <h1 className="salary-calculator-title">Calculate Your Salary</h1>
        <div className="salary-calculator-form-group">
          <label htmlFor="basicSalary" className="salary-calculator-label">
            Basic Salary
          </label>
          <input
            type="number"
            id="basicSalary"
            value={basicSalary}
            onChange={handleBasicSalaryChange}
            className="salary-calculator-input"
          />
        </div>
        <div className="salary-calculator-form-group">
          <h2 className="salary-calculator-subtitle">Earnings</h2>
          <p className="salary-calculator-description">
            Allowance, Fixed Allowance, Bonus, and etc.
          </p>
          <ul>
            {earnings.map((earning, index) => (
              <li key={index} className="salary-calculator-list-item">
                <input
                  type="text"
                  placeholder="Pay Details(Title)"
                  value={earning.name}
                  onChange={(event) =>
                    handleEarningChange(index, "name", event.target.value)
                  }
                  className="salary-calculator-input"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={earning.amount}
                  onChange={(event) =>
                    handleEarningChange(index, "amount", event.target.value)
                  }
                  className="salary-calculator-input"
                />
                <button
                  onClick={() => deleteEarning(index)}
                  className="salary-calculator-delete-button"
                >
                  <img
                    src={require("../images/d.png")}
                    alt="Delete"
                    className="salary-calculator-icon"
                  />
                </button>
                <input
                  type="checkbox"
                  checked={earning.epf}
                  onChange={(event) =>
                    handleEarningChange(index, "epf", event.target.checked)
                  }
                />
                <label htmlFor="epf">EPF/ETF</label>
              </li>
            ))}
          </ul>
          <button onClick={addEarning} className="salary-calculator-add-button">
            +Add New Allowance
          </button>
        </div>
        <div className="salary-calculator-form-group">
          <h2 className="salary-calculator-subtitle">Deductions</h2>
          <p className="salary-calculator-description">
            Salary Advances, Loan Deduction, and all.
          </p>
          <ul>
            {deductions.map((deduction, index) => (
              <li key={index} className="salary-calculator-list-item">
                <input
                  type="text"
                  placeholder="Deduction"
                  value={deduction.name}
                  onChange={(event) =>
                    handleDeductionChange(index, "name", event.target.value)
                  }
                  className="salary-calculator-input"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={deduction.amount}
                  onChange={(event) =>
                    handleDeductionChange(index, "amount", event.target.value)
                  }
                  className="salary-calculator-input"
                />
                <button
                  onClick={() => deleteDeduction(index)}
                  className="salary-calculator-delete-button"
                >
                  <img
                    src={require("../images/d.png")}
                    alt="Delete"
                    className="salary-calculator-icon"
                  />
                </button>
                <input
                  type="checkbox"
                  checked={deduction.epf}
                  onChange={(event) =>
                    handleDeductionChange(index, "epf", event.target.checked)
                  }
                />
                <label htmlFor="epf">EPF/ETF</label>
              </li>
            ))}
          </ul>
          <button
            onClick={addDeduction}
            className="salary-calculator-add-button"
          >
            +Add New Deduction
          </button>
        </div>
        <button onClick={resetForm} className="salary-calculator-reset-button">
          <img
            src={require("../images/r.png")}
            alt="Reset"
            className="salary-calculator-icon"
          />
          Reset
        </button>


      </div>
      <div className="salary-results-card">
        <h1 className="salary-calculator-title">Your Salary</h1>
        <div className="salary-calculator-results">
          <h5 className="salary-calculator-results-header">
            <span>Items</span>
            <span className="salary-calculator-float-right">Amount</span>
          </h5>
          {[
            { label: "Basic Salary", value: basicSalary },
            { label: "Gross Earning", value: grossEarnings },
            { label: "Gross Deduction", value: -grossDeductions },
            {
              label: "Employee EPF (8%)",
              value: -(grossSalaryForEPF * 0.08).toFixed(2),
            },
            {
              label: "APIT",
              value: -(grossEarnings * 0.18 - 25500).toFixed(2),
            },
            {
              label: "Net Salary (Take Home)",
              value: netSalary,
              border: true,
            },
          ].map((item, index) => (
            <p
              key={index}
              className={`salary-calculator-result-item ${item.border ? "salary-calculator-bordered" : ""
                }`}
            >
              <span>{item.label}</span>
              <span className="salary-calculator-float-right">
                {item.value}
              </span>
            </p>
          ))}
          <p className="salary-calculator-description">
            Contribution from the Employer
          </p>
          {[
            {
              label: "Employer EPF (12%)",
              value: (grossSalaryForEPF * 0.12).toFixed(2),
            },
            {
              label: "Employer ETF (3%)",
              value: (grossSalaryForEPF * 0.03).toFixed(2),
            },
            {
              label: " CTC (Cost to Company)",
              value: (grossEarnings + employerEPF + employerETF).toFixed(2),
            },
          ].map((item, index) => (
            <p key={index} className="salary-calculator-result-item">
              <span>{item.label}</span>
              <span className="salary-calculator-float-right">
                {item.value}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;