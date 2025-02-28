document.addEventListener('DOMContentLoaded', ()=>{

    let dashboardData

    fetch("/order-details", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data=>{
        console.log(data)
        dashboardData = data
        if(dashboardData){
            const orderTable = document.getElementById("orderDetails");
            for(let i=0; i<=dashboardData.length; i++){
                const timedifference = (Date.now() - new Date(dashboardData[i].date))
                const dayDifference = (timedifference/(1000 * 60 * 60 * 24))
                let status= ''
                if(dayDifference <=1 ){
                      status= 'In-Progress'
                }else if(dayDifference >1 && dayDifference <=2){
                     status = 'Dispatched'
                } else{
                    status = 'Delivered'
                }
                const row = document.createElement("tr");
                row.innerHTML= `<td>${i+1}</td>
                <td>${dashboardData[i].name}</td>
                <td>${dashboardData[i].email}</td>
                <td>${dashboardData[i].mobile}</td>
                <td>${dashboardData[i].address}</td>
                <td>${status}</td>
                `
                orderTable.appendChild(row)
            }
        }
        else{
            const orderTable = document.getElementById("orderDetails");
            const row = document.createElement("tr");
            row.innerHTML=`<td colspan=6>No Orders</td>`
        }


    }).catch(err=> console.log(err));

})