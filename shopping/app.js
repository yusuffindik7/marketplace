const productsDOM = document.querySelector(".products");
let sellers, all;

class Products {
	async getProducts(){
		try{
			let result = await fetch("https://62bae6747bdbe01d5292e5d1.mockapi.io/products");
			let products = await result.json();
			sellers = products.filter(img => {
				return img.image == "http://loremflickr.com/640/480/fashion";
			});
			all = products.filter(img => {
				return img.image != "http://loremflickr.com/640/480/fashion";
			});
			console.log(products);
			return [sellers, all];
		}catch (error){
			console.log(error);
		}
	}
}

class ShowCard {
	displayProducts(products){
	let card = "";
	let result = "";
	let allresults = "";
	let image = "";
	let title = "";
	let price = "";
	let id = "";
	sellers.forEach(item => {
		result += `
		<li>${item.seller}</li>
		`
		image = item.image;
		title = item.title;
		id = item.id;
		price = Math.min(...sellers.map(prc => prc.price));
	});
		card += `
		<li class="product">
		<a href="#">
			<img src="${image}" alt="">
			<h3>${title}</h3>
			<span class="price" style="color: red;">En uygun fiyat <span class="amount">${price}₺</span></span>
			<span class="price" style="color: black; font-size: 10px;">Tüm Satıcılar</span>
			<ul class="seller">
			${result}
			</ul>
		</a><a href="#" class="button" item-id=${id} style="float: right;">Sepete Ekle</a></li>
		`
	all.forEach(item => {
		allresults += `
		<li class="product">
		<a href="#">
			<img src="${item.image}" alt="">
			<h3>${item.title}</h3>
			<span class="price" style="color: red;"><span class="amount">${item.price}₺</span></span>
			<span class="price" style="color: black; font-size: 10px;">Tüm Satıcılar</span>
			<ul class="seller">
			${item.seller}
			</ul>
		</a><a href="#" class="button" item-id=${id} style="float: right;">Sepete Ekle</a></li>
		`
	});
	console.log(products);
	console.log(sellers);
	console.log(all);
	console.log(price);
	productsDOM.innerHTML = card + allresults;
	}

}

document.addEventListener("DOMContentLoaded", ()=>{
	const card = new ShowCard();
	const product = new Products();
	product.getProducts().then(products => {
		card.displayProducts(products);
	});
})