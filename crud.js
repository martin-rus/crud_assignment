 
var selectedRow=null;

function showAlert(message,className)
{
	const div=document.createElement("div");
	 div.className='alert alert-${className}';
	 
	 div.appendChild(document.createTextNode(message));
	 const container=document.querySelector(".container");
	 const main=document.querySelector(".main");
	 container.insertBefore(div,main);
	 
	 setTimeout(() => document.querySelector(".alert").remove(),3000);
}

function clearFields()
{
	document.querySelector("#v_id").value="";
	document.querySelector("#v_name").value="";
	document.querySelector("#v_type").value="";
	document.querySelector("#v_price").value="";
	document.querySelector("#v_color").value="";
}

document.querySelector("#vehicle-form").addEventListener("submit",(e) =>{
	e.preventDefault();
	
	const vehicle_id=document.querySelector("#v_id").value; 
	const vehicle_name=document.querySelector("#v_name").value; 
	const vehicle_type=document.querySelector("#v_type").value; 
	const vehicle_price=document.querySelector("#v_price").value; 
	const vehicle_color=document.querySelector("#v_color").value; 
	
	if(vehicle_id=="" || vehicle_name=="" || vehicle_type=="" || vehicle_price=="" || vehicle_color==""){
		showAlert("Please fill all fields","danger");
	}
	else{
		if(selectedRow==null){
			const list=document.querySelector("#vehicle-list");
			const row=document.createElement("tr");
			
			row.innerHTML=`
		    <td>${vehicle_id}</td>
			<td>${vehicle_name}</td>
			<td>${vehicle_type}</td>
			<td>${vehicle_price}</td>
	        <td>${vehicle_color}</td>
			<td>
			<a href="#" class="btn btn-warning btn-sm edit">Edit</a>
			<a href="#" class="btn btn-danger btn-sm delete">Delete </a> 
			`;
			list.appendChild(row);
			selectedRow=null;
			showAlert("Vehicle record added","success");
		}
		else{
			selectedRow.children[0].textContent=vehicle_id;
			selectedRow.children[1].textContent=vehicle_name;
			selectedRow.children[2].textContent=vehicle_type;
			selectedRow.children[3].textContent=vehicle_price;
			selectedRow.children[4].textContent=vehicle_color;
			selectedRow=null;
			showAlert("Vehicle information updated","info");
		}
		clearFields();
			
			
	}
});

document.querySelector("#vehicle-list").addEventListener("click",(e)=>{
	target=e.target;
	if(target.classList.contains("edit")){
		selectedRow=target.parentElement.parentElement;
		document.querySelector("#v_id").value=selectedRow.children[0].textContent;
		document.querySelector("#v_name").value=selectedRow.children[1].textContent;
		document.querySelector("#v_type").value=selectedRow.children[2].textContent;
		document.querySelector("#v_price").value=selectedRow.children[3].textContent;
		document.querySelector("#v_color").value=selectedRow.children[4].textContent;
		
	}
});

document.querySelector("#vehicle-list").addEventListener("click",(e)=>{
	target=e.target;
	if(target.classList.contains("delete")){
		target.parentElement.parentElement.remove();
		showAlert("Vehicle data removed","danger");
	}
});