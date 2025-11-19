import { FaHotel, FaMapMarkedAlt, FaBusAlt, FaHeadset } from "react-icons/fa";

const AboutUs = () => {
  const services = [
    {
      icon: <FaHotel size={40} color="#ff5722" />,
      title: "Best Hotels",
      description: "We help you find top-rated hotels at the best prices."
    },
    {
      icon: <FaMapMarkedAlt size={40} color="#2196f3" />,
      title: "Tour Guides",
      description: "Get expert guides for exploring Indian tourist places."
    },
    {
      icon: <FaBusAlt size={40} color="#4caf50" />,
      title: "Transport Support",
      description: "We assist you in booking buses, trains, and cabs."
    },
    {
      icon: <FaHeadset size={40} color="#9c27b0" />,
      title: "24/7 Support",
      description: "Our support team is always available for your help."
    }
  ];

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>About Travel India</h1>
      <p style={{ maxWidth: "700px", margin: "0 auto", fontSize: "18px", color: "#555" }}>
        Travel India helps you explore the most beautiful places across India.
        We provide travel guidance, hotel recommendations, transport help, and
        round-the-clock support to make your journey smooth and memorable.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "40px"
      }}>
        {services.map((service, index) => (
          <div key={index} style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            {service.icon}
            <h3 style={{ marginTop: "15px" }}>{service.title}</h3>
            <p style={{ color: "#666", fontSize: "15px", marginTop: "8px" }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
