import jsPDF from "jspdf";
import "jspdf-autotable";

// define a generatePDF function that accepts a data argument
const generatePDF = (data) => {
  // initialize jsPDF
  const doc = new jsPDF();
  const tableRows = [];

  // for each data item pass all its data into an array
  data.forEach(item => {
    const tableData = [
      item.date,
      item.customer,
      item.orderNum,
      item.partName,
      item.partCount,
      item.price
    ];
    tableRows.push(tableData);
  });

  const getMoneyOnOrder = () => {
    const reducedOrders = data.reduce((accumulator, item) => {
      accumulator[item.orderNum] = (accumulator[item.orderNum] || 0) + parseInt(item.price)
      return accumulator;
    }, {});
    const result = Object.keys(reducedOrders).map(key => [key, reducedOrders[key]])
    return result
  }

  const getTotalMoney = () => {
    const totalMoney = data.reduce((total, item) => {
      return total += parseInt(item.price)
    }, 0)
    return totalMoney
  }

  const getMinDate = () => {
    const min = new Date(Math.min(...data.map(item => {
      return new Date(item.date)
    }))).toISOString().substring(0, 10)
    return min
  }

  const getMaxDate = () => {
    const max = new Date(Math.max(...data.map(item => {
      return new Date(item.date)
    }))).toISOString().substring(0, 10)
    return max
  }

  const getCustomer = () => {
    const customers = data.map(item => {
      return item.customer
    })
    return [...new Set(customers)]
  }

  doc.text(`Shrnutí zakázek od ${getMinDate()} do ${getMaxDate()}.`,14,20);
  doc.text(`Zákazník: ${getCustomer().length === 1 ? getCustomer() : getCustomer().join(",")}`,14, 30)
  doc.autoTable({
    startY: 40,
    head: [["Zakázka", "Cena"]],
    body: [...getMoneyOnOrder()],
    foot: [["Cena celkem", getTotalMoney()]]
  })


  doc.autoTable({
    head: [["Datum", "Zákazník", "Zakázka", "Název dílu", "KS", "Cena"]],
    body: tableRows,
  });
  // we define the name of our PDF file.
  doc.save(`report_from${getMinDate()}to${getMaxDate()}.pdf`);
};

export default generatePDF;