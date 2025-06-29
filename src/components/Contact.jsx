import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Replace with your EmailJS service ID, template ID, and user ID
    emailjs.send(
      'service_mzuyj9b',
      'template_ciflcrs',
      formData,
      'c9f9TPJOD44PcAaOM'
    )
    .then(() => {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    })
    .catch(() => {
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>
        
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Have questions about our products? Reach out to us!</p>
            
            <div className="contact-methods">
              <a 
                href="https://wa.me/+2347069619602?text=Hi!%20I%20saw%20a%20product%20I%20like%20on%20your%20site.%20Can%20I%20get%20more%20info?" 
                className="contact-method whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29-3.03c.545-1.5.887-2.102 1.538-2.102.198 0 .372.025.52.124.446.273.595.843.446 1.612-.149.768-.595 1.313-.842 1.537-.248.223-.347.248-.645.074-.297-.174-1.033-.409-1.92-1.385-.694-.694-1.165-1.486-1.313-1.735-.149-.248-.016-.383.111-.471.109-.074.223-.149.347-.149.124 0 .26.025.372.025.099 0 .211 0 .347-.025.136-.025.26-.136.372-.26.112-.124.223-.31.335-.434.112-.124.149-.211.26-.211s.174.025.298.149c.124.124.496.595.521.694.025.099.05.161.025.26-.025.099-.05.136-.099.198-.05.062-.111.136-.161.198-.05.062-.1.124-.149.186-.05.062-.074.111-.124.149-.05.037-.099.074-.05.186.05.111.273.558.521.843.384.434.843.929 1.312 1.238.198.124.298.161.434.074.136-.087.545-.409.684-.558.136-.149.272-.248.409-.211.136.037.867.409 1.016.508.149.099.248.149.273.223.025.074.025.409-.099.843-.124.434-.694 2.607-.843 2.782-.149.174-.297.26-.57.297-.272.037-.52-.025-.694-.074-.174-.05-.744-.322-1.413-.694-.669-.372-1.116-.57-1.238-.595-.124-.025-.26-.037-.347.074-.099.112-.384.434-.496.57-.112.136-.223.174-.409.111-.186-.062-.785-.289-1.496-1.023-.559-.58-.935-1.297-1.042-1.515-.108-.219-.119-.404-.034-.529.084-.124.26-.26.446-.372.186-.112.26-.186.347-.186.086 0 .173.025.26.124.087.1.322.991.409 1.238.087.248.174.26.26.26.087 0 .173-.037.26-.111.086-.075.173-.161.26-.248.086-.087.148-.161.211-.161.062 0 .111.025.136.062.025.037.05.087.025.137-.025.05-.05.099-.075.149z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send us a Message</h3>
            
            {submitStatus === 'success' && (
              <div className="alert success">
                Message sent successfully!
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="alert error">
                Failed to send message. Please try again.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;