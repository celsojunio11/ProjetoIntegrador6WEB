import React, { useState, FormEvent, useEffect } from "react";

import PageHeader from "../../components/PageHeader";
import PaymentItem, { Payment } from "../../components/PaymentItem";
import Input from "../../components/Input";
import moment from 'moment';

import appApi from "../../services/appApi";

import "./styles.css";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [date, setDate] = useState("");

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    
    const response = await appApi.get("payments", {
      params: {
        date: date !== '' ? moment(date).format("DD/MM/YY") : ''
      }
    });

    setPayments(response.data);
  }

  useEffect(() => {
    async function searchAllTeachers() {
      const response = await appApi.get("payments", {
        params: {
          date: date !== '' ? moment(date).format("DD/MM/YY") : ''
        }
      });
  
      setPayments(response.data);
    }
    searchAllTeachers();
  }, []);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estas são as compras das aulas.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Input
            type="date"
            name="time"
            label="Data"
            value={date}
            onChange={e => {
              setDate(e.target.value);
            }}
          />

          <button onClick={searchTeachers}>Buscar</button>
        </form>
      </PageHeader>

      <main>
        {payments.map((payment: Payment) => {
          return <PaymentItem key={payment.id} payment={payment} />;
        })}
      </main>
    </div>
  );
}

export default Payments;
