import React from "react";
import './styles.css'
const maps = () => {
  return (
    <div className="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d398.896002700316!2d91.83919721889869!3d26.132699624926925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375af7b08905fbeb%3A0xed77a8ed9820d036!2sAPEX%20Design%20and%20Construction!5e0!3m2!1sen!2sin!4v1677564533149!5m2!1sen!2sin"
        className="responsive-iframe"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default maps;
