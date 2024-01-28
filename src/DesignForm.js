import React, { useState } from "react";
import "./DesignForm.css";

function DesignForm() {
  const [formData, setFormData] = useState({
    step: 1,
    category: "",
    item: "",
    name: "",
    email: "",
    additionalQuestion1: "",
    additionalQuestion2: "",
    additionalQuestion3: "",
    additionalQuestion4: "",
  });

  const handleCategoryChange = (value) => {
    setFormData({ ...formData, category: value });
    goToNextStep();
  };

  const handleItemChange = (value) => {
    setFormData({ ...formData, item: value });
    goToNextStep();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const alertData = (e) => {
    e.preventDefault();
    console.log(formData);
    alert(JSON.stringify(formData, null, 2));
    setFormData({ ...formData, step: 9 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submitform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const goToNextStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      step: prevData.step < 9 ? prevData.step + 1 : prevData.step,
    }));
  };

  const goToPrevStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      step: prevData.step > 1 ? prevData.step - 1 : prevData.step,
    }));
  };

  const ArtCard = ({ type, image, label }) => (
    <div className="art-card" onClick={() => handleCategoryChange(type)}>
      <img src={image} alt={label} />
      <p>{label}</p>
    </div>
  );

  const ItemCard = ({ type, image, label }) => (
    <div className="art-card" onClick={() => handleItemChange(type)}>
      <img src={image} alt={label} />
      <p>{label}</p>
    </div>
  );

  const renderStep = () => {
    switch (formData.step) {
      case 1:
        return (
          <div>
            <p>What type of art are you interested in?</p>
            <div className="grid-cards">
              <ArtCard type="3D Signs" label="Custom 3D Bussiness Signs" />
              <ArtCard type="Acrylic Prints" label="Acrylic Prints" />
              <ArtCard type="Canvas Prints" label="Canvas Prints" />
              <ArtCard type="Trophies" label="Trophies" />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <p>What item are you interested in?</p>
            <div className="grid-cards">
              <ItemCard type="A" label="Option A" />
              <ItemCard type="B" label="Option B" />
              <ItemCard type="C" label="Option C" />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Hey, what's your full name? 👋😊</p>
            <textarea
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Type your answer here..."
            />
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 4:
        return (
          <div>
            <p>What's your email address? 📧📬</p>
            <textarea
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Type your answer here..."
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 5:
        return (
          <div>
            <p>Share your special requests! 📝✨(optional)</p>
            <textarea
              type="text"
              name="additionalQuestion1"
              value={formData.additionalQuestion1}
              onChange={handleChange}
              placeholder="Type your answer here..."
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 6:
        return (
          <div>
            <p>Let's see your design!📎🎨 (optional)</p>
            <input
              type="text"
              name="file"
              value={formData.file}
              onChange={handleChange}
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 7:
        return (
          <div>
            <p>Additional Question 3:</p>
            <input
              type="text"
              name="additionalQuestion3"
              value={formData.additionalQuestion3}
              onChange={handleChange}
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={goToNextStep}>Next</button>
          </div>
        );
      case 8:
        return (
          <div>
            <p>Additional Question 4:</p>
            <input
              type="text"
              name="additionalQuestion4"
              value={formData.additionalQuestion4}
              onChange={handleChange}
            />
            <button onClick={goToPrevStep}>Back</button>
            <button onClick={alertData}>Submit</button>
          </div>
        );
      case 9:
        return (
          <div>
            <p>
              ✨ Thank you for your request! Within the next 24 hours, we’ll be
              in touch with a personalized quote and a mock-up tailored just for
              you. We’re excited to bring your vision to life!
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return <form onSubmit={handleSubmit}>{renderStep()}</form>;
}

export default DesignForm;
