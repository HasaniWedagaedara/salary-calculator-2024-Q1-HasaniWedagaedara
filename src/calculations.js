
const calculateSalary = (basicSalary, earnings, deductions) => {
  let totalEarnings = basicSalary;
  earnings.forEach((earning) => {
    totalEarnings += parseInt(earning.amount, 10);
  });

  let epfAllowances = 0;
  earnings.filter((earning) => earning.epf).forEach((earning) => {
    epfAllowances += parseInt(earning.amount, 10);
  });

  let totalEarningsForEPF = basicSalary + epfAllowances;

  let grossDeductions = 0;
  deductions.forEach((deduction) => {
    grossDeductions += parseInt(deduction.amount, 10);
  });

  let grossEarnings = totalEarnings - grossDeductions;
  let grossSalaryForEPF = totalEarningsForEPF - grossDeductions;

  let apit = 0;
  if (grossSalaryForEPF > 25500) {
    apit = (grossSalaryForEPF - 25500) * 0.18;
  }

  const employeeEPF = grossSalaryForEPF * 0.08;
  const netSalary = grossEarnings - employeeEPF - apit;

  const employerEPF = grossSalaryForEPF * 0.12;
  const employerETF = grossSalaryForEPF * 0.03;
  const costToCompany = grossEarnings + employerEPF + employerETF;

  return {
    basicSalary,
    grossEarnings,
    grossDeductions,
    grossSalaryForEPF,
    employeeEPF,
    apit,
    netSalary,
    employerEPF,
    employerETF,
    costToCompany,
  };
};

export default calculateSalary;