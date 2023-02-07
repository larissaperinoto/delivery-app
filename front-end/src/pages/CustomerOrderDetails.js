import React, { useEffect, useState } from 'react';
import CustomerSaleDetailsCard from '../components/CustomerSaleDetailsCard';
import Navbar from '../components/Navbar';
import { getSaleById } from '../services/requests';

export default function CustomerOrderDetails() {
  const [sale, setSale] = useState('');

  useEffect(() => {
    const requestSaleId = async () => {
      const saleId = window.location.pathname.split('/')[3];
      const saleObject = await getSaleById(saleId);
      setSale(saleObject[0]);
    };
    requestSaleId();
  }, []);

  const formatDate = (date) => {
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    const day = date.split('-')[2].split('T')[0];
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Navbar />
      { sale && <CustomerSaleDetailsCard
        saleId={ sale.id }
        seller={ sale.sellerInfos.name }
        saleDate={ formatDate(sale.saleDate) }
        status={ sale.status }
        products={ sale.sales_products }
        totalPrice={ sale.totalPrice.replace('.', ',') }
      />}
    </>
  );
}
