import { DELIVERY_PRICE, VAT } from '@/lib'
import { cn } from '@/lib/utils'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { Order } from '@prisma/client'

interface Props {
  order: Order
  items: CartItemDTO[]

  className?: string
}
export function OrderSuccessTemplate({
  order,
  items,

  className,
}: Props) {
  return (
    <section
      className={cn(
        className,
        'bg-white p-8 rounded-lg shadow-md flex justify-center items-center'
      )}
    >
      <h1>Спасибо за ваш заказ! 🎉</h1>
      <p>
        Ваш заказ #{order.id} на сумму {order.totalAmount} руб. успешно оплачен
        и принят в обработку.
      </p>
      <hr />
      <h2>Список товаров:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.productItem.product.name}</strong> |{' '}
            {item.ingredients.length > 0 && '('}{item.productItem.price}{' '}
            {item.ingredients.length > 0 &&
              '+ ' +
                item.ingredients.map((ing, i) => (
                  <span>
                    {ing.price}({ing.name}) {i>0 && '+'}
                  </span>
                ))+')'}
            × {item.quantity} шт. ={' '}
            {(item.productItem.price +
              item.ingredients.reduce((acc, ing) => acc + ing.price, 0)) *
              item.quantity}{' '}
            руб.
          </li>
        ))}
        <li>
          <strong>Налог:</strong> {+((order.totalAmount /100) * VAT).toFixed()} руб.
        </li>
        <li>
          <strong>Доставка:</strong> {DELIVERY_PRICE} руб.
        </li>
      </ul>
      <p>
        Итого: <strong>{order.totalAmount}</strong> руб.
      </p>
      <h3>Детали заказа:</h3>
      <ul>
        <li>
          <strong>Адрес:</strong> '{order.address}'
        </li>
        <li>
          <strong>Телефон:</strong> {order.phone}
        </li>
        {order.comment && (
          <li>
            <strong>Комментарий:</strong> '{order.comment}'
          </li>
        )}
      </ul>

      <p>
        Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами по адресу{' '}
        <a href="mailto:levkichigin@yandex.ru">levkichigin@yandex.ru</a>.
      </p>
      <img
        style={{
          width: '320px',
          height: '320px',
          borderRadius: '16px',
        }}
        src="https://i.pinimg.com/736x/0f/9a/ff/0f9aff5fc8a976ef0f4a1babc5a1a27c.jpg"
        alt="Котик"
      />
    </section>
  )
}
