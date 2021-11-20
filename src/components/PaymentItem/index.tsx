import React from "react";
import "./styles.css";

import appApi from "../../services/appApi";
import Notification from '../../components/Notification';

export interface Payment {
  id: number;
  is_payed: number;
  title: string;
  price: number;
  date: string;
}
interface PaymentItemProps {
  payment: Payment;
}

const PaymentItem: React.FC<PaymentItemProps> = ({ payment }) => {
  async function aprove(id: number) {
    try {
      await appApi.put("aprove", {
        id,
        headers: { 'Content-Type': 'application/json'}
      });
      return Notification('success', 'Pagamento aprovado com sucesso!');
    } catch (err) {
      return Notification('danger', 'Não foi possível aprovar o pagamento!');
    }
  }

  async function disaprove(id: number) {
    try {
      await appApi.put("disaprove", {
        id,
        headers: { 'Content-Type': 'application/json'}
      });
      return Notification('success', 'Pagamento desaprovado com sucesso!');
    } catch (err) {
      return Notification('danger', 'Não foi possível desaprovar o pagamento!');
    }
  }
  const status =
    payment.is_payed === 1
      ? "Processando"
      : payment.is_payed === 2
      ? "Aprovado"
      : "Negado";

  return (
    <article className="payment-item">
      <header className="payment-container">
        <div className="informations">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>#</p>
            <strong>
              {payment.id} - {status}
            </strong>
          </div>
          <p style={{ display: "flex", flexDirection: "row" }}>
            <strong>R$ {payment.price.toFixed(2).replace(".", ",")}</strong>
            <p style={{fontSize: 12, marginLeft: 10, marginTop: 5}}>{payment.date}</p>
          </p>
        </div>
        <div className="buttons">
          {payment.is_payed !== 2 && (
            <button className="aprove" onClick={() => aprove(payment.id)}>
              Aprovar
            </button>
          )}
          {payment.is_payed === 1 && (
            <button className="disaprove" onClick={() => disaprove(payment.id)}>
              Desaprovar
            </button>
          )}
        </div>
      </header>
    </article>
  );
};

export default PaymentItem;
