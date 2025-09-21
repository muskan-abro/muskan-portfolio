import { useState, useEffect} from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowUpRight, Star, Heart, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, School, User } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import { db, storage } from './firebase';
import { SiBehance } from "react-icons/si";

// ========== INTRO COMPONENT (1.5s duration) ==========
const IntroScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 900); // Short 1.5s intro
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        zIndex: 1000,
      }}
    >
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{
          fontSize: 'clamp(2rem, 8vw, 4rem)',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #c084fc, #f472b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 0 20px rgba(192, 132, 252, 0.5)'
        }}
      >
        Are you ready?
      </motion.h1>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Frontend Development",
      description: "Building responsive, interactive web applications with React, Next.js, and modern JavaScript frameworks.",
      image: '/images/971.jpg',
      highlights: [
        "React.js/Next.js Development",
        "Responsive Web Design",
        "Performance Optimization",
        "API Integration"
      ],
      examples: [
        { 
          name: "E-commerce Platform", 
          image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=300&auto=format" 
        },
        { 
          name: "Dashboard UI", 
          image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=300&auto=format" 
        }
      ]
    },
    {
      title: "UI/UX Design",
      description: "Creating intuitive user interfaces and seamless user experiences with a focus on accessibility and usability.",
      image: "/images/16829080_5741168.jpg",
      highlights: [
        "User Interface Design",
        "User Experience Research",
        "Wireframing & Prototyping",
        "Design Systems"
      ],
      examples: [
        { 
          name: "Mobile App Design", 
          image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=300&auto=format" 
        },
        { 
          name: "Website Redesign", 
          image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&auto=format" 
        }
      ]
    },
    {
      title: "Graphic Design",
      description: "Creating engaging visuals, brand assets, and digital creatives to bring ideas to life.",
      image: "/images/22378646_6599112.jpg",
      highlights: [
        "Brand Identity Design",
        "Marketing Collaterals",
        "Logo & Poster Design",
        "Social Media Creatives"
      ],
      examples: [
        { 
          name: "Social Media Post Design", 
          image: "/images/Lumina Solar.png" 
        },
        { 
          name: "Logo Design", 
          image: "/images/Solh - Logo-04.jpg" 
        }
      ],
      behanceLink: "https://www.behance.net/muskanabro"
    },
  ];

  return (
    <motion.section 
      id="services"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      style={{ padding: '80px 24px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#ffffff'
          }}>
            My <span style={{
              background: 'linear-gradient(to right, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Services</span>
          </h2>
          <p style={{
            color: '#9ca3af',
            fontSize: '18px',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            Comprehensive digital solutions with proven results
          </p>
        </motion.div>

        <div style={{ display: 'grid', gap: '64px' }}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '48px',
                alignItems: 'center'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  height: '400px',
                  position: 'relative'
                }}
              >
                <img 
                  src={service.image} 
                  alt={service.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '24px',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '8px'
                  }}>{service.title}</h3>
                  <p style={{ color: '#d1d5db' }}>{service.description}</p>
                </div>
              </motion.div>

              <div>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {service.highlights.map((highlight, i) => (
                    <li key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#d1d5db'
                    }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #8b5cf6, #ec4899)'
                      }} />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '32px' }}>
                  <h4 style={{ 
                    color: '#9ca3af', 
                    marginBottom: '16px',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {service.designs ? 'My Design Work' : 'My Work'}
                  </h4>

                  <div style={{
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap'
                  }}>
                    {service.examples && service.examples.map((example, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                      >
                        <img 
                          src={example.image} 
                          alt={example.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                          textAlign: 'center',
                          padding: '8px',
                          opacity: 0,
                          transition: 'opacity 0.3s ease'
                        }}>
                          {example.name}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Premium Behance Button */}
                  {service.behanceLink && (
                    <a 
                      href={service.behanceLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '24px',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #0057FF, #4D8BFF)',
                        color: '#fff',
                        fontWeight: '600',
                        textDecoration: 'none',
                        fontSize: '15px',
                        boxShadow: '0 8px 24px rgba(0, 87, 255, 0.35)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 87, 255, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 87, 255, 0.35)';
                      }}
                    >
                      <SiBehance size={22} />
                    </a>
                  )}

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// ========== UPDATED FEEDBACK WIDGET ==========
const FeedbackWidget = ({ onFeedbackSubmitted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const inputStyle = {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    padding: '12px',
    color: 'white',
    marginBottom: '12px'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const feedbackData = {
      name,
      email,
      feedback,
      date: Timestamp.now()
    };

    await addDoc(collection(db, 'feedbacks'), feedbackData);
    localStorage.setItem('currentUserEmail', email);

    // Notify parent component to refresh feedback list
    if (onFeedbackSubmitted) {
      onFeedbackSubmitted();
    }

    setTimeout(() => {
      setSubmitted(false);
      setIsOpen(false);
      setName('');
      setEmail('');
      setFeedback('');
    }, 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      zIndex: 100
    }}>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px',
            width: '300px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: '#10b981', textAlign: 'center' }}
            >
              Thank you for your feedback!
            </motion.div>
          ) : (
            <>
              <h4 style={{ color: 'white', marginBottom: '16px' }}>Give Feedback</h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  style={inputStyle}
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  style={inputStyle}
                  required
                />
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '12px',
                    color: 'white',
                    marginBottom: '16px'
                  }}
                  placeholder="Your feedback..."
                  required
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            color: 'white',
            border: 'none',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
          }}
        >
          <MessageSquare size={24} />
        </motion.button>
      )}
    </div>
  );
};

// ========== UPDATED FEEDBACK DISPLAY COMPONENT ==========
const FeedbackDisplay = ({ refreshTrigger }) => {
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedback = async () => {
    const q = query(collection(db, 'feedbacks'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => doc.data());
    setFeedbackList(data);
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Refresh when refreshTrigger changes
  useEffect(() => {
    if (refreshTrigger) {
      fetchFeedback();
    }
  }, [refreshTrigger]);

  return (
    <motion.section 
      id="feedback"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      style={{ padding: '80px 24px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#ffffff'
          }}>
            Client <span style={{
              background: 'linear-gradient(to right, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Feedback</span>
          </h2>
          <p style={{
            color: '#9ca3af',
            fontSize: '18px',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            What people are saying about my work
          </p>
        </motion.div>

        {feedbackList.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}
          >
            {feedbackList.map((item, index) => (
              <motion.div 
                key={`${item.email}-${item.date?.seconds || index}`}
                variants={itemVariants}
                custom={index}
                whileHover={{ y: -8 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '24px',
                  borderRadius: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}>
                    {item.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 style={{ color: 'white', marginBottom: '4px' }}>{item.name}</h3>
                    <p style={{ color: '#9ca3af', fontSize: '14px' }}>{item.email}</p>
                  </div>
                </div>

                <p style={{ color: '#d1d5db', lineHeight: '1.6' }}>
                  "{item.feedback}"
                </p>

                <p style={{ color: '#6b7280', fontSize: '12px', marginTop: '16px' }}>
                  {item.date?.seconds ? new Date(item.date.seconds * 1000).toLocaleDateString() : 'N/A'}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{ color: '#9ca3af', textAlign: 'center' }}
          >
            No feedback yet. Be the first to share your thoughts!
          </motion.p>
        )}
      </div>
    </motion.section>
  );
};
// ========== ANIMATION VARIANTS ==========
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: "easeOut"
    }
  })
};

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const bounceAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const floatAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Updated navItems array with external link for Designs
  const navItems = [
    { name: 'Work', link: '#work', external: false },
    { name: 'Designs', link: '/designs.html', external: true },
    { name: 'About', link: '#about', external: false },
    { name: 'Skills', link: '#skills', external: false },
    { name: 'Contact', link: '#contact', external: false }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 50,
        padding: '24px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Logo - unchanged */}
          <motion.div 
            whileHover={{ scale: 1.1 }}
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            MA
          </motion.div>

          {/* Desktop Navigation - updated */}
          <div className="nav-desktop">
            <div style={{ display: 'flex', gap: '32px' }}>
              {navItems.map((item, i) => (
                item.external ? (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none'
                    }}
                    whileHover={{ color: '#ffffff' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * i }}
                  >
                    {item.name}
                  </motion.a>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none'
                    }}
                    whileHover={{ color: '#ffffff' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * i }}
                  >
                    {item.name}
                  </motion.a>
                )
              ))}
            </div>
          </div>

          {/* Badge (desktop only) - unchanged */}
          <div className="nav-desktop">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                color: '#d1d5db'
              }}
            >
              Available for work
            </motion.div>
          </div>

          {/* Mobile Hamburger - unchanged */}
          <div className="nav-mobile" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
            {isOpen ? <X color="#fff" /> : <Menu color="#fff" />}
          </div>
        </div>

        {/* Mobile Dropdown Menu - updated */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginTop: '16px'
              }}
              className="nav-mobile"
            >
              {navItems.map((item, i) => (
                item.external ? (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '18px'
                    }}
                    whileHover={{ color: '#ffffff' }}
                  >
                    {item.name}
                  </motion.a>
                ) : (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '18px'
                    }}
                    whileHover={{ color: '#ffffff' }}
                  >
                    {item.name}
                  </motion.a>
                )
              ))}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                color: '#d1d5db',
                width: 'fit-content'
              }}>
                Available for work
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Responsive CSS - unchanged */}
      <style>
        {`
          @media (min-width: 768px) {
            .nav-desktop { display: block; }
            .nav-mobile { display: none; }
          }
          @media (max-width: 767px) {
            .nav-desktop { display: none; }
            .nav-mobile { display: block; }
          }
        `}
      </style>
    </motion.nav>
  );
};


// Hero Section Component
const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const roles = [
    'Software Engineer',
    'UI/UX Designer', 
    'Frontend Developer',
    'Graphic Designer'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: '32px' }}
        >
          <motion.div 
            variants={itemVariants}
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: '50px',
              marginBottom: '24px'
            }}
          >
            {/* <span style={{ color: '#d1d5db' }}>👋 Hello, I'm</span> */}
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 'bold',
              marginBottom: '24px',
              lineHeight: '1.1'
            }}
          >
            <span style={{
              background: 'linear-gradient(to right, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Muskan
            </span>
            <br />
            <span style={{ color: '#ffffff' }}>Abro</span>
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              color: '#d1d5db',
              marginBottom: '32px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'linear-gradient(to right, #c084fc, #f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '600'
                }}
              >
                {roles[currentRole]}
              </motion.span>
            </AnimatePresence>
            <motion.span
              animate={pulseAnimation.animate}
              transition={pulseAnimation.transition}
            >|</motion.span>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            style={{
              fontSize: '18px',
              color: '#9ca3af',
              maxWidth: '512px',
              margin: '0 auto 48px',
              lineHeight: '1.6'
            }}
          >
            I create exceptional digital experiences that blend creativity with cutting-edge technology. 
            Specializing in React.js, UI/UX design, and full-stack development.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '64px'
          }}
        >
          <motion.button 
            variants={itemVariants}
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('work')?.scrollIntoView({behavior: 'smooth'});
            }}
            style={{
              position: 'relative',
              background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
            }}
          >
            <span>View My Work</span>
            <ArrowUpRight size={20} />
          </motion.button>
          
          <motion.button 
            variants={itemVariants}
            whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.98 }}
                onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 32px',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.3s ease'
            }}
          >
            <Mail size={20} />
            <span>Let's Connect</span>
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '64px'
          }}
        >
          {[
            { icon: Github, label: 'GitHub', link: 'https://github.com/muskan-abro' },
            { icon: Linkedin, label: 'LinkedIn', link: 'https://www.linkedin.com/in/muskan-abro-/' },
            { icon: Mail, label: 'Email', link: 'mailto:muskanabro565@gmail.com' }
          ].map(({ icon: Icon, label, link }, index) => (
            <motion.a
              key={label}
              variants={itemVariants}
              custom={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '16px',
                borderRadius: '12px',
                color: '#d1d5db',
                textDecoration: 'none'
              }}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#9ca3af',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '14px', marginBottom: '8px' }}>Scroll to explore</span>
            <motion.div
              animate={bounceAnimation.animate}
              transition={bounceAnimation.transition}
            >
              <ChevronDown size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: 'AuraX - UI/UX Analytics Platform',
      description: 'Full-stack web application for UI/UX analysis through interactive heatmaps that track user behavior (clicks, scrolls) to optimize interface design.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Heatmap.js', 'D3.js'],
      status: 'Final Year Project',
      image: '/images/Screenshot 2025-07-15 140419.png',
      link: 'https://aurax.info/',
      details: {
        period: 'Jul 2024 - May 2025',
        institution: 'Usman Institute of Technology',
        role: 'Full-Stack Developer',
        features: [
          'User interaction tracking',
          'Heatmap visualization',
          'Behavior analytics',
          'Performance metrics'
        ]
      }
    },
    // {
    //   title: 'Vanity Salon & Spa - WordPress Website',
    //   description: 'Professional website for a premium salon & spa, featuring service listings, online booking, and gallery showcase.',
    //   tech: ['WordPress', 'Elementor', 'WooCommerce', 'PHP'],
    //   status: 'Live',
    //   image: '/images/WhatsApp Image 2024-10-26 at 8.06.39 PM.jpeg',
    //   link: 'https://www.vanitysalons.pk/',
    //   details: {
    //     period: '2023',
    //     institution: 'Karachi | Lahore | Faisalabad',
    //     role: 'Designer',
    //     features: [
    //       'Responsive design',
    //       'Service catalog',
    //       'Online booking system',
    //       'Gallery showcase',
    //       'Contact forms'
    //     ]
    //   }
    // },
    {
      title: 'Lush Looks Salon - React Website',
      description: 'A responsive and fully animated salon website built with React and CSS Modules. Includes booking, service menu, testimonials, and smooth scroll animations.',
      tech: ['React', 'CSS Modules', 'AOS', 'Vite', 'Vercel'],
      status: 'Live',
      image: '/images/salon.jpg',
      link: 'https://lushlooks-salon.vercel.app/',
      details: {
        period: 'Jul 2025',
        institution: 'Personal Project',
        role: 'Front-End Developer',
        features: [
          'Hero, About, Services, Gallery, Booking, Contact',
          'Detailed service menu with categories and pricing',
          'AOS animations for smoother user experience',
          'Fully responsive layout with lazy loading',
          'Deployed on Vercel'
        ]
      }
    }
  ];

  return (
    <motion.section 
      id="work"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#ffffff'
          }}>
            Featured <span style={{
              background: 'linear-gradient(to right, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Projects</span>
          </h2>
          <p style={{
            color: '#9ca3af',
            fontSize: '18px',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            A collection of projects that showcase my expertise in creating innovative digital solutions.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -8, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              <div style={{ position: 'relative' }}>
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '8px'
                }}>
                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                    style={{
                      background: project.status === 'Final Year Project' 
                        ? 'linear-gradient(to right, #3b82f6, #6366f1)' 
                        : 'linear-gradient(to right, #8b5cf6, #ec4899)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    {project.status}
                  </motion.span>
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        padding: '4px 8px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ArrowUpRight size={12} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
              
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#ffffff'
                }}>
                  {project.title}
                </h3>
                
                <p style={{
                  color: '#9ca3af',
                  marginBottom: '16px',
                  lineHeight: '1.5'
                }}>
                  {project.description}
                </p>
                
                {/* Additional details for final year project */}
                {project.details && (
                  <div style={{ 
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderLeft: '3px solid #3b82f6',
                    padding: '12px',
                    borderRadius: '0 8px 8px 0',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <Calendar size={16} style={{ color: '#3b82f6' }} />
                      <span style={{ color: '#d1d5db', fontSize: '14px' }}>
                        {project.details.period}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <School size={16} style={{ color: '#3b82f6' }} />
                      <span style={{ color: '#d1d5db', fontSize: '14px' }}>
                        {project.details.institution}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      <User size={16} style={{ color: '#3b82f6' }} />
                      <span style={{ color: '#d1d5db', fontSize: '14px' }}>
                        {project.details.role}
                      </span>
                    </div>
                  </div>
                )}
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tech.map((tech, techIndex) => (
                    <motion.span 
                      key={techIndex}
                      whileHover={{ y: -2 }}
                      style={{
                        backgroundColor: '#374151',
                        color: '#d1d5db',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const skills = [
    { name: 'React.js', level: 95, color: '#61DAFB' },
    { name: 'Next.js', level: 90, color: '#3178C6' },
    { name: 'Node.js', level: 85, color: '#339933' },
    { name: 'UI/UX Design', level: 88, color: '#FF6B6B' },
    { name: 'Python', level: 82, color: '#3776AB' },
    { name: 'MongoDB', level: 80, color: '#47A248' }
  ];

  return (
    <motion.section 
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#ffffff'
          }}>
            Technical <span style={{
              background: 'linear-gradient(to right, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Skills</span>
          </h2>
          <p style={{
            color: '#9ca3af',
            fontSize: '18px',
            maxWidth: '512px',
            margin: '0 auto'
          }}>
            Expertise across the full stack of modern web technologies
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '24px',
                borderRadius: '16px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>{skill.name}</h3>
                <span style={{
                  fontSize: '14px',
                  color: '#9ca3af'
                }}>{skill.level}%</span>
              </div>
              <div style={{
                width: '100%',
                backgroundColor: '#374151',
                borderRadius: '8px',
                height: '8px',
                overflow: 'hidden'
              }}>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 * index }}
                  style={{
                    height: '100%',
                    backgroundColor: skill.color,
                    borderRadius: '8px'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <motion.section 
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '64px',
            alignItems: 'center'
          }}
        >
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#ffffff'
            }}>
              About <span style={{
                background: 'linear-gradient(to right, #c084fc, #f472b6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Me</span>
            </h2>
            <p style={{
              color: '#9ca3af',
              fontSize: '18px',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              I'm a passionate software engineer with a keen eye for design and a love for creating 
              exceptional user experiences. With expertise in React.js, UI/UX design, and full-stack 
              development, I bridge the gap between technical excellence and creative innovation.
            </p>
            <p style={{
              color: '#9ca3af',
              fontSize: '18px',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or mentoring aspiring developers in the community.
            </p>
            
            <motion.div 
              style={{ display: 'flex', gap: '32px' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '3+', label: 'Years Exp' },
                { value: '20+', label: 'Happy Clients' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #c084fc, #f472b6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>{stat.value}</div>
                  <div style={{ color: '#9ca3af', fontSize: '14px' }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={floatAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ position: 'relative' }}
          >
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '32px',
              borderRadius: '16px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  style={{
                    width: '128px',
                    height: '128px',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    borderRadius: '50%',
                    margin: '0 auto 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>MA</span>
                </motion.div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                  color: '#ffffff'
                }}>Muskan Abro</h3>
                <p style={{
                  color: '#9ca3af',
                  marginBottom: '16px'
                }}>Software Engineer & Designer</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star size={20} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <motion.section 
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      style={{ padding: '80px 24px' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 48px)',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '#ffffff'
          }}>
            Let's <span style={{
              background: 'linear-gradient(to right, #c084fc, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Connect</span>
          </h2>
          <p style={{
            color: '#9ca3af',
            fontSize: '18px',
            marginBottom: '48px',
            maxWidth: '512px',
            margin: '0 auto 48px'
          }}>
            Ready to bring your ideas to life? Let's discuss how we can work together 
            to create something amazing.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <motion.a 
            href="mailto:muskanabro565@gmail.com"
            whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)'
            }}
          >
            <Mail size={20} />
            <span>Start a Conversation</span>
            <ArrowUpRight size={20} />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '48px 24px',
        borderTop: '1px solid #374151'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            style={{
              color: '#9ca3af',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            © 2025 Muskan Abro. Crafted with <Heart size={16} style={{ color: '#ef4444' }} /> and code.
          </motion.div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <motion.a 
                key={item}
                href="#"
                whileHover={{ color: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none'
                }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default function Portfolio() {
  const [introComplete, setIntroComplete] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#000000',
      color: '#ffffff',
      overflowX: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <AnimatePresence>
        {!introComplete && <IntroScreen onComplete={() => setIntroComplete(true)} />}
      </AnimatePresence>

      {introComplete && (
        <>
          {/* Animated Background */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: -1
          }}>
            <motion.div 
              animate={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                            rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 25%, transparent 50%)`
              }}
              transition={{ type: 'spring', damping: 30 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.2
              }}
            />
          </div>

          <Navigation />
          <HeroSection />
          <ServicesSection />
          <ProjectsSection />
          <SkillsSection />
          <AboutSection />
          <FeedbackDisplay />
          <ContactSection />
          <Footer />
          
          <FeedbackWidget />
        </>
      )}
    </div>
  );
}
