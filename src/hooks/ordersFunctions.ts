import { constants } from "../utils/data";
import { TOrderData, TIngredient } from "../utils/typeData";

export const getOrderNumbers = (orders: TOrderData[]) => {
  return orders.slice(0, 50).reduce(
    (item: { done: number[]; pending: number[] }, curr: TOrderData) => {
      curr.status === constants.status.done
        ? item.done.push(curr.number)
        : item.pending.push(curr.number);
      return item;
    },
    { done: [], pending: [] }
  );
};

export const getOrderDate = (order: TOrderData) => {
  if (order) {
    const date = new Date();
    const orderDate = new Date(order.createdAt);
    const hours =
      orderDate.getHours() > 9
        ? `${orderDate.getHours()}`
        : `0${orderDate.getHours()}`;
    const minutes =
      orderDate.getMinutes() > 9
        ? `${orderDate.getMinutes()}`
        : `0${orderDate.getMinutes()}`;

    return `${CreatedOrderDay(date, orderDate)} ${hours}:${minutes}`;
  }
};

const CreatedOrderDay = (date: Date, orderDate: Date) => {
  const dateNum = Date.parse(date.toISOString().slice(0, 10));
  const orderDateNum = Date.parse(orderDate.toISOString().slice(0, 10));
  return dateNum - orderDateNum === 0
    ? constants.date.day_today
    : (dateNum - orderDateNum) / constants.date.date_num === 1
    ? constants.date.day_yesterday
    : `${(dateNum - orderDateNum) / constants.date.date_num}  ${
        constants.date.day_back
      }`;
};

export const getOrderStatus = (
  status: string,
  Styles: { [key: string]: string }
) => {
  return status === constants.status.done
    ? { nameStatus: constants.nameStatus.completed, colorStatus: Styles.doneColor }
    : status === constants.status.pending
    ? { nameStatus: constants.nameStatus.preparing, colorStatus: Styles.pendingColor }
    : { nameStatus: constants.nameStatus.cancelled, colorStatus: Styles.cancelledColor };
};

export const getOrderIngredients = (
  ingredients: string[],
  allIngredients: TIngredient[]
) => {
  return ingredients
    .map((id: string) =>
      allIngredients.filter((item: TIngredient) => item._id === id)
    )
    .flat();
};

export const getItemsPrice = (ingredients: TIngredient[]) => {
  return ingredients.reduce(
    (item: number, curr: TIngredient) =>
      curr.type === constants.bun ? 2 * curr.price + item : item + curr.price,
    0
  );
};

export const getQuantityItems = (ingredients: string[]) => {
  const quantityItems = {};
  ingredients.reduce((item: { [key: string]: number }, el: string) => {
    item[el] = (item[el] || 0) + 1;
    return item;
  }, quantityItems);
  return quantityItems;
};
