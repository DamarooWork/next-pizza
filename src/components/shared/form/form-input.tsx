
interface Props {
  name: string
  label?: string
  required?: boolean
  className?: string
}
export  function  FormInput({className, name, label, required, ...props}:Props){

  return (
    <section className={className}>
      
    </section>
  )
}