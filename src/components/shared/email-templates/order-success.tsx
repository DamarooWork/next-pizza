import { cn } from '@/lib/utils'
import { CartItemDTO } from '@/services/dto/cart.dto'

interface Props {
  orderId: number
  items: CartItemDTO[]
  address: string
  phone: string
  className?: string
}
export function OrderSuccessTemplate({
  orderId,
  items,
  address,
  phone,
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
      <p>Ваш заказ #{orderId} успешно оплачен и принят в обработку.</p>
      <hr/>
      <p>Список товаров:</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.productItem.product.name}</strong> |{' '}
            {item.productItem.price}  × {item.quantity} шт. ={' '}
            {item.productItem.price * item.quantity} руб. 
          </li>
        ))}
      </ul>
      <p>
        Детали заказа:
        <ul>
          <li>
            <strong>Адрес:</strong> {address}
          </li>
          <li>
            <strong>Телефон:</strong> {phone}
          </li>
        </ul>
      </p>

      <p>
        Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами по адресу{' '}
        <a href="mailto:levkichigin@yandex.ru">levkichigin@yandex.ru</a>.
      </p>
      <img
        className="size-80 aspect-square"
        src="https://i.pinimg.com/736x/0f/9a/ff/0f9aff5fc8a976ef0f4a1babc5a1a27c.jpg"
        alt="Котик"
      />
    </section>
  )
}
