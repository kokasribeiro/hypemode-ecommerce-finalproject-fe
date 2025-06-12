import LayoutContainer from '../components/layout/LayoutContainer';
import SecondaryHeader from '../components/layout/SecondaryHeader';
import FormInput from '../components/features/FormInput';
import SuccessMessage from '../components/features/SuccessMessage';
import ButtonPrimary from '../components/features/ButtonPrimary';
import SEO from '../components/SEO';
import NewArrivals from '../sections/NewArrivals';
import NewsletterUpdates from '../sections/NewsletterUpdates';
import { useState, useEffect } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';
import { fetchProducts } from '../utils/api/mockapi';

export default function Contact() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  const { errors, validateSingleField } = useFormValidation({
    required: ['name', 'phone', 'email', 'message']
  });

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (value) {
      validateSingleField(name, value, formData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = validateSingleField('email', formData.email, formData);
    const hasRequiredFields = Object.values(formData).every(field => field.trim() !== '');

    if (!isValidEmail || !hasRequiredFields) {
      return;
    }

    console.log('Form submitted');
    setMessageSent(true);
  };

  return (
    <>
      <SEO
        title='Contato - Entre em Contato Conosco'
        description='Entre em contato com a HypeMode Store. Estamos aqui para ajudar com dúvidas, suporte ao cliente e feedback. Envie sua mensagem!'
        keywords='contato, suporte, atendimento, dúvidas, formulário de contato, customer service'
        url='/contact'
      />
      <SecondaryHeader title='Contact' />
      <LayoutContainer>
        <div className='container mx-auto px-4 py-8 md:py-12'>
          <div className='flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-16'>
            <div className='w-full md:w-1/2 flex justify-center md:justify-end order-2 md:order-1'>
              <div className='relative max-w-md w-full'>
                <div className='absolute inset-0 transform -translate-x-2 -translate-y-2 md:-translate-x-4 md:-translate-y-4 z-0'></div>
                <img
                  src='public/images/contact/contact-image.png'
                  alt='Friendly customer service representative using a laptop ready to assist with inquiries'
                  className='relative z-10 w-full h-auto object-cover'
                />
              </div>
            </div>
            
            <div className='w-full md:w-1/2 max-w-md order-1 md:order-2'>
              <h2 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6'>Contact with us</h2>

              {messageSent ? (
                <SuccessMessage
                  title="Message Sent Successfully!"
                  message="Thank you for reaching out. We will get back to you soon."
                  buttonText="Send Another Message"
                  onButtonClick={() => setMessageSent(false)}
                  variant="green"
                />
              ) : (
                <form onSubmit={handleSubmit}>
                  <FormInput
                    label='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                    className='mb-3 md:mb-4'
                    inputClassName='p-2 md:p-3'
                  />

                  <FormInput
                    label='Phone'
                    name='phone'
                    type='tel'
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                    className='mb-3 md:mb-4'
                    inputClassName='p-2 md:p-3'
                  />

                  <FormInput
                    label='Email Address'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    className='mb-3 md:mb-4'
                    inputClassName='p-2 md:p-3'
                  />

                  <FormInput
                    label='Your Message'
                    name='message'
                    type='textarea'
                    rows='4'
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                    className='mb-4 md:mb-6'
                    inputClassName='p-2 md:p-3'
                  />

                  <ButtonPrimary
                    buttonText='Send Message'
                    type='submit'
                    className='w-full md:w-auto py-2 md:py-3 px-4 md:px-6'
                  />
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className='container mx-auto px-4 py-8'>
          <NewArrivals showViewAll={true} products={products} />
        </div>
        
        <div className='container mx-auto px-4 py-8 md:py-12'>
          <NewsletterUpdates />
        </div>
      </LayoutContainer>
    </>
  );
}
