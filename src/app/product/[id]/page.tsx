interface Props {
  className?: string
  params: {
    id: string
  }
}
export default function ProductPage({ className, params }: Props) {
  return (
    <section className={className}>
      <p>Product {params.id}</p>
    </section>
  )
}
