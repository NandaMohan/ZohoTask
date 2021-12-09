let store = []
trs.forEach(row => {
    let tds = row.querySelectorAll('td');

    let r = {}
    tds.forEach((cell, index) => {
        let columnName = ["date", "price", "gram"]
        
        r[columnName[index]] = cell.textContent.trim()
        
    });
    store.push(r)
})
