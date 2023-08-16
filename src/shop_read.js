let shop = document.getElementById("shop");

let cart = JSON.parse(localStorage.getItem("games")) || [];

let generateshop = () => {
	return (shop.innerHTML = shopItemsData
		.map((x) => {
			let { id, name, price, img } = x;
			return `
        <div id=product-id-${id} class="product" >
            <h2 id="pname">${name}</h2>
				<img
					src=${img}
					alt=""
					srcset=""
				/>
				<p id="price">$ ${price}</p>
				<a>
                    <div onclick="addtocart(${id})" class="cart">
					<div id=${id}></div>
                        <i class="fa-solid fa-cart-plus"></i>
                    </div>
                </a>
				<button type="button">Like</button>
        </div>
        `;
		})
		.join(""));
};

generateshop();

let addtocart = (id) => {
	let selectedItem = id;
	let search = cart.find((x) => x.id === selectedItem.id);
	if (search === undefined) {
		cart.push({
			id: selectedItem.id,
			item: 1,
		});
	} else {
		search.item += 1;
	}

	localStorage.setItem("games", JSON.stringify(cart));
};
