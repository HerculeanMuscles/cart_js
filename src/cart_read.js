let user_cart_item = document.getElementById("user-cart");
let user_cart_total = document.getElementById("cart-add");

let cart = JSON.parse(localStorage.getItem("games")) || [];

let generateCartItem = () => {
	if (cart.length !== 0) {
		return (user_cart_item.innerHTML = cart
			.map((x) => {
				console.log(x);
				let { id, item } = x;
				let search = shopItemsData.find((y) => y.id === id) || [];
				let { name, price, img } = search;
				return `
                <tr>

                    <td><i onclick="removeItem(${id})" class="fa-regular fa-circle-xmark"></i><a href="#"></a></td>
                    
                    <td><img src=${img} alt=""></td>
                    
                    <td>${name}</td>

                    <td>$ ${price}</td>

                    <td>

                    <div class="edit-details">
                    <i onclick= "decrement(${id})" class="fa-solid fa-minus"></i>
                    <div id=${id}>
                    ${item}
                    </div>
                    <i onclick= "increment(${id})" class="fa-solid fa-plus"></i>
                    </div>

                    </td>

                    <td>$ ${item * search.price}</td>

                </tr>
            `;
			})
			.join(""));
	} else {
		return (user_cart_item.innerHTML = `
            <tr> 
            <td><div>Cart is empty</div></td>
            <td><a href="index.html">
            <button class="normal button">Shop here</button>
            </a></td>
            </tr>
            
        `);
	}
};

generateCartItem();

let increment = (id) => {
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

	generateCartItem();
	update(selectedItem.id);
	localStorage.setItem("games", JSON.stringify(cart));
};

let decrement = (id) => {
	let selectedItem = id;
	let search = cart.find((x) => x.id === selectedItem.id);

	if (search === undefined) return;
	else if (search.item === 0) return;
	else {
		search.item -= 1;
	}

	update(selectedItem.id);
	cart = cart.filter((x) => x.item !== 0);
	generateCartItem();
	localStorage.setItem("games", JSON.stringify(cart));
};

let update = (id) => {
	let search = cart.find((x) => x.id === id);

	document.getElementById(id).innerHTML = search.item;
	totalAmount();
};

let removeItem = (id) => {
	let selectedItem = id;
	cart = cart.filter((x) => x.id !== selectedItem.id);
	generateCartItem();
	totalAmount();
	localStorage.setItem("games", JSON.stringify(cart));
};

let clearCart = () => {
	cart = [];
	generateCartItem();
	totalAmount();
	localStorage.setItem("games", JSON.stringify(cart));
};

let totalAmount = () => {
	if (cart.length !== 0) {
		let amount = cart
			.map((x) => {
				let { item, id } = x;
				let search = shopItemsData.find((y) => y.id === id) || [];

				return item * search.price;
			})
			.reduce((x, y) => x + y, 0);
		console.log(amount);
		return (user_cart_total.innerHTML = `
        <div id="subtotal">
        <h3>Cart Total</h3>
        <table>
            <tr>
                <td><strong>Total</strong></td>
                <td><strong>$ ${amount}</strong></td>
            </tr>

        </table>
        <input type="submit" value="Submit" id="buttonstl" onclick="handleSubmit(event)">
        <button onclick="clearCart()" id="clear-items" class="normal">Clear</button>
        </div>
        `);
	} else
		return (user_cart_total.innerHTML = `
    `);
};
totalAmount();
