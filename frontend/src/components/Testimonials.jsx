import { motion } from 'framer-motion'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import './Testimonials.css'

function Testimonials() {
  const testimonials = [
    {
      name: 'John Smith',
      role: 'CEO at TechCorp',
      image: 'https://via.placeholder.com/100',
      rating: 5,
      text: 'Getanew is an exceptional developer. He delivered our project on time and exceeded our expectations. His attention to detail and problem-solving skills are outstanding.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      image: 'https://via.placeholder.com/100',
      rating: 5,
      text: 'Working with Getanew was a pleasure. He is professional, communicative, and delivered high-quality code. I highly recommend him for any web development project.'
    },
    {
      name: 'Michael Brown',
      role: 'Startup Founder',
      image: 'https://via.placeholder.com/100',
      rating: 5,
      text: 'Getanew helped us build our MVP from scratch. His full-stack expertise and dedication made the entire process smooth. We will definitely work with him again!'
    }
  ]

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="testimonials-title">What Clients Say</h2>
          <p className="testimonials-subtitle">
            Don't just take my word for it - hear from some of my satisfied clients
          </p>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ delay: index * 0.1 }}
                className="testimonial-card"
              >
                <div className="quote-icon">
                  <FaQuoteLeft />
                </div>
                
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="star" />
                  ))}
                </div>

                <p className="testimonial-text">"{testimonial.text}"</p>

                <div className="testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="author-image"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
