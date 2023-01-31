// const { token } = JSON.parse(localStorage.getItem('userData'));

export async function requestProducts() {
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/products`, {
    method: 'GET',
  });
  const products = await response.json();
  return products;
}

export async function postLogin(email, password) {
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const userData = await response.json();
  return userData;
}

export async function postRegistration(body, token = '', url = '') {
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/register${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
  const message = await response.json();
  return message;
}

export async function customerOrders(token) { // Retorna todos os pedidos que um usuário já fez
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/customer/orders`, {
    method: 'GET',
    Authorization: token,
  });
  const orders = await response.json();
  return orders;
}

export async function sellerOrders(sellerId) {
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/seller/orders/${sellerId}`, {
    method: 'GET',
  });
  const sellerProduct = await response.json();
  return sellerProduct;
}

export async function getAllSellers() { // Retorna tas as pessoas que são vendedoras
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/sellers`, {
    method: 'GET',
  });
  const sellers = await response.json();
  return sellers;
}
