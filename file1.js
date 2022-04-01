const Shirts=[
{"image":"https://i.ibb.co/VvGjZnK/s1.jpg","sizes":["S","L","XXL"], "brand":"Van Heusen","price":1299,"discount":"10%"},
{"image":"https://i.ibb.co/XyXsX4w/s2.jpg","sizes":["XS","M","XXL"], "brand":"Louis Phillipe","price":1499,"discount":"20%"},
{"image":"https://i.ibb.co/LZbmJyK/s3.jpg","sizes":["XS","S","L","XXL"], "brand":"Arrow","price":1199,"discount":"30%"},
{"image":"https://i.ibb.co/swFq71s/s4.jpg","sizes":["S","M","L"],"brand":"Blackberrys","price":849,"discount":"10%"}
];

const Sizes = ["XS","S","M","L","XL","XXL"];

const Discounts =["10%","20%","30%","None"];
const Brands =["Van Heusen","Louis Phillipe","Arrow","Blackberrys","Allen Solly"];
console.log(Shirts,Sizes,Discounts,Brands);

function Update(){
	let url=document.getElementById('url').value;
	let price=document.getElementById('price').value;
	let brand=document.getElementById('myBrandSelect').value;
	let sizeArr=[];
	for(let i=0;i<Sizes.length;i++){
		let ch=document.getElementById(Sizes[i]).checked;
		if(ch==true){
			let val=document.getElementById(Sizes[i]).value;
			sizeArr.push(val);
		}
	}
	
	let disE=document.getElementsByName('dis');
	let dis="";
	for(let i=0;i<disE.length;i++){
		if(disE[i].checked)dis=disE[i].value;
	}
	//console.log(url,price,brand,sizeArr,dis);
	
	let urlflag=priceflag=brandflag=sizeflag=disflag=false;
	if(url==""){
		showErroMsg('nameError',"URL is Mandatory");
	}else{
		urlflag=true;
	} 
	if(price==""){
		showErroMsg('priceError',"Price is Mandatory");
	}else{
		priceflag=true;
	}
	 if(brand=="0"){
		showErroMsg('brandError',"Brand is Mandatory");
	}else{
		brandflag=true;
	}
	 if(sizeArr.length==0){
		showErroMsg('sizeError',"Select atleast one size");
	}else{
		sizeflag=true;
	} 
	if(dis==""){
		showErroMsg('discError',"Discount is Mandatory");
	}else{
		disflag=true;
	}
	
	if(urlflag && priceflag && brandflag && sizeflag && disflag){
		let json={"image":url,"sizes":sizeArr, "brand":brand,"price":price,"discount":dis};
		let ind=Shirts.findIndex(srt=>srt.image==url);
		Shirts[ind].sizes=sizeArr;
		Shirts[ind].brand=brand;
		Shirts[ind].price=price;
		Shirts[ind].discount=dis;		
		alert('Shirt Update Success');
		showShirtForm();

	}
}

function editThisShirt(ul){
	//console.log(name);
	showAddShirtForm('Update','Update Shirt Details');
	let ele=Shirts.find(st=>st.image==ul);
	let {image,sizes, brand,price,discount}=ele;
	//console.log(image,sizes, brand,price,discount);

	document.getElementById('url').value=image;
	document.getElementById('url').disabled=true;
	document.getElementById('price').value=price;
	document.getElementById('myBrandSelect').value=brand;
	for(let i=0;i<Sizes.length;i++){
		for(let j=0;j<sizes.length;j++){
			if(Sizes[i]==sizes[j]){
				document.getElementById(Sizes[i]).checked=true;
			}
		}
	}

	let disE=document.getElementsByName('dis');
	for(let i=0;i<disE.length;i++){
		if(disE[i].value==discount){
			disE[i].checked=true;
			break;
		}
	}


/*


	let url=document.getElementById('url').value;
	let price=document.getElementById('price').value;
	let brand=document.getElementById('myBrandSelect').value;
	let sizeArr=[];
	for(let i=0;i<Sizes.length;i++){
		let ch=document.getElementById(Sizes[i]).checked;
		if(ch==true){
			let val=document.getElementById(Sizes[i]).value;
			sizeArr.push(val);
		}
	}
	
	let disE=document.getElementsByName('dis');
	let dis="";
	for(let i=0;i<disE.length;i++){
		if(disE[i].checked)dis=disE[i].value;
	}
	console.log(url,price,brand,sizeArr,dis);*/
}


/*---------------------------------------Show Shirt----------------------------------------------------*/

function showShirt(img){
	showShirtForm();
	let srt=Shirts.find(srt=>srt.image==img);
	let {brand,image}=srt;
	let txt='<form action = "" method = "post"><div class="showShirt" align="center">';
    txt+='<img class="imgShow" src="'+image+'"><br>';
    txt+='<p><b>'+brand+'</b></p>';
    txt+='<button type="button" onclick="editThisShirt(\''+img+'\')" class="btn btn-primary">Edit</button>';
  	txt+='</div></form>';
  	document.getElementById('showShirt').innerHTML=txt;
  	document.getElementById(image).className='cl';
}
function showShirtForm(){
	showNavbar('show');

	const arr=Shirts.map(srt=>{
		let {image,sizes,brand,price,discount}=srt;
		let txt='<li class="" id="'+image+'">';
  		txt+='<div class="di " onclick="showShirt(\''+image+'\')">';
    	txt+='<div class="dis"><img src="'+image+'"></div>';
    	txt+='<div class="did" align="center">';
    	txt+='  Brand: '+brand+'<br>';
     	txt+=' Price: '+price+'<br>';
      	txt+='Sizes: '+sizes.join(',')+'<br>';
      	txt+='Discount: '+discount+'';
   		txt+=' </div>';
  		txt+='</div>';
		txt+='</li>';
		return txt;
	});

	let str='<br><form action = "" method = "post"><ul>';
	str+=arr.join('');
	str+='</form></ul>';
	document.getElementById('add').innerHTML='';
	document.getElementById('allShirt').innerHTML=str;
}

/*-------------------------------------Show Add Shirts Form----------------------------------*/
function showAddShirtForm(btn='Submit',msg='Add a New Shirt'){
	showNavbar('add');

	let txt='<h2>'+msg+'</h2>';
	 txt+='   <label for="exampleInputEmail1">Product Image</label>';
	  txt+='  <input type="text" onchange="showErroMsg(\'nameError\')" class="form-control" id="url" aria-describedby="emailHelp" placeholder="Enter URL of product image">';
	 txt+='   <small class="error" id="nameError"></small>';
	  txt+='</div>';
  txt+='<div class="form-group">';
 txt+='   <label for="exampleInputPassword1">Price</label>';
 txt+='   <input type="number" onchange="showErroMsg(\'priceError\')" class="form-control" id="price" placeholder="Enter Price">';
 txt+='   <small class="error" id="priceError"></small>';
 txt+=' </div>';
  txt+='       <div>';
   txt+='       <select onchange="showErroMsg(\'brandError\')" class="custom-select" id="myBrandSelect">';
  	 txt+=' 	<option selected disabled value=0>Select Brand</option>';
 		let bArr=Brands.map(br=>' <option value="'+br+'">'+br+'</option>');
 		txt+=bArr.join('');
 	 txt+=' 	</select>';
 	 txt+='   <small class="error" id="brandError"></small>';
     txt+='     </div><br>';
	txt+='  <div class="form-group form-check">';
	txt+='    <label>Choose Size options</label>';
 		txt+='   <small class="error" id="sizeError"></small>';
 	let sArr=Sizes.map(s=>'<br><input type="checkbox" onchange="showErroMsg(\'sizeError\')" class="form-check-input" id="'+s+'" value="'+s+'"> '+s+'');
	txt+=sArr.join('');
	txt+='  </div>';
 	txt+=' <div class="">';
 	txt+='   <label>Choose Discount</label>';
 	let dArr=Discounts.map(dis=>'&nbsp;<input type="radio" onchange="showErroMsg(\'discError\')" name="dis" value="'+dis+'"> '+dis+'');
 	txt+=dArr.join('');
 	  txt+='   <small class="error" id="discError"></small>';
 	 txt+=' </div>';
	 	txt+='  <button type="submit" class="btn btn-primary" onclick="'+btn+'()">'+btn+'</button>';
	document.getElementById('allShirt').innerHTML='';
	document.getElementById('showShirt').innerHTML='';
	document.getElementById('add').innerHTML=txt;
}

function showErroMsg(id,msg=''){
     document.getElementById(id).innerHTML=msg;
}


/*------------------------Submit-------------------------------------------------*/

function Submit(){
	//console.log('submit clicked');
	let url=document.getElementById('url').value;
	let price=document.getElementById('price').value;
	let brand=document.getElementById('myBrandSelect').value;
	let sizeArr=[];
	for(let i=0;i<Sizes.length;i++){
		let ch=document.getElementById(Sizes[i]).checked;
		if(ch==true){
			let val=document.getElementById(Sizes[i]).value;
			sizeArr.push(val);
		}
	}
	
	let disE=document.getElementsByName('dis');
	let dis="";
	for(let i=0;i<disE.length;i++){
		if(disE[i].checked)dis=disE[i].value;
	}
	//console.log(url,price,brand,sizeArr,dis);
	
	let urlflag=priceflag=brandflag=sizeflag=disflag=false;
	if(url==""){
		showErroMsg('nameError',"URL is Mandatory");
	}else{
		urlflag=true;
	} 
	if(price==""){
		showErroMsg('priceError',"Price is Mandatory");
	}else{
		priceflag=true;
	}
	 if(brand=="0"){
		showErroMsg('brandError',"Brand is Mandatory");
	}else{
		brandflag=true;
	}
	 if(sizeArr.length==0){
		showErroMsg('sizeError',"Select atleast one size");
	}else{
		sizeflag=true;
	} 
	if(dis==""){
		showErroMsg('discError',"Discount is Mandatory");
	}else{
		disflag=true;
	}
	
	if(urlflag && priceflag && brandflag && sizeflag && disflag){
		let json={"image":url,"sizes":sizeArr, "brand":brand,"price":price,"discount":dis};
		Shirts.push(json);
		alert('Shirt Added Success');
		showShirtForm();

	}

}

/*---------------------------------------------NAV------------------*/

showNavbar();

function showNavbar(el='') {
	let txt='<nav class="navbar navbar-expand-lg navbar-dark bg-dark">';
  	txt+='<a class="navbar-brand" href="#">ShirtSite</a>';
  	txt+='<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">';
    txt+='<span class="navbar-toggler-icon"></span>';
  	txt+='</button>';
  	txt+='<div class="collapse navbar-collapse" id="navbarNav">';
    txt+='<ul class="navbar-nav">';
    let ac=(el=='add')?'active':'';
    let ac1=(el=='show')?'active':'';
    txt+='  <li class="nav-item '+ac1+'">';
    txt+='   <a class="nav-link" href="#" onclick="showShirtForm()">Shirts<span class="sr-only">(current)</span></a>';
    txt+='  </li>';
    txt+='  <li class="nav-item '+ac+'">';
    txt+='    <a class="nav-link" href="#" onclick="showAddShirtForm()">Add a Shirt</a>';
    txt+='  </li>';
    txt+='</ul>';
  	txt+='</div>';
	txt+='</nav>';
	let ele=document.getElementById('navShow').innerHTML=txt;

}